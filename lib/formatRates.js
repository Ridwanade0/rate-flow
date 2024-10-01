//formatedRates.js
const formatRates = async (rates) => {
    try {
        return {
            date: rates.date,
            base: rates.base,
            rates: rates.rates,
        }
    } catch (error) {
        throw new Error(error.message)
    }
}

export default formatRates;