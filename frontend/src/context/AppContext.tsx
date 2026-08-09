import axios from "axios";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
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

type AmountBalance = {
  cashBalance: number;
  onlineBalance: number;
  totalBalance: number;
};

type AppContextType = {
  dark: boolean;
  setDark: React.Dispatch<React.SetStateAction<boolean>>;
  openMobileNav: boolean;
  setOpenMobileNav: React.Dispatch<React.SetStateAction<boolean>>;
  pathToHome: () => void;
  authUser: AuthUser | null;
  setAuthUser: React.Dispatch<React.SetStateAction<AuthUser>>;
  handleLogout: () => void;

  cashBalance: number;
  onlineBalance: number;
  totalBalance: number;
  fetchBalance: () => void;
};

const AppContext = createContext({} as AppContextType);

export const API_URL = import.meta.env.VITE_SERVER_APP_URL;

export function useAppContext() {
  return useContext(AppContext);
}

export const AppContextProvider = ({ children }: AppContextProviderType) => {
  //  setting light-dark mode
  const [dark, setDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  const [cashBalance, setCashBalance] = useState(0);
  const [onlineBalance, setOnlineBalance] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  const fetchBalance = useCallback(async (): Promise<AmountBalance> => {
    try {
      const response = await axios.get(API_URL + "/balance");
      console.log("GET All-Balance:", response);

      // setting amount values
      const data = response.data.data;

      setCashBalance(data.cashBalance);
      setOnlineBalance(data.onlineBalance);

      const total = Number(data.totalBalance).toFixed(2);
      setTotalBalance(Number(total));

      return response.data;
    } catch (error) {
      console.error("GET AllBalance Error:", error);
      throw error;
    }
  }, []);

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthUser(null);
  };

  const contextValues = {
    dark,
    setDark,
    openMobileNav,
    setOpenMobileNav,
    pathToHome,
    authUser,
    setAuthUser,
    handleLogout,

    //expenses amount
    cashBalance,
    onlineBalance,
    totalBalance,
    fetchBalance,
  };

  return (
    <div>
      <AppContext.Provider value={contextValues}>
        {children}
      </AppContext.Provider>
    </div>
  );
};
