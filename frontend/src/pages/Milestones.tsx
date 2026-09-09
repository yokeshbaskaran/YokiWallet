import { FiAward, FiCheckCircle } from "react-icons/fi";
// import Goals from "../components/Goals";
import { BiPurchaseTag } from "react-icons/bi";
import { useRef } from "react";
import { FaChevronRight } from "react-icons/fa6";

import Goals from "../components/Goals";

// Pages starts here
const Milestones = () => {
  // go To Goals section
  const goalsRef = useRef<HTMLElement>(null);
  const goToGoals = () => {
    goalsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // go To Purchases section
  const purchasesRef = useRef<HTMLElement>(null);
  const goToPurchases = () => {
    purchasesRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      <main className="bg-slate-50 px-4 py-2">
        <section className="space-y-3">
          {/* 1. Header  */}
          <h1 className="mt-1 font-bold italic text-center text-xl text-indigo-600">
            Financial Goals & MileStones
          </h1>

          {/* 2. Box Cards  */}
          <section className="grid gap-5 grid-cols-[1fr_1fr]">
            {/* i) Active Goals count  */}
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-5 shadow-sm cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-amber-100 p-3 text-amber-700">
                  <FiAward size={21} />
                </div>

                <button
                  onClick={goToGoals}
                  className="px-2 py-1 flex items-center gap-1 rounded-md border font-semibold border-border-strong text-primary hover:bg-primary-light cursor-pointer"
                >
                  <span className="text-xs">View</span>
                  <FaChevronRight size={10} />
                </button>
              </div>

              <p className="mt-3 text-base text-text-muted font-semibold">
                Active Goals
              </p>

              <h3 className="mt-1 text-2xl font-bold text-slate-900">
                {/* {goals.length} */}
              </h3>
            </div>

            {/* ii) Purchases count  */}
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-rose-50 p-3 text-rose-700">
                  <BiPurchaseTag size={21} />
                </div>

                <button
                  onClick={goToPurchases}
                  className="px-2 py-1 flex items-center gap-1 rounded-md border font-semibold border-border-strong text-primary hover:bg-primary-light cursor-pointer"
                >
                  <span className="text-xs">View</span>
                  <FaChevronRight size={10} />
                </button>
              </div>

              <p className="mt-3 text-base text-text-muted font-semibold">
                Purchases ⭐
              </p>

              <h3 className="mt-1 text-2xl font-bold text-slate-900">
                {/* {goals.length} */}
              </h3>
            </div>
          </section>

          {/* 1. Goals section  */}
          <section ref={goalsRef}>
            <Goals />
          </section>

          {/* 2. Purchases section  */}
          <section ref={purchasesRef}>
            Purchases:
            <Goals />
          </section>

          {/* Goals Completed Section */}

          <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
            <FiCheckCircle size={22} />
          </div>
        </section>
      </main>
    </>
  );
};

export default Milestones;
