import { Request, Response } from "express";
import { updateApiCallsLimit, validateAPIKey } from "../../lib/validateAPIKey";

const latestCurrencyRatesController = async (req: Request, res: Response) => {
  const apiKey = req.headers.authorization?.replace("Bearer ", "") as string;
  try {
    const apiKeyValidity = await validateAPIKey(apiKey);
    if (!apiKeyValidity.valid) {
      res.status(401).json({ message: apiKeyValidity.reason });
      return;
    }
    await updateApiCallsLimit(apiKeyValidity.userId as string, apiKey);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      message: "Failed to fetch latest currency rates",
      error: err.message,
    });
  }
};

export default latestCurrencyRatesController;
