import express from "express";
import "dotenv/config";
import currencyRouterV1 from "./routers/currencyRouterV1.js";
import connectDB from "./lib/connectDB.js";
import rateLimit from "express-rate-limit";
import path from "path";
import { fileURLToPath } from 'url';
// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // added a 15 minutes window
    max: 80, //50 request per window for each IP adress
    message: {
        status: 429,
        sucess: false,
        message: "To many requests, please try again later."
    }
});

//Self executing function to execute start the application.
(async function () {
    await connectDB(); // function to cnnet to the database
    app.set("json spaces", 2); // add spacing to all json response (prrety-print)

    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "public", "index.html"));
    });
    app.get("/documentation", (req, res) => {
        res.sendFile(path.join(__dirname, "public", "documentation.html"));
    });

    // Routes for currency API, versioned (v1)
    app.use("/api/v1", limiter, currencyRouterV1);

    app.listen(PORT, () => {
        console.log(`Server is listening at http://localhost:${PORT}`);
    });
})();