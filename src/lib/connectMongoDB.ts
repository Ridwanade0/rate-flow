import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connected to MongoDB");
  } catch (error) {
    const err = error as Error;
    throw new Error(`Error connecting to MongoDB: ${err.message}`);
  }
};

export default connectMongoDB;
