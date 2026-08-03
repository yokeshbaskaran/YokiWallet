import { MobileBottomNav } from "../components/MobileNav";

import Homepage from "../pages/Homepage";

const MainLayout = () => {
  return (
    <>
      <section className="w-full h-screen p-2 flex flex-col items-center justify-start gap-2 yoki">
        <div className="flex-1 w-full">
          <Homepage />
        </div>
        <div className="w-full">
          <MobileBottomNav />
        </div>
      </section>
    </>
  );
};

export default MainLayout;
