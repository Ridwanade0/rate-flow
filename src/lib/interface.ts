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

export interface CurrencyCode {
  _id: string;
  code: string;
}

export interface Rates {
  [key: string]: number;
}

export interface CurrencyRatesResponse {
  rates: Rates;
  base: string;
}
