import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  type: "cash" | "online";
};

const BalanceModal = ({ open, onClose, type }: Props) => {
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");

  if (!open) return null;

  //   API Function
  //   const addBalance = async (data: any) => {
  //     const response = await API.post("/balance", data);

  //     return response.data;
  //   };

  //   const handleSave = async () => {
  //     if (!amount) {
  //       alert("Enter Amount");

  //       return;
  //     }

  //     await addBalance({
  //       type,
  //       amount,
  //       notes,
  //     });

  //     onClose();
  //   };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[90%] max-w-sm p-5">
        <h2 className="text-xl font-bold mb-5 text-center">
          {type === "cash" ? "Add Cash Amount" : "Add Online Balance"}
        </h2>

        <div className="space-y-4">
          <input
            type="number"
            placeholder="Enter Amount"
            className="w-full border rounded-lg p-3"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

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
            className="flex-1 bg-gray-200 rounded-lg py-3"
          >
            Cancel
          </button>

          <button className="flex-1 bg-primary text-white rounded-lg py-3">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default BalanceModal;
