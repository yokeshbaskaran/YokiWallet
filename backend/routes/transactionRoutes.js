import express from "express";

import {
  createTransaction,
  getTransactions,
  // getTransaction,
  recentsTransactions,
  deleteTransaction,
} from "../controllers/transactionController.js";

const router = express.Router();

router.get("/", getTransactions);
router.get("/latest", recentsTransactions);
// router.get("/:id", getTransaction);
router.post("/", createTransaction);
router.delete("/:id", deleteTransaction);

export default router;
