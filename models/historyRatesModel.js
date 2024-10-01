import {model, Schema} from "mongoose";

const historyModelSchema = new Schema({
    date: {
        type: String,
        required: true
    },
    base: {
        type: String,
        requried: true
    },
    rates: {
        type: Object,
        required: true,
    }
})

const HistoryRates = model("historyRates", historyModelSchema);
export default HistoryRates;

