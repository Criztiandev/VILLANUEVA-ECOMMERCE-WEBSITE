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
  // Delete User By Batch

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

  // Get All Users
  // GET /api/user (Private, Admin)
  getAllProducts: asyncHandler(async (req: Request, res: Response) => {
    try {
      const query = req.query || {};

      const credentials = await model
        .find({ status: "completed", ...query })
        .lean();
      const productIds = credentials.map((item) => item.products).flat();

      const productDetails = productIds.map(async ({ _id, ...rest }) => {
        const products = await productModel
          .findById(_id)
          .lean()
          .select("images name price");

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

  getAllService: asyncHandler(async (req: Request, res: Response) => {
    try {
      const query = req.query || {};

      const credentials = await model.find(query).lean();
      const productIds = credentials.map((item) => item.products).flat();

      const productDetails = productIds.map(async ({ _id, ...rest }) => {
        const products = await productModel
          .findById(_id)
          .lean()
          .select("images name price");

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

  // Get User By Id
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
