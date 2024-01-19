import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import crypto from "crypto-js";

export default {
  decryptPassword: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { password } = req.body;

      const secret = process.env.PASSWORD_SECRET;
      if (!secret) throw new Error("Something went wrong, Please Try again");

      // Decrypt the password
      const decryptedPwd = crypto.AES.decrypt(
        password,
        process.env.PASSWORD_SECRET
      ).toString(crypto.enc.Utf8);

      if (!decryptedPwd)
        throw new Error("Something went wrong, Please Try again later");

      req.body.password = decryptedPwd;
      next();
    }
  ),
};
