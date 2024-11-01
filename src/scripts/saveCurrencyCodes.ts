import axios from "axios";
import fsPromise from "fs/promises";
import path from "path";

const saveCurrencyCodes = async () => {
  try {
    const response = await axios.get(
      `${process.env.OER_BASE_URL}/currencies.json`
    );
    const currencyCodes = JSON.stringify(response.data, null, 3);
    const currencyCodesPath = path.join(
      __dirname,
      "..",
      "..",
      "public",
      "api",
      "currencies.json"
    );
    await fsPromise.writeFile(currencyCodesPath, currencyCodes);
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message);
  }
};

export default saveCurrencyCodes;
