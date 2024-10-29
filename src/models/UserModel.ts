import { model, Schema, Document } from "mongoose";

interface IUser extends Document {
  uid: string;
  email: string;
  apiKeys: string[];
  secretWords: string[];
  apiCallsLimit: number;
}

const userModelSchema = new Schema<IUser>({
  uid: {
    type: String,
    required: true,
    unique: true,
    index: true,
    lowercase: true,
    trim: true,
    match: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
    validate: {
      validator: async function (value: string) {
        // Using `this` instead of `User` for better encapsulation
        const existingUser = await this.model("users").findOne({ uid: value });
        return !existingUser;
      },
      message: "Email already exists",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    lowercase: true,
    trim: true,
  },
  apiKeys: {
    type: [String],
    required: true,
    unique: true,
    index: true,
    match: /^rf_[0-9a-f]{32}$/,
  },
  secretWords: {
    type: [String],
    required: true,
    unique: true,
  },
  apiCallsLimit: {
    type: Number,
    required: true,
    default: 100,
  },
});

const User = model<IUser>("users", userModelSchema);

export default User;
