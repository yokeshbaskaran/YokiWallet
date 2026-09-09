import { LiaRupeeSignSolid } from "react-icons/lia";
import { getCategoryLabel } from "../utils/helpers";
import { useAppContext } from "../context/AppContext";
import { TbTrash } from "react-icons/tb";

const Recents = () => {
  const { recents, deleteTransaction } = useAppContext();
  // console.log("recents:", recents);

  return (
    <>
      <section className="space-y-3">
        {recents.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No Transactions Found
          </div>
        ) : (
          recents.map((item) => {
            const categoryLabel = getCategoryLabel(item.category, item.type);

            return (
              <section
                key={item._id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 flex justify-between items-start"
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
                    <h3 className="text-lg">
                      {/* {categoryLabel} */}
                      {categoryLabel.split(" ").slice(0, -1).join(" ")}
                    </h3>
                    <p className="text-sm font-medium text-text-muted">
                      {new Date(item.date)
                        .toLocaleDateString("en-GB")
                        .replace(/\//g, ".")}
                    </p>
                  </div>
                </div>

                {/* Expense Details  */}
                <section className="px-1 flex flex-col">
                  <div
                    className={`flex items-center gap-0.5 font-semibold text-lg ${
                      item.type === "expense"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    <span>{item.type === "expense" ? "-" : "+"}</span>
                    <span>{item.amount}</span>
                    <LiaRupeeSignSolid size={20} />
                  </div>

                  {/* DELETE Button  */}
                  <button
                    onClick={() => deleteTransaction(item._id, item.amount)}
                    className="mt-2 p-1 text-xs self-center border border-red-200 rounded-full cursor-pointer"
                  >
                    <TbTrash size={14} color="red" />
                  </button>
                </section>
              </section>
            );
          })
        )}
      </section>
    </>
  );
};

export default Recents;
