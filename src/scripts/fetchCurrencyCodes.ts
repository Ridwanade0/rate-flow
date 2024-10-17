// Importing the nessesary modules
import axios from "axios"; // impoted axios module for making http request
import "dotenv/config"; // to load env 
import fs from "fs/promises"; // fs promise to asynchronously manipulate file system
import path from "path"; // imported path modules for path system
const fetchAndSaveCurrencyCodes = async () => {
 try {
  const response = await axios.get(`${process.env.OER_BASE_URL}/currencies.json`); // making get requesst to the api currencies.json endpoint to fetch the currency codes with axios
  const data: object = response.data; // selected the data key from the response object, the data contains the actuall json object been returned from the api.
  const currenciesCodeFilePath = path.join(__dirname, "..", "..", "public", "api", "currencies.json");
  await fs.writeFile(currenciesCodeFilePath, JSON.stringify(data, null, 2));
 } catch (error) {
  const err = error as Error;
  console.error(err.message);
 }
};

export default fetchAndSaveCurrencyCodes;
