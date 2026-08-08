import Activity from "../models/Activity.js";

class ActivityRepository {
  async create(data) {
    return await Activity.create(data);
  }

  async findByLead(leadId) {
    return await Activity.find({ leadId })
      .populate("createdBy", "firstName lastName")
      .sort({ createdAt: -1 });
  }

  async findByCustomer(customerId) {
    return await Activity.find({ customerId })
      .populate("createdBy", "firstName lastName")
      .sort({ createdAt: -1 });
  }

  async findAll(filter = {}, limit = 50) {
    return await Activity.find(filter)
      .populate("leadId", "name company")
      .populate("customerId", "name company")
      .populate("createdBy", "firstName lastName")
      .sort({ createdAt: -1 })
      .limit(limit);
  }
}

export default new ActivityRepository();
