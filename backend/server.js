import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./database/db.js";

import noraRoutes from "./routes/nora.js";

import employeeRoutes from "./routes/hr/employeeRoutes.js";
import attendanceRoutes from "./routes/attendance/attendanceRoutes.js";
import leaveRoutes from "./routes/leave/leaveRoutes.js";
import queryRoutes from "./routes/hr/queryRoutes.js";
import crmRoutes from "./routes/crm/crmRoutes.js";

dotenv.config();

const app = express();

/* ============================
        Database
============================ */

connectDB();

/* ============================
        Middlewares
============================ */

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://cortxai-eight.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ============================
          Home
============================ */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CORTXAI Backend Running 🚀",
  });
});

/* ============================
          AI Routes
============================ */

app.use("/api/nora", noraRoutes);

/* ============================
        Employee Routes
============================ */

app.use("/api/hr", employeeRoutes);

/* ============================
      Attendance Routes
============================ */

app.use(
  "/api/hr/attendance",
  attendanceRoutes
);

/* ============================
         Leave Routes
============================ */

app.use(
  "/api/hr/leave",
  leaveRoutes
);

/* ============================
      HR Query Routes
============================ */

app.use(
  "/api/hr/queries",
  queryRoutes
);

/* ============================
          CRM Routes
============================ */

app.use(
  "/api/crm",
  crmRoutes
);

/* ============================
          404 Handler
============================ */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

/* ============================
        Global Error
============================ */

app.use((err, req, res, next) => {

  console.error(err);

  res.status(500).json({

    success: false,

    message: err.message || "Internal Server Error",

  });

});

/* ============================
          Server
============================ */

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `🚀 Server Running : http://localhost:${PORT}`
  );
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`\n==================================================`);
    console.error(`[Server Alert] EADDRINUSE: Port ${PORT} is already occupied!`);
    console.error(`Another Node.js instance or CORTXAI backend process is already running.`);
    console.error(`Avoiding starting another duplicate instance to prevent port conflicts.`);
    console.error(`Exiting gracefully...`);
    console.error(`==================================================\n`);
    process.exit(0); // Exit cleanly since another server instance is already running
  } else {
    console.error("Server experienced startup error:", error);
    process.exit(1);
  }
});