import axios from "axios";
import path from "path";
import fs from "fs/promises";
import { CurrencyRates } from "../lib/type";
import LatestCurrencyRateModel from "../models/LatestCurrencyRatesModel";

const calculateBaseRates = async (
  rates: CurrencyRates,
  baseCurrency: string
) => {
  const baseCurrencyRate = rates[baseCurrency];
  try {
    let baseCurrencyRates: CurrencyRates = {};
    for (const currency in rates) {
      baseCurrencyRates[currency] = rates[currency] / baseCurrencyRate;
    }
    return baseCurrencyRates;
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message);
  }
};

const fetchAndSaveLatestCurrencyRates = async () => {
  try {
    const response = await axios.get(
      `${process.env.OER_BASE_URL}/latest.json?app_id=${process.env.OER_APP_ID}`
    );
    const latestRates: CurrencyRates = response.data.rates;
    const date = new Date().toISOString().split("T")[0];
    const currenciesCodesPath = path.join(
      __dirname,
      "..",
      "..",
      "public",
      "api",
      "currencies.json"
    );
    const currenciesCodes = JSON.parse(
      await fs.readFile(currenciesCodesPath, {
        encoding: "utf8",
      })
    );

    let latestCurrencyRates = [];
    for (const base in currenciesCodes) {
      const baseRates = await calculateBaseRates(latestRates, base);
      latestCurrencyRates.push({
        base,
        rates: baseRates,
      });
    }
    latestCurrencyRates.forEach(async (latestCurrencyRate) => {
      await LatestCurrencyRateModel.findOneAndUpdate(
        {
          date: date,
          base: latestCurrencyRate.base,
        },
        {
          $set: {
            date: date,
            base: latestCurrencyRate.base,
            rates: latestCurrencyRate.rates,
          },
        },
        {
          upsert: true,
        }
      );
    });
  } catch (error) {
    const err = error as Error;
    console.error(err.message);
  }
};

export default fetchAndSaveLatestCurrencyRates;
