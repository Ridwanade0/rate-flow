import sendEmail from "../lib/sendEmail";
import User from "../models/UserModel";

const enableAccountService = async (uid: string, secretWords: string[]) => {
  try {
    // need to find user with there uuid and secret words
    const user = await User.findOne({ uid: uid, secretWords: secretWords });

    if (!user) {
      throw new Error("User not found or invalid secret words");
    }
    if (user.isActive) {
      throw new Error("User is active");
    }

    // disable account in user collection
    await user.updateOne({ isActive: true });

    await sendEmail(
      user.email,
      "Account Enabled",
      "",
      "Account Enabled, Your account has been enabled"
    );
  } catch (error) {
    throw error;
  }
};

export default enableAccountService;
