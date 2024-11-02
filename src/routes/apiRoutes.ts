import { Router } from "express";
import latestCurrencyRatesController from "../controllers/apiControollers/latestCurrencyRatesController";
import historyRatesController from "../controllers/apiControollers/historyRatesController";
import convertRatesController from "../controllers/apiControollers/convertRatesController";

const router = Router();
router.get("/latest.json", latestCurrencyRatesController);
router.get("/history/:date.json", historyRatesController);
router.get("/convert", convertRatesController);

export default router;
