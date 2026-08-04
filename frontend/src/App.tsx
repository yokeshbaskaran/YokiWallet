import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./layout/MainLayout";
import Expenses from "./pages/Expenses";
import Profile from "./pages/Profile";
import Homepage from "./pages/Homepage";
import { useAppContext } from "./context/AppContext";
import AuthPage from "./pages/AuthPage";

// types
type RouteProps = { children: React.ReactNode };

const ProtectedRoute = ({ children }: RouteProps) => {
  const { authUser } = useAppContext();
  return authUser ? children : <Navigate to="/login" />;
};

const AuthRoute = ({ children }: RouteProps) => {
  const { authUser } = useAppContext();
  return authUser ? <Navigate to="/" /> : children;
};

const App = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/auth"
          element={
            <AuthRoute>
              <AuthPage />
            </AuthRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Homepage />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
