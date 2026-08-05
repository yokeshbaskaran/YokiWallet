import express from "express";
import cors from "cors";

import transactionRoutes from "./routes/transactionRoutes.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      //   "https://tweets-of-messages.onrender.com",
    ],
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api", transactionRoutes);

export default app;
