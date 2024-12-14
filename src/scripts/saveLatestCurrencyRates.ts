import axios from "axios";
import path from "path";
import fs from "fs/promises";
import { CurrencyRates } from "../lib/type";
import currencyRateModel from "../models/CurrencyRatesModel";

// Utility: Write logs to a file
const logToFile = async (message: string) => {
  const logFilePath = path.join(__dirname, "..", "..", "logs", "currency_rates.log");
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;

  try {
    await fs.appendFile(logFilePath, logMessage, { encoding: "utf8" });
  } catch (error) {
    const err = error as Error;
    console.error(`Error writing to log file: ${err.message}`);
  }
};

// Utility: Delay function
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const calculateBaseRates = async (rates: CurrencyRates, baseCurrency: string) => {
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

const fetchCurrencyRatesForDate = async (date: string) => {
  try {
    const currenciesCodesPath = path.join(
        __dirname,
        "..",
        "..",
        "public",
        "api",
        "currencies.json"
    );
    const response = await axios.get(
        `${process.env.OER_BASE_URL}/historical/${date}.json?app_id=${process.env.OER_APP_ID}`
    );
    const rates: CurrencyRates = response.data.rates;
    const currenciesCodes = JSON.parse(
        await fs.readFile(currenciesCodesPath, {
          encoding: "utf8",
        })
    );

    let currencyRatesForDate = [];
    for (const base in currenciesCodes) {
      const baseRates = await calculateBaseRates(rates, base);
      currencyRatesForDate.push({
        base,
        rates: baseRates,
      });
    }
    for (const currencyRate of currencyRatesForDate) {
      await currencyRateModel.findOneAndUpdate(
          {
            date: date,
            base: currencyRate.base,
          },
          {
            $set: {
              date: date,
              base: currencyRate.base,
              rates: currencyRate.rates,
            },
          },
          {
            upsert: true,
          }
      );
    }
    await logToFile(`Currency rates for ${date} saved successfully.`);
  } catch (error) {
    const err = error as Error;
    await logToFile(`Error fetching rates for ${date}: ${err.message}`);
  }
};

const inspectAndRecoverRates = async (date: string) => {
  const isDateAvailable = await currencyRateModel.findOne({ date });
  if (!isDateAvailable) {
    await logToFile(`Data for ${date} is missing. Fetching now...`);
    await fetchCurrencyRatesForDate(date);

    // Delay to avoid exceeding 100 requests per minute
    await delay(600); // 600ms delay ensures ~100 requests/minute

    // Calculate the previous date
    const previousDate = new Date(date);
    previousDate.setDate(previousDate.getDate() - 1);
    const previousDateString = previousDate.toISOString().split("T")[0];

    // Recursively inspect and recover for the previous date
    await inspectAndRecoverRates(previousDateString);
  } else {
    await logToFile(`Data for ${date} already exists.`);
  }
};

const fetchAndSaveLatestCurrencyRates = async () => {
  try {
    const today = new Date().toISOString().split("T")[0];
    await fetchCurrencyRatesForDate(today);

    // Start recovery for previous dates
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toISOString().split("T")[0];
    await inspectAndRecoverRates(yesterdayString);
  } catch (error) {
    const err = error as Error;
    await logToFile(`Error fetching and saving latest currency rates: ${err.message}`);
  }
};

export default fetchAndSaveLatestCurrencyRates;
