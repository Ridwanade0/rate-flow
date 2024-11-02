import { Request, Response } from "express";
import { updateApiCallsLimit, validateAPIKey } from "../../lib/validateAPIKey";
import historyCurrencyRatesService from "../../services/apiServices/historyCurrencyRatesService";

const historyRatesController = async (req: Request, res: Response) => {
  const apiKey = req.headers.authorization?.replace("Bearer ", "") as string;
  const base = (req.query.base as string) || "USD";
  const symbols = req.query.symbols as string;
  const date = req.params.date;
  try {
    const apiKeyValidity = await validateAPIKey(apiKey);
    if (!apiKeyValidity.valid) {
      res.status(401).json({ message: apiKeyValidity.reason });
      return;
    }
    const rates = await historyCurrencyRatesService(base, symbols, date);
    res.status(200).json(rates);
    await updateApiCallsLimit(apiKeyValidity.userId as string, apiKey);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      message: "Failed to fetch historical currency rates",
      error: err.message,
    });
  }
};

export default historyRatesController;
