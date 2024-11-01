import "dotenv/config";
import express from "express";
import authRoutes from "./routes/authRoutes";
import connectMongoDB from "./lib/connectMongoDB";
import path from "path";
import saveCurrencyCodes from "./scripts/saveCurrencyCodes";
import cron from "node-cron";
import saveLatestCurrencyRates from "./scripts/saveLatestCurrencyRates";

(async () => {
  const app = express();
  const PORT = process.env.PORT || 3000;
  app.use(express.json());
  app.use(express.static(path.join(__dirname, "..", "public")));
  await connectMongoDB();
  await saveCurrencyCodes();
  await saveLatestCurrencyRates();
  cron.schedule("0 */4 * * *", async () => {
    await saveLatestCurrencyRates();
  });
  app.use("/auth", authRoutes);
  app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}`);
  });
})();
