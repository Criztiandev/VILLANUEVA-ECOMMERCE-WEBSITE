import express from "express";

import controller from "./order.controller.ts"; // change this
const router = express.Router();

const {
  create,
  updateById,
  deleteBatch,
  deleteById,
  getAll,
  getAllByFilter,
  getById,
  getAllReturned,
  returnProduct,
} = controller;

router.post("/create", create);
router.post("/delete/batch", deleteBatch);
router.put("/:id", updateById);
router.delete("/:id", deleteById);
router.delete("/return/:id", returnProduct);

router.get("/", getAll);
router.get("/tite", getAll);
router.get("/returned", getAllReturned);
router.get("/:id", getById);
router.get("/:filter", getAllByFilter);
export default router;
