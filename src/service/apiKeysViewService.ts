import verifyJWT from "../lib/verifyJWT";
import ApiKey from "../models/apiKeysModel";

const apiKeysViewService = async (token: string) => {
  try {
    const isTokenValid = await verifyJWT(token);
    const apikeys = await ApiKey.find({ user: isTokenValid.id });
    const keys: any[] = [];
    apikeys.map((key) =>
      keys.push({
        apiKey: key.key,
        apiCallsCount: key.apiCallsCount,
        createdAt: key.createdAt,
        updatedAt: key.updatedAt,
      })
    );
    return keys
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message); // Rethrow the error with a message
  }
};

export default apiKeysViewService;
