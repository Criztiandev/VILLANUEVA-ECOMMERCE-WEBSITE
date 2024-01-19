import { Request } from "express";
import { JWTPayload } from "./token.js";

export interface UserRequest extends Request {
  user: JWTPayload;
}

export interface AdminRequest extends Request {
  admin: JWTPayload;
}
