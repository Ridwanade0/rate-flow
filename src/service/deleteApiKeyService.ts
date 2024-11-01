import sendEmail from "../lib/sendEmail";
import APIKeys from "../models/APIKeysModel";
import User from "../models/UserModel";

const deleteApiKeyService = async (
  uid: string,
  secretWords: string[],
  apiKey: string
) => {
  try {
    const user = await User.findOne({ uid: uid, secretWords: secretWords });

    if (!user) {
      throw new Error("Invalid uid or secret words");
    }

    if (!apiKey) {
      throw new Error("No API key was provided");
    }

    // Delete the API key from APIKeys collection
    const deleteResult = await APIKeys.deleteOne({ user: user.uid, apiKey });

    if (deleteResult.deletedCount === 0) {
      throw new Error("No matching API key found for deletion");
    }

    // Pull the API key from the user's apikeys array
    await User.updateOne(
      { uid: uid, secretWords: secretWords },
      { $pull: { apiKeys: apiKey } }
    );

    await sendEmail(
      user.email,
      "API Key deleted",
      "",
      "API Key deleted successfully"
    );

    return true;
  } catch (error) {
    throw error;
  }
};

export default deleteApiKeyService;
