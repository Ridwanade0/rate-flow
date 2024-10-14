import express, { Request, Response } from "express";
import keysController from "../controller/keysController";
const router = express.Router();

// Define the routes for the account management functionality

router.get("/", (req: Request, res: Response) => {
  res.render("Dashboard");
});
router.get("/api-keys", async (req: Request, res: Response) => {
  try {
    res.render("api-keys");
  } catch (error) {
    const err = error as Error;
    // Send an error response
    res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
});
router.get("/api-keys-list", keysController);

export default router;
