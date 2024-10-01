import express from "express";
import {currenciesCodes} from "../controller/currencyControllerV1.js";
import latestCurrenciesRate from "../controller/latestCurrenciesRateV1.js";
import multipleCurrenciesRate from "../controller/multipleCurrenciesRateV1.js";

const router = express.Router();

router.get("/codes.json", currenciesCodes); //routes for fetching the availbale currency codes available in the services
router.get("/latest.json", latestCurrenciesRate)
router.get("/multiple-base.json", multipleCurrenciesRate)
export default router;