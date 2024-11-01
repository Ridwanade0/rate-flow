import { Request, Response } from "express";
import { validate } from "uuid";
import enableApiKeyService from "../service/enableApiKeyService";

const enableApiKeyController = async (req: Request, res: Response) => {
  const uid: string = req.body.uid;
  const secretWords: string[] = req.body.secretWords.split(",");
  const apiKey: string = req.body.apiKey;
  try {
    if (!validate(uid)) {
      res.status(400).json({ success: false, message: "Invalid uid" });
      return;
    }
    if (apiKey === "") {
      res
        .status(400)
        .json({ success: false, message: "No API key was provided" });
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
    const response = await enableApiKeyService(uid, secretWords, apiKey);
    res.status(200).json({
      success: response,
      message: "API key enabled successfully",
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export default enableApiKeyController;
