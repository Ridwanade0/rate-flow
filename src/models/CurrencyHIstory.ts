import { Schema, Document, model } from "mongoose";

export interface CurrencyRateHistoryDocument extends Document {
  base: string;
  date: string;
  rates: Record<string, number>;
}

const CurrencyRateHistorySchema: Schema<CurrencyRateHistoryDocument> = new Schema({
  base: { type: String, required: true },
  date: { type: String, required: true, index: true },
  rates: { type: Object, required: true },
});

const CurrencyRatesHistory = model<CurrencyRateHistoryDocument>(
  "CurrencyRateHistory",
  CurrencyRateHistorySchema
);
export default CurrencyRatesHistory;
