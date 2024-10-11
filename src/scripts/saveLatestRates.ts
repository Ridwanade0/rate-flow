import "dotenv/config";
import axios from "axios";

const saveLatestRates = async () => {
  try {
    const response = await axios.get(
      `${process.env.OER_BASE_URL}/latest.json`,
      {
        params: {
          app_id: process.env.OER_APP_ID,
        },
      }
    );
    const data: object = response.data;
    console.log(data);
  } catch (error) {
    const err = error as Error;
    console.error(`Error saving latest rates: ${err.message}`);
  }
};

export default saveLatestRates;
