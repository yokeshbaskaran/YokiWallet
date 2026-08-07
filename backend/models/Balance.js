import mongoose from "mongoose";

const balanceSchema = new mongoose.Schema(
  {
    amountType: {
      type: String,
      enum: ["cash", "online"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      default: "",
    },
    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Balance", balanceSchema);
