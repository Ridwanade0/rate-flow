import CurrenciesCodesModel from "../models/currenciesCodesModel.js";

const getCurrenciesCodesV1 = async () => {
    try {
        return await CurrenciesCodesModel.findById("CurrenciesCode")
    } catch (error) {
        throw new Error(error.message)
    }
};

export default getCurrenciesCodesV1;
