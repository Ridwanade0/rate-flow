import getCurrenciesCodesV1 from "../services/getCurrenciesCodesV1.js";

export const currenciesCodes = async (req, res) => {
    try {
        const rawCurrency = await getCurrenciesCodesV1();
        res.status(200).json({
            code: 200,
            success:true,
            currencies: rawCurrency.currencies,
        })

    } catch (error) {
        res.status(500).json({
            code: 500,
            success: false,
            message: error.message
        });
    }

};