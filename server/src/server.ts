import express, { Express } from "express";
import dotnevn from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import compression from "compression";

import { connectDB } from "./config/connectDb.ts";
import { errorHandler, notFound } from "./middleware/error.middlewares.ts";

import authRoutes from "./modules/auth/auth.routes.ts";
import productRoutes from "./modules/admin/product/product.routes.ts";
import customerRoutes from "./modules/admin/customer/customer.routes.ts";
import messageRoutes from "./modules/admin/message/message.routes.ts";
import serviceRoutes from "./modules/admin/service/service.routes.ts";
import userRoutes from "./modules/users/users.routes.ts";
import orderRoutes from "./modules/admin/order/order.routes.ts";
import serviceBookRoutes from "./modules/admin/serviceBook/serviceBook.routes.ts";
import productCategoriesRoutes from "./modules/admin/productCategories/category.routes.ts";
import serviceCategoriesRoutes from "./modules/admin/serviceCategories/category.routes.ts";
import archiveRoutes from "./modules/admin/archive/archive.routes.ts";

// Init
dotnevn.config();
connectDB();
const app: Express = express();
const PORT: string | number = process.env.PORT || 5000;

app.use(cors({ origin: process.env.BASE_URL, credentials: true }));
app.use(helmet());
app.use(cookieParser());
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Image
app.use("/api/v1/upload", express.static("public"));

// routes

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product-categories", productCategoriesRoutes);
app.use("/api/v1/service-category", serviceCategoriesRoutes);
app.use("/api/v1/customer", customerRoutes);
app.use("/api/v1/message", messageRoutes);
app.use("/api/v1/service", serviceRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/service-book", serviceBookRoutes);
app.use("/api/v1/archive", archiveRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is Running on PORT:${PORT}`));
