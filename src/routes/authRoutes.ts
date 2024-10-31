import { Router } from "express";
import newUserController from "../controllers/newUserController";
import disableAccountController from "../controllers/disableAccountController";

const router = Router();
router.post("/new-user", newUserController);
router.post("/disable-account", disableAccountController);

export default router;
