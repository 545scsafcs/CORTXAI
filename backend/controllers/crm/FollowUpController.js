import FollowUpService from "../../services/crm/FollowUpService.js";

class FollowUpController {
  async create(req, res) {
    try {
      const creatorId = req.headers["x-user-id"] || req.query.employeeId;
      if (!creatorId) {
        return res.status(400).json({ success: false, message: "User ID is required" });
      }
      const followUp = await FollowUpService.createFollowUp(req.body, creatorId);
      res.status(201).json({ success: true, data: followUp });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const userRole = req.headers["x-user-role"] || req.query.userRole || "admin";
      const userId = req.headers["x-user-id"] || req.query.employeeId;

      const filter = {};
      if (userRole === "employee" && userId) {
        filter.assignedTo = userId;
      }

      const followUps = await FollowUpService.getAllFollowUps(filter);
      res.json({ success: true, data: followUps });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getOne(req, res) {
    try {
      const followUp = await FollowUpService.getFollowUpById(req.params.id);
      res.json({ success: true, data: followUp });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async update(req, res) {
    try {
      const modifierId = req.headers["x-user-id"] || req.query.employeeId;
      const followUp = await FollowUpService.updateFollowUp(req.params.id, req.body, modifierId);
      res.json({ success: true, data: followUp });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async delete(req, res) {
    try {
      await FollowUpService.deleteFollowUp(req.params.id);
      res.json({ success: true, message: "Follow-up deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new FollowUpController();
