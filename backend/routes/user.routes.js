import express from 'express'
import { getCurrentUser } from '../controllers/user.controller.js';
const userRouter = express.Router();

userRouter.get('/currentuser', getCurrentUser);

export default userRouter

