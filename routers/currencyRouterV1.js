import express from "express";
import {currenciesCodes} from "../controller/currencyControllerV1.js";

const router = express.Router();

router.get("/codes.json", currenciesCodes); //rutes for fetching the availbale currency codes available in the services
export default router;