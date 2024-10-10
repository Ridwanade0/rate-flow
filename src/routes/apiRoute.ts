import express, { Request, Response } from "express";
import createapikeyController from "../controller/createapikeyController";

const router = express.Router();

router.get("/create-apikey", createapikeyController);

export default router;
