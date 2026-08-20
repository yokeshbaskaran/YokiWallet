import { useEffect, useState } from "react";
import { FcMoneyTransfer } from "react-icons/fc";
import { BsCashCoin, BsCurrencyRupee } from "react-icons/bs";
import Recents from "../components/Recents";
import { PiCalendarHeart, PiPlusMinusBold } from "react-icons/pi";
import { FaAngleRight, FaGooglePay } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import BalanceModal from "../components/BalanceModal";

import { useAppContext } from "../context/AppContext";

const Homepage = () => {
  const [cashOpen, setCashOpen] = useState(false);
  const [onlineOpen, setOnlineOpen] = useState(false);

  const { cashBalance, onlineBalance, totalBalance, fetchBalance } =
    useAppContext();

  // Setting Today's date
  const [todaysDate] = useState(() => new Date());
  const navigate = useNavigate();

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  return (
    <main className="p-2">
      {/* section1 = Logo & Header */}
      <section className="flex justify-between gap-2">
        <div className="flex items-center gap-2">
          <h2 className="text-primary text-2xl font-bold">
            Yoki<span className="text-text pl-0.5">Wallet</span>
          </h2>
          <FcMoneyTransfer size={23} className="mt-1" />
        </div>

        <div className="px-2 py-2 text-sm flex items-center gap-2 border-2 rounded-md border-border-strong">
          <PiCalendarHeart size={20} className="mt-1" color="#E91E63" />
          {todaysDate.toLocaleString("en-IN", {
            // day: "2-digit",
            day: "numeric" as const,
            month: "short" as const,
            year: "numeric" as const,
          })}
        </div>
      </section>

      {/* section2 = Amount Details */}
      <section className="my-3 overflow-hidden rounded-md border border-border bg-bg-hover">
        {/* Container  */}
        <div className="px-4 py-5">
          {/* 1. Total Balance */}
          <div className="flex flex-col items-center">
            <p className="text-sm text-text-muted">Total Balance</p>

            <div className="mt-1 flex items-center gap-1">
              <BsCurrencyRupee size={25} />
              <p className="text-3xl font-bold">{totalBalance}</p>
            </div>
          </div>

          {/* Divider */}
          <div className="my-3 border-t border-border-strong" />

          {/* 2. Cash & Online */}
          <div className="grid grid-cols-2 divide-x divide-border-strong">
            {/* i) Cash Balance */}
            <div className="flex flex-col items-center px-2">
              <div className="flex items-center gap-1">
                <span className="text-lg">💵</span>
                <p className="text-sm text-text-muted">Cash in hand</p>
              </div>

              <div className="mt-1 flex items-center gap-1">
                <BsCurrencyRupee size={18} />
                <p className="text-xl font-bold">{cashBalance}</p>
              </div>
            </div>

            {/* ii) Online Balance */}
            <div className="flex flex-col items-center px-2">
              <div className="flex items-center gap-1">
                <span className="text-lg">📱</span>
                <p className="text-sm text-text-muted">Online Balance</p>
              </div>

              <div className="mt-1 flex items-center gap-1">
                <BsCurrencyRupee size={18} />
                <p className="text-xl font-bold">{onlineBalance}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* section2 */}

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
            <h3 className="mt-1 text-xs text-center">Add Expenses</h3>
          </div>

          {/* Actions 2 */}
          <div className="w-full p-1 flex flex-col items-center gap-1">
            <button
              onClick={() => setOnlineOpen(true)}
              className="p-3 bg-green-700 rounded-md cursor-pointer"
            >
              <BsCashCoin size={25} color="white" />
            </button>
            <h3 className="mt-1 text-xs text-center">Add Cash Amount</h3>
          </div>

          {/* Actions 3 */}
          <div className="w-full p-1 flex flex-col items-center gap-1">
            <button
              onClick={() => setOnlineOpen(true)}
              className="p-3 bg-blue-700 rounded-md cursor-pointer"
            >
              <FaGooglePay size={25} color="white" />
            </button>
            <h3 className="mt-1 text-xs text-center">Set Online Balance</h3>
          </div>
        </div>

        {/* Balance Modal Toggle Codes  */}
        <BalanceModal
          open={cashOpen}
          onClose={() => setCashOpen(false)}
          type="cash"
          onSuccess={fetchBalance}
        />

        <BalanceModal
          open={onlineOpen}
          onClose={() => setOnlineOpen(false)}
          type="online"
          onSuccess={fetchBalance}
        />
      </section>

      {/* section4  */}
      <div className="my-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Transactions</h2>

          <button
            onClick={() => navigate("/transactions")}
            className="px-3 py-2 text-primary text-sm font-medium flex items-center gap-1 border-2 border-border-strong rounded-md cursor-pointer hover:border-primary transition-colors"
          >
            <span>See All</span>
            <FaAngleRight size={12} />
          </button>
        </div>

        {/* Most Recents transactions  */}
        <div>
          <Recents />
        </div>
      </div>
      {/* section4  */}

      <p className="pb-8 text-sm text-center text-text-muted">
        ------ End of HomePage ------
      </p>
    </main>
  );
};

export default Homepage;
