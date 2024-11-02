import APIKeys from "../models/APIKeysModel";
import User from "../models/UserModel";

type ValidationResult = {
  valid: boolean;
  userId?: string;
  reason: string;
};

const validateAPIKey = async (APIKey: string): Promise<ValidationResult> => {
  try {
    // Fetch API key along with user information if schemas allow
    const apiKey = await APIKeys.findOne({ apiKey: APIKey }).populate("user");

    if (!apiKey) {
      return { valid: false, reason: "Invalid API Key" };
    }

    if (!apiKey.isActive) {
      return { valid: false, reason: "API Key has been disabled" };
    }

    const user = await User.findOne({ uid: apiKey.user, apiKeys: APIKey });

    if (!user) {
      return { valid: false, reason: "Invalid User" };
    }

    if (!user.isActive) {
      return { valid: false, reason: "User has been disabled" };
    }

    if (user.apiCallsLimit <= 0) {
      return { valid: false, reason: "API Key has reached its call limit" };
    }

    return { valid: true, userId: user.uid, reason: "API Key is valid" };
  } catch (error) {
    console.error("Error validating API key:", error);
    return { valid: false, reason: "An error occurred during validation" };
  }
};

const updateApiCallsLimit = async (userId: string, apiKey: string) => {
  try {
    await User.findOneAndUpdate(
      { uid: userId },
      { $inc: { apiCallsLimit: -1 } }
    );
    await APIKeys.findOneAndUpdate(
      { apiKey: apiKey },
      { $inc: { totalAPICalls: 1, totalAPIMonthCalls: 1 } }
    );
    if (new Date().getDate() === 1) {
      await User.findOneAndUpdate(
        { uid: userId },
        { $set: { apiCallsLimit: 1000 } }
      );
      await APIKeys.findOneAndUpdate(
        { apiKey: apiKey },
        { $set: { totalAPIMonthCalls: 0 } }
      );
    }
  } catch (error) {
    // Log or handle decrement error without affecting user experience
    console.error("Failed to decrement API call limit:", error);
  }
};

export { validateAPIKey, updateApiCallsLimit };
