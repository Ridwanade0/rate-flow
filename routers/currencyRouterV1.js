import express from "express";
import {currenciesCodes} from "../controller/currencyControllerV1.js";
import latestCurrenciesRate from "../controller/latestCurrenciesRateControllerV1.js";
import conversionControllerV1 from "../controller/conversionControllerV1.js";
import historyRates from "../controller/historyControllerV1.js";

const router = express.Router();

router.get("/codes.json", currenciesCodes); //routes for fetching the availbale currency codes available in the services
router.get("/latest.json", latestCurrenciesRate);
router.get("/convert", conversionControllerV1);
router.get("/historical/:date.json", historyRates);
export default router;