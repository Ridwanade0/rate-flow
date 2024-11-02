import "dotenv/config";
import express from "express";
import cron from "node-cron";
import path from "path";
import connectMongoDB from "./lib/connectMongoDB";
import apiRoutes from "./routes/apiRoutes";
import authRoutes from "./routes/authRoutes";
import saveCurrencyCodes from "./scripts/saveCurrencyCodes";
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
  app.use("/api", apiRoutes);
  app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}`);
  });
})();
