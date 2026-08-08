import Balance from "../models/Balance.js";

// GET CURRENT BALANCE
export const getBalance = async (req, res) => {
  try {
    let balance = await Balance.findOne();

    // Create balance document if it doesn't exist
    if (!balance) {
      balance = await Balance.create({
        cashBalance: 0,
        onlineBalance: 0,
      });
    }

    const totalBalance = balance.cashBalance + balance.onlineBalance;

    res.status(200).json({
      success: true,
      data: {
        cashBalance: balance.cashBalance,
        onlineBalance: balance.onlineBalance,
        totalBalance,
      },
    });
  } catch (error) {
    console.error("Get Balance Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// SET / UPDATE INITIAL BALANCE
export const updateBalance = async (req, res) => {};
