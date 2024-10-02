import HistoryRates from "../models/historyRatesModel.js";
import formatRates from "../lib/formatRates.js";

const historyRates = async (req, res) => {
    try {
        const { date } = req.params; // Extracting the date from the request parameters
        const { base = "USD", symbols } = req.query; // Extracting base and symbols from the query
        const formattedBaseLists = base.split(","); // Splitting base currencies into an array
        let requestedSymbols;

        // Checking if 'symbols' query parameter is provided
        if (symbols) {
            try {
                // Attempting to parse symbols as JSON
                requestedSymbols = JSON.parse(symbols);
            } catch (e) {
                // If JSON parsing fails, split the string and normalize symbol case
                requestedSymbols = symbols.split(",").map(sym => sym.trim().toUpperCase());
            }
        }

        let result = []; // Initialize an array to store results

        // Loop through each base currency code
        for (let code of formattedBaseLists) {
            const rate = await HistoryRates.findOne({
                base: code,
                date: date,
            });

            if (!rate) {
                // If no rate is found for the current base and date, skip to the next iteration
                continue;
            }

            // Format the retrieved rate data
            const formattedRates = await formatRates(rate);
            let validatedHistoryRates = {
                date: formattedRates.date,
                base: formattedRates.base,
                rates: {}, // Initialize rates property
            };

            // Check if requestedSymbols is an object and contains the current code
            if (typeof requestedSymbols === "object" && requestedSymbols[code]) {
                // If requestedSymbols[code] is an array and has elements
                if (Array.isArray(requestedSymbols[code]) && requestedSymbols[code].length > 0) {
                    // Loop through each symbol and populate validatedHistoryRates.rates
                    for (const symbol of requestedSymbols[code]) {
                        if (formattedRates.rates[symbol]) {
                            validatedHistoryRates.rates[symbol] = formattedRates.rates[symbol];
                        }
                    }
                }
            }
            // Check if requestedSymbols is an array with elements
            else if (Array.isArray(requestedSymbols) && requestedSymbols.length > 0) {
                for (const symbol of requestedSymbols) {
                    if (formattedRates.rates[symbol]) {
                        validatedHistoryRates.rates[symbol] = formattedRates.rates[symbol];
                    }
                }
            }
            // If no specific symbols are requested, assign all rates for the base
            else {
                validatedHistoryRates.rates = formattedRates.rates;
            }

            // Add the validated history rates object to the result
            result.push(validatedHistoryRates) //= validatedHistoryRates; // Store result per base currency
        }

        // Send back the response with a 200 status and the result object in JSON format
        res.status(200).json(result);
    } catch (error) {
        // Error handling: send back a 500 status with error details
        res.status(500).json({
            code: 500,
            success: false,
            message: error.message,
        });
    }
};

export default historyRates; // Export the function for use in other modules
