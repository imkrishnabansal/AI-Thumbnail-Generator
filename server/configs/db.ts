import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        mongoose.connection.on('connected',()=>console.log('MongoDb connected '))
        await mongoose.connect(process.env.MONGODB_URI as string )

    }
    catch(error){
        
        console.error('Error connecting to MongoDB:', error);
    }
}
export default connectDB; 