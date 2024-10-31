import sendEmail from "../lib/sendEmail";
import APIKeys from "../models/APIKeysModel";
import User from "../models/UserModel";

const disableAccountService = async (uid: string, secretWords: string[]) => {
  try {
    // need to find user with there uuid and secret words
    const user = await User.findOne({ uid: uid, secretWords: secretWords });

    if (!user) {
      throw new Error("User not found or invalid secret words");
    }
    if (!user.isActive) {
      throw new Error(
        "User is not active or might have already been disabled or deleted"
      );
    }

    // disable account in user collection
    await user.updateOne({ isActive: false });

    // find all apikeys associated with this user
    const apiKeys = await APIKeys.find({ user: uid });

    // disable these apikeys in apikeys collection
    await Promise.all(apiKeys.map((key) => key.updateOne({ isActive: false })));

    await sendEmail(
      user.email,
      "Account Disabled",
      "",
      "Account Disabled Your account has been disabled"
    );

    return true;
    // if user found  then disable account, also use the apikeys to check for apikeys in apikeys collectiona nd disable the keys also
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message);
  }
};

export default disableAccountService;
