import { LiaRupeeSignSolid } from "react-icons/lia";
import {
  type TransactionType,
  getCategoryLabel,
  getPaymentLabel,
} from "../utils/helpers";

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

  return (
    <>
      <>
        <section
          key={_id}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex justify-between items-center"
        >
          {/* 1.  Details  */}
          <div className="flex gap-3 yoki">
            {/* icon  */}
            <div
              className={`w-12 h-12 rounded-md flex items-center justify-center text-xl ${
                type === "expense" ? "bg-red-100" : "bg-green-100"
              }`}
            >
              {categoryLabel.split(" ").pop()}
            </div>

            {/* Expense category and Date */}
            <div>
              <h3 className="font-semibold text-lg">{categoryLabel}</h3>
              <p className="text-sm font-medium text-gray-400">
                {new Date(date).toLocaleDateString("en-GB").replace(/\//g, ".")}
              </p>

              <p className="text-sm ">{notes}</p>
            </div>
          </div>

          {/* 2. Expense Details  */}
          <div className="yokii flex flex-col items-end">
            <div
              className={`yoki flex items-center font-bold text-lg  ${
                type === "expense" ? "text-red-600" : "text-green-600"
              }`}
            >
              {type === "expense" ? "-" : "+"}
              <LiaRupeeSignSolid size={20} />
              {amount}
            </div>

            <div className="text-xs">
              {paymentLabel}
              {/* {paymentLabel.split(" ").pop() === "💳"
                ? "Debit Card 💳"
                : paymentLabel === "🟣📱"
                  ? "PhonePe 🟣📱"
                  : paymentLabel === "🔵📱"
                    ? "GPay 🔵📱"
                    : paymentLabel === "💵"
                      ? "Cash 💵"
                      : paymentLabel} */}
            </div>
          </div>
        </section>
      </>
    </>
  );
};

export default SingleTransaction;
