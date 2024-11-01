import { model, Schema, Document } from "mongoose";

interface IUser extends Document {
  uid: string;
  email: string;
  isActive: boolean;
  apiKeys: string[];
  secretWords: string[];
  apiCallsLimit: number;
}

const userModelSchema = new Schema<IUser>(
  {
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
          const existingUser = await this.model("users").findOne({
            uid: value,
          });
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
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    apiKeys: {
      type: [String],
      required: true,
      validate: {
        validator: function (v: string[]) {
          return (
            v.length <= 5 && v.every((key) => /^rf_[0-9a-f]{32}$/.test(key))
          );
        },
        message:
          "You can only have up to 5 API keys, and they must match the pattern 'rf_[0-9a-f]{32}'.",
      },
    },
    secretWords: {
      type: [String],
      required: true,
    },
    apiCallsLimit: {
      type: Number,
      required: true,
      default: 100,
    },
  },
  {
    timestamps: true,
  }
);

const User = model<IUser>("users", userModelSchema);

export default User;
