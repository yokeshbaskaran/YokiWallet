import axios from "axios";
import { API_URL } from "../context/AppContext";
import { useEffect, useState } from "react";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { FaAngleRight } from "react-icons/fa6";

type Transaction = {
  _id: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  payment: string;
  date: string;
  notes?: string;
};

const Recents = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const getAllTransactions = async () => {
      try {
        const response = await axios.get(API_URL + "/");

        // sorts the transactions based on date
        const sortedTransactions = response.data.data.sort(
          (a: Transaction, b: Transaction) =>
            new Date(b.date).getTime() - new Date(a.date).getTime(),
        );

        setTransactions(sortedTransactions);
      } catch (error) {
        console.error(error);
      }
    };

    getAllTransactions();
  }, []);

  return (
    <section className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Recent Transactions</h2>

        <button className="text-primary text-sm font-medium flex items-center gap-1 cursor-pointer">
          <span> See All</span>
          <FaAngleRight size={12} className="mt-1" />
        </button>
      </div>

      <div className="space-y-3">
        {transactions.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No Transactions Found
          </div>
        ) : (
          transactions.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex justify-between items-center"
            >
              <div className="flex gap-3">
                <div
                  className={`w-12 h-12 rounded-md flex items-center justify-center text-xl ${
                    item.type === "expense" ? "bg-red-100" : "bg-green-100"
                  }`}
                >
                  {item.category.split(" ").pop()}
                </div>

                <div>
                  <h3 className="font-semibold">{item.category}</h3>

                  {/* <p className="text-sm text-gray-500">{item.payment}</p> */}

                  <p className="text-xs font-semibold text-gray-400">
                    {new Date(item.date)
                      .toLocaleDateString("en-GB")
                      .replace(/\//g, ".")}
                  </p>
                </div>
              </div>

              <div
                className={`flex items-center font-bold text-lg ${
                  item.type === "expense" ? "text-red-600" : "text-green-600"
                }`}
              >
                {item.type === "expense" ? "-" : "+"}

                <LiaRupeeSignSolid />

                {item.amount}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Recents;
