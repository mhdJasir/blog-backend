import { Request, Response } from 'express';
import { AppDataSource } from '../../data-source';
import { Blog } from '../entity/Blog';

class BlogController {
  static async getAllBlogs(req: Request, res: Response) {

    const blogRepository = AppDataSource.getRepository(Blog)

    const blogs = await blogRepository.find()
    
    return res.send(
      {
        status: "Success",
        data: blogs,
      }
    );
  }

  public static async addBlog(req: Request, res: Response) {
    const { title, sub_title, date, user_id } = req.body;
    return res.send(
      {
        status: "Success",
        data: title,
      }
    );
  }
}

export default BlogController;
