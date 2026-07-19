import BaseAgent from "../shared/BaseAgent.js";
import EmployeeService from "../../backend/services/hr/EmployeeService.js";

class HRAgent extends BaseAgent {
  constructor() {
    super({
      name: "HR Agent",
      description: "AI Agent for Human Resource Management",
    });
  }

  async run(request) {
    const { action, payload } = request;

    switch (action) {

      case "ADD_EMPLOYEE":
        return await EmployeeService.createEmployee(payload);

      case "GET_EMPLOYEES":
        return await EmployeeService.getEmployees();

      case "GET_EMPLOYEE":
        return await EmployeeService.getEmployee(payload.id);

      case "UPDATE_EMPLOYEE":
        return await EmployeeService.updateEmployee(
          payload.id,
          payload.data
        );

      case "DELETE_EMPLOYEE":
        return await EmployeeService.deleteEmployee(payload.id);

      case "SEARCH_EMPLOYEE":
        return await EmployeeService.searchEmployee(
          payload.keyword
        );

      default:
        throw new Error(`Unknown Action : ${action}`);
    }
  }
}

export default new HRAgent();