import { Roles } from "./model.js";

export interface JWTPayload {
  UID: string;
  role: Roles;
  scope: Array<string>;
}

export interface JWTPayload {
  UID: string;
  role: Roles;
  scope: Array<string>;
}

export interface JWTSigningOptions {
  expiresAt: string | number;
}

export interface VerifyToken {
  payload: JWTPayload;
  expired: boolean;
}
