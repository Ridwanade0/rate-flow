import path from "path";
import fsPromise from "fs/promises";
const getCurrencyCodes = async () => {
  try {
    const currencyCodesPath = path.join(
      __dirname,
      "..",
      "..",
      "public",
      "api",
      "currencies.json"
    );
    const currencyCodes = await fsPromise.readFile(currencyCodesPath, "utf-8");
    return currencyCodes;
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message);
  }
};

export default getCurrencyCodes;
