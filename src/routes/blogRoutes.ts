import express, { Request, Response } from 'express';
import BlogController from '../controllers/BlogController';

const router = express.Router();
import multer  from "multer";

const storageEngine = multer.diskStorage({
    destination: "./public/images/blog/widgets",
    filename: (_, file, cb) => {
        cb(null, `${Date.now()}--${file.originalname}`);
    },
});

const upload = multer({
    storage: storageEngine,
});

router.post('/addBlog',upload.array('widgets', 10),BlogController.addBlog,);
router.post('/addWidget', BlogController.addWidget);

router.get('/getBlogs', BlogController.getAllBlogs);


export default router;