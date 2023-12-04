import { Request, Response } from 'express';
import { AppDataSource } from '../../data-source';
import { User } from '../entity/User';
import bcrypt from "bcryptjs"
import JWT from "jsonwebtoken";
import { config } from 'dotenv';

config();

class UserController {
  public static async getAllUsers(req: Request, res: Response) {

    const userRepository = AppDataSource.getRepository(User)

    const users = await userRepository.find()
    return res.send(
      {
        status: "success",
        users: users
      }
    )
  }

  public static async addUser(req: Request, res: Response) {
    const userRepository = AppDataSource.getRepository(User)
    const { name, password, email } = req.body
    const salt = await bcrypt.genSalt(10);
    const saltedPassword = await bcrypt.hash(password, salt);

    const user = new User()
    user.name = name
    user.email = email
    user.password = saltedPassword

    try {
      await userRepository.save(user)
      return res.send({
        status: 'success',
        user: user,
      });
    } catch (e) {
      console.log(e);
      if (e.code === 'ER_DUP_ENTRY') {
        return res.status(400).send({
          status: 'Failed',
          error: 'This email is already registered.',
        });
      }

      // If it's not a duplicate entry error, handle it accordingly
      return res.status(500).send({
        status: 'Failed',
        error: e.message || 'Internal Server Error',
      });
    }
  }


  public static async userLogin(req: Request, res: Response) {

    const userRepository = AppDataSource.getRepository(User)

    const { email, password } = req.body;

    const user = await userRepository.find({ where: { email: email } });

    if (!user) {
      return res.send(
        {
          status: "success",
          users: "There is no such user exists"
        }
      )
    }
    const isMathced = await bcrypt.compare(password, user[0].password);
    if (!isMathced) {
      return res.send(
        {
          status: "success",
          users: "Incorrect passsword entered"
        }
      )
    }
    const token = JWT.sign({ id: user[0].id, name: user[0].name }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    return res.send(
      {
        status: "success",
        user: {
          name: user[0].name,
          email: user[0].email,
          token: token
        }
      }
    )
  }
}

export default UserController;
