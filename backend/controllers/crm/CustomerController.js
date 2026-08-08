import CustomerService from "../../services/crm/CustomerService.js";

class CustomerController {
  async create(req, res) {
    try {
      const creatorId = req.headers["x-user-id"] || req.query.employeeId;
      const customer = await CustomerService.createCustomer(req.body, creatorId);
      res.status(201).json({ success: true, data: customer });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const customers = await CustomerService.getAllCustomers();
      res.json({ success: true, data: customers });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getOne(req, res) {
    try {
      const customer = await CustomerService.getCustomerById(req.params.id);
      res.json({ success: true, data: customer });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async update(req, res) {
    try {
      const modifierId = req.headers["x-user-id"] || req.query.employeeId;
      const customer = await CustomerService.updateCustomer(req.params.id, req.body, modifierId);
      res.json({ success: true, data: customer });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async delete(req, res) {
    try {
      await CustomerService.deleteCustomer(req.params.id);
      res.json({ success: true, message: "Customer deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async logInteraction(req, res) {
    try {
      const { type, summary } = req.body;
      const recorderId = req.headers["x-user-id"] || req.query.employeeId;
      if (!type || !summary || !recorderId) {
        return res.status(400).json({ success: false, message: "Type, summary and recorder ID are required" });
      }
      const customer = await CustomerService.addInteraction(req.params.id, type, summary, recorderId);
      res.json({ success: true, data: customer });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new CustomerController();
