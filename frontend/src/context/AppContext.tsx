import axios from "axios";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { type TransactionType } from "../utils/helpers";

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
  handleLogout: () => void;

  cashBalance: number;
  onlineBalance: number;
  totalBalance: number;
  fetchBalance: () => void;

  totalIncome: number;
  totalExpense: number;

  transactions: TransactionType[];
  getAllTransactions: () => void;
};

const AppContext = createContext({} as AppContextType);

// API URL from backend
export const API_URL = import.meta.env.VITE_SERVER_APP_URL;

//export Appcontext data function
export function useAppContext() {
  return useContext(AppContext);
}

export const AppContextProvider = ({ children }: AppContextProviderType) => {
  //  setting light-dark mode
  const [dark, setDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [openMobileNav, setOpenMobileNav] = useState<boolean>(false);

  const [cashBalance, setCashBalance] = useState(0);
  const [onlineBalance, setOnlineBalance] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  //dummy Auths
  const [authUser, setAuthUser] = useState<AuthUser>(() => {
    const storedUser = localStorage.getItem("authUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // path/redirects to HOME PAGE
  const navigate = useNavigate();

  // xxxxxxxxxxx ---- FUNCTIONS ---- xxxxxxxx
  const pathToHome = () => {
    navigate("/");
  };

  // AuthUser logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthUser(null);
  };

  // fetch [GET] the Balances
  const fetchBalance = useCallback(async (): Promise<void> => {
    try {
      const response = await axios.get(API_URL + "/balance");
      // console.log("GET All-Balance:", response);

      // setting amount values
      const data = response.data.data;

      setCashBalance(data.cashBalance);
      setOnlineBalance(data.onlineBalance);

      const total = Number(data.totalBalance).toFixed(2);
      setTotalBalance(Number(total));

      // return response.data;
    } catch (error) {
      console.error("GET AllBalance Error:", error);
      throw error;
    }
  }, []);

  // Fetch All Transactions
  const getAllTransactions = useCallback(async () => {
    try {
      const response = await axios.get(API_URL + "/transaction");
      // Sort transactions based on date
      const sortedTransactions = response.data.data.sort(
        (a: TransactionType, b: TransactionType) =>
          new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
      setTransactions(sortedTransactions);
    } catch (error) {
      console.error(error);
    }
  }, []);

  // Total amount earned
  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  // Total amount spend
  const totalExpense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);
  // console.log("LINK AMOUNT:", totalIncome, totalExpense);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    fetchBalance();
    getAllTransactions();
  }, [fetchBalance, getAllTransactions]);

  // Save to localStorage whenever authUser changes
  useEffect(() => {
    if (!authUser) {
      return;
    }

    if (authUser) {
      localStorage.setItem("authUser", JSON.stringify(authUser));
    } else {
      localStorage.removeItem("authUser");
    }
  }, [authUser]);

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

    totalIncome,
    totalExpense,

    // transactions
    transactions,
    getAllTransactions,
  };

  return (
    <div>
      <AppContext.Provider value={contextValues}>
        {children}
      </AppContext.Provider>
    </div>
  );
};
