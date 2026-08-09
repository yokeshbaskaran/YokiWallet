import { IoArrowBackSharp } from "react-icons/io5";
import { useAppContext } from "../context/AppContext";
import SingleTransaction from "../components/SingleTransaction";
import { useEffect } from "react";

const Transactions = () => {
  // functions and states
  const { pathToHome, transactions, getAllTransactions } = useAppContext();

  useEffect(() => {
    getAllTransactions();
  }, [getAllTransactions]);

  // UI design for EXPENSE Page starts here.
  return (
    <>
      <main className="min-h-screen mb-8">
        {/* 1. Top Header  */}
        <div className="grid grid-cols-3 items-center">
          <button
            onClick={pathToHome}
            className="p-2 justify-self-start text-text cursor-pointer border border-border rounded-full hover:bg-bg-hover"
          >
            {/* Back button  */}
            <IoArrowBackSharp size={20} />
          </button>

          <h3 className="justify-self-center text-xl text-text font-semibold">
            All Transactions
          </h3>
        </div>

        <section className="yoki my-5">
          <div>Monthly Calculations</div>
          {/* List of single transactions  */}

          <div>
            {transactions.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                No Transactions Found
              </div>
            ) : (
              <div>
                {transactions.map((transaction, idx) => (
                  <SingleTransaction key={idx} transaction={transaction} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default Transactions;
