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
          className="bg-white rounded shadow-sm border border-border-strong p-3 flex justify-between items-center"
        >
          {/* 1.  Details  */}
          <div className="flex gap-3">
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
              <p className="text-sm font-medium text-primary">
                {new Date(date).toLocaleDateString("en-GB").replace(/\//g, ".")}
              </p>

              <p className="my-1 text-xs text-text-muted">{notes}</p>
            </div>
          </div>

          {/* 2. Expense Details  */}
          <div className="flex flex-col items-end">
            <div
              className={`flex items-center font-bold text-xl  ${
                type === "expense" ? "text-red-600" : "text-green-600"
              }`}
            >
              <span> {type === "expense" ? "-" : "+"}</span>
              <span> {amount}</span>
              <span className="mt-1">
                <LiaRupeeSignSolid size={20} />
              </span>
            </div>

            <div className="text-xs">{paymentLabel}</div>
          </div>
        </section>
      </>
    </>
  );
};

export default SingleTransaction;
