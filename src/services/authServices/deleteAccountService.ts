import sendEmail from "../../lib/sendEmail";
import APIKeys from "../../models/APIKeysModel";
import User from "../../models/UserModel";

const deleteAccountService = async (uid: string, secretWords: string[]) => {
  try {
    const user = await User.findOne({ uid: uid, secretWords: secretWords });

    if (!user) {
      throw new Error("User not found or invalid secret words");
    }
    // delete user and all associated apikeys in apikeys collection
    await APIKeys.deleteMany({ user: uid });
    // if user found then delete account and all associated apikey
    await user.deleteOne();
    await sendEmail(
      user.email,
      "Account Deleted",
      "",
      "Account has been deleted, we are sad to see you leave. To continue using rates flow please re-register again"
    );
    return true;
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message);
  }
};

export default deleteAccountService;
