import { model, Schema, Document } from "mongoose";

// Define the interface for the APIKeys model
interface IAPIKeys extends Document {
  user: string; // Reference to the user UID
  apiKey: string; // The API key itself
  totalAPICalls: number; // Total API calls made
  totalAPIMonthCalls: number; // Total API calls made in the current month
  isActive: boolean; // Indicates if the API key is active
}

// Define the Mongoose schema for APIKeys
const APIKeysModelSchema = new Schema<IAPIKeys>(
  {
    user: {
      type: String,
      required: true,
    },
    apiKey: {
      type: String,
      required: true,
      unique: true,
      index: true,
      match: /^rf_[0-9a-f]{32}$/, // API key format
    },
    totalAPICalls: {
      type: Number,
      required: true,
      default: 0, // Default value
    },
    totalAPIMonthCalls: {
      type: Number,
      required: true,
      default: 0, // Default value
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true, // Default value
    },
  },
  {
    timestamps: true,
  }
);

// Create the Mongoose model
const APIKeys = model<IAPIKeys>("api-keys", APIKeysModelSchema);

// Export the model
export default APIKeys;
