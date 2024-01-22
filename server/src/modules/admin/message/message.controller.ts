import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

// chage this
import model from "../../../models/message.model.ts";
import userModel from "../../../models/user.model.ts";
import { MessageModel } from "../../../interfaces/model.js";

export default {
  // Create User
  // POST /api/user/create (Private, Admin)
  create: asyncHandler(async (req: Request, res: Response) => {
    const { sender, content, target } = req.body as MessageModel;

    console.log(req.body);

    // Check if the target exists
    const targetExistence = await userModel
      .findById(target)
      .lean()
      .select("_id fullName");
    if (!targetExistence) throw new Error("Target user doesn't exist");

    // Check if a conversation with the target exists
    const convoExistence = await model
      .findOne({ participants: target })
      .lean()
      .select("_id");

    if (convoExistence) {
      // Instead of creating, update the conversation
      const updatedConvo = await model
        .findOneAndUpdate(
          { participants: target },
          { $push: { messages: { sender, content } } },
          { new: true }
        )
        .lean()
        .select("_id");

      if (!updatedConvo) throw new Error("Update Failed");
      handleSuccess(res, updatedConvo); // Return the updated conversation
      return;
    }

    // If no existing conversation, create a new one
    const newConvo = await model.create({
      title: targetExistence.fullName,
      participants: [target],
      messages: [{ target, sender, content }],
    });

    if (!newConvo) handleError("Something went wrong, Please try again later");
    handleSuccess(res, newConvo);
  }),

  // Update User By Id
  // PUT /api/user/update/:id (Private, Admin)
  updateById: asyncHandler(async (req: Request, res: Response) => {
    const UID = req.params.id;
    const payload = req.body;

    const existance = await model.findById(UID).lean().select("_id");
    if (!existance) handleError("Not Found, Please Try again");

    const credentials = await model
      .findOneAndUpdate({ _id: UID }, payload, { new: true })
      .lean()
      .select("_id");
    if (!credentials) handleError("Something went wrong, Please Try again");

    handleSuccess(res, credentials);
  }),

  // Delete User By Id
  // DELETE /api/user/delete/:id (Private, Admin)
  deleteById: asyncHandler(async (req: Request, res: Response) => {
    const UID = req.params.id;

    const existance = await model.findById(UID).lean().select("_id");
    if (!existance) handleError("Not Found, Please Try again");

    const credentials = await model
      .findByIdAndDelete({ _id: UID })
      .lean()
      .select("_id");
    if (!credentials) handleError("Something went wrong, Please Try again");

    handleDeleteSuccess(res, credentials);
  }),

  // Delete User By Batch
  // POST /api/user/delete/batch (Private, Admin)
  deleteBatch: asyncHandler(async (req: Request, res: Response) => {
    const ids = req.body;

    const existance = await model.find({ _id: { $in: ids } }).lean();
    if (!existance) handleError("Not Found, Please Try again");

    const credentials = await model.deleteMany({ _id: { $in: ids } }).lean();
    if (!credentials) handleError("Something went wrong, Please Try again");

    handleDeleteSuccess(res, credentials);
  }),

  // Get All Users
  // GET /api/user (Private, Admin)
  getAll: asyncHandler(async (req: Request, res: Response) => {
    const { role } = req.query as { role: "user" | "admin" };

    console.log(role);

    const exception = "-password -__v";
    const credentials = await model
      .find(role ? { role } : {})
      .lean()
      .select(exception);
    if (!credentials) handleError("Something went wrong, Please Try again");

    handleSuccess(res, credentials);
  }),

  // Get All Users by Filter
  // GET /api/user/:filter (Private, Admin)
  getAllByFilter: asyncHandler(async (req: Request, res: Response) => {
    const filter = req.params.filter || {};
    const exception = "-password -__v";

    const credentials = await model.find(filter).lean().select(exception);
    if (!credentials) handleError("Something went wrong, Please Try again");

    handleSuccess(res, credentials);
  }),

  // Get User By Id
  // GET /api/user/:id (Private, Admin)
  getById: asyncHandler(async (req: Request, res: Response) => {
    const UID = req.params.id;

    const credentials = await model
      .findById(UID)
      .lean()
      .select("-password -__v");
    if (!credentials) handleError("Something went wrong, Please Try again");

    handleSuccess(res, credentials);
  }),
};

// Utils
const handleError = (message: string) => {
  throw new Error(message);
};

const handleSuccess = (res: Response, payload: any) => {
  res.status(200).json({ payload });
};

const handleDeleteSuccess = (res: Response, payload: any) => {
  res.status(201).json({ payload });
};
