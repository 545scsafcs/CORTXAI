import EmployeeService from "../../services/hr/EmployeeService.js";

class EmployeeController {

  /* ===========================
          CREATE
  =========================== */

  async create(req, res) {
    try {
      const employee = await EmployeeService.create(req.body);
      res.status(201).json({
        success: true,
        data: employee,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  /* ===========================
          GET ALL
  =========================== */

  async getAll(req, res) {
    try {
      const employees = await EmployeeService.getAll();
      res.json({
        success: true,
        data: employees,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  /* ===========================
          GET ONE
  =========================== */

  async getOne(req, res) {
    try {
      const employee = await EmployeeService.getOne(req.params.id);
      res.json({
        success: true,
        data: employee,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  /* ===========================
          UPDATE
  =========================== */

  async update(req, res) {
    try {
      const employee = await EmployeeService.update(
        req.params.id,
        req.body
      );
      res.json({
        success: true,
        data: employee,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  /* ===========================
          DELETE
  =========================== */

  async delete(req, res) {
    try {
      await EmployeeService.delete(req.params.id);
      res.json({
        success: true,
        message: "Employee deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  /* ===========================
          SEARCH
  =========================== */

  async search(req, res) {
    try {
      const employees = await EmployeeService.search(req.params.query);
      res.json({
        success: true,
        data: employees,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  /* ===========================
        EMPLOYEE LOGIN
  =========================== */

  async login(req, res) {
    try {
      const { email, employeeId } = req.body;

      if (!email || !employeeId) {
        return res.status(400).json({
          success: false,
          message: "Email and Employee ID are required",
        });
      }

      const employee = await EmployeeService.login(email, employeeId);

      if (!employee) {
        return res.status(401).json({
          success: false,
          message: "Invalid Email or Employee ID",
        });
      }

      // Record login activity (non-blocking)
      const userAgent = req.headers["user-agent"] || "";
      const ip = req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "";
      EmployeeService.recordLoginActivity(employee._id, userAgent, ip).catch((err) =>
        console.error("Failed to record login activity:", err.message)
      );

      res.json({
        success: true,
        message: "Login successful",
        data: employee,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  /* ===========================
       DASHBOARD STATS
  =========================== */

  async getDashboardStats(req, res) {
    try {
      const stats = await EmployeeService.getDashboardStats();
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

  /* ===========================
       UPDATE PROFILE
  =========================== */

  async updateProfile(req, res) {
    try {
      const employee = await EmployeeService.updateProfile(
        req.params.id,
        req.body
      );

      // Also return profile completion
      const completion = EmployeeService.getProfileCompletion(employee);

      res.json({
        success: true,
        data: employee,
        profileCompletion: completion,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  /* ===========================
       CHANGE PASSWORD
  =========================== */

  async changePassword(req, res) {
    try {
      const { currentPassword, newPassword } = req.body;

      if (!newPassword) {
        return res.status(400).json({
          success: false,
          message: "New password is required",
        });
      }

      // Validate password strength
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
      if (!passwordRegex.test(newPassword)) {
        return res.status(400).json({
          success: false,
          message:
            "Password must be at least 8 characters with uppercase, lowercase, number, and special character",
        });
      }

      const employee = await EmployeeService.changePassword(
        req.params.id,
        currentPassword || "",
        newPassword
      );

      res.json({
        success: true,
        message: "Password changed successfully",
        data: employee,
      });
    } catch (error) {
      const statusCode = error.message === "Current password is incorrect" ? 400 : 500;
      res.status(statusCode).json({
        success: false,
        message: error.message,
      });
    }
  }

  /* ===========================
       UPLOAD AVATAR
  =========================== */

  async uploadAvatar(req, res) {
    try {
      const { avatar } = req.body;

      if (!avatar) {
        return res.status(400).json({
          success: false,
          message: "Avatar data is required",
        });
      }

      const employee = await EmployeeService.uploadAvatar(
        req.params.id,
        avatar
      );

      res.json({
        success: true,
        message: "Avatar uploaded successfully",
        data: employee,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  /* ===========================
       REMOVE AVATAR
  =========================== */

  async removeAvatar(req, res) {
    try {
      const employee = await EmployeeService.removeAvatar(req.params.id);
      res.json({
        success: true,
        message: "Avatar removed successfully",
        data: employee,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  /* ===========================
       UPDATE PREFERENCES
  =========================== */

  async updatePreferences(req, res) {
    try {
      const employee = await EmployeeService.updatePreferences(
        req.params.id,
        req.body
      );

      res.json({
        success: true,
        message: "Preferences updated successfully",
        data: employee,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  /* ===========================
      PROFILE COMPLETION
  =========================== */

  async getProfileCompletion(req, res) {
    try {
      const employee = await EmployeeService.getOne(req.params.id);
      const completion = EmployeeService.getProfileCompletion(employee);

      res.json({
        success: true,
        data: completion,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new EmployeeController();