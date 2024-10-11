import { Schema, Document, model } from "mongoose";

interface CurrencyRateDocument extends Document {
  base: string;
  date: string;
  rates: Record<string, number>;
}

const CurrencyRateSchema: Schema<CurrencyRateDocument> = new Schema({
  base: { type: String, required: true },
  date: { type: String, required: true, index: true },
  rates: { type: Object, required: true },
});

const CurrencyRates = model<CurrencyRateDocument>(
  "CurrencyRate",
  CurrencyRateSchema
);
export default CurrencyRates;
