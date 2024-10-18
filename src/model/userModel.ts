// Import necessary modules
import { Document, model, Schema } from "mongoose";

// created the new user interface to implement, extends the mongoose document model types
interface IUser extends Document {
  _id: string;
  email: string;
  password: string;
  apiKeys: string[];
  apiCallsLimit: number;
}

const userModelSchema = new Schema<IUser>({
  _id: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  apiKeys: { type: [String], required: true, default: [] },
  apiCallsLimit: {type: Number, required: true, default: 100}
}); // user model schema initalization

const userModel = model<IUser>("users", userModelSchema); // created the user model on the database

export default userModel; // exported the userModel instance fro usage
