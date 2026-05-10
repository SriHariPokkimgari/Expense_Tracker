import { Router } from "express";
import authMiddlerware from "../middleware/authMiddleware.js";
import { getCategories } from "../controllers/categoryController.js";

const router = Router();

router.get("/", authMiddlerware, getCategories);

export default router;
