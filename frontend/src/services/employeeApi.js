import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const API = axios.create({
  baseURL: `${API_BASE_URL}/hr`,
});

/* ==========================
        Employee CRUD
========================== */

export const getEmployees = async () => {
  const res = await API.get("/employees");
  return res.data;
};

export const getEmployee = async (id) => {
  const res = await API.get(`/employees/${id}`);
  return res.data;
};

export const addEmployee = async (employee) => {
  const res = await API.post("/employees", employee);
  return res.data;
};

export const createEmployee = addEmployee;

export const updateEmployee = async (idOrEmployee, optionalPayload) => {
  let id;
  let payload;
  if (typeof idOrEmployee === "string") {
    id = idOrEmployee;
    payload = optionalPayload;
  } else {
    id = idOrEmployee._id;
    payload = idOrEmployee;
  }
  const res = await API.put(`/employees/${id}`, payload);
  return res.data;
};

export const deleteEmployee = async (id) => {
  const res = await API.delete(`/employees/${id}`);
  return res.data;
};

export const searchEmployees = async (query) => {
  const res = await API.get(`/employees/search/${query}`);
  return res.data;
};

export const searchEmployee = searchEmployees;

export const getDashboardStats = async () => {
  const res = await API.get("/employees/dashboard/stats");
  return res.data;
};

/* ==========================
      Employee Login
========================== */

export const employeeLogin = async (email, employeeId) => {
  const res = await API.post("/employees/login", {
    email,
    employeeId,
  });
  // Backend returns: { success: true, message: "...", data: employee }
  return res.data.data;
};

export const loginEmployee = async (email, employeeId) => {
  const res = await getEmployees();
  const list = res.data || [];
  return list.find(
    (emp) =>
      emp.email.toLowerCase() === email.toLowerCase() &&
      emp.employeeId === employeeId
  );
};

/* ==========================
    Profile Management
========================== */

export const updateProfile = async (id, data) => {
  const res = await API.put(`/employees/${id}/profile`, data);
  return res.data;
};

export const changePassword = async (id, payload) => {
  const res = await API.put(`/employees/${id}/change-password`, payload);
  return res.data;
};

export const uploadAvatar = async (id, base64) => {
  const res = await API.post(`/employees/${id}/avatar`, { avatar: base64 });
  return res.data;
};

export const removeAvatar = async (id) => {
  const res = await API.delete(`/employees/${id}/avatar`);
  return res.data;
};

export const updatePreferences = async (id, prefs) => {
  const res = await API.put(`/employees/${id}/preferences`, prefs);
  return res.data;
};

export const getProfileCompletion = async (id) => {
  const res = await API.get(`/employees/${id}/profile-completion`);
  return res.data;
};