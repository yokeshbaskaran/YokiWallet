import { useState } from "react";
import { FcMoneyTransfer } from "react-icons/fc";
import { MdDateRange } from "react-icons/md";

const Homepage = () => {
  const [todaysDate] = useState(() => new Date());

  return (
    <>
      {/* section1  */}
      <div className="flex justify-between gap-2">
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
      </div>
      {/* section1  */}

      {/* section2  */}
      <div className="my-3 p-2 border border-border bg-bg-hover rounded-md">
        <p className="text-text-muted">Total Balance:</p>
        <h2 className="text-2xl py-2 font-bold">Rs.1000 ₹</h2>
        {/* <p>metrics</p> */}
      </div>
      {/* section2  */}

      {/* section3  */}
      <div className="my-5">
        <h2>Recent Transactions:</h2>
      </div>
      {/* section3  */}
    </>
  );
};

export default Homepage;
