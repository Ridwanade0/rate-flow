import { CurrencyRateDocument } from "../models/ratesModel";

const formatRates = async (rates: CurrencyRateDocument) => {
  try {
    return {
      base: rates.base,
      date: rates.date,
      rates: rates.rates,
    };
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message);
  }
};

export default formatRates;
