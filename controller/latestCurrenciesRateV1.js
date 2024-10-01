import getLatestRates from "../services/getLatestRatesV1.js";
import formatRates from "../lib/formatRates.js";

const latestCurrenciesRate = async (req, res) => {
    try {
        const {base = "USD", symbols} = req.query;
        const formattedBase = base.trim().toUpperCase();
        const ratesData = await getLatestRates(formattedBase);
        if (!ratesData) {
            return res.status(404).json({
                code: 404,
                success: false,
                message: `If you intend to get multiple base please use /multiple-base.json endpoint`,
            });
        }

        let formattedRates = await formatRates(ratesData);

        if (symbols) {
            const requestedSymbols = symbols.split(",").map(s => s.trim().toUpperCase());
            formattedRates.rates = Object.fromEntries(
                Object.entries(formattedRates.rates).filter(([symbol]) =>
                    requestedSymbols.includes(symbol)
                )
            );
        }

        return res.status(200).json(formattedRates);
    } catch (error) {
        res.status(500).json({
            code: 500,
            success: false,
            message: error.message,
        });
    }
};

export default latestCurrenciesRate;
