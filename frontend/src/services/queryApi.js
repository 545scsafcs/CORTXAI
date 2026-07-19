import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const API = axios.create({
  baseURL: `${API_BASE_URL}/hr/queries`,
});

/* ==========================
      Submit Query (Employee)
========================== */

export const submitQuery = async (data) => {
  const res = await API.post("/", data);
  return res.data;
};

/* ==========================
    Get Queries (HR Manager)
========================== */

export const getQueries = async (department, status) => {
  const params = {};
  if (department) params.department = department;
  if (status && status !== "All") params.status = status;
  const res = await API.get("/", { params });
  return res.data;
};

/* ==========================
     Get Dashboard Stats
========================== */

export const getQueryStats = async (department) => {
  const params = {};
  if (department) params.department = department;
  const res = await API.get("/stats", { params });
  return res.data;
};

/* ==========================
  Get Employee's Own Queries
========================== */

export const getEmployeeQueries = async (employeeMongoId) => {
  const res = await API.get(`/employee/${employeeMongoId}`);
  return res.data;
};

/* ==========================
      Get Single Query
========================== */

export const getQueryById = async (id) => {
  const res = await API.get(`/${id}`);
  return res.data;
};

/* ==========================
       Update Status
========================== */

export const updateQueryStatus = async (id, status) => {
  const res = await API.put(`/${id}/status`, { status });
  return res.data;
};

/* ==========================
        Add Reply
========================== */

export const addQueryReply = async (id, sender, message) => {
  const res = await API.post(`/${id}/reply`, { sender, message });
  return res.data;
};
