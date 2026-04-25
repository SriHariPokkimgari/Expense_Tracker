import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import authRouter from "./routes/authRoutes.js";
import transactionRouter from "./routes/transactionRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/transactions", transactionRouter);

const port = process.env.PORT || 9000;
app.listen(port, () =>
  console.log(`Server is running at 'http://localhost:${port}'`),
);
