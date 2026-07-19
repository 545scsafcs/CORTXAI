import express from "express";

import LeaveController from "../../controllers/leave/LeaveController.js";

const router = express.Router();

/* ==========================
        Apply Leave
========================== */

router.post(
  "/",
  LeaveController.apply
);

/* ==========================
      Get All Leaves
========================== */

router.get(
  "/",
  LeaveController.getAll
);

/* ==========================
   Employee Leave History
========================== */

router.get(
  "/employee/:employeeId",
  LeaveController.getEmployeeLeaves
);

/* ==========================
      Pending Leaves
========================== */

router.get(
  "/pending",
  LeaveController.pending
);

/* ==========================
      Get Single Leave
========================== */

router.get(
  "/:id",
  LeaveController.getOne
);

/* ==========================
      Approve Leave
========================== */

router.put(
  "/approve/:id",
  LeaveController.approve
);

/* ==========================
      Reject Leave
========================== */

router.put(
  "/reject/:id",
  LeaveController.reject
);

/* ==========================
      Update Leave
========================== */

router.put(
  "/:id",
  LeaveController.update
);

/* ==========================
      Delete Leave
========================== */

router.delete(
  "/:id",
  LeaveController.delete
);

export default router;