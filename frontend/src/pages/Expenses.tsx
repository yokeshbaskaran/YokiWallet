import { IoArrowBackSharp } from "react-icons/io5";
import { LiaRupeeSignSolid } from "react-icons/lia";

const Expenses = () => {
  return (
    <>
      <section className="yo">
        {/* Top Header  */}
        <div className="grid grid-cols-3 items-center">
          <button className="justify-self-start text-text">
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

        {/* Earn & Spend button */}
        <div className="w-full pt-5 flex items-center justify-center gap-3">
          <button className="flex-1 px-5 py-2 text-white text-lg bg-green-800 font-semibold rounded-md">
            YokiEarn
          </button>
          <button className="flex-1 px-5 py-2 text-white text-lg bg-red-800 font-semibold rounded-md">
            YokiSpend
          </button>
        </div>

        {/* User Transaction Details  */}
        <section>
          <div className="mt-3">
            <h3 className="text-base font-semibold text-text-muted">Amount</h3>

            <div className="mt-2 p-2 flex items-center gap-3 border border-border rounded-md">
              <LiaRupeeSignSolid size={20} />
              <input
                type="number"
                className="w-full text-base font-medium outline-none"
              />
            </div>
          </div>

          <div className="mt-3">
            <h3 className="text-base font-semibold text-text-muted">
              Category
            </h3>

            <div className="mt-2 p-2 flex items-center gap-3 border border-border rounded-md">
              <LiaRupeeSignSolid size={20} />
              <input
                type="number"
                className="w-full text-base font-medium outline-none"
              />
            </div>
          </div>

          <div className="mt-3">
            <h3 className="text-base font-semibold text-text-muted">Date</h3>

            <div className="mt-2 p-2 flex items-center gap-3 border border-border rounded-md">
              <LiaRupeeSignSolid size={20} />
              <input
                type="number"
                className="w-full text-base font-medium outline-none"
              />
            </div>
          </div>

          <div className="mt-3">
            <h3 className="text-base font-semibold text-text-muted">
              Payment Method
            </h3>

            <div className="mt-2 p-2 flex items-center gap-3 border border-border rounded-md">
              <LiaRupeeSignSolid size={20} />
              <input
                type="number"
                className="w-full text-base font-medium outline-none"
              />
            </div>
          </div>

          <div className="mt-3">
            <h3 className="text-base font-semibold text-text-muted">
              Notes (Optional)
            </h3>

            <div className="mt-2 p-2 flex items-center gap-3 border border-border rounded-md">
              <LiaRupeeSignSolid size={20} />
              <input
                type="number"
                className="w-full text-base font-medium outline-none"
              />
            </div>
          </div>

          <button className="mt-3 w-full p-2 bg-primary text-text rounded-md">
            Save Expense
          </button>
        </section>
      </section>
    </>
  );
};

export default Expenses;
