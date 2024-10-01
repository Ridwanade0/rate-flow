import latestRatesModel from "../models/latestRatesModel.js";
import getLatestRates from "../lib/getLatestRatesV1.js";

const convertV1 = async (base, target, amount) => {
    try {
        const baseRates = await getLatestRates(base);
        const conversionRate = baseRates.rates[target]
        if (amount === 1) {
            return {
                baseCurrency: base,
                targetCurrency: target,
                conversionRates: conversionRate
            }
        }

        return {
            baseCurrency: base,
            targetCurrency: target,
            conversionRates: conversionRate,
            conversionResult: conversionRate * amount
        }

    } catch (error) {
        throw new Error(error.message)
    }
}

export default convertV1;