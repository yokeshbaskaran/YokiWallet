import { IoArrowBackSharp } from "react-icons/io5";

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
      </section>
    </>
  );
};

export default Expenses;
