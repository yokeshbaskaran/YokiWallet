import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//types
type AppContextProviderType = {
  children: React.ReactNode;
};

type AuthUser = {
  name: string;
  email: string;
  role: string;
} | null;

type AppContextType = {
  dark: boolean;
  setDark: React.Dispatch<React.SetStateAction<boolean>>;
  openMobileNav: boolean;
  setOpenMobileNav: React.Dispatch<React.SetStateAction<boolean>>;
  pathToHome: () => void;
  authUser: AuthUser | null;
  setAuthUser: React.Dispatch<React.SetStateAction<AuthUser>>;
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

  //dummy Auths

  const [authUser, setAuthUser] = useState<AuthUser>(() => {
    const storedUser = localStorage.getItem("authUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Save to localStorage whenever authUser changes
  useEffect(() => {
    if (authUser) {
      localStorage.setItem("authUser", JSON.stringify(authUser));
    } else {
      localStorage.removeItem("authUser");
    }
  }, [authUser]);

  const [openMobileNav, setOpenMobileNav] = useState<boolean>(false);

  // path/redirects to HOME PAGE
  const navigate = useNavigate();

  //functions

  const pathToHome = () => {
    navigate("/");
  };
  const contextValues = {
    dark,
    setDark,
    openMobileNav,
    setOpenMobileNav,
    pathToHome,
    authUser,
    setAuthUser,
  };

  return (
    <div>
      <AppContext.Provider value={contextValues}>
        {children}
      </AppContext.Provider>
    </div>
  );
};
