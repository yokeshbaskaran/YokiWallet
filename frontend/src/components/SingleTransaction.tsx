import { LiaRupeeSignSolid } from "react-icons/lia";
import {
  type TransactionType,
  getCategoryLabel,
  getPaymentLabel,
} from "../utils/helpers";
import { TbTrash } from "react-icons/tb";
import axios from "axios";
import { API_URL } from "../context/AppContext";

type SingleTransactionProps = {
  transaction: TransactionType;
};

const SingleTransaction = ({ transaction }: SingleTransactionProps) => {
  const {
    _id,
    amount,
    type,
    payment,
    notes,
    category,
    date,
    // createdAt,
    // updatedAt,
  } = transaction;
  //   console.log("transaction:::", transaction);

  const categoryLabel = getCategoryLabel(category, type);

  const paymentLabel = getPaymentLabel(payment);

  // Delete transaction
  const deleteTransaction = async (id: string) => {
    const confirmAlertBtn = confirm("This transaction will be Deleted!");
    if (!confirmAlertBtn) return;

    try {
      const response = await axios.delete(API_URL + `/transaction/${id}`);
      alert(`Transaction - ${amount}$ Deleted!`);
      return response.data;
    } catch (error) {
      console.error("Delete Transaction Error:", error);
      throw error;
    }
  };

  return (
    <>
      <>
        <section
          key={_id}
          className="rounded-md bg-white shadow-md border border-border-strong px-3 py-2 flex justify-between items-center gap-1"
        >
          {/* 1.  Details  */}
          <div className="flex items-start gap-3">
            {/* icon  */}
            <div
              className={`px-4 size-12 rounded-md flex items-center justify-center text-xl ${
                type === "expense" ? "bg-red-100" : "bg-green-100"
              }`}
            >
              {categoryLabel.split(" ").pop()}
            </div>

            {/* Expense category and Date */}
            <div>
              <h3 className="font-semibold text-lg">{categoryLabel}</h3>
              <p className="text-sm font-medium text-primary">
                {new Date(date).toLocaleDateString("en-GB").replace(/\//g, ".")}
              </p>

              <p className="my-1 mr-2 pr-4 text-xs text-text-muted text-start">
                {/* {notes} */}
                {notes?.trim().split(/\s+/).slice(0, 25).join(" ")}
                {(notes?.trim().split(/\s+/).length ?? 0) > 25 && "..."}
              </p>
            </div>
          </div>

          {/* 2. Expense Details  */}
          <div className="px-1 flex flex-col items-end">
            <div
              className={`flex items-center gap-0.5 font-bold text-xl  ${
                type === "expense" ? "text-red-600" : "text-green-600"
              }`}
            >
              <span className="text-2xl">{type === "expense" ? "-" : "+"}</span>

              <span> {amount}</span>

              <span className="mt-1">
                <LiaRupeeSignSolid size={20} />
              </span>
            </div>

            <div className="px-2 whitespace-nowrap text-xs">{paymentLabel}</div>

            {/* DELETE Button  */}
            <button
              onClick={() => deleteTransaction(_id)}
              className="mt-4 p-1 text-xs self-center border border-red-200 rounded-full cursor-pointer"
            >
              <TbTrash size={14} color="red" />
            </button>
          </div>
        </section>
      </>
    </>
  );
};

export default SingleTransaction;
