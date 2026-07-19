import HRQueryService from "../../services/hr/HRQueryService.js";

class HRQueryController {

  /* ===========================
    Employee Creates a Query
  =========================== */

  async createQuery(req, res) {
    try {
      const { employee, subject, category, message, priority } = req.body;

      if (!employee || !employee._id) {
        return res.status(400).json({
          success: false,
          message: "Employee data is required",
        });
      }

      if (!subject || !message) {
        return res.status(400).json({
          success: false,
          message: "Subject and message are required",
        });
      }

      const query = await HRQueryService.createQuery(employee, {
        subject,
        category,
        message,
        priority,
      });

      res.status(201).json({
        success: true,
        message: "Query submitted successfully",
        data: query,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  /* ===========================
    HR Gets Department Queries
  =========================== */

  async getQueries(req, res) {
    try {
      const { department, status } = req.query;

      const queries = await HRQueryService.getQueriesForHR(
        department,
        status
      );

      res.json({
        success: true,
        data: queries,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  /* ===========================
    Employee Gets Own Queries
  =========================== */

  async getEmployeeQueries(req, res) {
    try {
      const { employeeId } = req.params;

      if (!employeeId) {
        return res.status(400).json({
          success: false,
          message: "Employee ID is required",
        });
      }

      const queries = await HRQueryService.getQueriesForEmployee(employeeId);

      res.json({
        success: true,
        data: queries,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  /* ===========================
      Get Single Query
  =========================== */

  async getQueryById(req, res) {
    try {
      const query = await HRQueryService.getQueryById(req.params.id);

      res.json({
        success: true,
        data: query,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  /* ===========================
       Update Status
  =========================== */

  async updateStatus(req, res) {
    try {
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({
          success: false,
          message: "Status is required",
        });
      }

      const query = await HRQueryService.updateStatus(
        req.params.id,
        status
      );

      res.json({
        success: true,
        message: `Status updated to ${status}`,
        data: query,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  /* ===========================
          Add Reply
  =========================== */

  async addReply(req, res) {
    try {
      const { sender, message } = req.body;

      if (!sender || !sender._id) {
        return res.status(400).json({
          success: false,
          message: "Sender data is required",
        });
      }

      if (!message) {
        return res.status(400).json({
          success: false,
          message: "Message is required",
        });
      }

      const query = await HRQueryService.addReply(
        req.params.id,
        sender,
        message
      );

      res.json({
        success: true,
        message: "Reply added successfully",
        data: query,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  /* ===========================
       Dashboard Stats
  =========================== */

  async getDashboardStats(req, res) {
    try {
      const { department } = req.query;

      const stats = await HRQueryService.getDashboardStats(department);

      res.json({
        success: true,
        data: stats,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new HRQueryController();
