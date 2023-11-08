import { Request, Response } from 'express';
import { AppDataSource } from '../../data-source';
import { User } from '../entity/User';

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


  public static async userLogin(req: Request, res: Response) {

    const userRepository = AppDataSource.getRepository(User)

    const user = new User();

    
    return res.send(
      {
        status: "success",
        users: "users"
      }
    )
  }
}

export default UserController;
