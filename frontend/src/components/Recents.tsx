import { useEffect } from "react";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { getCategoryLabel } from "../utils/helpers";
import { useAppContext } from "../context/AppContext";

const Recents = () => {
  const { transactions, getAllTransactions } = useAppContext();

  useEffect(() => {
    getAllTransactions();
  }, [getAllTransactions]);

  return (
    <section>
      <div className="space-y-3">
        {transactions.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No Transactions Found
          </div>
        ) : (
          transactions.slice(0, 4).map((item) => {
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
                    <h3 className="text-lg">{categoryLabel}</h3>
                    <p className="text-sm font-medium text-text-muted">
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
