import { Request, Response } from "express";
import apiKeysView from "../service/apiKeysService";

const keysController = async (req: Request, res: Response) => {
  try {
    const authorizationToken = req.headers.authorization as string;
    const token = authorizationToken.split(" ")[1];
    const response = await apiKeysView(token);
    console.log({ keys: response })
    res.status(200).json({ keys: response });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
};
export default keysController;
