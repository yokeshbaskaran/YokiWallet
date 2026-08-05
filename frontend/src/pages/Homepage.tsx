import { useState } from "react";
import { FcMoneyTransfer } from "react-icons/fc";
import { MdDateRange } from "react-icons/md";
import { TbShoppingCartMinus, TbShoppingCartPlus } from "react-icons/tb";
import Recents from "../components/Recents";

const Homepage = () => {
  const [todaysDate] = useState(() => new Date());

  return (
    <main className="min-h-screen mb-20">
      {/* section1  */}
      <section className="flex justify-between gap-2">
        <div className="flex items-center gap-2">
          <h2 className="text-primary text-xl font-semibold">
            Yoki<span className="text-text pl-0.5">Wallet</span>
          </h2>
          <FcMoneyTransfer size={23} className="mt-1" />
        </div>

        <div className="px-2 py-1 text-sm flex items-center gap-2 border-2 rounded-md border-border-strong">
          <MdDateRange size={19} className="mt-1" />
          {todaysDate.toLocaleString("en-IN", {
            // day: "2-digit",
            month: "short" as const,
            year: "numeric" as const,
          })}
        </div>
      </section>
      {/* section1  */}

      {/* section2  */}
      <section className="my-3 p-2 border border-border bg-bg-hover rounded-md">
        <p className="text-text-muted">Total Balance:</p>
        <h2 className="text-2xl py-2 font-bold">Rs.1000 ₹</h2>
        {/* <p>metrics</p> */}
      </section>
      {/* section2  */}

      {/* section3  */}
      {/* <section className="w-full my-5">
        <h3 className="text-text text-lg font-semibold">Quick Actions</h3>

        <div className="w-full py-4 flex justify-between items-center gap-4">
          <div className="w-full p-1 flex flex-col items-center gap-1">
            <button className="p-3 bg-red-400 rounded-md cursor-pointer">
              <TbShoppingCartMinus size={25} color="white" />
            </button>
            <h3 className="text-sm">Add Expense</h3>
          </div>

          <div className="w-full p-1 flex flex-col items-center gap-1">
            <button className="p-3 bg-green-700 rounded-md cursor-pointer">
              <TbShoppingCartPlus size={25} color="white" />
            </button>
            <h3 className="text-sm">Add Income</h3>
          </div>
        </div>
      </section> */}
      {/* section3  */}

      {/* section4  */}
      <div className="my-5">
        <Recents />
      </div>
      {/* section4  */}
    </main>
  );
};

export default Homepage;
