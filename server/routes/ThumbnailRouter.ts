import express from "express";
const thumbnailRouter = express.Router();

import { generateThumbnail } from "../controller/THumbnailController.js";   

thumbnailRouter.post("/thumbnail/generate", generateThumbnail);

export default thumbnailRouter;