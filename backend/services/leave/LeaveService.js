import LeaveRepository from "../../repositories/leave/LeaveRepository.js";
import EmployeeRepository from "../../repositories/EmployeeRepository.js";

class LeaveService {

  /* ==========================
          Apply Leave
  ========================== */

  async applyLeave(data) {

    const employee =
      await EmployeeRepository.findById(
        data.employee
      );

    if (!employee) {

      throw new Error(
        "Employee not found"
      );

    }

    if (
      employee.leaveBalance <
      Number(data.totalDays)
    ) {

      throw new Error(
        "Insufficient Leave Balance"
      );

    }

    return await LeaveRepository.create({

      employee: employee._id,

      employeeId: employee.employeeId,

      employeeName:
        `${employee.firstName} ${employee.lastName}`,

      department: employee.department,

      designation: employee.designation,

      leaveType: data.leaveType,

      reason: data.reason,

      fromDate: data.fromDate,

      toDate: data.toDate,

      totalDays: Number(data.totalDays),

    });

  }

  /* ==========================
          Get All
  ========================== */

  async getLeaves() {

    return await LeaveRepository.findAll();

  }

  /* ==========================
      Employee Leaves
  ========================== */

  async getEmployeeLeaves(employeeId) {

    return await LeaveRepository.findByEmployee(
      employeeId
    );

  }

  /* ==========================
          Get One
  ========================== */

  async getLeave(id) {

    return await LeaveRepository.findById(
      id
    );

  }

  /* ==========================
      Pending Leaves
  ========================== */

  async getPendingLeaves() {

    return await LeaveRepository.findPending();

  }

  /* ==========================
        Approve Leave
  ========================== */

  async approveLeave(

    id,

    approvedBy = "HR"

  ) {

    const leave =
      await LeaveRepository.findById(id);

    if (!leave) {

      throw new Error(
        "Leave not found"
      );

    }

    if (
      leave.status !== "Pending"
    ) {

      throw new Error(
        "Leave already processed"
      );

    }

    const employee =
      await EmployeeRepository.findById(
        leave.employee._id
      );

    if (!employee) {

      throw new Error(
        "Employee not found"
      );

    }

    employee.leaveBalance -=
      leave.totalDays;

    await employee.save();

    return await LeaveRepository.approve(

      id,

      approvedBy

    );

  }

  /* ==========================
        Reject Leave
  ========================== */

  async rejectLeave(

    id,

    reason

  ) {

    return await LeaveRepository.reject(

      id,

      reason

    );

  }

  /* ==========================
          Update
  ========================== */

  async updateLeave(

    id,

    data

  ) {

    return await LeaveRepository.update(

      id,

      data

    );

  }

  /* ==========================
          Delete
  ========================== */

  async deleteLeave(id) {

    return await LeaveRepository.delete(
      id
    );

  }

}

export default new LeaveService();