import LatestRatesModel from "../models/latestRatesModel.js";

const getLatestRates = async (base) => {
    try {
        return await LatestRatesModel.findOne({base: base})
    } catch (error) {
        throw new Error(error.message)
    }
}

export default getLatestRates;