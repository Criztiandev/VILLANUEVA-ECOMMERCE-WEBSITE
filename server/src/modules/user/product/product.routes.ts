import express from "express";

import controller from "./product.controller.ts"; // change this
const router = express.Router();

const {
  create,
  updateById,
  deleteBatch,
  deleteById,
  getAll,
  getAllByFilter,
  getById,
} = controller;

router.post("/create", create);
router.post("/delete/batch", deleteBatch);
router.put("/update/:id", updateById);
router.delete("/delete/:id", deleteById);

router.get("/", getAll);
router.get("/:id", getById);
router.get("/:filter", getAllByFilter);

export default router;
