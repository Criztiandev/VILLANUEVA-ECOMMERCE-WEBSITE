import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import * as path from "path";
import * as fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

// chage this
import model from "../../../models/product.model.ts";
import categoryModel from "../../../models/productsCategory.model.ts";
import productModel from "../../../models/product.model.ts";
import { mode } from "crypto-js";

export default {
  // Create User
  // POST /api/user/create (Private, Admin)
  create: asyncHandler(async (req: Request, res: Response) => {
    const payload = req.body;

    const productExist = await productModel
      .findOne({ name: payload?.name })
      .lean()
      .select("_id");

    if (productExist) throw new Error("Prodict already exist");

    const category = await categoryModel.findOneAndUpdate(
      { name: payload?.category },
      { $inc: { count: 1 } },
      { new: true }
    );
    if (!category) throw new Error("Something went wrong");

    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      const images = (req.files as any).map((file: any) => file?.filename);

      const credentials = await model.create({ images: images, ...req.body });

      if (!credentials)
        handleError("Something went wrong, Please Try again later");
      handleSuccess(res, payload);
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
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const { name } = req.params;

    const existance = await model
      .findById({ _id: UID })
      .lean()
      .select("_id name category");

    if (!existance) handleError("Not Found, Please Try again");

    const category = await categoryModel.findOneAndUpdate(
      { name: existance?.category },
      { $inc: { count: -1 } },
      { new: true }
    );
    if (!category) throw new Error("Category Update Error");

    // delete the product images
    const productName = existance?.name.split(" ").join("_").toLowerCase();
    const productPath = path.join(
      __dirname,
      `../../../../public/products/${productName}`
    );

    if (fs.existsSync(productPath)) {
      fs.rmdirSync(productPath, { recursive: true });
    }

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
    const exception = "-password -__v";
    const credentials = await model.find({}).lean().select(exception);
    if (!credentials) handleError("Something went wrong, Please Try again");

    handleSuccess(res, credentials);
  }),

  // Get User By Filter query
  // GET /api/user/:id (Private, Admin)
  getByFilter: asyncHandler(async (req: Request, res: Response) => {
    const filter = req.query.filter;

    const credentials = await model
      .findById(filter)
      .lean()
      .select("-password -__v");
    if (!credentials) handleError("Something went wrong, Please Try again");

    console.log("credentials");

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

  getBestProduct: asyncHandler(async (req: Request, res: Response) => {
    try {
      // Assuming your model has a 'name' field for the product name
      const products = await model.find({}).limit(5).lean();

      const dataset = products.map((items) => {
        return {
          label: items.name,
          data: [items.sales],
          backgroundColor: `rgba(${Math.floor(
            Math.random() * 256
          )}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
            Math.random() * 256
          )}, 0.5)`,
        };
      });

      res.status(200).json({
        payload: dataset,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }),

  getTotalSales: asyncHandler(async (req: Request, res: Response) => {
    try {
      // Fetch all products from the model
      const products = await model.find({}).lean();

      // Calculate total sales based on quantity and price
      const totalSales = products.reduce((acc, product) => {
        // Assuming each product has "quantity" and "price" properties
        const productQuantity = product.stock || 0;
        const productPrice = product.price || 0;
        const productSales = productQuantity * productPrice;
        return acc + productSales;
      }, 0);

      res.status(200).json({
        payload: {
          totalSales: totalSales,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
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
