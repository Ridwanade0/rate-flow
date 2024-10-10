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
