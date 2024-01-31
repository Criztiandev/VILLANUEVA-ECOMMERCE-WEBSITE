import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

// chage this
import model from "../../../models/serviceBook.model.ts";
import { ServiceScheduleModel } from "../../../interfaces/model.js";
import serviceModel from "../../../models/serviceModel.ts";
import userModel from "../../../models/user.model.ts";

export default {
  // Create User
  // POST /api/user/create (Private, Admin)
  create: asyncHandler(async (req: Request, res: Response) => {
    const payload: ServiceScheduleModel = req.body;

    // check if the user choose already the service

    // check if the user has already chosen the service
    const existingService = await model.findOne({
      customer: payload?.customer,
      serviceId: payload?.serviceId,
      status: { $ne: "completed" },
    });

    if (existingService) handleError("Schedule already exist");

    const credentials = await model.create(payload);
    if (!credentials) handleError("Something went wrong, Please Try again");

    handleSuccess(res, credentials);
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
    const existance = await model
      .findById({ _id: UID })
      .lean()
      .select("_id category");

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
    const query = req.query || {};
    const allowedStatusValues = [
      "pending",
      "cancel",
      "deal",
      "process",
      "finished",
    ];

    const credentials = await model
      .find({ status: { $in: allowedStatusValues }, ...query })
      .lean();
    if (!credentials) handleError("Something went wrong, Please Try again");

    const serviceIds = credentials?.map((item) => item.serviceId);
    const customerIDs = credentials?.map((item) => item.customer);

    const services = serviceIds?.map(async (item) => {
      const service = await serviceModel.findById(item).lean().select("name");
      return {
        ...service,
      };
    });

    const customers = customerIDs?.map(async (item) => {
      const customer = await userModel.findById(item).lean().select("fullName");
      return {
        ...customer,
      };
    });

    const result = await Promise.all(services);
    const customerResult = await Promise.all(customers);

    const transformedPayload = credentials.map((credential, index) => {
      return {
        ...credential,
        serviceId: result[index].name,
        customer: customerResult[index].fullName,
      };
    });

    handleSuccess(res, transformedPayload);
  }),

  // Get User By Filter query
  // GET /api/user/:id (Private, Admin)
  getByFilter: asyncHandler(async (req: Request, res: Response) => {
    const filter = req.query.filter || {};

    const credentials = await model
      .findById(filter)
      .lean()
      .select("-password -__v");
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

    const serviceDetails = await serviceModel
      .findById(credentials?.serviceId)
      .lean()
      .select("name description services images");

    const customerDetails = await userModel
      .findById(credentials?.customer)
      .lean()
      .select("fullName age email contact address");

    const transformedPayload = {
      ...credentials,
      serviceId: serviceDetails,
      customer: customerDetails,
    };

    handleSuccess(res, transformedPayload);
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
