import Customer from "../models/Customer.js";

class CustomerRepository {
  async create(data) {
    return await Customer.create(data);
  }

  async findAll(filter = {}) {
    return await Customer.find(filter)
      .populate({
        path: "leadId",
        populate: { path: "assignedTo", select: "firstName lastName" }
      })
      .sort({ createdAt: -1 });
  }

  async findById(id) {
    return await Customer.findById(id)
      .populate({
        path: "leadId",
        populate: { path: "assignedTo", select: "firstName lastName" }
      });
  }

  async update(id, data) {
    return await Customer.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async delete(id) {
    return await Customer.findByIdAndDelete(id);
  }

  async addInteraction(id, interaction) {
    return await Customer.findByIdAndUpdate(
      id,
      { $push: { interactionHistory: interaction } },
      { new: true }
    );
  }

  async addTimelineEvent(id, timelineEvent) {
    return await Customer.findByIdAndUpdate(
      id,
      { $push: { timeline: timelineEvent } },
      { new: true }
    );
  }
}

export default new CustomerRepository();
