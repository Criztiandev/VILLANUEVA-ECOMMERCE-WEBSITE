import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import tokenUtils from "../utils/token.utils.ts";
import { VerifiedPayload } from "../interfaces/token.js";
import { ProtectedRoutes } from "../interfaces/routes.js";

export default {
  authenticateUser: asyncHandler(
    async (req: ProtectedRoutes, res: Response, next: NextFunction) => {
      // check if there is cookies
      const cookies = req.cookies;
      if (!cookies) throw new Error("No Cookies");

      // check if there is access token and refresh token
      const { accessToken, refreshToken } = cookies;
      if (!accessToken || !refreshToken) throw new Error("Invalid Token");

      // verify access token
      const result: VerifiedPayload = tokenUtils.verifyToken(
        accessToken,
        process.env.JWT_SECRET
      );
      if (!result) throw new Error("Invalid Token");

      const { payload, expired } = result;

      // if access token is expired
      if (expired && payload === null) {
        // referesh the tokeb
        return;
      }

      switch (payload?.roles) {
        case "admin":
          req.admin = payload;
          break;
        case "user":
          req.user = payload;
          break;
        default:
          throw new Error("Invalid Role");
      }

      next();
    }
  ),
};
