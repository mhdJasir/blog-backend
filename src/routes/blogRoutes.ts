import express from 'express';
import BlogController from '../controllers/BlogController';

const router = express.Router();
import multer  from "multer";

const storageEngine : multer.StorageEngine= multer.diskStorage({
    destination: "./public/images/blog/widgets",
    filename: (_, file, cb) => {
        cb(null, `${Date.now()}--${file.originalname}`);
    },
});

const upload = multer({
    storage: storageEngine,
});

router.post('/addBlog',BlogController.addBlog,);
router.post('/addWidget', upload.single('image'),BlogController.addWidget);

router.get('/getBlogs', BlogController.getAllBlogs);


export default router;