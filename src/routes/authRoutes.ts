import { Router } from "express";
import newUserController from "../controllers/authControllers/newUserController";
import disableAccountController from "../controllers/authControllers/disableAccountController";
import deleteAccountController from "../controllers/authControllers/deleteAccountController";
import enableAccountController from "../controllers/authControllers/enableAccountController";
import deleteApiKeyController from "../controllers/authControllers/deleteApiKeyController";
import disableApiKeyController from "../controllers/authControllers/disableAPIKeyController";
import enableApiKeyController from "../controllers/authControllers/enableApiKeyController";
import createNewApiKeyController from "../controllers/authControllers/createNewApiKeyController";

const router = Router();
router.post("/new-user", newUserController);
router.post("/disable-account", disableAccountController);
router.post("/delete-account", deleteAccountController);
router.post("/enable-account", enableAccountController);
router.post("/delete-api-key", deleteApiKeyController);
router.post("/disable-api-key", disableApiKeyController);
router.post("/enable-api-key", enableApiKeyController);
router.post("/create-new-api-key", createNewApiKeyController);

export default router;
