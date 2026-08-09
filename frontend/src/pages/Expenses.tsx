import { useRef, useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { BiSolidBellPlus, BiSolidBellMinus } from "react-icons/bi";
import { TbShoppingCartSearch } from "react-icons/tb";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { FaAmazonPay } from "react-icons/fa6";
import { CgNotes } from "react-icons/cg";
import { API_URL, useAppContext } from "../context/AppContext";
import axios from "axios";
import { expenseCategories, incomeCategories } from "../utils/helpers";

//types
type TransactionMode = "income" | "expense";

type TransactionType = {
  _id?: string;
  type: TransactionMode;
  amount: number;
  category: string;
  date: string;
  payment: string;
  notes?: string;
};

const createTransaction = async (transactionData: TransactionType) => {
  try {
    const response = await axios.post(
      API_URL + "/transaction",
      transactionData,
    );
    // console.log("New transaction created!", response);
    return response.data;
  } catch (error) {
    console.error("Create Transaction Error:", error);
    throw error;
  }
};

//Page starts
const Expenses = () => {
  const { pathToHome } = useAppContext();

  const today = new Date().toISOString().split("T")[0];
  const dateInputRef = useRef<HTMLInputElement>(null);

  const [transactionType, setTransactionType] =
    useState<TransactionMode>("expense");

  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    date: today,
    payment: "",
    notes: "",
  });

  const categories =
    transactionType === "expense" ? expenseCategories : incomeCategories;

  const payments = [
    { label: "Cash in hand 💵", value: "cash" },
    { label: "Google Pay (GPay) 🔵📱", value: "gpay" },
    { label: "PhonePe 🟣📱", value: "phonepe" },
    { label: "Debit card 💳", value: "debit_card" },
  ];

  //function
  const handleSaveButton = async () => {
    if (!formData.amount || !formData.category || !formData.payment) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const transaction = {
        type: transactionType,
        amount: Number(formData.amount),
        category: formData.category,
        date: formData.date,
        payment: formData.payment,
        notes: formData.notes,
      };

      const response = await createTransaction(transaction);
      console.log(response.data);
      alert("Transaction Saved");

      setFormData({
        amount: "",
        category: "",
        date: today,
        payment: "",
        notes: "",
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(
          error.response?.data?.message || "Something went wrong while saving.",
        );
      } else {
        console.log("Something went wrong!!!");
      }
    }
  };

  // UI design for EXPENSE Page starts here.
  return (
    <>
      <section className="min-h-screen mb-8">
        {/* 1. Top Header  */}
        <div className="grid grid-cols-3 items-center">
          <button
            onClick={pathToHome}
            className="p-2 justify-self-start text-text cursor-pointer border border-border rounded-full hover:bg-bg-hover"
          >
            {/* Back button  */}
            <IoArrowBackSharp size={20} />
          </button>

          <h3 className="justify-self-center text-base text-text font-semibold">
            Add Transaction
            <p className="text-xs font-normal text-center text-text-muted">
              <span className="text-green-600">Earn</span> /
              <span className="text-red-400"> Spend</span>
            </p>
          </h3>

          <div></div>
        </div>

        {/* 2. Earn & Spend button */}
        <div className="w-full pt-5 flex items-center justify-center gap-3">
          <button
            onClick={() => setTransactionType("income")}
            className={`flex-1 py-3 rounded-lg font-semibold flex items-center justify-center gap-1 transition-all duration-300 cursor-pointer ${
              transactionType === "income"
                ? "bg-green-700 text-white"
                : "border-2 border-green-700 text-green-700 bg-white hover:bg-green-50"
            }`}
          >
            <span> YokiEarn</span>
            <BiSolidBellPlus size={20} />
          </button>

          <button
            onClick={() => setTransactionType("expense")}
            className={`flex-1 py-3 rounded-lg font-semibold flex items-center justify-center gap-1 transition-all duration-300 cursor-pointer ${
              transactionType === "expense"
                ? "bg-red-700 text-white"
                : "border-2 border-red-700 text-red-700 bg-white hover:bg-red-50"
            }`}
          >
            <span>YokiSpend</span>
            <BiSolidBellMinus size={20} />
          </button>

          {/* <button className="flex-1 px-5 py-2 flex items-center justify-center gap-1 text-white text-lg bg-green-800 font-semibold rounded-md">
            <span> YokiEarn</span>
            <BiSolidBellPlus size={20} />
          </button>
          <button className="flex-1 px-5 py-2 flex items-center justify-center gap-1 text-white text-lg bg-red-800 font-semibold rounded-md">
            <span>YokiSpend</span>
            <BiSolidBellMinus size={20} />
          </button> */}
        </div>

        {/* 3. User Transaction Details  */}
        <section>
          {/* Transaction Amount  */}
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-text-muted">Amount</h3>

            <div className="mt-2 p-2 flex items-center gap-3 border border-border rounded-md">
              <LiaRupeeSignSolid size={20} />
              <input
                type="number"
                className="w-full text-lg font-normal outline-none"
                placeholder="Enter amount"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
              />
            </div>
          </div>

          {/* Category  */}
          <div className="mt-3">
            <h3 className="text-sm font-semibold text-text-muted">Category</h3>

            <div className="mt-2 p-2 flex items-center gap-3 border border-border rounded-md">
              <TbShoppingCartSearch size={20} />
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value,
                  })
                }
                className="w-full outline-none bg-transparent"
              >
                <option value="">Select Category</option>

                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date  */}
          <div className="mt-3">
            <h3 className="text-sm font-semibold text-text-muted">Date</h3>

            <div className="mt-2 p-2 flex items-center gap-3 border border-border rounded-md">
              <button
                className="cursor-pointer"
                onClick={() => {
                  if (dateInputRef.current?.showPicker) {
                    dateInputRef.current.showPicker();
                  } else {
                    dateInputRef.current?.focus();
                  }
                }}
              >
                <HiOutlineCalendarDateRange size={20} />
              </button>
              <input
                type="date"
                ref={dateInputRef}
                value={formData.date}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    date: e.target.value,
                  })
                }
                className="w-full outline-none custom-date"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="mt-3">
            <h3 className="text-sm font-semibold text-text-muted">
              Payment Method
            </h3>

            <div className="mt-2 p-2 flex items-center gap-3 border border-border rounded-md">
              <FaAmazonPay size={20} />
              <select
                value={formData.payment}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    payment: e.target.value,
                  })
                }
                className="w-full outline-none bg-transparent"
              >
                <option value="">Choose Payment</option>

                {payments.map((pay) => (
                  <option key={pay.value} value={pay.value}>
                    {pay.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Notes  */}
          <div className="mt-3">
            <h3 className="text-sm font-semibold text-text-muted">
              Notes (Optional)
            </h3>

            <div className="mt-2 p-2 flex items-start gap-3 border border-border rounded-md">
              <CgNotes size={20} />
              <textarea
                rows={3}
                placeholder="Bought these shoes from Amazon for Daily use"
                value={formData.notes}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    notes: e.target.value,
                  })
                }
                className="w-full resize-none outline-none"
              />
            </div>
          </div>

          {/* Save to DB  */}
          <button
            onClick={handleSaveButton}
            className="mt-3 w-full p-2 bg-primary text-white rounded-md cursor-pointer hover:opacity-90"
          >
            Save Expense
          </button>
        </section>
      </section>
    </>
  );
};

export default Expenses;
