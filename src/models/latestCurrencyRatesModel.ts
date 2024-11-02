import { Document, model, Schema } from "mongoose";
import { CurrencyRates } from "../lib/type";

interface ILatestCurrencyRates extends Document {
  date: string;
  base: string;
  rates: CurrencyRates;
}

const latestCurrencyRatesModelSchema = new Schema<ILatestCurrencyRates>({
  date: { type: String, required: true },
  base: { type: String, required: true },
  rates: { type: Object, required: true },
});

const latestCurrencyRateModel = model(
  "latestCurrencyRates",
  latestCurrencyRatesModelSchema
);

export default latestCurrencyRateModel;
