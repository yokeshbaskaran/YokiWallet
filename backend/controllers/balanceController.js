import Balance from "../models/Balance.js";

// ==================================================
// GET CURRENT BALANCE
// ==================================================

export const getBalance = async (req, res) => {
  try {
    let balance = await Balance.findOne();

    if (!balance) {
      balance = await Balance.create({
        cashBalance: 0,
        onlineBalance: 0,
      });
    }

    res.status(200).json({
      success: true,

      data: {
        cashBalance: balance.cashBalance,
        onlineBalance: balance.onlineBalance,

        totalBalance: balance.cashBalance + balance.onlineBalance,
      },
    });
  } catch (error) {
    console.error("Get Balance Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get balance",
    });
  }
};

// ==================================================
// SET INITIAL / MANUAL BALANCE
// ==================================================

export const updateBalance = async (req, res) => {
  try {
    const { type, amount } = req.body;

    if (!type || amount === undefined) {
      return res.status(400).json({
        success: false,
        message: "Type and amount are required",
      });
    }

    if (!["cash", "online"].includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid balance type",
      });
    }

    const numericAmount = Number(amount);

    if (!Number.isFinite(numericAmount) || numericAmount < 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid amount",
      });
    }

    const updateField =
      type === "cash"
        ? {
            cashBalance: numericAmount,
          }
        : {
            onlineBalance: numericAmount,
          };

    const balance = await Balance.findOneAndUpdate(
      {},
      {
        $set: updateField,
      },
      {
        returnDocument: "after",
        upsert: true,
        runValidators: true,
      },
    );

    res.status(200).json({
      success: true,

      message:
        type === "cash"
          ? "Cash balance updated successfully"
          : "Online balance updated successfully",

      data: {
        cashBalance: balance.cashBalance,

        onlineBalance: balance.onlineBalance,

        totalBalance: balance.cashBalance + balance.onlineBalance,
      },
    });
  } catch (error) {
    console.error("Update Balance Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update balance",
    });
  }
};

// ==================================================
// CHANGE BALANCE FROM TRANSACTION
// ==================================================

export const changeBalance = async ({ type, payment, amount }) => {
  const numericAmount = Number(amount);

  if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
    throw new Error("Transaction amount must be greater than 0");
  }

  // -----------------------------------------------
  // Determine Cash or Online
  // -----------------------------------------------

  let balanceField;

  if (payment === "cash") {
    balanceField = "cashBalance";
  }

  if (payment === "gpay" || payment === "phonepe") {
    balanceField = "onlineBalance";
  }

  if (!balanceField) {
    throw new Error("Invalid payment method");
  }

  // -----------------------------------------------
  // Get balance
  // -----------------------------------------------

  let balance = await Balance.findOne();

  if (!balance) {
    throw new Error("Please set your initial balance first");
  }

  // -----------------------------------------------
  // Income = +
  // Expense = -
  // -----------------------------------------------

  if (type === "income") {
    balance[balanceField] += numericAmount;
  }

  if (type === "expense") {
    balance[balanceField] -= numericAmount;
  }

  // -----------------------------------------------
  // Prevent negative balance
  // -----------------------------------------------

  if (balance[balanceField] < 0) {
    throw new Error(
      `Insufficient ${
        balanceField === "cashBalance" ? "cash" : "online"
      } balance`,
    );
  }

  await balance.save();

  return {
    cashBalance: balance.cashBalance,

    onlineBalance: balance.onlineBalance,

    totalBalance: balance.cashBalance + balance.onlineBalance,
  };
};
