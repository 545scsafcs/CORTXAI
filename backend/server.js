import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import noraRoutes from "./routes/nora.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://cortxai.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CORTXAI Backend Running 🚀",
  });
});

app.use("/api/nora", noraRoutes);

app.use( (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});