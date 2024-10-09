// Import necessary modules
import { Request, Response } from "express"; // Import Request and Response types
import signupServices from "../service/signupService"; // Import the signup service

/**
 * Signup controller to handle user registration.
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @returns {Promise<void>} - A promise that resolves to void.
 */
const signupController = async (req: Request, res: Response): Promise<void> => {
  try {
    // Define the structure of signup credentials
    interface SignupCredentials {
      email: string;
      password: string;
    }

    // Define the structure of a new user response
    interface NewUserResponse {
      message: string;
      user: {
        _id: string;
        email: string;
        createdAt: string;
        updatedAt: string;
      };
    }

    const { email, password }: SignupCredentials = req.body; // Destructure email and password from request body
    const userResponse: NewUserResponse = await signupServices(email, password); // Call the signup service

    // Send a success response with user information
    res.status(201).json(userResponse);
  } catch (error) {
    const err = error as Error; // Cast error to Error type
    // Send an error response
    res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
};

export default signupController;
