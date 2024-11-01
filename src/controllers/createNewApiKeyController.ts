import { Request, Response } from "express";
import { validate } from "uuid";
import createNewApiKeyServices from "../service/createNewApiKeyServices";

const createNewApiKeyController = async (req: Request, res: Response) => {
  const uid: string = req.body.uid;
  const secretWords: string[] = req.body.secretWords.split(",");
  try {
    if (!uid || !secretWords || secretWords.length === 0) {
      res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
      return;
    }
    if (!validate(uid)) {
      res.status(400).json({
        success: false,
        message: "Invalid uid",
      });
    }
    const apiKey = await createNewApiKeyServices(uid, secretWords);
    res.status(200).json({
      success: true,
      message: "API key created successfully",
      apiKey: apiKey,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export default createNewApiKeyController;
