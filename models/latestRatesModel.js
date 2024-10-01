import {model, Schema} from "mongoose";

const latestRatesModelSchema = new Schema({
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

const LatestRates = model("latestRates", latestRatesModelSchema);
export default LatestRates;