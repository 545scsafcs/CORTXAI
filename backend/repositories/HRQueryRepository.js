import HRQuery from "../models/HRQuery.js";

class HRQueryRepository {

  /* === Create === */
  async create(data) {
    return await HRQuery.create(data);
  }

  /* === Find All (with optional filters) === */
  async findAll(filter = {}) {
    return await HRQuery.find(filter)
      .populate("employee", "firstName lastName employeeId email department designation profilePhoto")
      .populate("assignedTo", "firstName lastName employeeId email")
      .sort({ createdAt: -1 });
  }

  /* === Find By ID === */
  async findById(id) {
    return await HRQuery.findById(id)
      .populate("employee", "firstName lastName employeeId email department designation profilePhoto phone")
      .populate("assignedTo", "firstName lastName employeeId email")
      .populate("replies.sender", "firstName lastName employeeId profilePhoto");
  }

  /* === Find by Employee (for employee's own tickets) === */
  async findByEmployee(employeeId) {
    return await HRQuery.find({ employee: employeeId })
      .populate("assignedTo", "firstName lastName")
      .sort({ createdAt: -1 });
  }

  /* === Update Status === */
  async updateStatus(id, status) {
    const updateData = { status };

    if (status === "Resolved") {
      updateData.resolvedAt = new Date();
    }
    if (status === "Closed") {
      updateData.closedAt = new Date();
    }

    return await HRQuery.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    )
      .populate("employee", "firstName lastName employeeId email department designation profilePhoto")
      .populate("assignedTo", "firstName lastName employeeId email");
  }

  /* === Add Reply === */
  async addReply(id, reply) {
    return await HRQuery.findByIdAndUpdate(
      id,
      { $push: { replies: reply } },
      { new: true }
    )
      .populate("employee", "firstName lastName employeeId email department designation profilePhoto")
      .populate("replies.sender", "firstName lastName employeeId profilePhoto");
  }

  /* === Update Internal Notes === */
  async updateNotes(id, notes) {
    return await HRQuery.findByIdAndUpdate(
      id,
      { $set: { internalNotes: notes } },
      { new: true }
    );
  }

  /* === Stats by Department === */
  async getStatsByDepartment(department) {
    const filter = department ? { department } : {};

    const [total, pending, inProgress, resolved, closed] = await Promise.all([
      HRQuery.countDocuments(filter),
      HRQuery.countDocuments({ ...filter, status: "Pending" }),
      HRQuery.countDocuments({ ...filter, status: "In Progress" }),
      HRQuery.countDocuments({ ...filter, status: "Resolved" }),
      HRQuery.countDocuments({ ...filter, status: "Closed" }),
    ]);

    // Average resolution time (for resolved/closed tickets)
    const resolvedTickets = await HRQuery.find({
      ...filter,
      resolvedAt: { $ne: null },
    }).select("createdAt resolvedAt");

    let avgResponseHours = 0;
    if (resolvedTickets.length > 0) {
      const totalMs = resolvedTickets.reduce((sum, ticket) => {
        return sum + (ticket.resolvedAt.getTime() - ticket.createdAt.getTime());
      }, 0);
      avgResponseHours = Math.round(totalMs / resolvedTickets.length / (1000 * 60 * 60));
    }

    return {
      total,
      pending,
      inProgress,
      resolved,
      closed,
      avgResponseHours,
    };
  }
}

export default new HRQueryRepository();
