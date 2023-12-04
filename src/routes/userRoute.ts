import express from 'express';
import UserController from '../controllers/UserController';

const router = express.Router();

router.get('/getUsers', UserController.getAllUsers);
router.post('/addUser', UserController.addUser);

router.post("/login", UserController.userLogin);


export default router;