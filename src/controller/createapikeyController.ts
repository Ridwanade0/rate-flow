import express, { Request, Response } from "express";
import  jwt from "jsonwebtoken";
import createapikeyService from "../service/createapikeyService";

const createapikeyController = async (req: Request, res: Response) => {
  try {
   const token: string  = req.body.token;
   const response = await createapikeyService(token);
   // Send a success response with the newly generated API key
   res.status(200).json(response);
  } catch (error) {
    const err = error as Error; // Cast error to Error type
    // Send an error response with a generic error message
    res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
};

export default createapikeyController;