// imprted neccessary modules
import bcrypt from "bcrypt"; // imported bcrypt module for password encrption purpose
import "dotenv/config"; // imported dotenv to load environment variables
import userModel from "../model/userModel"; // imported userModel to store and create new user model
import { v4 as uuidv4 } from "uuid";

const signupService = async (email: string, password: string) => {
  try {
    if (!email && !password) {
      throw new Error("Email and password are required");
    }
    const bcryptSaltValue = parseInt(process.env.BCRYPT_SALT_VALUE as string); // used type assertion to convert bcryptsaltvalue coming from environment variables to string
    const hashedPassword = await bcrypt.hash(password, bcryptSaltValue);
    const userID = uuidv4(); // generated unique uuid
    // if all conditions are met, then create a new user with hashed password
    const newUser = new userModel({
      _id: userID,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    return {
      success: true,
      message: "User created successfully",
      userID,
    };
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message);
  }
};

export default signupService; // exported the signup service for use
