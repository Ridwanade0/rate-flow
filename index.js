import express from "express";
import "dotenv/config"; // Load environment variables from .env file
import currencyRouterV1 from "./routers/currencyRouterV1.js"; // Import your currency router
import connectDB from "./lib/connectDB.js"; // Database connection function
import rateLimit from "express-rate-limit"; // Rate limiting middleware
import path from "path"; // Path utilities
import cron from "node-cron"; // Cron job scheduler
import { fileURLToPath } from 'url'; // URL utilities
import saveHistory from "./scripts/saveHistory.js"; // Function to save historical data
import fetchCodes from "./scripts/getCodes.js"; // Function to fetch currency codes
import fetchLatestRates from "./scripts/getLatestCurrenciesRate.js"; // Function to fetch latest rates

// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Rate limiter setup
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 80, // Limit each IP to 80 requests per window
    message: {
        status: 429,
        success: false,
        message: "Too many requests, please try again later."
    }
});

// Function to run immediately for fetchLatestRates
const runFetchLatestRates = async () => {
    console.log('Running fetchLatestRates function immediately');
    await fetchLatestRates();
};

// Cron job to fetch latest rates every 6 hours
cron.schedule("0 */6 * * *", async () => {
    console.log('Running fetchLatestRates function every 6 hours');
    await fetchLatestRates();
});

// Execute fetchCodes immediately
const runFetchCodes = async () => {
    console.log('Running fetchCodes function immediately');
    await fetchCodes();
};

// Cron job to fetch currency codes every year on January 1st
cron.schedule("0 0 1 1 *", async () => {
    console.log('Running fetchCodes function every year');
    await fetchCodes();
});

// Function to save history immediately
const runSaveHistory = async () => {
    console.log('Running saveHistory function immediately');
    await saveHistory();
};

// Cron job to save history every 24 hours
cron.schedule("0 0 * * *", async () => {
    console.log('Running saveHistory function every 24 hours');
    await saveHistory();
});

// Self-executing function to start the application
(async function () {
    await connectDB(); // Connect to the database
    app.set("json spaces", 2); // Add spacing to JSON responses for pretty-printing

    // Run the jobs immediately on startup
    await runFetchLatestRates();
    await runFetchCodes();
    await runSaveHistory();

    // Serve static HTML files
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "public", "index.html"));
    });

    app.get("/documentation", (req, res) => {
        res.sendFile(path.join(__dirname, "public", "documentation.html"));
    });

    // Routes for currency API, versioned (v1)
    app.use("/api/v1", limiter, currencyRouterV1);

    // Start the server
    app.listen(PORT, () => {
        console.log(`Server is listening at http://localhost:${PORT}`);
    });
})();
