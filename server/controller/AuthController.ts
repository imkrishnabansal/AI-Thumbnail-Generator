import {Request,Response} from 'express'
import User from '../models/User.js'
import bcrypt from 'bcrypt'

export const registerUser  = async (req:Request,res:Response)=>{
    try{
        const {name,email,password} = req.body;

        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({message:"User already exists"})
        }

        //encrypt the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)

        // ✅ FIX: use hashedPassword instead of password
        const newUser = new User({name,email,password: hashedPassword})

        await newUser.save();

        req.session.isLoggedIn = true;
        req.session.userId = newUser._id;

        res.json({
            message:'Account created successfully',
            user:{
                _id:newUser._id,
                name:newUser.name,
                email:newUser.email,  
            }
        })

    } catch (error:any){
        console.log(error);
        res.status(500).json({message:"Server error"})
    }
}

// controllers for user login 
export const loginUser  = async (req:Request,res:Response)=>{
    try{
        const {email,password} = req.body;

        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"Invalid credentials"})
        }

        const isMatch = await bcrypt.compare(password,user.password as string)

        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"})
        }

        req.session.isLoggedIn = true;
        req.session.userId = user._id;

        res.json({
            message:'Logged in successfully',
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,  
            }
        }) 

    }
    catch (error:any){
        console.log(error);
        res.status(500).json({message:"Server error"})
    }
}

// controllers for user logout
export const logoutUser  = async (req:Request,res:Response)=>{
    try{
        req.session.destroy((err)=>{
            if(err){
                console.log(err);
                return res.status(500).json({message:"Server error"})
            }
            res.clearCookie('connect.sid')
            res.json({message:"Logged out successfully"})
        })
    }
    catch (error:any){
        console.log(error);
        res.status(500).json({message:"Server error"})
    }
}

// controller for user verify
export const verifyUser  = async (req:Request,res:Response)=>{
    try{
        if(req.session.isLoggedIn){
            const user = await User.findById(req.session.userId)
            if(!user){
                return res.status(400).json({message:"User not found"})
            }
            res.json({
                user:{
                    _id:user._id,
                    name:user.name,
                    email:user.email,  
                }
            }) 
        }
        else{
            res.status(401).json({message:"Unauthorized"})
        }
    }
    catch (error:any){
        console.log(error);
        res.status(500).json({message:"Server error"})
    }
}