import jwt from "jsonwebtoken";
import "dotenv/config";
import { v4 as uuidv4 } from "uuid";
import User from "../models/userModel";
import { jwtPayload } from "../lib/interface";
import ApiKey from "../models/apiKeysModel";

const createapikeyService = async (token: string) => {
  try {
    const jwtSecret = process.env.JWT_SECRET as string;
    const isTokenValid = jwt.verify(token, jwtSecret) as jwtPayload;
    if (!isTokenValid) {
      throw new Error("Invalid token or expired token");
    }
    // Generate a new API key and save it to the database
    const newAPIKey = uuidv4().split("-").join("");
    // Update the user's apiKeys array with the new API key
    const updatedUser = await User.findByIdAndUpdate(
      isTokenValid.id,
      {
        $push: {
          apiKeys: newAPIKey,
        },
      },
      { new: true }
    );
    if (!updatedUser) {
      throw new Error("User not found");
    }

    // Create a new ApiKey document and save it to the database
    const newKey = new ApiKey({
      _id: newAPIKey,
      key: newAPIKey,
      user: updatedUser._id,
      apiCallsCount: 0,
    });
    await newKey.save();
    return {
     message: "New key generated successfully",
     apiKey: newAPIKey,}
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message); // Rethrow the error with a message
  }
};
export default createapikeyService;
