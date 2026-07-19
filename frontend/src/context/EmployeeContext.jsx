import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { getEmployee } from "../services/employeeApi";

const EmployeeContext = createContext(null);

export function EmployeeProvider({ children }) {

  const [employee, setEmployeeState] = useState(() => {
    try {
      const saved = localStorage.getItem("employee");
      return saved ? JSON.parse(saved) : null;
    }
    catch {
      return null;
    }
  });

  useEffect(() => {
    if (employee) {
      localStorage.setItem(
        "employee",
        JSON.stringify(employee)
      );
    }
    else {
      localStorage.removeItem("employee");
    }
  }, [employee]);

  const setEmployee = (employeeData) => {
    setEmployeeState(employeeData);
  };

  const logoutEmployee = () => {
    localStorage.removeItem("employee");
    localStorage.removeItem("userRole");
    setEmployeeState(null);
  };

  /**
   * Refresh employee data from the backend and sync to context + localStorage.
   * Call this after profile/avatar/preferences updates to keep the entire UI in sync.
   */
  const refreshEmployee = async (id) => {
    try {
      const targetId = id || employee?._id;
      if (!targetId) return;

      const res = await getEmployee(targetId);
      const freshData = res.data || res;
      setEmployeeState(freshData);
    } catch (err) {
      console.error("Failed to refresh employee data:", err);
    }
  };

  return (
    <EmployeeContext.Provider
      value={{
        employee,
        setEmployee,
        logoutEmployee,
        refreshEmployee,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useEmployee() {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error(
      "useEmployee must be used inside EmployeeProvider"
    );
  }
  return context;
}