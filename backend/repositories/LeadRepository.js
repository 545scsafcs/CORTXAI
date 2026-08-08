import Lead from "../models/Lead.js";

class LeadRepository {
  async create(data) {
    return await Lead.create(data);
  }

  async findAll(filter = {}) {
    return await Lead.find(filter)
      .populate("assignedTo", "firstName lastName email phone department designation")
      .populate("createdBy", "firstName lastName")
      .sort({ createdAt: -1 });
  }

  async findById(id) {
    return await Lead.findById(id)
      .populate("assignedTo", "firstName lastName email phone department designation")
      .populate("createdBy", "firstName lastName");
  }

  async update(id, data) {
    return await Lead.findByIdAndUpdate(id, data, { new: true, runValidators: true })
      .populate("assignedTo", "firstName lastName email phone department designation")
      .populate("createdBy", "firstName lastName");
  }

  async delete(id) {
    return await Lead.findByIdAndDelete(id);
  }

  async bulkUpdateStatus(ids, status) {
    return await Lead.updateMany({ _id: { $in: ids } }, { $set: { status } });
  }

  async bulkDelete(ids) {
    return await Lead.deleteMany({ _id: { $in: ids } });
  }

  async getDashboardStats(filter = {}) {
    const total = await Lead.countDocuments(filter);
    const active = await Lead.countDocuments({ ...filter, status: { $nin: ["Won", "Lost"] } });
    const won = await Lead.countDocuments({ ...filter, status: "Won" });
    const lost = await Lead.countDocuments({ ...filter, status: "Lost" });

    // Group by status
    const statusGroups = await Lead.aggregate([
      { $match: filter },
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    const statusCounts = {};
    statusGroups.forEach(grp => {
      statusCounts[grp._id] = grp.count;
    });

    // Group by source
    const sourceGroups = await Lead.aggregate([
      { $match: filter },
      { $group: { _id: "$leadSource", count: { $sum: 1 } } }
    ]);

    const sourceCounts = {};
    sourceGroups.forEach(grp => {
      sourceCounts[grp._id] = grp.count;
    });

    // Revenue trend & monthly aggregates
    const pipelineRevenue = await Lead.aggregate([
      { $match: { ...filter, status: { $nin: ["Lost"] } } },
      { $group: { _id: null, totalExpectedRevenue: { $sum: "$expectedRevenue" } } }
    ]);

    const expectedRevenue = pipelineRevenue[0]?.totalExpectedRevenue || 0;

    return {
      totalLeads: total,
      activeLeads: active,
      convertedLeads: won,
      lostLeads: lost,
      expectedRevenue,
      statusCounts,
      sourceCounts,
    };
  }
}

export default new LeadRepository();
