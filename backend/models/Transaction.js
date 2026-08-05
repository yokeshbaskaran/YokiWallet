import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    payment: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Transaction", transactionSchema);
