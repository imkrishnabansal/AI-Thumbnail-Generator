import  Express  from "express";
const AuthRouter = Express.Router(); 
import { registerUser, loginUser, logoutUser, verifyUser } from "../controller/AuthController.js";


AuthRouter.post('/register',registerUser)
AuthRouter.post('/login',loginUser)
AuthRouter.get('/verify',verifyUser)
AuthRouter.post('/logout',logoutUser)

export default AuthRouter;



