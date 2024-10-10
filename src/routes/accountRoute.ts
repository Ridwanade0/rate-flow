import express, { Request, Response } from "express";

const router = express.Router();

// Define the routes for the account management functionality

router.get("/", (req: Request, res: Response) => {
 res.render("Dashboard")
})
router.get("/api-keys", (req: Request, res: Response) => {
 res.render("api-keys")
});

export default router;