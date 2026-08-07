import { useEffect, useState } from "react";
import { FcMoneyTransfer } from "react-icons/fc";
import { MdDateRange } from "react-icons/md";
import { BsCashCoin } from "react-icons/bs";

import Recents from "../components/Recents";
import { PiPlusMinusBold } from "react-icons/pi";
import { FaGooglePay } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import BalanceModal from "../components/BalanceModal";
import axios from "axios";
import { API_URL } from "../context/AppContext";

type AmountBalanceType = "cash" | "online";

const Homepage = () => {
  const [cashOpen, setCashOpen] = useState(false);
  const [onlineOpen, setOnlineOpen] = useState(false);

  // Setting Today's date
  const [todaysDate] = useState(() => new Date());
  const navigate = useNavigate();

  // useEffect(() => {
  //   const getBalanceByType = async (type: AmountBalanceType) => {
  //     try {
  //       const response = await axios.get(API_URL + `/balance/${type}`);
  //       console.log("GET Amount balance", response);

  //       return response.data;
  //     } catch (error) {
  //       console.error("GET Amount balance Error:", error);
  //       throw error;
  //     }
  //   };

  //   getBalanceByType("cash");
  //   getBalanceByType("online");
  // }, []);

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
      {/* Amount Details  */}

      <section className="my-3 p-2 border border-border bg-bg-hover rounded-md">
        {/* Container  */}

        <div className="w-full py-4 flex flex-col justify-between items-center gap-2">
          {/* Actions 1  */}
          <div className="yoki w-full p-1 flex flex-col items-center gap-1">
            <p className="text-text-muted">Total Balance:</p>
            <h2 className="text-2xl py-2 font-bold">Rs.1000 ₹</h2>
            <p>metrics</p>
          </div>

          {/* Actions 2  */}
          <div className="yoki w-full p-1 flex flex-col items-center gap-1">
            <p className="text-text-muted">Cash in hand:</p>
            <h2 className="text-xl py-2 font-bold">Rs.1000 ₹</h2>
            <p>metrics</p>
          </div>

          {/* Actions 3  */}

          <div className="yoki w-full p-1 flex flex-col items-center gap-1">
            <p className="text-text-muted">Online Balance:</p>
            <h2 className="text-xl py-2 font-bold">Rs.1000 ₹</h2>
            <p>metrics</p>
          </div>
        </div>
      </section>
      {/* section2  */}

      {/* section3  */}
      <section className="w-full my-5">
        <h3 className="text-text text-lg font-semibold">Quick Actions</h3>
        {/* Container  */}

        <div className="w-full py-4 flex justify-between items-center gap-4">
          {/* Actions 1  */}
          <div className="w-full p-1 flex flex-col items-center gap-1">
            <button
              onClick={() => navigate("/expenses")}
              className="p-3 bg-red-400 rounded-md cursor-pointer"
            >
              <PiPlusMinusBold size={25} color="white" />
            </button>
            <h3 className="text-sm">Add Expense</h3>
          </div>

          {/* Actions 2 */}
          <div className="w-full p-1 flex flex-col items-center gap-1">
            <button
              onClick={() => setCashOpen(true)}
              className="p-3 bg-green-700 rounded-md cursor-pointer"
            >
              <BsCashCoin size={25} color="white" />
            </button>

            <h3 className="text-sm">Add Cash Amount</h3>
          </div>

          {/* Actions 3 */}
          <div className="w-full p-1 flex flex-col items-center gap-1">
            <button
              onClick={() => setOnlineOpen(true)}
              className="p-3 bg-blue-700 rounded-md cursor-pointer"
            >
              <FaGooglePay size={25} color="white" />
            </button>
            <h3 className="text-sm">Add Online Cash</h3>
          </div>
        </div>

        {/* Balance Modal Toggle Codes  */}
        <BalanceModal
          open={cashOpen}
          onClose={() => setCashOpen(false)}
          type="cash"
        />

        <BalanceModal
          open={onlineOpen}
          onClose={() => setOnlineOpen(false)}
          type="online"
        />
      </section>
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
