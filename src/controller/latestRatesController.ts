import { Request, Response } from "express";
import latestRatesService from "../service/latestRatesService";
import User from "../models/userModel";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { jwtPayload } from "../lib/interface";

const latestRatesController = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const jwtSecret = process.env.JWT_SECRET as string;
    if (!token) {
      throw new Error("Unauthorized");
    }
    const verifiedToken = jwt.verify(token, jwtSecret) as jwtPayload;
    if (!verifiedToken || !verifiedToken.id) {
      throw new Error("Invalid token");
    }
    const user = await User.findById(verifiedToken.id);
    if (!user) {
      throw new Error("User not found");
    }
    // Check if the user has exceeded the maximum number of API keys
    if (user.apiCallsLimit <= 0) {
      throw new Error("Maximum number of API keys reached");
    }
    // Get the base currency and symbols from the query parameters, or default to USD and empty string respectively
    const base = typeof req.query.base === "string" ? req.query.base : "USD";
    const symbols =
      typeof req.query.symbols === "string" ? req.query.symbols : "";
    const rates = await latestRatesService(
      base.toUpperCase(),
      symbols.toUpperCase()
    );
    if (rates) {
      await User.findByIdAndUpdate(user._id, {
        $inc: { apiCallsLimit: -1 },
      });
    }
    res.status(200).json(rates);
  } catch (error) {
    const err = error as Error; // Cast error to Error type
    // Send an error response with a generic error message
    res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
};

export default latestRatesController;
