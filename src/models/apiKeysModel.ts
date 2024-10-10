import { Schema, model, Document } from "mongoose";

interface IApiKey extends Document {
  _id: string;
  key: string;
  createdAt: Date;
  updatedAt: Date;
  user: string; // Reference to the user who owns the API key
  apiCallsCount: number; // Number of times the API has been called using this key
}

const apiKeySchema = new Schema<IApiKey>(
  {
    _id: {
      type: String,
      required: true,
    },
    key: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: String,
      required: true,
      ref: "User", // Reference to the User model
    },
    apiCallsCount: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ApiKey = model<IApiKey>("ApiKey", apiKeySchema);

export default ApiKey;
