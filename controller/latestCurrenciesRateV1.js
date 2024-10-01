import getLatestRates from "../services/getLatestRatesV1.js"; // Importing the function to fetch the latest currency rates
import formatRates from "../lib/formatRates.js"; // Importing the function to format the fetched rates

const latestCurrenciesRate = async (req, res) => {
    try {
        // Destructuring query parameters: 'base' defaults to 'USD' if not provided
        const { base = "USD", symbols } = req.query;
        // Splitting the base currencies into an array
        const formatedBaseLists = base.split(",");
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

        let result = []; // Initialize an empty array to store results

        // Looping through each base currency code
        for (const code of formatedBaseLists) {
            // Fetching the latest rates for the current base currency
            const rates = await getLatestRates(code.toUpperCase());
            if (!rates) {
                continue; // If no rates are returned, skip to the next iteration
            }

            // Formatting the fetched rates for consistency
            let formatedRates = await formatRates(rates);
            // Creating an object to store validated rates
            let validatedRates = {
                date: formatedRates.date, // Add date from formatted rates
                base: formatedRates.base, // Add base currency
            };
            validatedRates.rates = {}; // Initialize the rates property

            // Check if requestedSymbols is an object and contains the current code
            if (typeof requestedSymbols === "object" && requestedSymbols[code]) {
                // If requestedSymbols[code] is an array and has elements
                if (Array.isArray(requestedSymbols[code]) && requestedSymbols[code].length > 0) {
                    // Loop through each symbol and populate validatedRates.rates
                    for (const symbol of requestedSymbols[code]) {
                        validatedRates.rates[symbol] = formatedRates.rates[symbol];
                    }
                }
            }
            // Check if requestedSymbols is an array with elements
            else if (Array.isArray(requestedSymbols) && requestedSymbols.length > 0) {
                for (const symbol of requestedSymbols) {
                    validatedRates.rates[symbol] = formatedRates.rates[symbol]; // Populate rates for each symbol
                }
            }
            // If no specific symbols are requested, assign all rates for the base
            else {
                validatedRates.rates = formatedRates.rates;
            }

            // Add the validated rates object to the result array
            result.push(validatedRates);
        }

        // Send back the response with a 200 status and the result array in JSON format
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

export default latestCurrenciesRate; // Export the function for use in other modules
