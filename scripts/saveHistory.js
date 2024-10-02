import connectDB from "../lib/connectDB.js";
import LatestRates from "../models/latestRatesModel.js";
import HistoryRates from "../models/historyRatesModel.js";

const saveHistory = async () => {
    try {
        await connectDB();
        const todaysLatestRates = await LatestRates.find()
        for (const latestRate of todaysLatestRates) {
            await HistoryRates.findOneAndUpdate(
                {
                    base: latestRate.base,
                    date: latestRate.date
                },
                {

                    $set: {
                        date: latestRate.date,
                        base: latestRate.base,
                        rates: latestRate.rates,
                    }
                },
                {
                    upsert: true,
                }
            )
        }
        console.log("Operation executed succesfully");
    } catch (error) {
        throw new Error(error.message)
    }
//    finally {
//        console.log("Process exited finally!")
//        process.exit(0)
//    }
}
export default saveHistory;