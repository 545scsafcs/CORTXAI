import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const API = axios.create({

  baseURL: `${API_BASE_URL}/hr/leave`,

});

/* ==========================
        Apply Leave
========================== */

export async function applyLeave(data) {

  const res = await API.post(

    "/",

    data

  );

  return res.data.data;

}

/* ==========================
      Get All Leaves
========================== */

export async function getLeaves() {

  const res = await API.get("/");

  return res.data.data;

}

/* ==========================
   Employee Leave History
========================== */

export async function getEmployeeLeaves(employeeId) {

  const res = await API.get(

    `/employee/${employeeId}`

  );

  return res.data.data;

}

/* ==========================
      Pending Leaves
========================== */

export async function getPendingLeaves() {

  const res = await API.get(

    "/pending"

  );

  return res.data.data;

}

/* ==========================
      Get Single Leave
========================== */

export async function getLeave(id) {

  const res = await API.get(

    `/${id}`

  );

  return res.data.data;

}

/* ==========================
      Approve Leave
========================== */

export async function approveLeave(id) {

  const res = await API.put(

    `/approve/${id}`

  );

  return res.data.data;

}

/* ==========================
      Reject Leave
========================== */

export async function rejectLeave(

  id,

  reason

) {

  const res = await API.put(

    `/reject/${id}`,

    {

      reason,

    }

  );

  return res.data.data;

}

/* ==========================
      Update Leave
========================== */

export async function updateLeave(

  id,

  data

) {

  const res = await API.put(

    `/${id}`,

    data

  );

  return res.data.data;

}

/* ==========================
      Delete Leave
========================== */

export async function deleteLeave(id) {

  const res = await API.delete(

    `/${id}`

  );

  return res.data.data;

}