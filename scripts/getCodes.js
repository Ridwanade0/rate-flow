import "dotenv/config";
import axios from 'axios';
import connectDB from "../lib/connectDB.js";
import CurrenciesCodesModel from "../models/currenciesCodesModel.js";

async function fetchCodes() {
    try {
        await connectDB();
        const response = await axios.get(`${process.env.OER_BASE_URL}/currencies.json`);
        const currencyCode = new CurrenciesCodesModel({
            currencies: response.data,
        })
        await currencyCode.save();
        console.log("Currency code saved!!!")
    } catch (error) {
        throw new Error(error.message);
    } finally {
        console.log("Process exited.")
        process.exit(0)
    }
}

await fetchCodes();