import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(MONGODB_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error("MongoDB Connection Failed");
        console.error(error.message);
        process.exit(1);
    }
}

export default connectDB;