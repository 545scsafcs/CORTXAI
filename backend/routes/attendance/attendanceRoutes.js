import express from "express";

import AttendanceController from "../../controllers/attendance/AttendanceController.js";

const router = express.Router();

/* ===========================
        Attendance CRUD
=========================== */

// Get All Attendance

router.get(
  "/",
  AttendanceController.getAll
);

// Check-in / Check-out
router.post(
  "/check-in",
  AttendanceController.checkIn
);

router.post(
  "/check-out",
  AttendanceController.checkOut
);

// Today's Attendance (All)

router.get(
  "/today",
  AttendanceController.today
);

// Dashboard Stats
router.get(
  "/dashboard",
  AttendanceController.dashboard
);

// Today's Attendance by Employee
router.get(
  "/today/:employeeId",
  AttendanceController.todayByEmployee
);

// Monthly Attendance report
router.get(
  "/monthly/:employeeId",
  AttendanceController.monthly
);

// Get Single Attendance

router.get(
  "/:id",
  AttendanceController.getById
);

// Create Attendance

router.post(
  "/",
  AttendanceController.create
);

// Update Attendance

router.put(
  "/:id",
  AttendanceController.update
);

// Delete Attendance

router.delete(
  "/:id",
  AttendanceController.delete
);

export default router;
