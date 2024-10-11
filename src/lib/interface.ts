// Auth credentials interface defines types for authentication data
export interface AuthCredentials {
  email: string;
  password: string;
}

export interface jwtPayload {
  id: string;
  email: string;
  iat: number;
  exp: number;
}

export interface latestCurrencyRates {
  disclaimer: string;
  license: string;
  timestamp: number;
  base: string;
  rates: Record<string, number>;
}

export interface DBCurrencyCode {
  _id: string;
  code: string;
}

export interface CurrencyCodes {
  [key: string]: string; // Assuming currency codes are strings mapping to their names
}

export interface Rates {
  [key: string]: number;
}

export interface CurrencyRatesResponse {
  rates: Rates;
  base: string;
}
