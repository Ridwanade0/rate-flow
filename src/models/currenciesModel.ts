import { model, Schema } from "mongoose";

const CurrencySchema = new Schema({
  _id: {
    type: String,
    default: "CurrenciesCode",
  },
  code: {
    type: Object,
    required: true,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
});

const Currency = model("Currency", CurrencySchema);

export default Currency;
