// Import necessary modules
import { connect } from "mongoose"; // Import the connect function from mongoose
import "dotenv/config"; // Load environment variables from .env file

/**
 * Connect to MongoDB using the provided URI.
 * @async
 * @throws {Error} If the connection fails, an error will be thrown with the message.
 */
const connectMongoDB = async (): Promise<void> => {
  // Get the MongoDB URI from environment variables
  const mongodbURI: string = process.env.MONGODB_URI as string;

  try {
    // Attempt to connect to MongoDB
    await connect(mongodbURI);
    console.log("MongoDB connected successfully!"); // Log a success message
  } catch (error) {
    // If an error occurs, throw a new error with the error message
    const err = error as Error; // Cast the error to an Error type
    throw new Error(err.message);
  }
};

// Export the connectMongoDB function
export default connectMongoDB;
