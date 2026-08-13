import { IoArrowBackSharp } from "react-icons/io5";
import { useAppContext } from "../context/AppContext";
import SingleTransaction from "../components/SingleTransaction";
import { useEffect } from "react";
import { GoSearch } from "react-icons/go";
import { TbFilterDollar } from "react-icons/tb";

const Transactions = () => {
  // functions and states
  const { pathToHome, transactions, getAllTransactions } = useAppContext();

  useEffect(() => {
    getAllTransactions();
  }, [getAllTransactions]);

  // UI design for EXPENSE Page starts here.
  return (
    <>
      <main className="min-h-screen  mb-20">
        {/* 1. Top Header  */}
        <section className="grid grid-cols-3 items-center">
          <button
            onClick={pathToHome}
            className="p-2 justify-self-start text-text cursor-pointer border border-border rounded-full hover:bg-bg-hover"
          >
            {/* Back button  */}
            <IoArrowBackSharp size={20} />
          </button>

          <h3 className="justify-self-center text-lg text-text font-semibold">
            Transactions
          </h3>
        </section>

        {/* 2. Transactions */}

        <section className="mx-2 my-5">
          {/* i) Search items */}
          <div className="my-5 flex justify-between items-center gap-2">
            <div className="mt-2 px-3 py-3 flex flex-1 items-center gap-3 border border-border rounded-md">
              <GoSearch size={21} />
              <input
                type="text"
                className="w-full text-base font-normal outline-none"
                placeholder="Enter amount"
                // value={formData.amount}
                // onChange={(e) =>
                //   setFormData({ ...formData, amount: e.target.value })
                //}
              />
            </div>

            <button className="mt-2 px-3 py-3 border border-border-strong rounded cursor-pointer">
              <TbFilterDollar size={21} color="#B53F44" />
            </button>
          </div>

          {/* ii) List of single transactions  */}

          <div>
            {transactions.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                No Transactions Found
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-3">
                  {transactions.map((transaction, idx) => (
                    <SingleTransaction key={idx} transaction={transaction} />
                  ))}
                </div>
                <p className="py-5 text-sm text-center text-text-muted">
                  ------ End of Transactions List ------
                </p>
              </>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default Transactions;
