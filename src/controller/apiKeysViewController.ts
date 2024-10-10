import { Request, Response } from "express";
import apiKeysViewService from "../service/apiKeysViewService"

const apiKeysViewController = async (req: Request, res: Response) => {
  try {
   const token: string = req.body.token;
   const response = await apiKeysViewService(token);
   console.log({keys: response})
   res.render("api-keys", {keys: response})
  } catch (error) {
    const err = error as Error;
    // Send an error response
    res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
};

export default apiKeysViewController;
