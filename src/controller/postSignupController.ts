import { Request, Response } from "express";

const postSignupController = async (req: Request, res: Response) => {
 try {
  const {email, password} = req.body;
  console.log(email, password)
  res.status(201).json({email, password})
 } catch (error) {
  const err = error as Error
  res.status(500).json({
   status: 500,
   message: err.message,
  })
 }
}

export default postSignupController;