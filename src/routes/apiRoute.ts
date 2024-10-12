import express, { Request, Response } from "express";
import createapikeyController from "../controller/createapikeyController";
import latestRatesController from "../controller/latestRatesController";
const router = express.Router();

router.get("/create-apikey", createapikeyController);
router.get("/latest.json", latestRatesController);

export default router;
