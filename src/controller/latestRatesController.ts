import { Request, Response } from "express";
import latestRatesService from "../service/latestRatesService";

const latestRatesController = async (req: Request, res: Response) => {
  try {
    const base = typeof req.query.base === "string" ? req.query.base : 'USD';
    const symbols = typeof req.query.symbols === "string" ? req.query.symbols : "";
    const rates = await latestRatesService(base.toUpperCase(), symbols.toUpperCase());
    res.status(200).json(rates);
  } catch (error) {
    const err = error as Error; // Cast error to Error type
    // Send an error response with a generic error message
    res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
};

export default latestRatesController;
