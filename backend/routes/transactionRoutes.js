import express from "express";

import {
  createTransaction,
  getTransactions,
  getTransaction,
  recentsTransactions,
  deleteTransaction,
} from "../controllers/transactionController.js";

const router = express.Router();

router.get("/", getTransactions);
router.get("/:id", getTransaction);
router.post("/", createTransaction);
router.get("/latest", recentsTransactions);
router.delete("/:id", deleteTransaction);

export default router;
