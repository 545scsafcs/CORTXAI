import express from "express";

import EmployeeController from "../../controllers/hr/EmployeeController.js";

const router = express.Router();

/* Login */

router.post(
  "/employees/login",
  EmployeeController.login
);

/* CRUD */

router.get(
  "/employees",
  EmployeeController.getAll
);

router.get(
  "/employees/search/:query",
  EmployeeController.search
);

router.get(
  "/employees/dashboard/stats",
  EmployeeController.getDashboardStats
);

/* Profile Management (before /:id to avoid param hijack) */

router.put(
  "/employees/:id/profile",
  EmployeeController.updateProfile
);

router.put(
  "/employees/:id/change-password",
  EmployeeController.changePassword
);

router.post(
  "/employees/:id/avatar",
  EmployeeController.uploadAvatar
);

router.delete(
  "/employees/:id/avatar",
  EmployeeController.removeAvatar
);

router.put(
  "/employees/:id/preferences",
  EmployeeController.updatePreferences
);

router.get(
  "/employees/:id/profile-completion",
  EmployeeController.getProfileCompletion
);

/* Standard CRUD with :id */

router.get(
  "/employees/:id",
  EmployeeController.getOne
);

router.post(
  "/employees",
  EmployeeController.create
);

router.put(
  "/employees/:id",
  EmployeeController.update
);

router.delete(
  "/employees/:id",
  EmployeeController.delete
);

export default router;
