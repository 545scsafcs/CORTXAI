import express from "express";
import HRQueryController from "../../controllers/hr/HRQueryController.js";

const router = express.Router();

/* === Employee creates a query === */
router.post(
  "/",
  HRQueryController.createQuery
);

/* === HR gets department queries === */
router.get(
  "/",
  HRQueryController.getQueries
);

/* === Dashboard stats === */
router.get(
  "/stats",
  HRQueryController.getDashboardStats
);

/* === Employee gets own queries === */
router.get(
  "/employee/:employeeId",
  HRQueryController.getEmployeeQueries
);

/* === Get single query === */
router.get(
  "/:id",
  HRQueryController.getQueryById
);

/* === Update status === */
router.put(
  "/:id/status",
  HRQueryController.updateStatus
);

/* === Add reply === */
router.post(
  "/:id/reply",
  HRQueryController.addReply
);

export default router;
