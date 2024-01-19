import { Request } from "express";
import { JWTPayload } from "./token.js";

export interface ProtectedRoutes extends Request {
  admin?: JWTPayload;
  user?: JWTPayload;
}
