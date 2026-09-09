import axios from "axios";
import { useState } from "react";

import { LiaRupeeSignSolid } from "react-icons/lia";
import { IoAddOutline, IoCloseOutline, IoTrashOutline } from "react-icons/io5";
import { GoGoal } from "react-icons/go";

import { API_URL } from "../context/AppContext";

// TYPES
type Goal = {
  id: number;
  name: string;
  price: number;
};

type AddGoalModalProps = {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

// ==========================================
// GOALS PAGE
// ==========================================

const Goals = () => {
  const [goals, setGoals] = useState<Goal[]>([]);

  const [openModal, setOpenModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleRefreshGoals = () => {
    console.log("Refresh goals");
  };

  const handleDeleteGoal = async (id: number) => {
    try {
      setLoading(true);

      // await axios.delete(`${API_URL}/goals/${id}`);
      setGoals((prev) => prev.filter((goal) => goal.id !== id));
    } catch (error) {
      console.error("Delete Goal Error:", error);

      alert("Failed to delete goal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-3 bg-bg">
      <div className="mx-auto w-full max-w-2xl">
        {/* DEMO  */}

        {/* 1. Goals header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
              <GoGoal size={20} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Goals</h2>
          </div>

          {/* Add Goal button */}
          <button
            onClick={() => setOpenModal(true)}
            className="flex cursor-pointer items-center gap-2 rounded-lg bg-blue-700 p-2.5 font-medium text-white hover:bg-blue-800"
          >
            <IoAddOutline size={20} />

            <span>Add Goal</span>
          </button>
        </div>

        {/* 2. GOALS LIST */}
        {goals.length > 0 && (
          <div className="mt-6">
            <h2 className="mb-3 text-lg font-semibold text-text">My Goals</h2>

            <div className="space-y-3">
              {goals.map((goal, index) => (
                <div
                  key={goal.id}
                  className="flex items-center justify-between rounded-xl border border-border bg-bg p-4 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    {/* Number */}

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
                      {index + 1}
                    </div>

                    {/* Goal Details */}

                    <div>
                      <p className="font-semibold text-text">{goal.name}</p>

                      <div className="mt-1 flex items-center text-sm font-medium text-text-muted">
                        <LiaRupeeSignSolid size={17} />

                        {goal.price.toLocaleString("en-IN")}
                      </div>
                    </div>
                  </div>

                  {/* Delete */}

                  <button
                    onClick={() => handleDeleteGoal(goal.id)}
                    disabled={loading}
                    className="cursor-pointer rounded-lg p-2 text-red-500 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <IoTrashOutline size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {goals.length === 0 && (
          <div className="mt-6 rounded-xl border border-dashed border-border p-8 text-center">
            <p className="text-sm text-text-muted">No goals added yet.</p>

            <button
              onClick={() => setOpenModal(true)}
              className="mt-3 p-3 cursor-pointer text-sm font-semibold border border-border-strong rounded-md text-blue-800 hover:text-white hover:bg-blue-800"
            >
              Add your first goal
            </button>
          </div>
        )}
      </div>

      {/* ADD GOAL MODAL */}
      <AddGoalModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={handleRefreshGoals}
      />
    </div>
  );
};

export default Goals;

const AddGoalModal = ({ open, onClose, onSuccess }: AddGoalModalProps) => {
  const [goalName, setGoalName] = useState("");
  const [price, setPrice] = useState("");

  const [loading, setLoading] = useState(false);

  // Don't render when closed
  if (!open) {
    return null;
  }

  // CLOSE MODAL
  const handleClose = () => {
    if (loading) return;

    setGoalName("");
    setPrice("");

    onClose();
  };

  // Pages starts here
  const handleSave = async () => {
    // Required validation
    if (!goalName.trim()) {
      alert("Please enter goal name");
      return;
    }

    if (!price.trim()) {
      alert("Please enter goal price");
      return;
    }

    const numericPrice = Number(price);

    // Number validation
    if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
      alert("Price must be greater than 0");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(`${API_URL}/goals`, {
        name: goalName.trim(),
        price: numericPrice,
      });

      console.log("Goal Added:", response.data);

      alert("Goal added successfully!");

      // Clear inputs
      setGoalName("");
      setPrice("");

      // Refresh goals
      onSuccess?.();

      // Close popup
      onClose();
    } catch (error) {
      console.error("Add Goal Error:", error);

      alert("Failed to add goal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-bg p-5 shadow-xl">
        {/* Header */}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
              <IoAddOutline size={26} />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-text">Add Goal</h2>

              <p className="mt-0.5 text-xs text-text-muted">
                Create a new goal you want to achieve
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

        {/* Goal Name */}

        <div className="mt-6">
          <h3 className="text-sm font-semibold text-text-muted">
            Name of Goal
          </h3>

          <input
            type="text"
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
            placeholder="e.g. Buy a watch"
            className="mt-2 w-full rounded-lg border border-border bg-bg p-3 outline-none focus:border-blue-500"
            disabled={loading}
          />
        </div>

        {/* Price */}

        <div className="mt-5">
          <h3 className="text-sm font-semibold text-text-muted">Goal Price</h3>

          <div className="mt-2 flex w-full items-center gap-3 rounded-lg border border-border bg-bg p-3">
            <LiaRupeeSignSolid size={22} />

            <input
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="2,500"
              className="w-full bg-transparent text-lg font-semibold outline-none"
              disabled={loading}
            />
          </div>
        </div>

        {/* Buttons */}

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
            className="flex-1 cursor-pointer rounded-lg bg-blue-700 py-3 font-medium text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};
