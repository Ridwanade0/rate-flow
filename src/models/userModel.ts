import { Schema, model, Document } from "mongoose";

// Define the User interface for TypeScript
interface IUser extends Document {
  _id: string;
  email: string;
  password: string;
  isVerified: boolean;
  apiKeys: string[];
  createdAt?: Date; // Optional, as it is managed by Mongoose
  updatedAt?: Date; // Optional, as it is managed by Mongoose
}

// Define the User schema
const userModelSchema = new Schema<IUser>(
  {
    _id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v: string) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    isVerified: {
      type: Boolean,
      default: false,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    apiKeys: {
      type: [String], // Array of strings
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = model<IUser>("User", userModelSchema);

export default User;
