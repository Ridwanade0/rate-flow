import formatRates from "../lib/formatRates";
import CurrencyRates, { CurrencyRateDocument } from "../models/ratesModel";

interface ValidatedRates {
  date: string;
  base: string;
  rates?: Record<string, number>; // Add rates from formated rates
}

const latestRatesService = async (base: string, symbols: string) => {
  try {
    const formatedBaseLists = base.split(",");
    let requestedSymbols;

    if (symbols) {
      try {
        requestedSymbols = JSON.parse(symbols);
      } catch {
        requestedSymbols = symbols
          .split(",")
          .map((sym) => sym.trim().toUpperCase());
      }
    }
    let result: object[] = [];

    for (const base of formatedBaseLists) {
      const rates = await CurrencyRates.findOne({ base: base });
      if (!rates) {
        continue;
      }
      const formatedRates = await formatRates(rates);
      let validatedRates: ValidatedRates = {
        date: formatedRates.date,
        base: formatedRates.base,
      };
      validatedRates.rates = {};
      if (typeof requestedSymbols === "object" && requestedSymbols[base]) {
        if (
          Array.isArray(requestedSymbols[base]) &&
          requestedSymbols[base].length > 0
        ) {
          // Loop through each symbol and populate validatedRates.rates
          for (const symbol of requestedSymbols[base]) {
            validatedRates.rates[symbol] = formatedRates.rates[symbol];
          }
        }
      } else if (
        Array.isArray(requestedSymbols) &&
        requestedSymbols.length > 0
      ) {
        for (const symbol of requestedSymbols) {
          validatedRates.rates[symbol] = formatedRates.rates[symbol]; // Populate rates for each symbol
        }
      } else {
        validatedRates.rates = formatedRates.rates;
      }

      result.push(validatedRates);
    }

    return result;
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message);
  }
};

export default latestRatesService;
