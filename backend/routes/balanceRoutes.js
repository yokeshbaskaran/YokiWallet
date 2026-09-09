import express from "express";

import {
  getBalance,
  updateBalance,
  exchangeMoney,
} from "../controllers/balanceController.js";

const router = express.Router();

// Get Current Cash + Online and Total Amount Balance
router.get("/", getBalance);

//money exchange
router.post("/", exchangeMoney);

// update balance
router.put("/", updateBalance);

export default router;
