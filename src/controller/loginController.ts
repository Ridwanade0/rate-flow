import { Request, Response } from "express";
import { AuthCredentials } from "../interface/user.inteface";
import loginService from "../service/loginService";
import isValidEmail from "../lib/isValidEmal";

const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password }: AuthCredentials = req.body;
    if (!isValidEmail(email)) {
      res.status(400).json({ message: "Invalid email" });
      return;
    }
    if (!email || !password) {
      res.status(400).json({ message: "email and password must be present" });
      return;
    }

    const response = await loginService(email, password);
    res.status(200).json(response);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
};

export default loginController;
