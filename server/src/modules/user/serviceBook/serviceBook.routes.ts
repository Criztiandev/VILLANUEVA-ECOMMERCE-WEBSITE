import express from "express";

import controller from "./serviceBook.controller.ts"; // change this
const router = express.Router();

const {
  create,
  updateById,
  deleteBatch,
  deleteById,
  getAll,
  getById,
  getByFilter,
} = controller;

router.post("/create", create);
router.post("/delete/batch", deleteBatch);
router.put("/:id", updateById);
router.delete("/:id", deleteById);

router.get("/", getAll);
router.get("/:id", getById);
router.get("/:filter", getByFilter);

export default router;
