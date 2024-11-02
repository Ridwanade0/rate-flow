import { Router } from "express";
import latestCurrencyRatesController from "../controllers/apiControollers/latestCurrencyRatesController";

const router = Router();
router.get("/latest.json", latestCurrencyRatesController);

export default router;
