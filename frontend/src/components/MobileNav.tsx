import { IoHomeOutline } from "react-icons/io5";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { LuUserRound } from "react-icons/lu";
import { Link } from "react-router-dom";
import { GrTransaction } from "react-icons/gr";
import { BsListStars } from "react-icons/bs";

export const MobileBottomNav = () => {
  return (
    <>
      <section className="relative p-2 flex items-center justify-between bg-bg border-t-2 border-border h-17">
        <Link to="/">
          <div className="px-2 flex flex-col items-center gap-1 text-xs font-medium cursor-pointer">
            <IoHomeOutline size={25} />
            <h2>Home</h2>
          </div>
        </Link>

        <Link to="/transactions">
          <div className="px-2 flex flex-col items-center gap-1 text-xs font-medium cursor-pointer">
            <GrTransaction size={25} />
            <h2>Transactions</h2>
          </div>
        </Link>

        <Link to="/expenses">
          {/* Floating Button */}
          <div className="mx-1 px-4 absolute left-1/2 -translate-x-1/2 -top-7 flex flex-col items-center">
            <div className="rounded-full bg-white text-[#558B2F] flex items-center justify-center border border-border-strong shadow-lg cursor-pointer">
              <RiMoneyRupeeCircleFill size={50} />
            </div>

            <h2 className="mt-2 text-sm font-semibold">Add expenses</h2>
          </div>
        </Link>

        <Link to="/goals">
          <div className="px-2 flex flex-col items-center gap-1 text-xs font-medium cursor-pointer">
            <BsListStars size={25} />
            <h2>Goals</h2>
          </div>
        </Link>

        <Link to="/profile">
          <div className="px-2 flex flex-col items-center gap-1 text-xs font-medium cursor-pointer">
            <LuUserRound size={25} />
            <h2>Profile</h2>
          </div>
        </Link>
      </section>
    </>
  );
};
