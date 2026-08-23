import {
  FiEdit2,
  FiChevronRight,
  FiAward,
  FiFileText,
  FiTarget,
  FiDollarSign,
  FiBell,
  FiMoon,
  FiShield,
  FiDownload,
  FiTrash2,
  FiTrendingUp,
  FiCreditCard,
  FiLock,
  FiStar,
} from "react-icons/fi";
import { useAppContext } from "../context/AppContext";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { LuLogOut } from "react-icons/lu";

const achievements = [
  {
    title: "First Goal",
    description: "Created your first financial goal",
    icon: FiTarget,
    unlocked: true,
  },
  {
    title: "7 Day Tracker",
    description: "Tracked expenses for 7 days",
    icon: FiFileText,
    unlocked: true,
  },
  {
    title: "First ₹10K Saved",
    description: "Saved your first ₹10,000",
    icon: FiDollarSign,
    unlocked: true,
  },
  {
    title: "Goal Crusher",
    description: "Completed your first goal",
    icon: FiAward,
    unlocked: false,
  },
];

type SettingItemProps = {
  icon: React.ElementType;
  title: string;
  description?: string;
  value?: string;
  danger?: boolean;
};

function SettingItem({
  icon: Icon,
  title,
  description,
  value,
  danger = false,
}: SettingItemProps) {
  return (
    <button
      className={`
        flex w-full items-center gap-4
        px-5 py-4 text-left
        transition hover:bg-slate-50
        ${danger ? "text-red-500" : ""}
      `}
    >
      <div
        className={`
          rounded-xl p-2.5
          ${danger ? "bg-red-50 text-red-500" : "bg-slate-100 text-slate-600"}
        `}
      >
        <Icon size={19} />
      </div>

      <div className="flex-1">
        <p className="text-sm font-semibold text-slate-800">{title}</p>

        {description && (
          <p className="mt-0.5 text-xs text-slate-400">{description}</p>
        )}
      </div>

      {value && (
        <span className="text-xs font-medium text-slate-400">{value}</span>
      )}

      <FiChevronRight size={18} className="text-slate-300" />
    </button>
  );
}

const Profile = () => {
  const myName = "Yokesh";
  const { totalBalance, totalIncome, totalExpense, handleLogout } =
    useAppContext();

  return (
    <main className="bg-slate-50">
      {/* CONTAINER  */}
      <section className="space-y-3">
        {/* 1. HEADER */}
        <div className="overflow-hidden rounded-2xl border border-border-strong shadow-md shadow-primary-light bg-white">
          {/* Background color  */}
          <div className="h-25 bg-linear-to-br from-indigo-600 via-violet-500 to-purple-500" />

          {/* Info Details  */}
          <section className="px-6 py-3">
            <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              {/* i) Details */}
              <div className="flex items-end gap-3">
                <div>
                  <img
                    src="/me.png"
                    alt="my-profile"
                    className="size-25 object-cover object-left flex items-center justify-center rounded-2xl border-4 border-white bg-indigo-100 shadow-md"
                  />
                </div>

                <div>
                  <h1 className="text-2xl font-bold text-slate-900">
                    {myName}
                  </h1>

                  <p className="text-sm text-text-muted">sample@2026.com</p>
                </div>
              </div>

              {/* ii) Edit Button */}
              <button
                className="
                  flex items-center
                  justify-center gap-2
                  rounded-xl
                  border border-border-strong
                  p-2 py-2.5
                  text-sm font-semibold
                  text-primary hover:text-white hover:bg-primary cursor-pointer
                "
              >
                <FiEdit2 size={18} />
                Edit Profile
              </button>
            </div>
          </section>
        </div>

        {/* 2. Details */}
        <section className="py-3 grid gap-5">
          {/* i) FINANCIAL SCORE  */}
          <div
            className="
              rounded-2xl
              bg-linear-to-br
              from-indigo-600
              to-violet-600
              p-5 text-white
              shadow-lg
            "
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-indigo-100">Financial Health</p>

                <h2 className="mt-3 text-5xl font-bold">82</h2>

                <p className="mt-1 text-sm text-indigo-100">Excellent</p>
              </div>

              <div className="rounded-full border-4 border-white/20 p-4">
                <FiTrendingUp size={28} />
              </div>
            </div>

            <div className="mt-6 h-2 rounded-full bg-white/20">
              <div className="h-full w-[82%] rounded-full bg-white" />
            </div>

            <p className="mt-3 text-xs text-indigo-100">
              Your financial habits are looking healthy.
            </p>
          </div>

          {/* ii) Details */}
          <section className="px-5 pt-2 grid grid-cols-2 gap-4">
            {/* 1. Total Income  */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <FiDollarSign className="text-emerald-500" size={22} />

              <p className="mt-4 text-sm text-slate-400">Total Income</p>

              <div className="mt-1 text-2xl font-bold text-slate-900 flex items-center gap-1">
                <FaIndianRupeeSign size={20} />
                <span>{totalIncome}</span>
              </div>
            </div>

            {/* 2. Total Expenses  */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <FiCreditCard className="text-red-500" size={22} />

              <p className="mt-4 text-sm text-slate-400">Total Expenses</p>

              <div className="mt-1 text-2xl font-bold text-slate-900 flex items-center gap-1">
                <FaIndianRupeeSign size={20} />
                <span>{totalExpense}</span>
              </div>
            </div>

            {/* 3. Active Goals  */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <FiTarget className="text-indigo-500" size={22} />

              <p className="mt-4 text-sm text-slate-400">Active Goals</p>

              <h3 className="mt-1 text-2xl font-bold text-slate-900">3</h3>
            </div>

            {/* 4. Current Total Balance  */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <FiTrendingUp className="text-emerald-500" size={22} />

              <p className="mt-4 text-sm text-slate-400">Current Balance</p>

              <div className="mt-1 text-2xl font-bold text-slate-900 flex items-center gap-1">
                <FaIndianRupeeSign size={20} />
                <span>{totalBalance}</span>
              </div>
            </div>
          </section>
        </section>

        {/* ACHIEVEMENTS  */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Achievements</h2>

              <p className="mt-1 text-sm text-slate-500">
                Keep improving your financial habits.
              </p>
            </div>

            <FiAward className="text-amber-500" size={22} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;

              return (
                <div
                  key={achievement.title}
                  className={`
                    rounded-2xl border p-5
                    ${
                      achievement.unlocked
                        ? "border-amber-100 bg-amber-50/50"
                        : "border-slate-200 bg-slate-100 opacity-60"
                    }
                  `}
                >
                  <div
                    className={`
                      inline-flex
                      rounded-xl p-3
                      ${
                        achievement.unlocked
                          ? "bg-amber-100 text-amber-600"
                          : "bg-slate-200 text-slate-400"
                      }
                    `}
                  >
                    {achievement.unlocked ? (
                      <Icon size={22} />
                    ) : (
                      <FiLock size={22} />
                    )}
                  </div>

                  <h3 className="mt-4 font-semibold text-slate-900">
                    {achievement.title}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {achievement.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* SETTINGS */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Preferences */}
          <section>
            <h2 className="mb-3 text-lg font-bold text-slate-900">
              Preferences
            </h2>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <SettingItem
                icon={FiBell}
                title="Notifications"
                description="Receive spending and goal reminders"
                value="On"
              />

              <div className="border-t border-slate-100" />

              <SettingItem
                icon={FiMoon}
                title="Appearance"
                description="Choose how the app looks"
                value="System"
              />

              <div className="border-t border-slate-100" />

              <SettingItem
                icon={FiDollarSign}
                title="Currency"
                description="Default currency for transactions"
                value="INR ₹"
              />
            </div>
          </section>

          {/* Security  */}
          <section>
            <h2 className="mb-3 text-lg font-bold text-slate-900">
              Security & Data
            </h2>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <SettingItem
                icon={FiShield}
                title="Privacy & Security"
                description="Manage your account security"
              />

              <div className="border-t border-slate-100" />

              <SettingItem
                icon={FiDownload}
                title="Export Transactions"
                description="Download your financial data"
              />

              <div className="border-t border-slate-100" />

              <SettingItem
                icon={FiTrash2}
                title="Delete Account"
                description="Permanently delete your account"
                danger
              />
            </div>
          </section>
        </div>

        {/* FOOTER */}
        <div
          className="yoki flex flex-col items-center justify-between gap-3 rounded-2xl
            border border-slate-200
            bg-white p-5
            text-sm text-slate-500
            sm:flex-row
          "
        >
          <div className="flex items-center gap-2">
            <FiStar size={16} className="text-amber-500" />

            <span>Enjoying the app?</span>

            <button className="font-semibold text-indigo-600">Rate us</button>
          </div>

          <span className="text-xs text-slate-400">Expense Tracker v1.0.0</span>
        </div>
        {/* FOOTER */}
      </section>

      {/* LOGOUT Button  */}
      <div className="px-2">
        <button
          onClick={handleLogout}
          className="w-full my-3 px-5 py-2 flex items-center justify-center gap-2 text-lg text-white bg-red-800 rounded-md shadow-md cursor-pointer"
        >
          <span>Logout</span>
          <LuLogOut size={20} />
        </button>
      </div>

      <p className="pt-2 pb-10 text-sm text-center text-text-muted">
        ------ End of Profile Page ------
      </p>
    </main>
  );
};

export default Profile;
