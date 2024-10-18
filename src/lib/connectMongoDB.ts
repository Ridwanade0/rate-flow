// Import necessary modules

import { connect } from "mongoose";


// defined function to connect to the mongodb database
const connectMongoDB = async () => {
  try {
    // Initialize your MongoDB connection here
    const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/currency-converter"; // loaded uri from environment variable but default if not available
    await connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
};

export default connectMongoDB; // exported mongodb connection function.
