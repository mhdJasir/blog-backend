import { Request, Response } from 'express';
import { AppDataSource } from '../../data-source';
import { Blog } from '../entity/Blog';
import { Widget } from '../entity/Widgets';
import { User } from '../entity/User';
import { error } from 'console';

class BlogController {

  static invalidRequest = (req: Request, res: Response) => {
    return res.status(500).send({
      status: 'Failed',
      error: 'Invalid request',
    });
  }

  static async getAllBlogs(req: Request, res: Response) {

    const blogRepository = AppDataSource.getRepository(Blog)

    const blogs = await blogRepository.find({ where: { user: req.user.id }, relations: ['widgets'] });

    return res.send(
      {
        status: "Success",
        data: blogs,
      }
    );
  }

  public static async addBlog(req: Request, res: Response) {
    const { title, sub_title, widgets } = req.body;
    const blogRepository = AppDataSource.getRepository(Blog)
    const newBlog = new Blog();
    newBlog.title = title;
    newBlog.sub_title = sub_title;
    newBlog.user = req.user.id;
   
    console.log(req.body);
    


    return res.send(req.body.widgets.type);

    if (!Array.isArray(widgets) || widgets.length === 0) {
      return res.status(400).json({ error: 'Widgets must be a non-empty array.' });
    }

    try {
      await blogRepository.save(newBlog);
      return res.send(
        {
          status: "Success",
          data: { ...newBlog, widgets },
        }
      );
    } catch (e) {
      console.log(e);
      if (e.code === 'ER_NO_REFERENCED_ROW_2') {
        return res.status(500).send({
          status: 'Failed',
          error: 'Un authenticated',
        });
      }
      if (e.code === 'ER_DUP_ENTRY') {
        return res.status(500).send({
          status: 'Failed',
          error: 'This title is already used',
        });
      }
      return res.status(500).send({
        status: 'Failed',
        error: e.message || 'Internal Server Error',
      });
    }
  }

  public static async addWidget(req: Request, res: Response) {
    const createErrorResponse = (status, errorMessage) => {
      return res.status(status).send({
        status: 'Failed',
        error: errorMessage,
      });
    };

    try {
      const widgetRepository = AppDataSource.getRepository(Widget);
      const { blog_id, type, content, font_size, font_color } = req.body;

      if (!type) {
        return createErrorResponse(400, 'Invalid request: Type is required.');
      }

      const widget: Widget = new Widget();
      const blog = new Blog();
      blog.id = blog_id;
      widget.blog = blog;

      try {
        switch (type) {
          case 'text':
            if (!content || !font_size) {
              return createErrorResponse(400, 'Invalid request: Content and font_size are required for text widgets.');
            }
            widget.type = type;
            widget.text = content;
            widget.textColor = font_color;
            widget.textSize = font_size;
            break;
          case 'image':
            widget.type = type;
            if (!req.file) {
              return createErrorResponse(400, 'Invalid request: Image file is required for image widgets.');
            }
            break;
          default:
            return createErrorResponse(400, 'Invalid request: Unsupported widget type.');
        }
        
        const addedWidget = await widgetRepository.save(widget);

        return res.send({
          status: 'Success',
          data: addedWidget,
        });
      } catch (e) {
        console.error(e);
        return createErrorResponse(500, 'Internal Server Error');
      }
    } catch (e) {
      console.error(e);
      return createErrorResponse(500, 'Internal Server Error');
    }
  }

}

export default BlogController;
