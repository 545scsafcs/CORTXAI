import LeadRepository from "../../repositories/LeadRepository.js";
import CustomerRepository from "../../repositories/CustomerRepository.js";
import ActivityRepository from "../../repositories/ActivityRepository.js";

class LeadService {
  async createLead(data, creatorId) {
    const payload = { ...data, createdBy: creatorId };
    const lead = await LeadRepository.create(payload);

    // Record initial activity
    await ActivityRepository.create({
      leadId: lead._id,
      type: "Note",
      title: "Lead Created",
      description: `Lead for ${lead.name} at ${lead.company} was logged into the system.`,
      createdBy: creatorId
    });

    return lead;
  }

  async getAllLeads(filter = {}) {
    return await LeadRepository.findAll(filter);
  }

  async getLeadById(id) {
    const lead = await LeadRepository.findById(id);
    if (!lead) {
      throw new Error("Lead not found");
    }
    return lead;
  }

  async updateLead(id, data, modifierId) {
    const originalLead = await LeadRepository.findById(id);
    if (!originalLead) {
      throw new Error("Lead not found");
    }

    const updatedLead = await LeadRepository.update(id, data);

    // Track status change activity
    if (data.status && data.status !== originalLead.status) {
      await ActivityRepository.create({
        leadId: id,
        type: "Status Change",
        title: "Status Updated",
        description: `Lead status transitioned from ${originalLead.status} to ${data.status}.`,
        createdBy: modifierId
      });

      // Handle conversion when transitioned to "Won"
      if (data.status === "Won") {
        await this.convertToCustomer(updatedLead, modifierId);
      }
    }

    // Track assignment change
    if (data.assignedTo && String(data.assignedTo) !== String(originalLead.assignedTo)) {
      await ActivityRepository.create({
        leadId: id,
        type: "Assignment",
        title: "Lead Reassigned",
        description: "Assigned employee was updated.",
        createdBy: modifierId
      });
    }

    return updatedLead;
  }

  async convertToCustomer(lead, userId) {
    // Check if customer profile already exists
    const existing = await CustomerRepository.findAll({ leadId: lead._id });
    if (existing && existing.length > 0) {
      return existing[0];
    }

    // Create customer profile
    const customer = await CustomerRepository.create({
      leadId: lead._id,
      name: lead.name,
      company: lead.company,
      industry: lead.industry || "",
      email: lead.email,
      phone: lead.phone || "",
      gstIn: "", // To be updated by Sales Manager later
      pan: "",
      address: lead.address || "",
      website: lead.website || "",
      contacts: [{
        name: lead.name,
        email: lead.email,
        phone: lead.phone || "",
        designation: "Primary Contact"
      }],
      timeline: [{
        event: "Lead Converted",
        description: "Lead successfully converted to corporate customer."
      }]
    });

    await ActivityRepository.create({
      leadId: lead._id,
      customerId: customer._id,
      type: "Note",
      title: "Lead Converted to Customer",
      description: `Customer account created: ${customer.company}.`,
      createdBy: userId
    });

    return customer;
  }

  async deleteLead(id) {
    const lead = await LeadRepository.delete(id);
    if (!lead) {
      throw new Error("Lead not found");
    }
    return lead;
  }

  async bulkUpdateStatus(ids, status, modifierId) {
    await LeadRepository.bulkUpdateStatus(ids, status);
    
    // Log activity for each lead
    for (const id of ids) {
      await ActivityRepository.create({
        leadId: id,
        type: "Status Change",
        title: "Bulk Status Update",
        description: `Lead status bulk updated to ${status}.`,
        createdBy: modifierId
      });

      if (status === "Won") {
        const lead = await LeadRepository.findById(id);
        if (lead) {
          await this.convertToCustomer(lead, modifierId);
        }
      }
    }
  }

  async bulkDelete(ids) {
    return await LeadRepository.bulkDelete(ids);
  }

  async getDashboardStats(filter = {}) {
    return await LeadRepository.getDashboardStats(filter);
  }
}

export default new LeadService();
