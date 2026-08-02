import { createContext, useContext, useState } from "react";

type AppContextProviderType = {
  children: React.ReactNode;
};

type AppContextType = {
  dark: boolean;
  setDark: React.Dispatch<React.SetStateAction<boolean>>;
  openMobileNav: boolean;
  setOpenMobileNav: React.Dispatch<React.SetStateAction<boolean>>;
};

const AppContext = createContext({} as AppContextType);

export function useAppContext() {
  return useContext(AppContext);
}

export const AppContextProvider = ({ children }: AppContextProviderType) => {
  //  setting light-dark mode
  const [dark, setDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  const [openMobileNav, setOpenMobileNav] = useState<boolean>(false);

  const contextValues = { dark, setDark, openMobileNav, setOpenMobileNav };

  return (
    <div>
      <AppContext.Provider value={contextValues}>
        {children}
      </AppContext.Provider>
    </div>
  );
};
