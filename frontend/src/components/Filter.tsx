import { useRef } from "react";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";

type FilterChipProps = {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
};

type TransactionType = {
  _id: string;
  type: "income" | "expense";
  category: string;
  payment: string;
  amount: number;
  date: string;
  notes?: string;
};

type FilterProps = {
  setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;

  category: string;
  payment: string;
  minAmount: string;
  maxAmount: string;
  startDate: string;
  endDate: string;
  transactionType: string;

  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setPayment: React.Dispatch<React.SetStateAction<string>>;
  setMinAmount: React.Dispatch<React.SetStateAction<string>>;
  setMaxAmount: React.Dispatch<React.SetStateAction<string>>;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
  setTransactionType: React.Dispatch<React.SetStateAction<string>>; // ✅

  resetFilters: () => void;

  categories: string[];
  payments: string[];

  filteredTransactions: TransactionType[];
};

// FILTER CHIP COMPONENT
const FilterChip = ({ children, active, onClick }: FilterChipProps) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2.5
        rounded-full border
        text-sm whitespace-nowrap
        cursor-pointer
        transition
        ${
          active
            ? "border-primary bg-primary/10 text-primary"
            : "border-gray-300 bg-white text-text"
        }`}
    >
      {children}
    </button>
  );
};

// FORMAT CATEGORY
const formatCategory = (category: string) => {
  return category
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// FORMAT PAYMENT
const formatPayment = (payment: string) => {
  return payment
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const Filter = ({
  setShowFilters,
  category,
  payment,
  minAmount,
  maxAmount,
  startDate,
  endDate,
  transactionType,

  setCategory,
  setPayment,
  setMinAmount,
  setMaxAmount,
  setStartDate,
  setEndDate,
  setTransactionType,

  resetFilters,
  categories,
  payments,
  filteredTransactions,
}: FilterProps) => {
  // filter UI
  const startDateInputRef = useRef<HTMLInputElement>(null);
  const endDateInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <main className="fixed inset-0 z-50">
        {/* Background Overlay */}
        <div
          onClick={() => setShowFilters(false)}
          className="absolute inset-0
                        bg-black/40"
        />

        {/* Bottom Sheet */}
        <div
          className="absolute bottom-0
                        left-0 right-0
                        bg-white rounded-t-2xl
                        max-h-[90vh]
                        overflow-y-auto
                        shadow-2xl scrollbar-none"
        >
          {/* 1. Header */}
          <section
            className="flex items-center
                          justify-between
                          px-5 py-3
                          border-b border-border"
          >
            <h2 className="text-xl font-semibold">Filters</h2>

            <div className="flex items-center gap-3">
              <button
                onClick={resetFilters}
                className="px-4 py-2 text-base text-primary
                              font-medium cursor-pointer border border-border-strong rounded-lg hover:text-primary-light hover:bg-primary"
              >
                Reset
              </button>

              <button
                onClick={() => setShowFilters(false)}
                className="p-2 rounded-full
                              hover:bg-gray-100 cursor-pointer"
              >
                <IoClose size={22} />
              </button>
            </div>
          </section>

          {/* i) FILTER = TRANSACTION TYPE */}
          <section className="px-5 py-5 space-y-7">
            <div>
              <h3 className="font-semibold mb-3">Transaction Type</h3>

              <div className="flex gap-2 flex-wrap">
                <FilterChip
                  active={transactionType === "all"}
                  onClick={() => setTransactionType("all")}
                >
                  All
                </FilterChip>

                <FilterChip
                  active={transactionType === "income"}
                  onClick={() => setTransactionType("income")}
                >
                  ↑ Earn
                </FilterChip>

                <FilterChip
                  active={transactionType === "expense"}
                  onClick={() => setTransactionType("expense")}
                >
                  ↓ Spend
                </FilterChip>
              </div>
            </div>

            {/* ii) FILTER = CATEGORY */}
            <div>
              <h3 className="font-semibold mb-3">Category</h3>

              <div className="flex gap-2 flex-wrap">
                <FilterChip
                  active={category === "all"}
                  onClick={() => setCategory("all")}
                >
                  All
                </FilterChip>

                {categories.map((item) => (
                  <FilterChip
                    key={item}
                    active={category === item}
                    onClick={() => setCategory(item)}
                  >
                    {formatCategory(item)}
                  </FilterChip>
                ))}
              </div>
            </div>

            {/* iii) FILTER = Payment */}
            <div>
              <h3 className="font-semibold mb-3">Payment</h3>

              <div className="flex gap-2 flex-wrap">
                <FilterChip
                  active={payment === "all"}
                  onClick={() => setPayment("all")}
                >
                  All
                </FilterChip>

                {payments.map((item) => (
                  <FilterChip
                    key={item}
                    active={payment === item}
                    onClick={() => setPayment(item)}
                  >
                    {formatPayment(item)}
                  </FilterChip>
                ))}
              </div>
            </div>

            {/* iv) FILTER = Amount */}
            <div>
              <h3 className="font-semibold mb-2">Amount</h3>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="Min amount"
                  value={minAmount}
                  onChange={(e) => setMinAmount(e.target.value)}
                  className="border border-border-strong
                                rounded-xl px-4 py-3
                                outline-none"
                />

                <input
                  type="number"
                  placeholder="Max amount"
                  value={maxAmount}
                  onChange={(e) => setMaxAmount(e.target.value)}
                  className="border border-border-strong
                                rounded-xl px-4 py-3
                                outline-none"
                />
              </div>
            </div>

            {/* v) FILTER = DATE RANGE  */}
            <section>
              <h3 className="font-semibold mb-3">Date Range</h3>

              <div className="grid grid-cols-2 gap-3">
                {/* Start Date  */}
                <div>
                  <label
                    className="text-xs
                                  text-text-muted"
                  >
                    Start Date
                  </label>

                  <div className="mt-2 p-2 flex items-center gap-3 border border-border rounded-md">
                    <button
                      className="cursor-pointer"
                      onClick={() => {
                        if (startDateInputRef.current?.showPicker) {
                          startDateInputRef.current.showPicker();
                        } else {
                          startDateInputRef.current?.focus();
                        }
                      }}
                    >
                      <HiOutlineCalendarDateRange size={20} />
                    </button>
                    <input
                      type="date"
                      ref={startDateInputRef}
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full outline-none custom-date"
                    />
                  </div>
                </div>

                {/* END Date  */}
                <div>
                  <label
                    className="text-xs
                                  text-text-muted"
                  >
                    End Date
                  </label>

                  <div className="mt-2 p-2 flex items-center gap-3 border border-border rounded-md">
                    <button
                      className="cursor-pointer"
                      onClick={() => {
                        if (endDateInputRef.current?.showPicker) {
                          endDateInputRef.current.showPicker();
                        } else {
                          endDateInputRef.current?.focus();
                        }
                      }}
                    >
                      <HiOutlineCalendarDateRange size={20} />
                    </button>
                    <input
                      type="date"
                      ref={endDateInputRef}
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full outline-none custom-date"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* APPLY Filter Button  */}
            <button
              onClick={() => setShowFilters(false)}
              className="w-full py-4
                            rounded-2xl
                            bg-primary text-white
                            font-semibold
                            hover:opacity-90
                            cursor-pointer"
            >
              Apply Filters ({filteredTransactions.length})
            </button>
          </section>
        </div>
      </main>
    </>
  );
};

export default Filter;
