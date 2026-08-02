import { IoHomeOutline } from "react-icons/io5";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { LuUserRound } from "react-icons/lu";
import { Link } from "react-router-dom";

export const MobileTopNav = () => {
  return (
    <>
      <section>TopNav</section>
    </>
  );
};

export const MobileBottomNav = () => {
  return (
    <>
      <section className="relative p-2 flex items-center justify-between border-t border-primary h-20">
        <Link to="/">
          <div className="flex flex-col items-center text-sm font-medium cursor-pointer">
            <IoHomeOutline size={28} />
            <h2>Home</h2>
          </div>
        </Link>

        <Link to="/expenses">
          {/* Floating Button */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-5 flex flex-col items-center">
            <div className="rounded-full bg-white text-[#558B2F] flex items-center justify-center shadow-lg cursor-pointer">
              <RiMoneyRupeeCircleFill size={50} />
            </div>

            <h2 className="mt-3 text-sm font-medium">Add expenses</h2>
          </div>
        </Link>

        <Link to="/profile">
          <div className="flex flex-col items-center text-sm font-medium cursor-pointer">
            <LuUserRound size={28} />
            <h2>Profile</h2>
          </div>
        </Link>
      </section>
    </>
  );
};
