import { Outlet } from "react-router-dom";
import { MobileBottomNav } from "../components/MobileNav";

const MainLayout = () => {
  return (
    <>
      <section className="w-full h-screen p-2 flex flex-col items-center justify-start gap-2">
        <div className="flex-1 w-full">
          <Outlet />
        </div>
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full z-40">
          <MobileBottomNav />
        </div>
      </section>
    </>
  );
};

export default MainLayout;
