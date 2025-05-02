import express from "express";
export const app = express();

import dotenv from "dotenv";
dotenv.config();

import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(cookieParser());

//routes
import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.routes.js";
import categoryRouter from "./routes/category.routes.js";
import cartRouter from "./routes/cart.routes.js";
import orderRouter from "./routes/order.routes.js";
import wishlistRouter from "./routes/wishlist.routes.js";
import commentRouter from "./routes/comment.routes.js";
import contactRouter from "./routes/contact.routes.js";
import reviewRouter from "./routes/review.routes.js";
import statsRouter from "./routes/stats.routes.js";

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/comment", commentRouter);
app.use("/api/contact", contactRouter);
app.use("/api/review", reviewRouter);
app.use("/api/stats", statsRouter);

//error handler
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFound } from "./middlewares/errorHandler.js";

app.use(notFound);
app.use(errorHandler);
