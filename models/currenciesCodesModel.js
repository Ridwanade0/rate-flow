import {model, Schema} from "mongoose";

const currenciesCodesModelSchema = new Schema({
    _id: {
        type: String,
        default: "CurrenciesCode"
    },
    currencies: {
        type: Object,
        required: true,
        createdAt: {
            type: Date,
            default: Date.now
        },
    }
});

const CurrenciesCodesModel = model("currencies-codes", currenciesCodesModelSchema);

export default CurrenciesCodesModel;
