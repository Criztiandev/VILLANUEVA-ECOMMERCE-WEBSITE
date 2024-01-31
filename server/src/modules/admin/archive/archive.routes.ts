import express from "express";

import controller from "./archive.controller.ts"; // change this
const router = express.Router();

const { getById, getAllProducts, getAllServices, deleteById } = controller;

router.delete("/:id", deleteById);

router.get("/products", getAllProducts);
router.get("/services", getAllServices);
router.get("/products/:id", getById);

export default router;
