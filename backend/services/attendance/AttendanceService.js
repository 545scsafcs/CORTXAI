import AttendanceRepository from "../../repositories/attendance/AttendanceRepository.js";

class AttendanceService {

  /* ===========================
          CREATE
  =========================== */

  async createAttendance(data) {

    return await AttendanceRepository.create(data);

  }

  /* ===========================
          GET ALL
  =========================== */

  async getAttendance() {

    return await AttendanceRepository.findAll();

  }

  /* ===========================
      TODAY (ALL EMPLOYEES)
  =========================== */

  async getTodayAttendance() {

    return await AttendanceRepository.findToday();

  }

  /* ===========================
      TODAY (SINGLE EMPLOYEE)
  =========================== */

  async getTodayAttendanceByEmployee(employeeId) {

    return await AttendanceRepository.findTodayByEmployee(
      employeeId
    );

  }

  /* ===========================
        MONTHLY REPORT
  =========================== */

  async getMonthlyAttendance(
    employeeId,
    month,
    year
  ) {

    return await AttendanceRepository.findMonthly(

      employeeId,

      month,

      year

    );

  }

  /* ===========================
      DASHBOARD STATS
  =========================== */

  async getDashboardStats() {

    return await AttendanceRepository.getDashboardStats();

  }

  /* ===========================
          GET BY ID
  =========================== */

  async getAttendanceById(id) {

    return await AttendanceRepository.findById(id);

  }

  /* ===========================
          UPDATE
  =========================== */

  async updateAttendance(id, data) {

    return await AttendanceRepository.update(
      id,
      data
    );

  }

  /* ===========================
          CHECK IN / OUT
  =========================== */

  async checkIn(employeeId, location, device) {
    return await AttendanceRepository.checkIn(employeeId, location, device);
  }

  async checkOut(employeeId) {
    return await AttendanceRepository.checkOut(employeeId);
  }

  /* ===========================
          DELETE
  =========================== */

  async deleteAttendance(id) {

    return await AttendanceRepository.delete(id);

  }

}

export default new AttendanceService();