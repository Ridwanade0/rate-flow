import axios from "axios";
import "dotenv/config";
import path from "path";
import fs from "fs";

const saveCurrencyCodes = async () => {
  try {
    const response = await axios.get(
      `${process.env.OER_BASE_URL}/currencies.json`
    );
    const data: object = response.data;
    // Create a file path
    const filePath = path.join(
      __dirname,
      "..",
      "..",
      "public",
      "api",
      "currencies.json"
    );

    // Write the response data to the file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    const err = error as Error;
    console.error(`Error saving currency codes: ${err.message}`);
  }
};

export default saveCurrencyCodes;
