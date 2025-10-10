import express from "express";
import { removeBgImage } from "../controllers/imageController.js";
import authUser from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";

const imageRouter = express.Router();

imageRouter.post("/removebg", authUser, upload.single("image"), removeBgImage);

export default imageRouter;
