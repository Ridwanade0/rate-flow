import connectDB from "../lib/connectDB.js";
import latestRatesModel from "../models/latestRatesModel.js";
import HistoryRates from "../models/historyRatesModel.js";

const saveHistory = async () => {
    try {
        await connectDB();
        const latestRates = await latestRatesModel.find();
        for (const rate of latestRates) {
            // Update or create a record in the historyRates collection
            await HistoryRates.findByIdAndUpdate(
                rate._id,
                {$set: rate},
                {upsert: true}
            )}
    } catch (error) {
        throw new Error(error.message)
    } finally {
        console.log("Operation succesfull")
        process.exit(0);
    }
}
await saveHistory();