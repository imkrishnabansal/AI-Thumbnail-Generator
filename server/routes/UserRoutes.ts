import express from "express";
const userRouter = express.Router();

import { 
  getSingleThumbnail, 
  getUserThumbnails 
} from "../controller/UserController.js";
 
userRouter.get("/thumbnails", getUserThumbnails);
userRouter.get("/thumbnails/:id", getSingleThumbnail);

export default userRouter;