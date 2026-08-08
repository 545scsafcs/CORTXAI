import LeadService from "../../services/crm/LeadService.js";

class LeadController {
  async create(req, res) {
    try {
      const creatorId = req.headers["x-user-id"] || req.body.createdBy || req.query.employeeId;
      if (!creatorId) {
        return res.status(400).json({ success: false, message: "User ID is required in headers or body" });
      }
      const lead = await LeadService.createLead(req.body, creatorId);
      res.status(201).json({ success: true, data: lead });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const userRole = req.headers["x-user-role"] || req.query.userRole || "admin";
      const userId = req.headers["x-user-id"] || req.query.employeeId;
      
      const filter = {};
      
      // Role-based Access Control scoping
      if (userRole === "employee" && userId) {
        // Sales Reps can only view leads assigned to them
        filter.assignedTo = userId;
      }
      
      const leads = await LeadService.getAllLeads(filter);
      res.json({ success: true, data: leads });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getOne(req, res) {
    try {
      const lead = await LeadService.getLeadById(req.params.id);
      res.json({ success: true, data: lead });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async update(req, res) {
    try {
      const modifierId = req.headers["x-user-id"] || req.body.modifiedBy || req.query.employeeId;
      if (!modifierId) {
        return res.status(400).json({ success: false, message: "Modifier User ID is required" });
      }
      const lead = await LeadService.updateLead(req.params.id, req.body, modifierId);
      res.json({ success: true, data: lead });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async delete(req, res) {
    try {
      await LeadService.deleteLead(req.params.id);
      res.json({ success: true, message: "Lead deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async bulkUpdateStatus(req, res) {
    try {
      const { ids, status } = req.body;
      const modifierId = req.headers["x-user-id"] || req.query.employeeId;
      if (!ids || !status) {
        return res.status(400).json({ success: false, message: "IDs array and status string are required" });
      }
      await LeadService.bulkUpdateStatus(ids, status, modifierId);
      res.json({ success: true, message: "Bulk status update completed" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async bulkDelete(req, res) {
    try {
      const { ids } = req.body;
      if (!ids) {
        return res.status(400).json({ success: false, message: "IDs array is required" });
      }
      await LeadService.bulkDelete(ids);
      res.json({ success: true, message: "Bulk deletion completed" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getStats(req, res) {
    try {
      const userRole = req.headers["x-user-role"] || req.query.userRole || "admin";
      const userId = req.headers["x-user-id"] || req.query.employeeId;
      
      const filter = {};
      if (userRole === "employee" && userId) {
        filter.assignedTo = userId;
      }
      
      const stats = await LeadService.getDashboardStats(filter);
      res.json({ success: true, data: stats });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new LeadController();
