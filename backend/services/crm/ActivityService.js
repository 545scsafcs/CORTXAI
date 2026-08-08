import ActivityRepository from "../../repositories/ActivityRepository.js";

class ActivityService {
  async getLeadTimeline(leadId) {
    return await ActivityRepository.findByLead(leadId);
  }

  async getCustomerTimeline(customerId) {
    return await ActivityRepository.findByCustomer(customerId);
  }

  async getRecentActivities(filter = {}, limit = 50) {
    return await ActivityRepository.findAll(filter, limit);
  }

  async logActivity(data, creatorId) {
    const payload = { ...data, createdBy: creatorId };
    return await ActivityRepository.create(payload);
  }
}

export default new ActivityService();
