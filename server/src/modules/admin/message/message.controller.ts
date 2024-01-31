import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

// chage this
import model from "../../../models/message.model.ts";
import userModel from "../../../models/user.model.ts";
import { MessageModel } from "../../../interfaces/model.js";
import messageModel from "../../../models/message.model.ts";

export default {
  // Create User
  // POST /api/user/create (Private, Admin)
  create: asyncHandler(async (req: Request, res: Response) => {
    const { sender, content, target, title } = req.body as MessageModel;

    const existingConvo = await model.findOne({ title: title });

    if (!existingConvo) {
      const newConvo = await model.create({
        title: title,
        messages: [{ sender, content }], // Assuming you want to add the first message
      });

      if (!newConvo) throw new Error("Something went wrong");
      res.status(201).json({ success: true, data: newConvo });
    } else {
      // update the message
      const updatedConvo = await model.findOneAndUpdate(
        { title: title },
        { $push: { messages: { sender, content } } },
        { new: true } // Return the updated document
      );

      if (!updatedConvo) throw new Error("Something went wrong");
      res.status(200).json({ success: true, data: updatedConvo });
    }
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
  deleteByFilter: asyncHandler(async (req: Request, res: Response) => {
    const query = req.query || {};

    const existance = await model.findOne(query).lean().select("_id");
    if (!existance) handleError("Not Found, Please Try again");

    const credentials = await model
      .findOneAndDelete(query)
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
    const query = req.query || {};

    const credentials = await model.find({ ...query }).lean();
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

    const existance = await model
      .findOne({ $or: [{ _id: UID }, { participants: UID }] })
      .lean();

    handleSuccess(res, existance);
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
