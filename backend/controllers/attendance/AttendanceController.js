import AttendanceService from "../../services/attendance/AttendanceService.js";

class AttendanceController {

  /* ===========================
          CREATE
  =========================== */

  async create(req, res) {

    try {

      const attendance =
        await AttendanceService.createAttendance(
          req.body
        );

      res.status(201).json({
        success: true,
        data: attendance,
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

      const attendance =
        await AttendanceService.getAttendance();

      res.json({
        success: true,
        data: attendance,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  }

  /* ===========================
      TODAY (ALL EMPLOYEES)
  =========================== */

  async today(req, res) {

    try {

      const attendance =
        await AttendanceService.getTodayAttendance();

      res.json({
        success: true,
        data: attendance,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  }

  /* ===========================
      TODAY (SINGLE EMPLOYEE)
  =========================== */

  async todayByEmployee(req, res) {

    try {

      const attendance =
        await AttendanceService.getTodayAttendanceByEmployee(
          req.params.employeeId
        );

      res.json({
        success: true,
        data: attendance,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  }

  /* ===========================
        MONTHLY REPORT
  =========================== */

  async monthly(req, res) {

    try {

      const { employeeId } = req.params;

      const { month, year } = req.query;

      const report =
        await AttendanceService.getMonthlyAttendance(
          employeeId,
          Number(month),
          Number(year)
        );

      res.json({
        success: true,
        data: report,
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

  async dashboard(req, res) {

    try {

      const stats =
        await AttendanceService.getDashboardStats();

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
          GET BY ID
  =========================== */

  async getById(req, res) {

    try {

      const attendance =
        await AttendanceService.getAttendanceById(
          req.params.id
        );

      res.json({
        success: true,
        data: attendance,
      });

    } catch (error) {

      res.status(500).json({
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

      const attendance =
        await AttendanceService.updateAttendance(
          req.params.id,
          req.body
        );

      res.json({
        success: true,
        data: attendance,
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

      await AttendanceService.deleteAttendance(
        req.params.id
      );

      res.json({
        success: true,
        message: "Attendance deleted successfully",
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  }

  async checkIn(req, res) {
    try {
      const { employeeId, location, device } = req.body;
      if (!employeeId) {
        return res.status(400).json({
          success: false,
          message: "Employee ID is required",
        });
      }
      const attendance = await AttendanceService.checkIn(employeeId, location, device);
      res.status(201).json({
        success: true,
        data: attendance,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async checkOut(req, res) {
    try {
      const { employeeId } = req.body;
      if (!employeeId) {
        return res.status(400).json({
          success: false,
          message: "Employee ID is required",
        });
      }
      const attendance = await AttendanceService.checkOut(employeeId);
      res.json({
        success: true,
        data: attendance,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

}

export default new AttendanceController();