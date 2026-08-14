import { IoHomeOutline } from "react-icons/io5";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { LuUserRound } from "react-icons/lu";
import { Link } from "react-router-dom";
import { GrTransaction } from "react-icons/gr";
import { GoOrganization } from "react-icons/go";

export const MobileBottomNav = () => {
  return (
    <>
      <section className="relative p-2 flex items-center justify-between bg-bg border-t-2 border-border h-17">
        <Link to="/">
          <div className="flex flex-col items-center text-sm font-medium cursor-pointer">
            <IoHomeOutline size={25} />
            <h2>Home</h2>
          </div>
        </Link>

        <Link to="/transactions">
          <div className="flex flex-col items-center text-sm font-medium cursor-pointer">
            <GrTransaction size={25} />
            <h2>Transactions</h2>
          </div>
        </Link>

        <Link to="/expenses">
          {/* Floating Button */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-7 flex flex-col items-center">
            <div className="rounded-full bg-white text-[#558B2F] flex items-center justify-center shadow-lg cursor-pointer">
              <RiMoneyRupeeCircleFill size={55} />
            </div>

            <h2 className="mt-2 text-sm font-medium">Add expenses</h2>
          </div>
        </Link>

        <Link to="/work">
          <div className="flex flex-col items-center text-sm font-medium cursor-pointer">
            <GoOrganization size={25} />
            <h2>Work</h2>
          </div>
        </Link>

        <Link to="/profile">
          <div className="flex flex-col items-center text-sm font-medium cursor-pointer">
            <LuUserRound size={25} />
            <h2>Profile</h2>
          </div>
        </Link>
      </section>
    </>
  );
};
