import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import userModel from "../../models/user.model.ts";

const handleError = (message: string) => {
  throw new Error(message);
};

const handleSuccess = (res: Response, payload: any) => {
  res.status(200).json({ payload });
};

export default {
  login: asyncHandler(async (req: Request, res: Response) => {
    const { email, password: currentPassword } = req.body;

    const existance = await userModel.findOne({ email });

    if (existance && (await existance.matchPassword(currentPassword))) {
      handleSuccess(res, {
        UID: existance._id,
        role: existance.role,
      });
    } else {
      handleError("Invalid Credentials");
    }
  }),

  register: asyncHandler(async (req: Request, res: Response) => {
    const { email, ...rest } = req.body;

    const existance = await userModel.findOne({ email }).lean().select("_id");
    if (existance) handleError("Email already exists");

    const credentials = await userModel.create(req.body);

    if (!credentials)
      handleError("Something went wrong, Please Try again later");
    handleSuccess(res, rest);
  }),
};
