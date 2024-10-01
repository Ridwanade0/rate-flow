import getLatestRates from "../services/getLatestRatesV1.js";

const latestCurrenciesRate = async (req, res) => {
    try {
        const {base} = req.query;
        if (!base || base.toUpperCase() === "USD") {
            const latestRates = await getLatestRates("USD")
            return res.status(200).json({
                code: 200,
                success: true,
                date: latestRates.date,
                base: latestRates.base,
                rates: latestRates.rates,
            })
        }

        const specificBaseRates = await getLatestRates(base);
        res.status(200).json({
            code: 200,
            success: true,
            date: specificBaseRates.date,
            base: specificBaseRates.base,
            rates: specificBaseRates.rates,
        })

    } catch (error) {
        res.status(500).json({
            code: 500,
            success: false,
            message: error.message
        });
    }
};

export default latestCurrenciesRate;