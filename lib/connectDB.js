import {connect} from "mongoose";

const connectDB = async () => {
    try {
        await connect(process.env.MONGODB_URI)
        console.log("MongoDB connection succesfull!!!")
    } catch (error) {
        throw new Error(error.message)
    }
};

export default connectDB;
