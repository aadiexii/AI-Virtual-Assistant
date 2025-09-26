import express from 'express'
import { getCurrentUser, updateAssistant } from '../controllers/user.controller.js';
import isAuth from '../middleware/isAuth.js';
import upload from '../middleware/multer.js';
const userRouter = express.Router();

userRouter.get('/currentuser',isAuth, getCurrentUser);
userRouter.post('/updateassistant',isAuth, upload.single("assistantImage"),updateAssistant);

export default userRouter

