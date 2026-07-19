import express from "express";
import AttendanceController from "../../controllers/attendance/AttendanceController.js";

const router = express.Router();

/* ===========================
      Attendance CRUD
=========================== */

// Dashboard

router.get(
  "/dashboard",
  AttendanceController.dashboard
);

// Today's Attendance (All Employees)

router.get(
  "/today",
  AttendanceController.today
);

// Today's Attendance (Single Employee)

router.get(
  "/today/:employeeId",
  AttendanceController.todayByEmployee
);

// Monthly Attendance Report

router.get(
  "/monthly/:employeeId",
  AttendanceController.monthly
);

// Get All Attendance

router.get(
  "/",
  AttendanceController.getAll
);

// Get Attendance By Id

router.get(
  "/:id",
  AttendanceController.getById
);

// Create

router.post(
  "/",
  AttendanceController.create
);

// Update

router.put(
  "/:id",
  AttendanceController.update
);

// Delete

router.delete(
  "/:id",
  AttendanceController.delete
);

export default router;