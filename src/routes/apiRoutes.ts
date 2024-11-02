import { Router } from "express";
import latestCurrencyRatesController from "../controllers/apiControollers/latestCurrencyRatesController";
import historyRatesController from "../controllers/apiControollers/historyRatesController";

const router = Router();
router.get("/latest.json", latestCurrencyRatesController);
router.get("/history/:date.json", historyRatesController);

export default router;
