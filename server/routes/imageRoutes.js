import express from 'express';
import { removeBgImage } from '../controllers/imageController.js';
import upload from '../middlewares/multer.js';
import authUser from '../middlewares/auth.js';

const imageRouter = express.Router();

// Route to handle image background removal
imageRouter.post('/removebg', authUser, upload.single('image'), removeBgImage);

export default imageRouter;