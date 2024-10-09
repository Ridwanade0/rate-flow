import express, { Request, Response } from "express";
import postSignupController from "../controller/postSignupController";

const router = express.Router()

router.get("/signup", async (req: Request, res: Response) => {
 res.render("signup")
})
router.post("/signup", postSignupController)

export default router