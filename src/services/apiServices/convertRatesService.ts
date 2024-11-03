import LatestCurrencyRateModel from "../../models/LatestCurrencyRatesModel";

const convertRatesService = async (
  from: string,
  to: string,
  amount: number
) => {
  try {
    const latestRates = await LatestCurrencyRateModel.findOne({ base: from });
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
