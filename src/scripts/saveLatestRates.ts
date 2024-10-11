import axios from "axios";
import Currency from "../models/currenciesModel";
import CurrencyRates from "../models/ratesModel"; // to store latest currencies rates
import "dotenv/config";
import {
  CurrencyCodes,
  CurrencyRatesResponse,
  DBCurrencyCode,
  Rates,
} from "../lib/interface";

// Define the function to calculate converted base rates
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
    // Fetch currency codes from the database
    const currencyCodesResponse = (await Currency.findById(
      "CurrenciesCode"
    )) as DBCurrencyCode;
    const currencyCodes: CurrencyCodes = currencyCodesResponse.code as any; // Ensure currencyCodes is correctly typed

    // Fetch the latest currency rates from the API
    const currenciesRatesResponse = await axios.get<CurrencyRatesResponse>(
      `${process.env.OER_BASE_URL}/latest.json`,
      {
        params: {
          app_id: process.env.OER_APP_ID,
        },
      }
    );

    const currencyRates = currenciesRatesResponse.data.rates;
    const date = new Date().toISOString().split("T")[0]; // Get current date

    // Iterate through each base currency code and calculate rates
    for (const base of Object.keys(currencyCodes)) {
      const latestRates = calculateBaseRates(currencyRates, base);

      // Upsert the rates for each base currency
      await CurrencyRates.findOneAndUpdate(
        { base },
        {
          $set: {
            date: date,
            base: base,
            rates: latestRates,
          },
        },
        { upsert: true }
      );
    }

    console.log("Latest Rates with equivalent bases saved succesfully.");
  } catch (error) {
    // Enhanced error handling
    console.error(
      "Error while saving latest rates:",
      error instanceof Error ? error.message : error
    );
  }
};

export default saveLatestRates;
