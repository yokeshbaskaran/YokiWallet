import { Outlet } from "react-router-dom";
import { MobileBottomNav } from "../components/MobileNav";

const MainLayout = () => {
  return (
    <main className="min-h-screen flex justify-center bg-white">
      <section className="w-full max-w-md min-h-screen flex flex-col border border-border shadow-md shadow-primary-light">
        {/* App content */}
        <div className="flex-1 p-2">
          <Outlet />
        </div>

        {/* Bottom navigation INSIDE app */}
        <div className="sticky bottom-0 z-40 w-full">
          <MobileBottomNav />
        </div>
      </section>
    </main>
  );
};

export default MainLayout;
