import axios from "axios";

class EmployeeTools {
  constructor() {
    this.api = "http://localhost:5000/api/hr/employees";
  }

  async addEmployee(data) {
    const response = await axios.post(this.api, data);
    return response.data;
  }

  async getEmployees() {
    const response = await axios.get(this.api);
    return response.data;
  }

  async getEmployee(id) {
    const response = await axios.get(`${this.api}/${id}`);
    return response.data;
  }

  async updateEmployee(id, data) {
    const response = await axios.put(`${this.api}/${id}`, data);
    return response.data;
  }

  async deleteEmployee(id) {
    const response = await axios.delete(`${this.api}/${id}`);
    return response.data;
  }

  async searchEmployee(keyword) {
    const response = await axios.get(
      `${this.api}/search?q=${encodeURIComponent(keyword)}`
    );

    return response.data;
  }
}

export default new EmployeeTools();