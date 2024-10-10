import "dotenv/config";
import { jwtPayload } from "./interface";
import jwt from "jsonwebtoken";

const verifyJWT = async (token: string): Promise<jwtPayload> => {
  const jwtSecret = process.env.JWT_SECRET as string;
  return jwt.verify(token, jwtSecret) as jwtPayload
};

export default verifyJWT;
