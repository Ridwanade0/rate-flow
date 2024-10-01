import getLatestRates from "../services/getLatestRatesV1.js";
import formatRates from "../lib/formatRates.js";

const multipleCurrenciesRate = async (req, res) => {
    try {
        const {base, symbols} = req.query;

        if (!base) {
            return res.status(400).json({
                code: 400,
                success: false,
                message: "Base currency is required.",
            });
        }

        const formattedBases = base.split(",").map(b => b.trim().toUpperCase());
        const ratesResponses = await Promise.all(formattedBases.map(async (b) => {
            const ratesData = await getLatestRates(b);
            return ratesData ? formatRates(ratesData) : null;
        }));


        const validRatesResponses = ratesResponses.filter(r => r);


        let requestedSymbols = {};
        if (symbols) {
            try {
                requestedSymbols = JSON.parse(symbols);
            } catch (error) {
                requestedSymbols = symbols.split(",").map(sym => sym.trim().toUpperCase());
            }
        }

        validRatesResponses.forEach((response) => {
            const baseCurrency = response.base;
            if (typeof requestedSymbols === 'object' && requestedSymbols[baseCurrency]) {
                const specificSymbols = requestedSymbols[baseCurrency].map(sym => sym.trim().toUpperCase());
                response.rates = Object.fromEntries(
                    Object.entries(response.rates).filter(([symbol]) =>
                        specificSymbols.includes(symbol)
                    )
                );
            } else if (Array.isArray(requestedSymbols) && requestedSymbols.length > 0) {
                response.rates = Object.fromEntries(
                    Object.entries(response.rates).filter(([symbol]) =>
                        requestedSymbols.includes(symbol)
                    )
                );
            }
        });

        return res.status(200).json(validRatesResponses);
    } catch (error) {
        res.status(500).json({
            code: 500,
            success: false,
            message: error.message,
        });
    }
};

export default multipleCurrenciesRate;
