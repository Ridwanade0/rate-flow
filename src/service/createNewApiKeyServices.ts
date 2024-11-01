import sendEmail from "../lib/sendEmail";
import APIKeys from "../models/APIKeysModel";
import User from "../models/UserModel";
import { v4 as uuidv4 } from "uuid";
const createNewApiKeyServices = async (uid: string, secretWords: string[]) => {
  try {
    const user = await User.findOne({ uid, secretWords });
    if (!user) {
      throw new Error("User not found or invalid secret words");
    }
    const apiKey = "rf_" + uuidv4().split("-").join("");
    await APIKeys.create({ user: uid, apiKey });
    await user.updateOne({ $push: { apiKeys: apiKey } });
    await sendEmail(
      user.email,
      "New API Key Created",
      "",
      `A new API Key has been craeted for your account: ${apiKey}`
    );
    return apiKey;
  } catch (error) {
    throw error;
  }
};

export default createNewApiKeyServices;
