import LatestCurrencyRateModel from "../../models/LatestCurrencyRatesModel";

const latestCurrencyRatesService = async (base: string, symbols: string) => {
  try {
    const requestedBase = base.toUpperCase().split(",");
    let requestedSymbols: any;
    if (symbols) {
      try {
        requestedSymbols = JSON.parse(symbols);
      } catch (error) {
        requestedSymbols = symbols
          .split(",")
          .map((sym) => sym.trim().toUpperCase());
      }
    }
    let result: any[] = [];
    for (const baseCurrencyCode of requestedBase) {
      const latestRates = await LatestCurrencyRateModel.findOne({
        base: baseCurrencyCode,
      });
      if (!latestRates) {
        continue;
      }
      let validatedRates: any = {
        date: latestRates.date,
        base: latestRates.base,
        rates: {},
      };
      if (
        typeof requestedSymbols === "object" &&
        requestedSymbols[baseCurrencyCode]
      ) {
        if (
          Array.isArray(requestedSymbols[baseCurrencyCode]) &&
          requestedSymbols[baseCurrencyCode].length > 0
        ) {
          // Loop through each symbol and populate validatedRates.rates
          for (const symbol of requestedSymbols[baseCurrencyCode]) {
            validatedRates.rates[symbol] = latestRates.rates[symbol];
          }
        }
      } else if (
        Array.isArray(requestedSymbols) &&
        requestedSymbols.length > 0
      ) {
        for (const symbol of requestedSymbols) {
          validatedRates.rates[symbol] = latestRates.rates[symbol]; // Populate rates for each symbol
        }
      } else {
        validatedRates.rates = latestRates.rates;
      }
      result.push(validatedRates);
    }
    return result;
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message); // Rethrow the error
  }
};

export default latestCurrencyRatesService;
