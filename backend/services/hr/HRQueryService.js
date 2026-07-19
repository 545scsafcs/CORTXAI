import HRQueryRepository from "../../repositories/HRQueryRepository.js";
import EmployeeRepository from "../../repositories/EmployeeRepository.js";

class HRQueryService {

  /* ===========================
      Employee Creates a Query
  =========================== */

  async createQuery(employeeData, queryData) {
    // Build the full ticket payload
    const ticket = {
      employee: employeeData._id,
      employeeName: `${employeeData.firstName} ${employeeData.lastName || ""}`.trim(),
      employeeCode: employeeData.employeeId,
      employeeEmail: employeeData.email,
      department: employeeData.department || "General",
      designation: employeeData.designation || "",
      subject: queryData.subject,
      category: queryData.category || "General Query",
      message: queryData.message,
      priority: queryData.priority || "Medium",
      status: "Pending",
    };

    // Try to auto-assign to an HR manager in the same department
    const hrManagers = await this.findHRManagersByDepartment(
      employeeData.department
    );
    if (hrManagers.length > 0) {
      ticket.assignedTo = hrManagers[0]._id;
    }

    return await HRQueryRepository.create(ticket);
  }

  /* ===========================
    Find HR Managers by Department
  =========================== */

  async findHRManagersByDepartment(department) {
    if (!department) return [];

    // Find employees whose designation contains "HR" (case-insensitive)
    // in the same department
    const allEmployees = await EmployeeRepository.findAll();
    return allEmployees.filter(
      (emp) =>
        emp.designation &&
        emp.designation.toLowerCase().includes("hr") &&
        emp.department &&
        emp.department.toLowerCase() === department.toLowerCase() &&
        emp.status === "Active"
    );
  }

  /* ===========================
    Get Queries for HR Manager
    (department-scoped)
  =========================== */

  async getQueriesForHR(department, statusFilter) {
    const filter = {};

    if (department) {
      filter.department = { $regex: new RegExp(`^${department}$`, "i") };
    }

    if (statusFilter && statusFilter !== "All") {
      filter.status = statusFilter;
    }

    return await HRQueryRepository.findAll(filter);
  }

  /* ===========================
    Get Queries for Employee
  =========================== */

  async getQueriesForEmployee(employeeMongoId) {
    return await HRQueryRepository.findByEmployee(employeeMongoId);
  }

  /* ===========================
        Get Query by ID
  =========================== */

  async getQueryById(id) {
    const query = await HRQueryRepository.findById(id);
    if (!query) {
      throw new Error("Query not found");
    }
    return query;
  }

  /* ===========================
       Update Ticket Status
  =========================== */

  async updateStatus(id, status) {
    const validStatuses = ["Pending", "In Progress", "Resolved", "Closed"];
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid status. Must be one of: ${validStatuses.join(", ")}`);
    }

    const query = await HRQueryRepository.updateStatus(id, status);
    if (!query) {
      throw new Error("Query not found");
    }
    return query;
  }

  /* ===========================
          Add Reply
  =========================== */

  async addReply(id, senderData, message) {
    if (!message || message.trim() === "") {
      throw new Error("Reply message cannot be empty");
    }

    const reply = {
      sender: senderData._id,
      senderName: `${senderData.firstName} ${senderData.lastName || ""}`.trim(),
      senderRole: senderData.isHR ? "hr" : "employee",
      message: message.trim(),
    };

    const query = await HRQueryRepository.addReply(id, reply);
    if (!query) {
      throw new Error("Query not found");
    }

    // Auto-update status to "In Progress" if HR replies and status is Pending
    if (senderData.isHR && query.status === "Pending") {
      await HRQueryRepository.updateStatus(id, "In Progress");
    }

    return query;
  }

  /* ===========================
      Dashboard Stats
  =========================== */

  async getDashboardStats(department) {
    return await HRQueryRepository.getStatsByDepartment(department);
  }
}

export default new HRQueryService();
