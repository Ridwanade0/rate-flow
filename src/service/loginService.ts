import User from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginService = async (email: string, password: string) => {
  try {
    if (!email || !password) {
      throw new Error(
        "Incomplete credentials, email and password must be present!"
      );
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    const jwtPayload = {
      id: user._id,
      email: user.email,
    };
    const jwtSecret = process.env.JWT_SECRET as string;
    const jsonToken = await jwt.sign(jwtPayload, jwtSecret, {
      expiresIn: "30d",
    });
    return {
      message: "Login successful",
      token: jsonToken,
    };
  } catch (error) {
    const err = error as Error; // Cast error to Error type
    throw new Error(err.message); // Rethrow the error with a message
  }
};

export default loginService;
