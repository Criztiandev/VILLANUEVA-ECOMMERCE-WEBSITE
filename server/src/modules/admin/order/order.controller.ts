import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import model from "../../../models/order.model.ts";
import { OrderModel } from "../../../interfaces/model.js";
import productModel from "../../../models/product.model.ts";
import userModel from "../../../models/user.model.ts";

const handleError = (message: string) => {
  throw new Error(message);
};

const handleSuccess = (res: Response, payload: any) => {
  res.status(200).json({ payload });
};

const handleDeleteSuccess = (res: Response, payload: any) => {
  res.status(201).json({ payload });
};

const generateRandomReferenceNumber = (): string => {
  const baseField = "#";
  const randomPart = Math.random().toString(36).substring(2, 10); // Generate a random alphanumeric string

  return `${baseField}${randomPart}`;
};

export default {
  // Create User
  // POST /api/user/create (Private, Admin)
  create: asyncHandler(async (req: Request, res: Response) => {
    const payload: OrderModel = req.body;

    //generate a random referene number
    const productRef = generateRandomReferenceNumber();

    const updatedPayload = { ...payload, refID: productRef };

    const credentials = await model.create(updatedPayload);
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
    try {
      const query = req.query || {};

      const credentials = await model
        .find({ status: { $ne: "completed" }, ...query })
        .lean();
      const productIds = credentials.map((item) => item.products).flat();

      const productDetails = productIds.map(async ({ _id, ...rest }) => {
        const products = await productModel
          .findById(_id)
          .lean()
          .select("images name price stock");

        return {
          ...products,
          ...rest,
        };
      });

      const result = await Promise.all(productDetails);

      const transformedPayload = credentials.map((credential, index) => {
        const formattedDate = new Date(credential.createdAt).toLocaleDateString(
          "en-US",
          {
            month: "2-digit",
            day: "2-digit",
            year: "2-digit",
          }
        );

        return {
          _id: credential._id,
          refID: credential.refID,
          fullName: credential.fullName,
          productName: result[index].name,
          quantity: result[index]?.quantity,
          price: result[index].price,
          purchasedDate: formattedDate,
          total: credential.total,
          method: credential.medthod,
          status: credential.status,
        };
      });

      // Send the transformed data as the response
      handleSuccess(res, transformedPayload);
    } catch (error) {
      handleError("Error processing request");
    }
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

    const userDetails = await userModel
      .findById(credentials.UID)
      .lean()
      .select("fullName email age");
    if (!userDetails) throw new Error("User doesnt exist");

    const productDetails = credentials?.products.map(
      async ({ _id, ...rest }) => {
        const products = await productModel
          .findById(_id)
          .lean()
          .select("images name price");

        return {
          ...products,
          ...rest,
        };
      }
    );

    const result = await Promise.all(productDetails);
    const addressArr = credentials?.address.split(",");

    const addressPayload = {
      region: addressArr[0],
      province: addressArr[1],
      city: addressArr[2],
      municipality: addressArr[3],
      barangay: addressArr[4],
    };

    // updated the credentials
    credentials.products = result;
    (credentials.UID as any) = userDetails;
    credentials.address = addressPayload as any;

    handleSuccess(res, credentials);
  }),
};
