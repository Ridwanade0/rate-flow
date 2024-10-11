import { Schema, Document, model } from "mongoose";

interface CurrencyRateDocument extends Document {
  base: string;
  date: Date;
  rates: Record<string, number>;
}

const CurrencyRateSchema: Schema<CurrencyRateDocument> = new Schema({
  base: { type: String, required: true },
  date: { type: Date, required: true, index: true },
  rates: { type: Map, of: Number, required: true },
});

const CurrencyRates = model<CurrencyRateDocument>(
  "CurrencyRate",
  CurrencyRateSchema
);
export default CurrencyRates
