// Imports necessary modules
import express, { Request, Response } from "express"; // import express module
import "dotenv/config"; // import dtenv config to load env varibles to session
import path from "path";
import cron from "node-cron"; // imported node-cron for use to create cron jobs
import fetchAndSaveCurrencyCodes from "./scripts/fetchCurrencyCodes"; // import fetchAndSaveCurrencyCodes
import endpoints from "./routes/endpoints"; // imported endpoints routes to use with the express route handler

const app = express(); // initialize express instance

(async () => {
  app.use(express.json()); // set app(express instance)to use express json for passing json data and object
  app.set("json spaces", 2); // set app(express instance) to format and prettify json data and object
  app.use(express.static(path.join(__dirname, "..", "public"))); // set express instance to use the public folder content for serving static files
  app.set("view engine", "ejs"); // sets ejs as the view engine for this application.
  app.set("views", path.join(__dirname, "..", "views")); // set up the path to the views folder conatianing the ejs files for teh views, fromtend and ui.

  const PORT = process.env.PORT || "3000"; // loaded the port number from the environment variable but default to 3000 if port number is not loaded or nt available.

  // imported fetchAndSaveCurrencyCodes function,
  await fetchAndSaveCurrencyCodes(); // Invoke the function imediatly the app starts
  cron.schedule("0 0 1 1 *", async () => {
    await fetchAndSaveCurrencyCodes();
  }); // Invoke the function every year using the node cron scheduler

  app.get("/", (req: Request, res: Response) => {
    res.render("index");
  });

  app.use("/docs/end-points", endpoints); // defining routes pages that will render documentation for the api endpoints
  app.listen(PORT, () => {
    console.log(`Server listening on port: http://localhost:${PORT}`);
  });
})();
