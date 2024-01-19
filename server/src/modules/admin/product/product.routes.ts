import express from "express";

import controller from "./product.controller.ts"; // change this
import validationMiddlware from "../../../middleware/validation.middlware.ts";
import productValidationSchema from "../../../validation/product.validation.ts";
const router = express.Router();

const { validateBody } = validationMiddlware;

const {
  create,
  updateById,
  deleteBatch,
  deleteById,
  getAll,
  getAllByFilter,
  getById,
} = controller;

router.post("/create", [validateBody(productValidationSchema)], create);
router.post("/delete/batch", deleteBatch);
router.put("/:id", updateById);
router.delete("/:id", deleteById);

router.get("/", getAll);
router.get("/:id", getById);
router.get("/:filter", getAllByFilter);

export default router;
