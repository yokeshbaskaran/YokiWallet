import {
  IoArrowBackSharp,
  IoOptionsOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { useAppContext } from "../context/AppContext";
import SingleTransaction from "../components/SingleTransaction";
import { useEffect, useMemo, useState } from "react";
import Filter from "../components/Filter";

const Transactions = () => {
  // functions and states
  const { pathToHome, transactions, getAllTransactions } = useAppContext();

  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState("");

  // Quick filter
  const [transactionType, setTransactionType] = useState("all");
  // Advanced filters
  const [category, setCategory] = useState("all");
  const [payment, setPayment] = useState("all");

  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // Sort
  const [sortBy, setSortBy] = useState("date");

  useEffect(() => {
    getAllTransactions();
  }, [getAllTransactions]);

  // Sorting by

  // Get unique categories
  const categories = useMemo(() => {
    const values = transactions
      .map((transaction) => transaction.category)
      .filter(Boolean);

    return [...new Set(values)];
  }, [transactions]);

  // Get unique payment methods
  const payments = useMemo(() => {
    const values = transactions
      .map((transaction) => transaction.payment)
      .filter(Boolean);

    return [...new Set(values)];
  }, [transactions]);

  // Filter + Sort
  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    // Search
    if (search.trim()) {
      const searchText = search.toLowerCase();

      result = result.filter((transaction) => {
        return (
          transaction.notes?.toLowerCase().includes(searchText) ||
          transaction.category?.toLowerCase().includes(searchText) ||
          transaction.payment?.toLowerCase().includes(searchText)
        );
      });
    }

    // Transaction type
    if (transactionType !== "all") {
      result = result.filter(
        (transaction) => transaction.type === transactionType,
      );
    }

    // Category
    if (category !== "all") {
      result = result.filter(
        (transaction) => transaction.category === category,
      );
    }

    // Payment
    if (payment !== "all") {
      result = result.filter((transaction) => transaction.payment === payment);
    }

    // Minimum amount
    if (minAmount !== "") {
      result = result.filter(
        (transaction) => Number(transaction.amount) >= Number(minAmount),
      );
    }

    // Maximum amount
    if (maxAmount !== "") {
      result = result.filter(
        (transaction) => Number(transaction.amount) <= Number(maxAmount),
      );
    }

    // Start date
    if (startDate) {
      result = result.filter(
        (transaction) =>
          new Date(transaction.date).getTime() >= new Date(startDate).getTime(),
      );
    }

    // End date
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);

      result = result.filter(
        (transaction) => new Date(transaction.date).getTime() <= end.getTime(),
      );
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }

      if (sortBy === "category") {
        return (a.category || "").localeCompare(b.category || "");
      }

      if (sortBy === "payment") {
        return (a.payment || "").localeCompare(b.payment || "");
      }

      if (sortBy === "amount-high") {
        return Number(b.amount) - Number(a.amount);
      }

      if (sortBy === "amount-low") {
        return Number(a.amount) - Number(b.amount);
      }

      return 0;
    });

    return result;
  }, [
    transactions,
    search,
    transactionType,
    category,
    payment,
    minAmount,
    maxAmount,
    startDate,
    endDate,
    sortBy,
  ]);

  // Reset filters
  const resetFilters = () => {
    setTransactionType("all");
    setCategory("all");
    setPayment("all");

    setMinAmount("");
    setMaxAmount("");

    setStartDate("");
    setEndDate("");

    setSortBy("date");
  };

  // UI design for EXPENSE Page starts here.
  return (
    <>
      <main className="mb-5">
        {/* 1. Top Header  */}
        <section className="grid grid-cols-3 items-center px-4 pt-3">
          <button
            onClick={pathToHome}
            className="p-2 justify-self-start text-text cursor-pointer border border-border-strong rounded-full hover:bg-bg-hover"
          >
            {/* Back button  */}
            <IoArrowBackSharp size={21} />
          </button>

          <h3 className="justify-self-center text-lg text-text font-semibold">
            Transactions
          </h3>
        </section>

        {/* 2. Search */}

        <section className="flex gap-2 px-3 pt-4 pb-4">
          <div
            className="flex items-center
                    flex-1 border border-border
                    rounded-xl px-3 bg-white"
          >
            <IoSearchOutline size={20} className="text-text-muted" />

            <input
              type="text"
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-2 py-3
                      outline-none bg-transparent
                      text-sm"
            />
          </div>

          {/* Filter button */}
          <button
            onClick={() => setShowFilters(true)}
            className="w-12 rounded-xl
                    border border-border
                    bg-white flex items-center
                    justify-center
                    hover:bg-bg-hover
                    cursor-pointer"
          >
            <IoOptionsOutline size={22} />
          </button>
        </section>

        {/* 3. Quick filters = Earn/Spend */}

        <section className="flex gap-2 px-4 pb-4">
          <button
            onClick={() => setTransactionType("all")}
            className={`px-5 py-2 rounded-xl border
              text-sm font-medium cursor-pointer
              ${
                transactionType === "all"
                  ? "bg-primary text-white border-primary"
                  : "bg-white border-border text-text"
              }`}
          >
            All
          </button>

          <button
            onClick={() => setTransactionType("income")}
            className={`px-5 py-2 rounded-xl border
              text-sm font-medium cursor-pointer
              ${
                transactionType === "income"
                  ? "bg-primary text-white border-primary"
                  : "bg-white border-border text-text"
              }`}
          >
            ↓ Earn
          </button>

          <button
            onClick={() => setTransactionType("expense")}
            className={`px-5 py-2 rounded-xl border
              text-sm font-medium cursor-pointer
              ${
                transactionType === "expense"
                  ? "bg-primary text-white border-primary"
                  : "bg-white border-border text-text"
              }`}
          >
            ↑ Spend
          </button>
        </section>

        {/* *** 4. SORTING BY ***  */}

        <section className="px-2 py-2 flex items-center">
          {/* TRANSACTION COUNT */}
          <p className="px-1 pb-2 text-sm text-text-muted">
            {filteredTransactions.length} transactions
          </p>

          {/* Sorting by button  */}
          <div className="ml-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-border-strong
            rounded-lg px-3 py-2
            bg-white text-sm outline-none"
            >
              <option value="date">Newest</option>
              <option value="category">Category</option>
              {/* <option value="payment">Payment</option> */}
              <option value="amount-high">Amount: High</option>
              <option value="amount-low">Amount: Low</option>
            </select>
          </div>
        </section>

        {/* 5. Transactions */}
        <section className="mx-2 my-3">
          <div>
            {transactions.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                No Transactions Found
              </div>
            ) : (
              <>
                {/*  List of single transactions  */}
                <div className="flex flex-col gap-3">
                  {filteredTransactions.map((transaction, idx) => (
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

        {/* Filter Popup button  */}

        {showFilters && (
          <Filter
            setShowFilters={setShowFilters}
            category={category}
            payment={payment}
            minAmount={minAmount}
            maxAmount={maxAmount}
            startDate={startDate}
            endDate={endDate}
            transactionType={transactionType}
            setTransactionType={setTransactionType}
            setCategory={setCategory}
            setPayment={setPayment}
            setMinAmount={setMinAmount}
            setMaxAmount={setMaxAmount}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            resetFilters={resetFilters}
            categories={categories}
            payments={payments}
            filteredTransactions={filteredTransactions}
          />
        )}
      </main>
    </>
  );
};

export default Transactions;
