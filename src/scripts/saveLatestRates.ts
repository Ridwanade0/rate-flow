import axios from "axios";
import Currency from "../models/currenciesModel";
import "dotenv/config";
import CurrencyRates from "../models/ratesModel"; // to store latest currencies rates
import { CurrencyCode, Rates } from "../lib/interface";

// Define the interface for the response data

const calculateBaseRates = (rates: Rates, targetBase: string): Rates => {
  const targetBaseRate = rates[targetBase];
  const convertedBaseRates: Rates = {};

  for (const code in rates) {
    convertedBaseRates[code] = (1 / targetBaseRate) * rates[code];
  }

  return convertedBaseRates;
};

const saveLatestRates = async () => {
  try {
    const currencyCodesResponse = (await Currency.findById(
      "CurrenciesCode"
    )) as CurrencyCode;
    const currencyCodes: any = currencyCodesResponse.code;
    const currenciesRatesResponse = await axios.get(
      `${process.env.OER_BASE_URL}/latest.json`,
      {
        params: {
          app_id: process.env.OER_APP_ID,
        },
      }
    );
    const currencyRates = currenciesRatesResponse.data.rates;
    const date = new Date().toISOString().split("T")[0]; // Get current date
    for (const base in currencyCodes) {
      console.log(base);
    }
  } catch (error) {
    const err = error as Error;
    console.error(err.message);
  }
};

export default saveLatestRates;
