import mongoose from "mongoose";


export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema = new mongoose.Schema<IUser>({
    name: {type: String, required: true,trim:true},
    email: {type: String, required: true, unique: true, lowercase: true, trim: true},
    password: {type: String, required: true}, // password encrypted nhi hai in database me

},{timestamps:true})

const User  = mongoose.models.User || mongoose.model<IUser>('User',userSchema)
2
export default User;