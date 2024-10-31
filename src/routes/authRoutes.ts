import { Router } from "express";
import newUserController from "../controllers/newUserController";
import disableAccountController from "../controllers/disableAccountController";
import deleteAccountController from "../controllers/deleteAccountController";

const router = Router();
router.post("/new-user", newUserController);
router.post("/disable-account", disableAccountController);
router.post("/delete-account", deleteAccountController);

export default router;
