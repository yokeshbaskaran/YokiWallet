import axios from "axios";
import { useState } from "react";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { IoCloseOutline } from "react-icons/io5";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { MdOutlineCurrencyExchange } from "react-icons/md";
import { RiErrorWarningLine } from "react-icons/ri";
import { API_URL } from "../context/AppContext";

//types
type ExchangeType = "cash" | "online";

type ExchangeResponse = {
  cashBalance: number;
  onlineBalance: number;
  totalBalance: number;
};

type MoneyExchangeModalProps = {
  open: boolean;
  cashBalance: number;
  onlineBalance: number;
  onClose: () => void;
  onSuccess: () => void;
};

const MoneyExchangeModal = ({
  open,
  cashBalance,
  onlineBalance,
  onClose,
  onSuccess,
}: MoneyExchangeModalProps) => {
  const [from, setFrom] = useState<ExchangeType>("cash");
  const [to, setTo] = useState<ExchangeType>("online");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  //functions
  const exchangeMoney = async (
    from: ExchangeType,
    to: ExchangeType,
    amount: number,
  ): Promise<ExchangeResponse> => {
    try {
      const response = await axios.post(API_URL + "/balance", {
        from,
        to,
        amount,
      });

      return response.data.data;
    } catch (error) {
      console.error("Exchange money error:", error);
      throw error;
    }
  };

  const amountNumber = Number(amount) || 0;
  const availableBalance = from === "cash" ? cashBalance : onlineBalance;

  const afterCash =
    from === "cash" ? cashBalance - amountNumber : cashBalance + amountNumber;
  const afterOnline =
    from === "online"
      ? onlineBalance - amountNumber
      : onlineBalance + amountNumber;

  const handleExchange = async () => {
    setError("");

    if (!amountNumber || amountNumber <= 0) {
      setError("Enter a valid amount");
      return;
    }

    if (amountNumber > availableBalance) {
      setError(`Insufficient ${from === "cash" ? "cash" : "online"} balance`);
      return;
    }

    try {
      setLoading(true);
      await exchangeMoney(from, to, amountNumber);
      onSuccess();
      onClose();
    } catch (error: unknown) {
      setError(
        axios.isAxiosError(error)
          ? error.response?.data?.message || "Failed to exchange money"
          : "Failed to exchange money",
      );
    } finally {
      setLoading(false);
    }
  };

  const swapAccounts = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <>
      <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
        <div className="w-full max-w-md my-5 rounded-2xl bg-bg shadow-xl overflow-hidden">
          {/* Header */}
          <div className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-700 text-white">
                <MdOutlineCurrencyExchange size={25} />
              </div>

              {/* Title */}
              <div>
                <h2 className="text-xl font-semibold text-text">
                  Money Exchange
                </h2>

                <p className="mt-0.5 text-xs text-text-muted">
                  Move money between Cash & Online
                </p>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              disabled={loading}
              className="cursor-pointer rounded-full p-2 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <IoCloseOutline size={25} />
            </button>
          </div>

          {/* Body */}
          <div className="px-3 py-3 border-2 border-border-strong rounded-x-2xl shadow-md">
            {/* From */}
            <div>
              <label className="m-1 block text-sm font-medium text-text-muted">
                From
              </label>

              <select
                value={from}
                onChange={(e) => setFrom(e.target.value as ExchangeType)}
                className="w-full rounded-xl border border-gray-300 px-2 py-3 outline-none focus:border-primary"
              >
                <option value="cash">💵 Cash</option>
                <option value="online">📱 Online</option>
              </select>
            </div>

            {/* Swap button */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={swapAccounts}
                className="my-2 rounded-full border bg-bg p-2 text-green-700 hover:bg-gray-100 cursor-pointer"
                title="Swap"
              >
                <HiOutlineArrowsUpDown size={20} />
              </button>
            </div>

            {/* To */}
            <div>
              <label className="mt-0 m-2 block text-sm font-medium text-text-muted">
                To
              </label>

              <select
                value={to}
                onChange={(e) => setTo(e.target.value as ExchangeType)}
                className="w-full rounded-xl border border-gray-300 px-2 py-3 outline-none focus:border-primary"
              >
                <option value="cash">💵 Cash</option>
                <option value="online">📱 Online</option>
              </select>
            </div>

            {/* Same account warning */}
            {from === to && (
              <div className="my-1 flex items-center gap-1 rounded-lg bg-yellow-50 px-3 py-1.5 text-xs text-yellow-800 border border-border">
                <RiErrorWarningLine size={15} color="#FE9A00" />
                <p>"From" and "To" cannot be the same.</p>
              </div>
            )}
            {/* Amount */}
            <div className="mt-3">
              <label className="mb-2 block text-sm font-medium text-text-muted">
                Amount
              </label>

              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <LiaRupeeSignSolid size={20} />
                </span>

                <input
                  type="number"
                  min="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0"
                  className="w-full rounded-xl border border-gray-300 py-2 pl-10 pr-4 text-lg font-semibold outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Available amount*/}
            <div className="mt-1 rounded-xl bg-gray-50 p-2 text-green-700">
              <div className="flex justify-between text-sm">
                <span className="text-text">
                  Available {from === "cash" ? "Cash" : "Online"}
                </span>

                <div className="font-bold text-sm flex items-center">
                  <LiaRupeeSignSolid size={17} />
                  <span> {availableBalance.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            {/* Preview = After Exchange */}
            <div className="my-1 rounded-xl border border-border-strong shadow-md p-3">
              <p className="mb-3 text-base text-text font-medium">
                After Exchange:-
              </p>

              <div className="space-y-1">
                {/* Cash Amount */}
                <div className="flex justify-between">
                  <span className="text-text-muted">💵 Cash</span>

                  <div className="flex items-center gap-0">
                    <LiaRupeeSignSolid size={18} />
                    <span className="font-semibold text-base">
                      {Math.max(0, afterCash).toLocaleString("en-IN")}
                    </span>

                    {cashBalance < afterCash && (
                      <span className="pl-1 text-green-700 text-lg">
                        <CiCirclePlus size={17} />
                      </span>
                    )}

                    {cashBalance > afterCash && (
                      <span className="pl-1 text-red-700 text-lg">
                        <CiCircleMinus size={17} />
                      </span>
                    )}
                  </div>
                </div>

                {/* Online Amount */}
                <div className="flex justify-between">
                  <span className="text-text-muted">📱 Online</span>

                  <div className="flex items-center gap-0">
                    <LiaRupeeSignSolid size={18} />
                    <span className="font-semibold text-base">
                      {Math.max(0, afterOnline).toLocaleString("en-IN")}
                    </span>

                    {onlineBalance < afterOnline && (
                      <span className="pl-1 text-green-700 text-lg">
                        <CiCirclePlus size={17} />
                      </span>
                    )}

                    {onlineBalance > afterOnline && (
                      <span className="pl-1 text-red-700 text-lg">
                        <CiCircleMinus size={17} />
                      </span>
                    )}
                  </div>
                </div>

                {/* Total  */}
                <div className="mt-2 border-t border-border-strong pt-2 px-1 text-lg flex justify-between">
                  <span className="font-medium">Total</span>

                  <div className="font-bold flex items-center">
                    <LiaRupeeSignSolid size={17} />
                    <span>
                      {(cashBalance + onlineBalance).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </p>
            )}

            {/* Button */}
            <button
              type="button"
              onClick={handleExchange}
              disabled={
                loading ||
                from === to ||
                !amountNumber ||
                amountNumber > availableBalance
              }
              className="w-full mt-2 rounded-xl bg-primary px-4 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Exchanging..." : "Exchange Money"}
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default MoneyExchangeModal;
