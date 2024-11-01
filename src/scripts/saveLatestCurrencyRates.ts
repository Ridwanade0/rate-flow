import axios from "axios";
import getCurrencyCodes from "../lib/getCurrencyCodes";

const saveLatestCurrencyRates = async () => {
  try {
    const response = await axios.get(
      `${process.env.OER_BASE_URL}/latest.json?app_id=${process.env.OER_APP_ID}`
    );
    const latestRates = response.data;
    const currencyCodes: Record<string, any> = JSON.parse(
      await getCurrencyCodes()
    );

    for (const codes in currencyCodes) {
      console.log(codes);
    }
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message);
  }
};

export default saveLatestCurrencyRates;
