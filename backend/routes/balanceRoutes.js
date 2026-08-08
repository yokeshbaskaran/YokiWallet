import express from "express";

import { getBalance, updateBalance } from "../controllers/balanceController.js";

const router = express.Router();

// Get Current Cash + Online and Total Amount Balance
router.get("/", getBalance);

// update balance
router.put("/", updateBalance);

export default router;
