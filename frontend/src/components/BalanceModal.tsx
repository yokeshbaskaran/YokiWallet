import axios from "axios";
import { useState } from "react";

import { LiaRupeeSignSolid } from "react-icons/lia";
import { IoCloseOutline, IoWalletOutline } from "react-icons/io5";
import { FaGooglePay } from "react-icons/fa6";

import { API_URL } from "../context/AppContext";

// ==========================================
// TYPES
// ==========================================

type AmountType = "cash" | "online";

type BalanceModalProps = {
  open: boolean;
  onClose: () => void;
  type: AmountType;
  onSuccess?: () => void;
};

// ==========================================
// COMPONENT
// ==========================================

const BalanceModal = ({
  open,
  onClose,
  type,
  onSuccess,
}: BalanceModalProps) => {
  const [amount, setAmount] = useState("");

  const [loading, setLoading] = useState(false);

  // ========================================
  // Don't render when closed
  // ========================================

  if (!open) {
    return null;
  }

  // ========================================
  // CLOSE MODAL
  // ========================================

  const handleClose = () => {
    if (loading) return;

    setAmount("");

    onClose();
  };

  // ========================================
  // SAVE BALANCE
  // ========================================

  const handleSave = async () => {
    // Required validation
    if (!amount.trim()) {
      alert("Please enter amount");
      return;
    }

    const numericAmount = Number(amount);

    // Number validation
    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      alert("Amount must be greater than 0");

      return;
    }

    try {
      setLoading(true);

      // ------------------------------------
      // Send only the selected balance type
      // ------------------------------------

      const response = await axios.put(`${API_URL}/balance`, {
        type,
        amount: numericAmount,
      });

      console.log("Balance Updated:", response.data);

      // ------------------------------------
      // Success
      // ------------------------------------

      alert(
        type === "cash" ? "Cash Balance Updated!" : "Online Balance Updated!",
      );

      // Clear input
      setAmount("");

      // Refresh Homepage
      onSuccess?.();

      // Close popup
      onClose();
    } catch (error) {
      console.error("Balance Update Error:", error);

      alert(
        // error?.response?.data?.message ||
        "Failed to update balance",
      );
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // UI
  // ========================================

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-bg p-5 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                type === "cash"
                  ? "bg-green-100 text-green-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {type === "cash" ? (
                <IoWalletOutline size={24} />
              ) : (
                <FaGooglePay size={28} />
              )}
            </div>

            {/* Title */}

            <div>
              <h2 className="text-xl font-semibold text-text">
                {type === "cash" ? "Set Cash Balance" : "Set Online Balance"}
              </h2>

              <p className="mt-0.5 text-xs text-text-muted">
                {type === "cash"
                  ? "Set your current cash balance"
                  : "Set your current online balance"}
              </p>
            </div>
          </div>

          {/* Close */}

          <button
            onClick={handleClose}
            disabled={loading}
            className="cursor-pointer rounded-full p-2 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <IoCloseOutline size={25} />
          </button>
        </div>

        {/* Setting Amount button */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-text-muted">
            {type === "cash" ? "Cash Amount" : "Online Amount"}
          </h3>

          <div className="mt-2 flex w-full items-center gap-3 rounded-lg border border-border bg-bg p-3">
            <LiaRupeeSignSolid size={22} />

            <input
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={
                type === "cash" ? "Enter cash amount" : "Enter online amount"
              }
              className="w-full bg-transparent text-lg outline-none font-semibold"
              disabled={loading}
            />
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          {/* Cancel */}

          <button
            onClick={handleClose}
            disabled={loading}
            className="flex-1 cursor-pointer rounded-lg bg-gray-200 py-3 font-medium text-gray-700 hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>

          {/* Save */}

          <button
            onClick={handleSave}
            disabled={loading}
            className={`flex-1 cursor-pointer rounded-lg py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-60 ${
              type === "cash"
                ? "bg-green-700 hover:bg-green-800"
                : "bg-blue-700 hover:bg-blue-800"
            }`}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BalanceModal;
