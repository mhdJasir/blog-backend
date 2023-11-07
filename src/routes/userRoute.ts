import express from 'express';
import UserController from '../controllers/UserController';

const router = express.Router();

router.get('/getUsers', UserController.getAllUsers);


export default router;