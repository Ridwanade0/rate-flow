import { Request, Response } from "express";
import isValidEmail from "../lib/isValidEmail";
import newUserService from "../service/newUserService";

const newUserController = async (req: Request, res: Response) => {
  const email: string = req.body.email;
  try {
    if (!isValidEmail(email)) {
      res.status(401).json({
        success: false,
        message: "Invalid email address",
      });
      return;
    }
    const response = await newUserService(email);
    res.status(201).json({
      success: true,
      message: "API key generated successfully, check your email.",
      data: response,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export default newUserController;
