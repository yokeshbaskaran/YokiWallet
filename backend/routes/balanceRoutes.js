import express from "express";

import {
  createBalance,
  getBalances,
  getBalanceByType,
  updateBalance,
  deleteBalance,
} from "../controllers/balanceController.js";

const router = express.Router();

// // Get All
// router.get("/", getBalances);
// Get Balance by Type (Cash or Online Balance)
router.get("/:type", getBalanceByType);

// Create
router.post("/", createBalance);

// // Update
// router.put("/:id", updateBalance);
// // Delete
// router.delete("/:id", deleteBalance);

export default router;
