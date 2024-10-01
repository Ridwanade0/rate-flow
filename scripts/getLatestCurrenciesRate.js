import connectDB from "../lib/connectDB.js";
import axios from "axios";
import "dotenv/config"
import currenciesCodesModel from "../models/currenciesCodesModel.js";
import LatestRates from "../models/latestRatesModel.js";

const calculateBaseRates = async (rates, targetBase) => {
    const targetBaseRates = rates[targetBase];
//    console.log(targetBase)
    const convertedBaseRates = {}
    for (const code in rates) {
        convertedBaseRates[code] = (1 / targetBaseRates) * rates[code]
    }
    return convertedBaseRates
};

const fetchLatestRates = async () => {
    try {
        await connectDB();
        const response = await axios.get(`${process.env.OER_BASE_URL}/latest.json?app_id=${process.env.OER_API_KEY}`);
//        console.log(response)
        const currenciesCode = await currenciesCodesModel.findById("CurrenciesCode");
//        console.log(currenciesCode)
        for (const base in currenciesCode.currencies) {
            console.log(base)
            const latestRates = await calculateBaseRates(response.data.rates, base);
//            console.log(latestRates)
            await LatestRates.findOneAndUpdate({base}, {
                    $set: {
                        date: new Date().toISOString().split('T')[0],
                        base: base,
                        rates: latestRates
                    }
                },
                {
                    upsert: true,
                }
            )
        }
        console.log("Rates saved succesfully!")
    } catch (error) {
        throw new Error(error.message)
    } finally {
        console.log("Operation succesfull")
        process.exit(0);
    }
}

fetchLatestRates()