import express, { Express, Request, Response, NextFunction } from "express";
import dotnevn from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import compression from "compression";

// routes
import authRoute from "./modules/auth/auth.routes.ts";
import accountRoute from "./modules/account/account.routes.ts";
import userRoute from "./modules/users/user.routes.ts";
import { connectDB } from "./config/connectDb.ts";
import { errorHandler, notFound } from "./middleware/error.middlewares.ts";
import multer from "multer";
import * as path from "path";

// Init
dotnevn.config();
connectDB();
const app: Express = express();
const PORT: string | number = process.env.PORT || 5000;

// middlewares

app.use(cors({ origin: process.env.BASE_URL, credentials: true }));
app.use(helmet());
app.use(cookieParser());
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/account", accountRoute);
app.use("/api/upload", express.static("public"));
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is Running on PORT:${PORT}`));
