import express from 'express';
import BlogController from '../controllers/BlogController';

const router = express.Router();

router.get('/getBlogs', BlogController.getAllBlogs);
router.post('/addBlog', BlogController.addBlog);


export default router;