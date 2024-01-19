import asyncHandler from "express-async-handler";
import { Response, NextFunction, Request } from "express";
import { UserRequest } from "../interfaces/roles.js";
import tokenUtils from "../utils/token.utils.ts";
import { ProtectedRoutes } from "../interfaces/routes.js";

const handleRevokeToken = (res: Response, keys: Array<String>) => {
  keys.forEach((key: string) => tokenUtils.revokeCookies(res, key));
};

type Role = "admin" | "user";

const requireRole = (role: Role) =>
  asyncHandler(
    async (req: ProtectedRoutes, res: Response, next: NextFunction) => {
      if (!role) throw new Error("Role is required");

      switch (role) {
        case "admin":
          if (!req.admin) {
            handleRevokeToken(res, ["accessToken", "refreshToken"]);
            throw new Error("Invalid Role");
          }
          break;
        case "user":
          if (!req.user) {
            handleRevokeToken(res, ["accessToken", "refreshToken"]);
            throw new Error("Invalid Role");
          }
          break;
        default:
          throw new Error("Invalid Role");
      }

      next();
    }
  );

export default { requireRole };
