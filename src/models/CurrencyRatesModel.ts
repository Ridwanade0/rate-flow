import { Document, model, Schema } from "mongoose";
import { CurrencyRates } from "../lib/type";

interface ICurrencyRates extends Document {
  date: string;
  base: string;
  rates: CurrencyRates;
}

const currencyRatesModelSchema = new Schema<ICurrencyRates>({
  date: { type: String, required: true },
  base: { type: String, required: true },
  rates: { type: Object, required: true },
});

const currencyRateModel = model(
  "latestCurrencyRates",
  currencyRatesModelSchema
);

export default currencyRateModel;
