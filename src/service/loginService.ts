import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../model/userModel';
import "dotenv/config";

const loginService = async (email: string, password: string) => {
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '30d' }
    );

    return { token, userId: user._id };
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message);
  }
};

export default loginService;