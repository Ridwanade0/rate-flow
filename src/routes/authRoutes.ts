import { Router } from "express";
import newUserController from "../controllers/newUserController";
import disableAccountController from "../controllers/disableAccountController";
import deleteAccountController from "../controllers/deleteAccountController";
import enableAccountController from "../controllers/enableAccountController";
import deleteApiKeyController from "../controllers/deleteApiKeyController";
import disableApiKeyController from "../controllers/disableAPIKeyController";
import enableApiKeyController from "../controllers/enableApiKeyController";

const router = Router();
router.post("/new-user", newUserController);
router.post("/disable-account", disableAccountController);
router.post("/delete-account", deleteAccountController);
router.post("/enable-account", enableAccountController);
router.post("/delete-api-key", deleteApiKeyController);
router.post("/disable-api-key", disableApiKeyController);
router.post("/enable-api-key", enableApiKeyController);

export default router;
