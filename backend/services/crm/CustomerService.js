import CustomerRepository from "../../repositories/CustomerRepository.js";
import ActivityRepository from "../../repositories/ActivityRepository.js";

class CustomerService {
  async createCustomer(data, creatorId) {
    const customer = await CustomerRepository.create(data);

    await ActivityRepository.create({
      customerId: customer._id,
      type: "Note",
      title: "Customer Profile Created",
      description: `Customer account ${customer.company} was initialized.`,
      createdBy: creatorId
    });

    return customer;
  }

  async getAllCustomers(filter = {}) {
    return await CustomerRepository.findAll(filter);
  }

  async getCustomerById(id) {
    const customer = await CustomerRepository.findById(id);
    if (!customer) {
      throw new Error("Customer not found");
    }
    return customer;
  }

  async updateCustomer(id, data, modifierId) {
    const customer = await CustomerRepository.update(id, data);
    if (!customer) {
      throw new Error("Customer not found");
    }

    await ActivityRepository.create({
      customerId: id,
      type: "Note",
      title: "Customer Profile Updated",
      description: `Fields updated: ${Object.keys(data).join(", ")}.`,
      createdBy: modifierId
    });

    return customer;
  }

  async deleteCustomer(id) {
    const customer = await CustomerRepository.delete(id);
    if (!customer) {
      throw new Error("Customer not found");
    }
    return customer;
  }

  async addInteraction(id, type, summary, recorderId) {
    const customer = await CustomerRepository.findById(id);
    if (!customer) {
      throw new Error("Customer not found");
    }

    const interaction = {
      type,
      summary,
      recordedBy: recorderId,
      date: new Date()
    };

    const updated = await CustomerRepository.addInteraction(id, interaction);

    // Also push to activity feed
    await ActivityRepository.create({
      customerId: id,
      type: type === "Note" ? "Note" : type === "Meeting" ? "Meeting" : type === "Call" ? "Call" : "Email",
      title: `${type} Logged`,
      description: summary,
      createdBy: recorderId
    });

    // Add timeline event
    await CustomerRepository.addTimelineEvent(id, {
      event: `${type} Recorded`,
      description: summary
    });

    return updated;
  }
}

export default new CustomerService();
