import currencyRateModel from "../../models/CurrencyRatesModel";

const convertRatesService = async (
  from: string,
  to: string,
  amount: number
) => {
  try {
    const latestRates = await currencyRateModel.findOne({ base: from });
    const convertedRates = latestRates!.rates[to] * amount;
    const conversionRates = latestRates!.rates[to];

    return {
      date: latestRates!.date,
      from,
      to,
      amount,
      conversionRates,
      convertedRates,
    };
  } catch (error) {
    throw error;
  }
};

export default convertRatesService;
