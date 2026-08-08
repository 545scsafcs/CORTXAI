import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const API = axios.create({
  baseURL: `${API_BASE_URL}/crm`,
});

// Helper to set headers dynamically based on current user context session
const getAuthHeaders = () => {
  try {
    const saved = localStorage.getItem("employee");
    const role = localStorage.getItem("userRole");
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        headers: {
          "x-user-id": parsed._id || "",
          "x-user-role": role || "employee",
        },
      };
    }
  } catch (err) {
    console.error("Failed to read auth headers:", err);
  }
  return {};
};

/* ==================================================
                    LEADS API
================================================== */

export const getLeads = async () => {
  const config = getAuthHeaders();
  const res = await API.get("/leads", config);
  return res.data;
};

export const getLead = async (id) => {
  const config = getAuthHeaders();
  const res = await API.get(`/leads/${id}`, config);
  return res.data;
};

export const createLead = async (leadData) => {
  const config = getAuthHeaders();
  const res = await API.post("/leads", leadData, config);
  return res.data;
};

export const updateLead = async (id, leadData) => {
  const config = getAuthHeaders();
  const res = await API.put(`/leads/${id}`, leadData, config);
  return res.data;
};

export const deleteLead = async (id) => {
  const config = getAuthHeaders();
  const res = await API.delete(`/leads/${id}`, config);
  return res.data;
};

export const getLeadStats = async () => {
  const config = getAuthHeaders();
  const res = await API.get("/leads/stats", config);
  return res.data;
};

export const bulkUpdateLeads = async (ids, status) => {
  const config = getAuthHeaders();
  const res = await API.post("/leads/bulk-update", { ids, status }, config);
  return res.data;
};

export const bulkDeleteLeads = async (ids) => {
  const config = getAuthHeaders();
  const res = await API.post("/leads/bulk-delete", { ids }, config);
  return res.data;
};


/* ==================================================
                  CUSTOMERS API
================================================== */

export const getCustomers = async () => {
  const config = getAuthHeaders();
  const res = await API.get("/customers", config);
  return res.data;
};

export const getCustomer = async (id) => {
  const config = getAuthHeaders();
  const res = await API.get(`/customers/${id}`, config);
  return res.data;
};

export const createCustomer = async (customerData) => {
  const config = getAuthHeaders();
  const res = await API.post("/customers", customerData, config);
  return res.data;
};

export const updateCustomer = async (id, customerData) => {
  const config = getAuthHeaders();
  const res = await API.put(`/customers/${id}`, customerData, config);
  return res.data;
};

export const deleteCustomer = async (id) => {
  const config = getAuthHeaders();
  const res = await API.delete(`/customers/${id}`, config);
  return res.data;
};

export const logCustomerInteraction = async (id, type, summary) => {
  const config = getAuthHeaders();
  const res = await API.post(`/customers/${id}/interaction`, { type, summary }, config);
  return res.data;
};


/* ==================================================
                  FOLLOW-UPS API
================================================== */

export const getFollowUps = async () => {
  const config = getAuthHeaders();
  const res = await API.get("/followups", config);
  return res.data;
};

export const getFollowUp = async (id) => {
  const config = getAuthHeaders();
  const res = await API.get(`/followups/${id}`, config);
  return res.data;
};

export const createFollowUp = async (data) => {
  const config = getAuthHeaders();
  const res = await API.post("/followups", data, config);
  return res.data;
};

export const updateFollowUp = async (id, data) => {
  const config = getAuthHeaders();
  const res = await API.put(`/followups/${id}`, data, config);
  return res.data;
};

export const deleteFollowUp = async (id) => {
  const config = getAuthHeaders();
  const res = await API.delete(`/followups/${id}`, config);
  return res.data;
};


/* ==================================================
                  ACTIVITIES API
================================================== */

export const getRecentActivities = async () => {
  const config = getAuthHeaders();
  const res = await API.get("/activities/recent", config);
  return res.data;
};

export const getLeadActivities = async (leadId) => {
  const config = getAuthHeaders();
  const res = await API.get(`/activities/lead/${leadId}`, config);
  return res.data;
};

export const getCustomerActivities = async (customerId) => {
  const config = getAuthHeaders();
  const res = await API.get(`/activities/customer/${customerId}`, config);
  return res.data;
};
