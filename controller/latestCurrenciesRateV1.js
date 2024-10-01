import getLatestRates from "../services/getLatestRatesV1.js";
import formatRates from "../lib/formatRates.js";

const latestCurrenciesRate = async (req, res) => {
    try {
        // Extract base and symbols from the query parameters
        const { base = "USD", symbols } = req.query; // Default base is "USD" if not provided

        // Ensure only a single base is supported (trim and convert to uppercase)
        const formattedBase = base.trim().toUpperCase();

        // Fetch the latest rates for the specified base
        const ratesData = await getLatestRates(formattedBase);
        if (!ratesData) {
            return res.status(404).json({
                code: 404,
                success: false,
                message: `Rates not found for base currency: ${formattedBase}`,
            });
        }

        // Format the rates data
        let formattedRates = await formatRates(ratesData);

        // Filter rates based on specified symbols if provided
        if (symbols) {
            const requestedSymbols = symbols.split(",").map(s => s.trim().toUpperCase());
            // Filter the rates to include only the requested symbols
            formattedRates.rates = Object.fromEntries(
                Object.entries(formattedRates.rates).filter(([symbol]) =>
                    requestedSymbols.includes(symbol)
                )
            );
        }

        // Send the formatted rates for the single base
        return res.status(200).json(formattedRates);
    } catch (error) {
        // Error handling in case something goes wrong
        res.status(500).json({
            code: 500,
            success: false,
            message: error.message,
        });
    }
};

export default latestCurrenciesRate;
