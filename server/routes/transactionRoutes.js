import Router from "express";
import {
  getAllTransactions,
  createTranactions,
  updateTransaction,
  deleteTransaction,
  getTransactionById,
} from "../controllers/transactionController.js";
import authMiddlerware from "../middleware/authMiddleware.js";
const router = Router();

router.get("/", authMiddlerware, getAllTransactions);
router.get("/:id", authMiddlerware, getTransactionById);
router.post("/", authMiddlerware, createTranactions);
router.put("/:id", authMiddlerware, updateTransaction);
router.delete("/:id", authMiddlerware, deleteTransaction);

export default router;
