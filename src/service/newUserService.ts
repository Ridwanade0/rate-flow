import { v4 as uuidv4 } from "uuid";
import getSecretWords from "../lib/getSecretWords";
import User from "../models/UserModel";
import path from "path";
import ejs from "ejs";
import fs from "fs/promises";
import sendEmail from "../lib/sendEmail";
const newUserService = async (email: string) => {
  try {
    const apiKeys: string[] = [];
    const userID = uuidv4();
    const secretWords: string[] = await getSecretWords(3);
    for (let i = 0; i < 2; i++) {
      let keys = "rf_" + uuidv4().split("-").join("");
      apiKeys.push(keys);
    }
    const newUser = new User({
      uid: userID,
      email: email,
      apiKeys: apiKeys,
      secretWords: secretWords,
    });
    const emailPath = path.join(
      __dirname,
      "..",
      "..",
      "views",
      "welcomeEmail.ejs"
    );
    const emailContent = await fs.readFile(emailPath, { encoding: "utf8" });
    const emailHTML = await ejs.render(emailContent, {
      name: email.split("@")[0],
      email: email,
      accountID: userID,
      secretWords,
      apiKeys,
    });
    if (await newUser.save()) {
      await sendEmail(email, emailHTML);
    }
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message);
  }
};

export default newUserService;
