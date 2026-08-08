import express from "express";
import LeadController from "../../controllers/crm/LeadController.js";
import CustomerController from "../../controllers/crm/CustomerController.js";
import FollowUpController from "../../controllers/crm/FollowUpController.js";
import ActivityController from "../../controllers/crm/ActivityController.js";

const router = express.Router();

/* ==========================
          Leads
========================== */
router.post("/leads", LeadController.create);
router.get("/leads", LeadController.getAll);
router.get("/leads/stats", LeadController.getStats);
router.get("/leads/:id", LeadController.getOne);
router.put("/leads/:id", LeadController.update);
router.delete("/leads/:id", LeadController.delete);
router.post("/leads/bulk-update", LeadController.bulkUpdateStatus);
router.post("/leads/bulk-delete", LeadController.bulkDelete);

/* ==========================
        Customers
========================== */
router.post("/customers", CustomerController.create);
router.get("/customers", CustomerController.getAll);
router.get("/customers/:id", CustomerController.getOne);
router.put("/customers/:id", CustomerController.update);
router.delete("/customers/:id", CustomerController.delete);
router.post("/customers/:id/interaction", CustomerController.logInteraction);

/* ==========================
        Follow-ups
========================== */
router.post("/followups", FollowUpController.create);
router.get("/followups", FollowUpController.getAll);
router.get("/followups/:id", FollowUpController.getOne);
router.put("/followups/:id", FollowUpController.update);
router.delete("/followups/:id", FollowUpController.delete);

/* ==========================
        Activities
========================== */
router.get("/activities/recent", ActivityController.getRecentActivities);
router.get("/activities/lead/:leadId", ActivityController.getLeadTimeline);
router.get("/activities/customer/:customerId", ActivityController.getCustomerTimeline);

export default router;
