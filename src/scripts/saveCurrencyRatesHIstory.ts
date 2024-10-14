import CurrencyRates from "../models/CurencyRatesModel";
import CurrencyRatesHistory from "../models/CurrencyHIstory";

const saveCurrencyRatesHistory = async () => {
  try {
    const rates = await CurrencyRates.find();
    for (const rate of rates) {
      await CurrencyRatesHistory.findOneAndUpdate(
        {
          date: rate.date,
          base: rate.base,
        },
        {
          $set: {
            date: rate.date,
            base: rate.base,
            rates: rate.rates,
          },
        },
        {
          upsert: true,
        }
      );
      console.log("-");
    }
  } catch (error) {
    const err = error as Error;
    console.error(err.message);
  }
};

export default saveCurrencyRatesHistory;
