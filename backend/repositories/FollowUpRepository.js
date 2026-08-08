import FollowUp from "../models/FollowUp.js";

class FollowUpRepository {
  async create(data) {
    return await FollowUp.create(data);
  }

  async findAll(filter = {}) {
    return await FollowUp.find(filter)
      .populate("leadId", "name company email phone status")
      .populate("customerId", "name company email phone")
      .populate("assignedTo", "firstName lastName")
      .sort({ scheduledAt: 1 });
  }

  async findById(id) {
    return await FollowUp.findById(id)
      .populate("leadId", "name company email phone status")
      .populate("customerId", "name company email phone")
      .populate("assignedTo", "firstName lastName");
  }

  async update(id, data) {
    return await FollowUp.findByIdAndUpdate(id, data, { new: true, runValidators: true })
      .populate("leadId", "name company email phone status")
      .populate("customerId", "name company email phone")
      .populate("assignedTo", "firstName lastName");
  }

  async delete(id) {
    return await FollowUp.findByIdAndDelete(id);
  }
}

export default new FollowUpRepository();
