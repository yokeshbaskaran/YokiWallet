import {
  FiPlus,
  FiTrendingUp,
  FiAward,
  FiArrowUpRight,
  FiCheckCircle,
  FiMonitor,
  FiHome,
} from "react-icons/fi";
import { IoIosAirplane } from "react-icons/io";

type GoalStatus = "On Track" | "Needs Attention" | "Completed";

type Goal = {
  id: number;
  title: string;
  icon: React.ElementType;
  current: number;
  target: number;
  deadline: string;
  status: GoalStatus;
};

const goals: Goal[] = [
  {
    id: 1,
    title: "Vacation",
    icon: IoIosAirplane,
    current: 30000,
    target: 50000,
    deadline: "Dec 2026",
    status: "On Track",
  },
  {
    id: 2,
    title: "New Laptop",
    icon: FiMonitor,
    current: 45000,
    target: 80000,
    deadline: "Apr 2027",
    status: "On Track",
  },
  {
    id: 3,
    title: "Emergency Fund",
    icon: FiHome,
    current: 35000,
    target: 100000,
    deadline: "Dec 2027",
    status: "Needs Attention",
  },
];

const completedGoals = [
  {
    title: "New Phone",
    amount: 60000,
    date: "Aug 2026",
  },
  {
    title: "Headphones",
    amount: 12000,
    date: "Jun 2026",
  },
];

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const getProgress = (current: number, target: number) =>
  Math.min(Math.round((current / target) * 100), 100);

const Milestones = () => {
  const totalSaved = goals.reduce((sum, goal) => sum + goal.current, 0);

  const totalTarget = goals.reduce((sum, goal) => sum + goal.target, 0);

  const overallProgress = getProgress(totalSaved, totalTarget);

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* ================= HEADER ================= */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-indigo-600">
              Financial Goals
            </p>

            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              Your Savings Journey
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Turn your plans into achievable financial goals.
            </p>
          </div>

          <button
            className="
              flex items-center justify-center gap-2
              rounded-xl bg-indigo-600
              px-5 py-3
              text-sm font-semibold text-white
              shadow-sm
              transition hover:bg-indigo-700
            "
          >
            <FiPlus size={18} />
            Create Goal
          </button>
        </div>

        {/* ================= OVERVIEW ================= */}

        <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr_1fr]">
          {/* Total Saved */}

          <div
            className="
              relative overflow-hidden
              rounded-2xl
              bg-linear-to-br
              from-indigo-600 to-violet-600
              p-6 text-white shadow-lg
            "
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-indigo-100">Total saved</p>

                  <h2 className="mt-2 text-3xl font-bold">
                    {formatCurrency(totalSaved)}
                  </h2>
                </div>

                <div className="rounded-xl bg-white/15 p-3">
                  <FiTrendingUp size={24} />
                </div>
              </div>

              <div className="mt-7">
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-indigo-100">Overall progress</span>

                  <span className="font-semibold">{overallProgress}%</span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-white/20">
                  <div
                    className="h-full rounded-full bg-white transition-all"
                    style={{
                      width: `${overallProgress}%`,
                    }}
                  />
                </div>

                <p className="mt-3 text-xs text-indigo-100">
                  {formatCurrency(totalTarget - totalSaved)} remaining across
                  your active goals
                </p>
              </div>
            </div>

            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10" />

            <div className="absolute -bottom-24 right-20 h-48 w-48 rounded-full bg-white/10" />
          </div>

          {/* Monthly Savings */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                <FiTrendingUp size={21} />
              </div>

              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                75%
              </span>
            </div>

            <p className="mt-5 text-sm text-slate-500">Saved this month</p>

            <h3 className="mt-1 text-2xl font-bold text-slate-900">₹7,500</h3>

            <div className="mt-4 h-2 rounded-full bg-slate-100">
              <div className="h-full w-3/4 rounded-full bg-emerald-500" />
            </div>

            <p className="mt-2 text-xs text-slate-400">
              ₹2,500 more to reach your ₹10,000 target
            </p>
          </div>

          {/* Active Goals */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                <FiAward size={21} />
              </div>

              <FiArrowUpRight className="text-slate-400" size={20} />
            </div>

            <p className="mt-5 text-sm text-slate-500">Active Goals</p>

            <h3 className="mt-1 text-2xl font-bold text-slate-900">
              {goals.length}
            </h3>

            <p className="mt-2 text-xs text-slate-400">
              Keep going — you're making progress!
            </p>
          </div>
        </div>

        {/* ================= ACTIVE GOALS ================= */}

        <section>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Active Goals</h2>

              <p className="mt-1 text-sm text-slate-500">
                Track your progress toward each goal.
              </p>
            </div>

            <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
              View all
            </button>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {goals.map((goal) => {
              const progress = getProgress(goal.current, goal.target);

              const Icon = goal.icon;

              return (
                <div
                  key={goal.id}
                  className="
                    rounded-2xl
                    border border-slate-200
                    bg-white p-5
                    shadow-sm
                    transition
                    hover:-translate-y-1
                    hover:shadow-md
                  "
                >
                  {/* Goal Header */}

                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                        <Icon size={22} />
                      </div>

                      <div>
                        <h3 className="font-semibold text-slate-900">
                          {goal.title}
                        </h3>

                        <p className="text-xs text-slate-400">
                          Target: {goal.deadline}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`
                        rounded-full px-2.5 py-1
                        text-xs font-medium
                        ${
                          goal.status === "On Track"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-amber-50 text-amber-600"
                        }
                      `}
                    >
                      {goal.status}
                    </span>
                  </div>

                  {/* Progress */}

                  <div className="mt-6">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xl font-bold text-slate-900">
                          {formatCurrency(goal.current)}
                        </p>

                        <p className="text-xs text-slate-400">
                          of {formatCurrency(goal.target)}
                        </p>
                      </div>

                      <span className="text-sm font-bold text-indigo-600">
                        {progress}%
                      </span>
                    </div>

                    <div className="mt-3 h-2.5 rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-indigo-600 transition-all"
                        style={{
                          width: `${progress}%`,
                        }}
                      />
                    </div>

                    <div className="mt-3 flex justify-between text-xs">
                      <span className="text-slate-400">
                        {formatCurrency(goal.target - goal.current)} remaining
                      </span>

                      <span className="font-medium text-slate-600">
                        {progress >= 50 ? "Great progress!" : "Keep going!"}
                      </span>
                    </div>
                  </div>

                  <button
                    className="
                      mt-5 w-full rounded-xl
                      border border-slate-200
                      py-2.5
                      text-sm font-semibold
                      text-slate-700
                      transition hover:bg-slate-50
                    "
                  >
                    Add Money
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================= INSIGHT ================= */}

        <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
          <div className="flex gap-4">
            <div className="rounded-xl bg-white p-3 text-indigo-600 shadow-sm">
              <FiTrendingUp size={22} />
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                You're on the right track 🎯
              </h3>

              <p className="mt-1 text-sm text-slate-600">
                If you continue saving ₹7,500 every month, you can reach your
                current goals faster than planned.
              </p>
            </div>
          </div>
        </div>

        {/* ================= COMPLETED ================= */}

        <section>
          <div className="mb-4">
            <h2 className="text-xl font-bold text-slate-900">
              Completed Goals
            </h2>

            <p className="mt-1 text-sm text-slate-500">Your financial wins.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {completedGoals.map((goal) => (
              <div
                key={goal.title}
                className="
                  flex items-center
                  justify-between
                  rounded-2xl
                  border border-slate-200
                  bg-white p-5
                  shadow-sm
                "
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                    <FiCheckCircle size={22} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {goal.title}
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">
                      Completed {goal.date}
                    </p>
                  </div>
                </div>

                <span className="font-bold text-emerald-600">
                  {formatCurrency(goal.amount)}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Milestones;
