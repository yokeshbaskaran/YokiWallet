import { Outlet } from "react-router-dom";
import { MobileBottomNav } from "../components/MobileNav";

const MainLayout = () => {
  return (
    <>
      <section className="w-full h-screen p-2 flex flex-col items-center justify-start gap-2 yoki">
        <div className="flex-1 w-full">
          <Outlet />
        </div>
        <div className="w-full">
          <MobileBottomNav />
        </div>
      </section>
    </>
  );
};

export default MainLayout;
