import { IoArrowBackSharp } from "react-icons/io5";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { BiSolidBellPlus, BiSolidBellMinus } from "react-icons/bi";
import { TbShoppingCartSearch } from "react-icons/tb";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { FaAmazonPay } from "react-icons/fa6";
import { CgNotes } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const Expenses = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="">
        {/* Top Header  */}
        <div className="grid grid-cols-3 items-center">
          <button
            onClick={() => navigate("/")}
            className="p-2 justify-self-start text-text cursor-pointer border border-border rounded-full hover:bg-bg-hover"
          >
            {/* Back button  */}
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
        <div className="w-full pt-3 flex items-center justify-center gap-3">
          <button className="flex-1 px-5 py-2 flex items-center justify-center gap-1 text-white text-lg bg-green-800 font-semibold rounded-md">
            <span> YokiEarn</span>
            <BiSolidBellPlus size={20} />
          </button>
          <button className="flex-1 px-5 py-2 flex items-center justify-center gap-1 text-white text-lg bg-red-800 font-semibold rounded-md">
            <span>YokiSpend</span>
            <BiSolidBellMinus size={20} />
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
              <TbShoppingCartSearch size={20} />
            </div>
          </div>

          <div className="mt-3">
            <h3 className="text-base font-semibold text-text-muted">Date</h3>

            <div className="mt-2 p-2 flex items-center gap-3 border border-border rounded-md">
              <HiOutlineCalendarDateRange size={20} />
              <input
                type="date"
                className="w-full text-base font-medium outline-none"
              />
            </div>
          </div>

          <div className="mt-3">
            <h3 className="text-base font-semibold text-text-muted">
              Payment Method
            </h3>

            <div className="mt-2 p-2 flex items-center gap-3 border border-border rounded-md">
              <FaAmazonPay size={20} />
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
              <CgNotes size={20} />
              <input
                type="number"
                className="w-full text-base font-medium outline-none"
              />
            </div>
          </div>

          <button className="mt-3 w-full p-2 bg-primary text-white rounded-md cursor-pointer hover:opacity-90">
            Save Expense
          </button>
        </section>
      </section>
    </>
  );
};

export default Expenses;
