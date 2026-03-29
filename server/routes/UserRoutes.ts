import express from "express";
const userRouter = express.Router();

import { 
  getSingleThumbnail, 
  getUserThumbnails 
} from "../controller/UserController.js";

import { generateThumbnail } from "../controller/THumbnailController.js";   
userRouter.get("/thumbnails", getUserThumbnails);
userRouter.get("/thumbnails/:id", getSingleThumbnail);

// ✅ ADD THIS
userRouter.post("/thumbnail/generate", generateThumbnail);

export default userRouter;