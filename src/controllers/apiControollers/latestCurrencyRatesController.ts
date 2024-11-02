import { Request, Response } from "express";

const latestCurrencyRatesController = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      message: "Failed to fetch latest currency rates",
      error: err.message,
    });
  }
};

export default latestCurrencyRatesController;
