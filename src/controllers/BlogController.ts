import { Request, Response } from 'express';

class BlogController {
  static getAllBlogs(req: Request, res: Response) {
    return res.send(
      {
        status: "Success",
        data: "Blogs",
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
