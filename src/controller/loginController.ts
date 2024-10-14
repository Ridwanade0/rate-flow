// Import necessary modules
import { Request, Response } from "express"; // Import Request and Response types
import { AuthCredentials } from "../lib/interface"; // Import authcredential interface
import loginService from "../service/loginService";

/**
 * Login controller to handle user authentication.
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @returns {Promise<void>} - A promise that resolves to void.
 */
const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password }: AuthCredentials = req.body;
    const response = await loginService(email, password);
    // Send a success response with user information
    res.status(200).json(response);
  } catch (error) {
    const err = error as Error; // Cast error to Error type
    // Send an error response
    res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
};

export default loginController;
