import formatRates from "../lib/formatRates";
import CurrencyRates, { CurrencyRateDocument } from "../models/ratesModel";

const latestRatesService = async (base: string) => {
 try {
  const result  = await CurrencyRates.findOne({base: base}) as CurrencyRateDocument;
  const rate =  await formatRates(result);
  return rate;
 } catch (error) {
  const err = error as Error;
  throw new Error(err.message)
 }

}

export default latestRatesService;