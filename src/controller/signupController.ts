//  Importing useful modules
import { Request, Response } from "express"; // import express modules
import { AuthCredentials } from "../interface/user.inteface"; // imported authcredentials interface
import signupService from "../service/signupService";

const signupController = async (req: Request, res: Response) => {
  try {
    const { email, password }: AuthCredentials = req.body; // destructure the request body to extract auth credentials needed for user creation, importd and implemented a authcredentials interface.
    const user = await signupService(email, password); // signup service function to create user and generate token
    res.status(201).json({
      status: 201,
      message: user.message,
      userID: user.userID,
    }); // respond with success status, message, and user id in JSON format.
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
};

export default signupController; // exported the signupController
