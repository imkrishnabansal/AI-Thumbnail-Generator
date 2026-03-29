// controllers.to get all user thumbnails
import { Request, Response } from "express"; 
import Thumbnail from "../models/Thumbnai.js";
import session from "express-session";
export const getUserThumbnails = async (req:Request,res:Response)=>{
    try{
        const { userId } = req.session;
        const thumbnail = await Thumbnail.find({ userId }).sort({ createdAt: -1 });
        res.json({thumbnails:thumbnail})
    }
    catch (error:any){
        console.log(error);
        res.status(500).json({message:"Server error"})
    }
}
//controller to get the single thumbnail of the user 
export const getSingleThumbnail = async (req:Request,res:Response)=>{
    try{
        const { userId } = req.session;
        const {id} = req.params;
        const thumbnail = await Thumbnail.findOne({ _id:id,userId });
        if(!thumbnail){
            return res.status(404).json({message:"Thumbnail not found"})
        }
        res.json({thumbnail})
    }
    catch (error:any){
        console.log(error);
        res.status(500).json({message:"Server error"})
    }
}