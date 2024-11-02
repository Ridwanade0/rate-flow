import { Request, Response } from "express";
import { validate } from "uuid";
import enableAccountService from "../../services/authServices/enableAccountService";

const enableAccountController = async (req: Request, res: Response) => {
  const uid: string = req.body.uid;
  const secretWords: string[] = req.body.secretWords.split(",");

  try {
    if (!validate(uid)) {
      res.status(400).json({ success: false, message: "Invalid uid" });
      return;
    }

    if (
      secretWords === null ||
      secretWords === undefined ||
      (Array.isArray(secretWords) && secretWords.length === 0) ||
      (typeof secretWords === "string" && secretWords === "")
    ) {
      res
        .status(400)
        .json({ success: false, message: "Secret words required" });
      return;
    }
    const response = await enableAccountService(uid, secretWords);
    res.status(201).json({
      success: response,
      message: "Account enabled, check your email for more information",
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ success: false, message: err.message });
  }
};
export default enableAccountController;
