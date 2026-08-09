import axios from "axios";
import { API_URL } from "../context/AppContext";
import { useEffect, useState } from "react";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { expenseCategories, incomeCategories } from "../utils/helpers";

type Transaction = {
  _id: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  payment: string;
  date: string;
  notes?: string;
};

// Get category label from value
const getCategoryLabel = (category: string, type: "income" | "expense") => {
  const categories = type === "expense" ? expenseCategories : incomeCategories;

  return categories.find((item) => item.value === category)?.label || category;
};

const Recents = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const getAllTransactions = async () => {
      try {
        const response = await axios.get(API_URL + "/transaction");

        // Sort transactions based on date
        const sortedTransactions = response.data.data
          .sort(
            (a: Transaction, b: Transaction) =>
              new Date(b.date).getTime() - new Date(a.date).getTime(),
          )
          .slice(0, 4);

        setTransactions(sortedTransactions);
      } catch (error) {
        console.error(error);
      }
    };

    getAllTransactions();
  }, []);

  return (
    <section>
      <div className="space-y-3">
        {transactions.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No Transactions Found
          </div>
        ) : (
          transactions.map((item) => {
            const categoryLabel = getCategoryLabel(item.category, item.type);

            return (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex justify-between items-center"
              >
                <div className="flex gap-3">
                  {/* icon  */}
                  <div
                    className={`w-12 h-12 rounded-md flex items-center justify-center text-xl ${
                      item.type === "expense" ? "bg-red-100" : "bg-green-100"
                    }`}
                  >
                    {categoryLabel.split(" ").pop()}
                  </div>

                  {/* Expense category and Date */}
                  <div>
                    <h3 className="font-semibold text-lg">{categoryLabel}</h3>
                    <p className="text-sm font-medium text-gray-400">
                      {new Date(item.date)
                        .toLocaleDateString("en-GB")
                        .replace(/\//g, ".")}
                    </p>
                  </div>
                </div>

                {/* Expense Details  */}
                <div
                  className={`flex items-center font-bold text-lg ${
                    item.type === "expense" ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {item.type === "expense" ? "-" : "+"}
                  <LiaRupeeSignSolid size={20} />
                  {item.amount}
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

export default Recents;
