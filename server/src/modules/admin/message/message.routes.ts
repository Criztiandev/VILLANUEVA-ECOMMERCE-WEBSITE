import express from "express";

import controller from "./message.controller.ts"; // change this
import validationMiddlware from "../../../middleware/validation.middlware.ts";
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
  deleteByFilter,
} = controller;

router.post("/create", create);
router.post("/delete/batch", deleteBatch);
router.put("/:id", updateById);
router.post("/filter", deleteByFilter);
router.delete("/:id", deleteById);

router.get("/", getAll);
router.get("/:id", getById);
router.get("/:filter", getAllByFilter);
export default router;
