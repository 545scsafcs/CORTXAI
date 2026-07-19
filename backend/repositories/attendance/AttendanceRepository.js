import Attendance from "../../models/attendance/Attendance.js";
import Employee from "../../models/Employee.js";

class AttendanceRepository {

  /* ===========================
          CREATE
  =========================== */

  async create(data) {
    return await Attendance.create(data);
  }

  /* ===========================
          GET ALL
  =========================== */

  async findAll() {
    return await Attendance.find()
      .sort({ date: -1 })
      .populate("employee");
  }

  /* ===========================
          GET BY ID
  =========================== */

  async findById(id) {
    return await Attendance.findById(id)
      .populate("employee");
  }

  /* ===========================
          TODAY (ALL EMPLOYEES)
  =========================== */

  async findToday() {

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    return await Attendance.find({
      date: {
        $gte: today,
        $lt: tomorrow,
      },
    })
      .populate("employee")
      .sort({
        employeeName: 1,
      });

  }

  /* ===========================
      TODAY BY EMPLOYEE
  =========================== */

  async findTodayByEmployee(employeeId) {

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    return await Attendance.findOne({

      employeeId,

      date: {
        $gte: today,
        $lt: tomorrow,
      },

    }).populate("employee");

  }

  /* ===========================
      MONTHLY ATTENDANCE
  =========================== */

  async findMonthly(employeeId, month, year) {

    const start = new Date(year, month - 1, 1);

    const end = new Date(year, month, 1);

    return await Attendance.find({

      employeeId,

      date: {
        $gte: start,
        $lt: end,
      },

    }).sort({
      date: -1,
    });

  }

  /* ===========================
      DASHBOARD STATS
  =========================== */

  async getDashboardStats() {

    const totalEmployees =
      await Attendance.distinct("employeeId");

    const todayAttendance =
      await this.findToday();

    const present =
      todayAttendance.filter(
        item => item.attendanceStatus === "Present"
      ).length;

    const absent =
      todayAttendance.filter(
        item => item.attendanceStatus === "Absent"
      ).length;

    const leave =
      todayAttendance.filter(
        item => item.attendanceStatus === "Leave"
      ).length;

    return {

      totalEmployees: totalEmployees.length,

      todayAttendance: todayAttendance.length,

      present,

      absent,

      leave,

    };

  }

  /* ===========================
          CHECK IN / OUT
  =========================== */

  async checkIn(employeeId, location, device) {
    const existing = await this.findTodayByEmployee(employeeId);
    if (existing) {
      throw new Error("Already checked in for today");
    }

    const employee = await Employee.findOne({ employeeId });
    if (!employee) {
      throw new Error("Employee not found");
    }

    const attendance = new Attendance({
      employee: employee._id,
      employeeId: employee.employeeId,
      employeeName: `${employee.firstName} ${employee.lastName}`.trim(),
      department: employee.department || "General",
      designation: employee.designation || "Staff",
      date: new Date(),
      checkIn: new Date(),
      checkOut: null,
      workingHours: 0,
      overtimeHours: 0,
      lateMinutes: 0,
      attendanceStatus: "Present",
      location: location || "Web",
      device: device || "Web",
    });

    return await attendance.save();
  }

  async checkOut(employeeId) {
    const attendance = await this.findTodayByEmployee(employeeId);
    if (!attendance) {
      throw new Error("No check-in record found for today");
    }
    if (attendance.checkOut) {
      throw new Error("Already checked out for today");
    }

    attendance.checkOut = new Date();
    const diffMs = attendance.checkOut.getTime() - attendance.checkIn.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    attendance.workingHours = Math.round(diffHours * 100) / 100;

    if (attendance.workingHours > 8) {
      attendance.overtimeHours = Math.round((attendance.workingHours - 8) * 100) / 100;
    } else {
      attendance.overtimeHours = 0;
    }

    return await attendance.save();
  }

  /* ===========================
          UPDATE
  =========================== */

  async update(id, data) {

    return await Attendance.findByIdAndUpdate(

      id,

      data,

      {
        new: true,
        runValidators: true,
      }

    );

  }

  /* ===========================
          DELETE
  =========================== */

  async delete(id) {

    return await Attendance.findByIdAndDelete(id);

  }

}

export default new AttendanceRepository();