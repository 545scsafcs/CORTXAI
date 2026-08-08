import ActivityService from "../../services/crm/ActivityService.js";

class ActivityController {
  async getLeadTimeline(req, res) {
    try {
      const timeline = await ActivityService.getLeadTimeline(req.params.leadId);
      res.json({ success: true, data: timeline });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getCustomerTimeline(req, res) {
    try {
      const timeline = await ActivityService.getCustomerTimeline(req.params.customerId);
      res.json({ success: true, data: timeline });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getRecentActivities(req, res) {
    try {
      const userRole = req.headers["x-user-role"] || req.query.userRole || "admin";
      const userId = req.headers["x-user-id"] || req.query.employeeId;

      const filter = {};
      if (userRole === "employee" && userId) {
        filter.createdBy = userId;
      }

      const activities = await ActivityService.getRecentActivities(filter, 20);
      res.json({ success: true, data: activities });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new ActivityController();
