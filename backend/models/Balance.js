import mongoose from "mongoose";

const balanceSchema = new mongoose.Schema(
  {
    cashBalance: {
      type: Number,
      default: 0,
      min: 0,
    },

    onlineBalance: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Balance", balanceSchema);
