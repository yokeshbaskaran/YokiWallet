import { useState } from "react";
import { useAppContext } from "../context/AppContext";

const AuthPage = () => {
  const { pathToHome, setAuthUser } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Hardcoded Admin Credentials
  const ADMIN_USERNAME = "YokiEditz";
  const ADMIN_PASSWORD = "Yoki2026";

  const handleUserLogin = () => {
    console.log("Login page!");

    // Validation
    if (!email.trim()) {
      alert("Email is required");
      return;
    }

    if (!password.trim()) {
      alert("Password is required");
      return;
    }

    // Check credentials
    if (email === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      alert("Login successful!");

      // Fake token
      localStorage.setItem("token", "admin-token");

      // Fake authenticated user
      setAuthUser({
        name: "Admin",
        email: ADMIN_USERNAME,
        role: "admin",
      });

      setEmail("");
      setPassword("");

      pathToHome();
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <section className="w-full h-screen flex flex-col justify-start items-center bg-bg">
      <div className="mt-12 mb-3 flex flex-col items-center gap-1">
        <img src="/logo.png" alt="logo" width={60} height={50} />

        <h3 className="mt-3 text-text text-2xl font-medium">
          Login to your account
        </h3>

        <p className="text-sm text-text-muted">Enter your details to login!</p>
      </div>

      <div className="w-85 md:w-120 p-5 md:px-14 pt-4 pb-8">
        <div className="w-full flex text-text flex-col items-center gap-1">
          <div className="w-full py-2">
            <p className="my-2 text-sm text-text font-medium">Username:</p>

            <input
              type="email"
              className="w-full px-2 py-2 border border-primary rounded"
              placeholder="Enter Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="w-full py-2">
            <p className="my-2 text-sm text-text font-medium">Password:</p>

            <input
              type="password"
              className="w-full px-2 py-2 text-sm border border-primary rounded"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleUserLogin();
                }
              }}
            />
          </div>

          <button
            onClick={handleUserLogin}
            className="w-full mt-3 p-3 bg-primary hover:bg-primary-hover text-lg font-semibold rounded text-white cursor-pointer"
          >
            Login
          </button>
        </div>
      </div>

      <div className="p-3 flex flex-col items-center text-sm text-white">
        <h2 className="my-2 font-bold">Credentials:</h2>
        <p>YokiEditz</p>
        <p>Yoki2026</p>
      </div>
    </section>
  );
};

export default AuthPage;
