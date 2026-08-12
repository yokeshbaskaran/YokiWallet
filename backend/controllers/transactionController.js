import Transaction from "../models/Transaction.js";
import { changeBalance } from "../controllers/balanceController.js";

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

// UPDATE TRANSACTION
export const updateTransaction = async (req, res) => {
  try {
    const oldTransaction = await Transaction.findById(req.params.id);

    if (!oldTransaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    const newData = {
      type: req.body.type ?? oldTransaction.type,
      amount: req.body.amount ?? oldTransaction.amount,
      category: req.body.category ?? oldTransaction.category,
      payment: req.body.payment ?? oldTransaction.payment,
      date: req.body.date ?? oldTransaction.date,
      notes: req.body.notes ?? oldTransaction.notes,
    };

    const newAmount = Number(newData.amount);

    if (newAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be greater than 0",
      });
    }

    const oldField = getBalanceField(oldTransaction.payment);
    const newField = getBalanceField(newData.payment);

    if (!oldField || !newField) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment method!!",
      });
    }

    const balance = await Balance.findOne();

    if (!balance) {
      return res.status(400).json({
        success: false,
        message: "Balance not found",
      });
    }

    // Reverse old transaction
    const oldSign = getTransactionSign(oldTransaction.type);
    balance[oldField] -= oldTransaction.amount * oldSign;

    // Apply new transaction
    const newSign = getTransactionSign(newData.type);
    const newBalance = balance[newField] + newAmount * newSign;

    if (newBalance < 0) {
      return res.status(400).json({
        success: false,
        message: "Insufficient balance",
      });
    }

    balance[newField] = newBalance;

    await balance.save();

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      newData,
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({
      success: true,
      message: "Transaction Updated Successfully",
      data: updatedTransaction,
      balance: {
        cashBalance: balance.cashBalance,
        onlineBalance: balance.onlineBalance,
        totalBalance: balance.cashBalance + balance.onlineBalance,
      },
    });
  } catch (error) {
    console.error("Update Transaction Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE TRANSACTION
export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    const balance = await Balance.findOne();
    if (!balance) {
      return res.status(400).json({
        success: false,
        message: "Balance not found",
      });
    }

    const balanceField = getBalanceField(transaction.payment);
    const sign = getTransactionSign(transaction.type);

    // Reverse transaction
    balance[balanceField] -= transaction.amount * sign;

    await balance.save();

    await Transaction.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Transaction Deleted Successfully",
      balance: {
        cashBalance: balance.cashBalance,
        onlineBalance: balance.onlineBalance,
        totalBalance: balance.cashBalance + balance.onlineBalance,
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
