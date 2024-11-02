import APIKeys from "../../models/APIKeysModel";
import User from "../../models/UserModel";

const disableApiKeyService = async (
  uid: string,
  secretWords: string[],
  apiKey: string
) => {
  try {
    // need to find user with there uuid and secret words
    const user = await User.findOne({ uid: uid, secretWords: secretWords });

    if (!user) {
      throw new Error("User not found or invalid secret words");
    }
    await APIKeys.updateOne(
      { user: user.uid, apiKey: apiKey },
      { $set: { isActive: false } }
    );
    return true;
  } catch (error) {
    throw error;
  }
};

export default disableApiKeyService;
