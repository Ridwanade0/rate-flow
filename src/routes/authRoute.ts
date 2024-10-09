// Import necessary modules
import express, { Request, Response } from "express"; // Import express and necessary types
import signupController from "../controller/signupController"; // Import the signup controller

// Create a new router instance
const router = express.Router();

/**
 * GET /signup
 * @description Render the signup page.
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 */
router.get("/signup", async (req: Request, res: Response): Promise<void> => {
  res.render("signup"); // Render the signup view
});

/**
 * POST /signup
 * @description Handle signup form submission.
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 */
router.post("/signup", signupController); // Delegate to the signup controller for handling signup logic

// Export the router for use in other parts of the application
export default router;
