import "dotenv/config";
import axios from 'axios';
import connectDB from "../lib/connectDB.js";
import CurrenciesCodesModel from "../models/currenciesCodesModel.js";

async function fetchCodes() {
    try {
        await connectDB(); // Connect to the database

        // Fetch currency codes from the API
        const response = await axios.get(`${process.env.OER_BASE_URL}/currencies.json`);

        // Use findOneAndUpdate to update the existing document
        await CurrenciesCodesModel.findOneAndUpdate(
            {}, // Find the existing document (you can use a filter if needed, here it's updating the only document)
            { currencies: response.data }, // Update with new currency data
            { upsert: false } // Do not insert a new document if no match is found
        );

        console.log("Currency code updated!!!");
    } catch (error) {
        throw new Error(error.message);
    }
}

export default fetchCodes;
