import express, { Request, Response } from "express";
import apiKeysViewController from "../controller/apiKeysViewController";
const router = express.Router();

// Define the routes for the account management functionality

router.get("/", (req: Request, res: Response) => {
 res.render("Dashboard")
})
router.get("/api-keys", apiKeysViewController);

export default router;