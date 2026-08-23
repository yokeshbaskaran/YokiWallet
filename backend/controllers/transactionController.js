import Transaction from "../models/Transaction.js";
import Balance from "../models/Balance.js";
import { changeBalance } from "../controllers/balanceController.js";

// GET ALL TRANSACTIONS
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({
      date: -1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    console.error("Get Transactions Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create transaction
export const createTransaction = async (req, res) => {
  try {
    const { type, amount, category, payment, date, notes } = req.body;

    if (!type || !amount || !category || !payment || !date) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // 1. Change balance
    const balance = await changeBalance({
      type,
      payment,
      amount,
    });

    // 2. Create transaction
    const transaction = await Transaction.create({
      type,
      amount,
      category,
      payment,
      date,
      notes,
    });

    res.status(201).json({
      success: true,

      message: "Transaction added successfully",

      data: transaction,

      balance,
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE TRANSACTION
export const getTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    res.status(200).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    console.error("Get Transaction Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE TRANSACTION
export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Find transaction
    const transaction = await Transaction.findById(id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    // 2. Find balance
    const balance = await Balance.findOne();

    if (!balance) {
      return res.status(404).json({
        success: false,
        message: "Balance not found",
      });
    }

    // 3. Find which balance to update
    let balanceField;

    if (transaction.payment === "cash") {
      // For Cash in hand Balance
      balanceField = "cashBalance";
    } else if (
      // For Online Balance
      transaction.payment === "gpay" ||
      transaction.payment === "phonepe" ||
      transaction.payment === "debit_card"
    ) {
      balanceField = "onlineBalance";
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid payment method",
      });
    }

    // 4. Reverse transaction
    //
    // Original income:
    // Balance + amount
    // Delete income:
    // Balance - amount
    //
    // Original expense:
    // Balance - amount
    // Delete expense:
    // Balance + amount

    if (transaction.type === "income") {
      balance[balanceField] -= transaction.amount;
    } else {
      balance[balanceField] += transaction.amount;
    }

    // 5. Save updated balance
    await balance.save();

    // 6. Delete transaction
    await Transaction.findByIdAndDelete(id);

    // 7. Calculate total
    const totalBalance = balance.cashBalance + balance.onlineBalance;

    res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",

      deletedTransaction: transaction,

      balance: {
        cashBalance: balance.cashBalance,
        onlineBalance: balance.onlineBalance,
        totalBalance,
      },
    });
  } catch (error) {
    console.error("Delete Transaction Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
