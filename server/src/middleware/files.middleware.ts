import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import * as path from "path";
import * as fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fileUtils from "../utils/file.utils.ts";

export default {
  createDirectories: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);
      const uploadDir = path.join(__dirname, `../../public/products`);
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }

      const { name } = req.params;

      const formattedName = name.split(" ").join("_").toLowerCase();
      const productPath = path.join(
        __dirname,
        `../../public/products/${formattedName}`
      );

      if (!fs.existsSync(productPath)) {
        fs.mkdirSync(productPath);
      }

      next();
    }
  ),

  uploadImages: asyncHandler(async (req, res, next) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const { name } = req.params;
    const formattedName = name.split(" ").join("_").toLowerCase();

    const productPath = path.join(
      __dirname,
      `../../public/products/${formattedName}`
    );
    if (!fs.existsSync(productPath)) {
      throw new Error("Peoduct Doesnt exist");
    }

    const products = fileUtils
      .upload(`/products/${formattedName}`)
      .array("product", 5);

    products(req, res, (error) => {
      if (error) {
        return next(error); // Pass any upload-related errors to the next middleware
      }
      next(); // Proceed to the next middleware if there are no errors
    });
  }),
};
