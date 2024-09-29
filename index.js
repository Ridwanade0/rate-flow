import express from "express";
import "dotenv/config";
import currencyRouterV1 from "./routers/currencyRouterV1.js";
import connectDB from "./lib/connectDB.js";

const app = express();
const PORT = process.env.PORT || 3000;

//Self executing function to execute start the application.
(async function () {
    await connectDB(); // function to cnnet to the database
    app.set("json spaces", 2); // add spacing to all json response (preety-print)

    app.get("/", (req, res) => {
        res.status(200).send("Rate-Flow server now available");
    });

    // Routes for currency API, versioned (v1)
    app.use("/api/v1", currencyRouterV1);

    app.listen(PORT, () => {
        console.log(`Server is listening at http://localhost:${PORT}`);
    });
})();