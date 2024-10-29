import { Router } from "express";
import newUserController from "../controllers/newUserController";

const router = Router();
router.post("/new-user", newUserController);

export default router;
