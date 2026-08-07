import axios from "axios";
import { useState } from "react";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { API_URL } from "../context/AppContext";

type BalanceModalProps = {
  open: boolean;
  onClose: () => void;
  type: "cash" | "online";
};

type AmountType = "cash" | "online";

type AmountDetails = {
  amountType: AmountType;
  amount: number;
  notes: string;
};

const BalanceModal = ({ open, onClose, type }: BalanceModalProps) => {
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");

  if (!open) return null;

  const saveAmountBalance = async (data: AmountDetails) => {
    try {
      const response = await axios.post(API_URL + "/balance", data);
      console.log("Amount balance added!", response);

      return response.data;
    } catch (error) {
      console.error("Amount balance Error:", error);
      throw error;
    }
  };

  //   API Function
  const handleSave = async () => {
    try {
      if (!amount) {
        alert("Enter Amount");
        return;
      }

      const amountDetails = {
        amountType: type,
        amount: Number(amount),
        notes,
      };

      await saveAmountBalance(amountDetails);
      alert("Amount Balance Added!");
      onClose();
    } catch (error) {
      console.error("Amount balance Error!", error);
      throw error;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-45">
      <div className="bg-white rounded-2xl w-[90%] max-w-sm p-5">
        <h2 className="text-xl font-bold mb-5 text-center">
          {type === "cash" ? "Add Cash Amount" : "Add Online Balance"}
        </h2>

        <div className="space-y-4">
          {/*   Amount  */}
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-text-muted">Amount</h3>

            <div className="mt-2 p-2 flex items-center gap-3 border w-full rounded-md">
              <LiaRupeeSignSolid size={20} />
              <input
                type="number"
                className="w-full text-lg font-normal outline-none"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>

          <textarea
            rows={3}
            placeholder="Notes (optional)"
            className="w-full border rounded-lg p-3 resize-none"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 rounded-lg py-3 cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="flex-1 bg-primary text-white rounded-lg py-3 cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default BalanceModal;
