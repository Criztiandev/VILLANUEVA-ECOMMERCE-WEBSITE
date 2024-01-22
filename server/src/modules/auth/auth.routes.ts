import express from "express";
import authController from "./auth.controller.ts";
import encryptionMiddleware from "../../middleware/encryption.middleware.ts";
const router = express.Router();

const { decryptPassword } = encryptionMiddleware;

router.post("/", [decryptPassword], authController.login);
router.post("/register", [decryptPassword], authController.register);

export default router;
