// Import necessary modules
import bcrypt from "bcrypt"; // Import bcrypt for password hashing
import User from "../models/userModel"; // Import the User model
import {v4 as uuidv4} from "uuid"; // Import uuidv4 for userID gneration

/**
 * Signup service to create a new user.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<{ message: string; user: { _id: string; email: string; createdAt: string; updatedAt: string; } }>} 
 * - A promise that resolves to the signup result.
 * @throws {Error} - Throws an error if the signup process fails.
 */
const signupServices = async (email: string, password: string): Promise<{ message: string; user: { _id: string; email: string; createdAt: string; updatedAt: string; } }> => {
  try {
    // Validate email and password
    if (!email || !password) {
      throw new Error("Incomplete credentials, email and password must be present!");
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User with this email already exists!");
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      _id: generateUniqueId(), // Generate a unique ID for the user
      email,
      password: hashedPassword,
      isVerified: false,
      apiKeys: [],
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    return {
      message: "User created successfully",
      user: {
        _id: savedUser._id,
        email: savedUser.email,
        createdAt: savedUser.createdAt!.toISOString(),
        updatedAt: savedUser.updatedAt!.toISOString(),
      },
    };
  } catch (error) {
    const err = error as Error; // Cast error to Error type
    throw new Error(err.message); // Rethrow the error with a message
  }
};

export default signupServices;

/**
 * Generates a unique ID for a new user.
 * @returns {string} - A custom unique ID string.
 */
function generateUniqueId(): string {
  return uuidv4();
}
