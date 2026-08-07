import Balance from "../models/Balance.js";

// Create Balance
export const createBalance = async (req, res) => {
  try {
    const balance = await Balance.create(req.body);
    console.log("req.body:", req.body);

    res.status(201).json({
      success: true,
      message: "Balance Added Successfully",
      data: balance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Balances
export const getBalances = async (req, res) => {
  try {
    const balances = await Balance.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: balances.length,
      data: balances,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Balance by Type (cash / online)
export const getBalanceByType = async (req, res) => {
  try {
    const { type } = req.params;
    console.log("type:", type);

    const balance = await Balance.findOne({ type });

    if (!balance) {
      return res.status(404).json({
        success: false,
        message: `${type} balance not found`,
      });
    }

    res.status(200).json({
      success: true,
      data: balance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Balance
export const updateBalance = async (req, res) => {
  try {
    const balance = await Balance.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!balance) {
      return res.status(404).json({
        success: false,
        message: "Balance Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Balance Updated Successfully",
      data: balance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Balance
export const deleteBalance = async (req, res) => {
  try {
    const balance = await Balance.findByIdAndDelete(req.params.id);

    if (!balance) {
      return res.status(404).json({
        success: false,
        message: "Balance Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Balance Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
