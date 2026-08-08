import express from "express";
import cors from "cors";
import transactionRoutes from "./routes/transactionRoutes.js";
import balanceRoutes from "./routes/balanceRoutes.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
connectDB();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://yoki-wallet.vercel.app"],
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api/transaction", transactionRoutes);
app.use("/api/balance", balanceRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});
