// Import necessary modules
import express, { Request, Response } from "express"; // Import express and necessary types
import signupController from "../controller/signupController"; // Import the signup controller
import loginController from "../controller/loginController"; //Import the login controller

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

/**
 * GET /login
 * @description Renders the login page
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 */
router.get("/login", async (req:Request, res:Response) => {
  res.render("login") //Render the login view
})


/**
 * POST /login
 * @description Handle login form submission.
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 */
router.post("/login", loginController)


// Export the router for use in other parts of the application
export default router;
