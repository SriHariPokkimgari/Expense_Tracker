import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import authRouter from "./routes/authRoutes.js";
import transactionRouter from "./routes/transactionRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "https://expensetrackerforever.netlify.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use("/api/auth", authRouter);
app.use("/api/transactions", transactionRouter);
app.use("/api/categories", categoryRouter);

const port = process.env.PORT || 9000;
app.listen(port, () =>
  console.log(`Server is running at 'http://localhost:${port}'`),
);
