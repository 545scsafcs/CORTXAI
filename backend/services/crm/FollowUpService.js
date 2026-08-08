import FollowUpRepository from "../../repositories/FollowUpRepository.js";
import ActivityRepository from "../../repositories/ActivityRepository.js";

class FollowUpService {
  async createFollowUp(data, creatorId) {
    const followUp = await FollowUpRepository.create(data);

    // Log Activity
    const activityPayload = {
      type: "Note",
      title: "Follow-up Scheduled",
      description: `Scheduled ${followUp.type}: "${followUp.title}" for ${new Date(followUp.scheduledAt).toLocaleString()}`,
      createdBy: creatorId
    };

    if (followUp.leadId) activityPayload.leadId = followUp.leadId;
    if (followUp.customerId) activityPayload.customerId = followUp.customerId;

    await ActivityRepository.create(activityPayload);

    return followUp;
  }

  async getAllFollowUps(filter = {}) {
    return await FollowUpRepository.findAll(filter);
  }

  async getFollowUpById(id) {
    const followUp = await FollowUpRepository.findById(id);
    if (!followUp) {
      throw new Error("Follow-up task not found");
    }
    return followUp;
  }

  async updateFollowUp(id, data, modifierId) {
    const original = await FollowUpRepository.findById(id);
    if (!original) {
      throw new Error("Follow-up task not found");
    }

    const updated = await FollowUpRepository.update(id, data);

    // If completed, update completedAt and write activity
    if (data.status === "Completed" && original.status !== "Completed") {
      updated.completedAt = new Date();
      await updated.save();

      const activityPayload = {
        type: original.type === "Meeting" ? "Meeting" : original.type === "Call" ? "Call" : "Email",
        title: `Follow-up Completed`,
        description: `Completed: ${original.title}. Notes: ${data.description || ""}`,
        createdBy: modifierId
      };

      if (original.leadId) activityPayload.leadId = original.leadId._id;
      if (original.customerId) activityPayload.customerId = original.customerId._id;

      await ActivityRepository.create(activityPayload);
    }

    return updated;
  }

  async deleteFollowUp(id) {
    const followUp = await FollowUpRepository.delete(id);
    if (!followUp) {
      throw new Error("Follow-up task not found");
    }
    return followUp;
  }
}

export default new FollowUpService();
