import { Request, Response } from "express";
import { updateApiCallsLimit, validateAPIKey } from "../../lib/validateAPIKey";
import convertRatesService from "../../services/apiServices/convertRatesService";

const convertRatesController = async (req: Request, res: Response) => {
  const apiKey = req.headers.authorization?.replace("Bearer ", "") as string;
  const fromCurrency = (req.query.from as string) || "USD";
  const toCurrency = (req.query.to as string) || "NGN";
  const amount = parseFloat(req.query.amount as string) || 1;
  try {
    const apiKeyValidity = await validateAPIKey(apiKey);
    if (!apiKeyValidity.valid) {
      res.status(401).json({ message: apiKeyValidity.reason });
      return;
    }
    const result = await convertRatesService(fromCurrency, toCurrency, amount);
    res.status(200).json(result);
    await updateApiCallsLimit(apiKeyValidity.userId as string, apiKey);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      message: "Failed to fetch historical currency rates",
      error: err.message,
    });
  }
};

export default convertRatesController;
