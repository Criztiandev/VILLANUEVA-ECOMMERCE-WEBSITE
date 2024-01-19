import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { ProtectedRoutes } from "../interfaces/routes.js";
import { ZodObject } from "zod";

export default {
  validateBody: (schema: ZodObject<any>) =>
    asyncHandler(
      async (req: ProtectedRoutes, res: Response, next: NextFunction) => {
        if (Object.keys(req.body).length === 0)
          throw new Error(
            process.env.NODE_ENVO === "production"
              ? "Something went wrong"
              : "Request body empty"
          );

        // validateion
        const validated = schema.parse(req.body);

        // move to private object
        req.body = validated;
        next();
      }
    ),
};
