import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const API = axios.create({

  baseURL: `${API_BASE_URL}/hr/attendance`,

});

/* ===========================
        GET ALL
=========================== */

export async function getAttendance() {

  const res = await API.get("/");

  return res.data.data;

}

/* ===========================
      TODAY (ALL)
=========================== */

export async function getTodayAttendance() {

  const res = await API.get("/today");

  return res.data.data;

}

/* ===========================
    TODAY (EMPLOYEE)
=========================== */

export async function getEmployeeTodayAttendance(
  employeeId
) {

  const res = await API.get(
    `/today/${employeeId}`
  );

  return res.data.data;

}

/* ===========================
      DASHBOARD
=========================== */

export async function getAttendanceDashboard() {

  const res = await API.get(
    "/dashboard"
  );

  return res.data.data;

}

/* ===========================
      MONTHLY REPORT
=========================== */

export async function getMonthlyAttendance(
  employeeId,
  month,
  year
) {

  const res = await API.get(

    `/monthly/${employeeId}`,

    {

      params: {

        month,

        year,

      },

    }

  );

  return res.data.data;

}

/* ===========================
        CREATE
=========================== */

export async function createAttendance(data) {

  const res = await API.post(
    "/",
    data
  );

  return res.data.data;

}

/* ===========================
        UPDATE
=========================== */

export async function updateAttendance(
  id,
  data
) {

  const res = await API.put(
    `/${id}`,
    data
  );

  return res.data.data;

}

/* ===========================
        DELETE
=========================== */

export async function deleteAttendance(
  id
) {

  await API.delete(`/${id}`);

}

/* ===========================
        CHECK IN
=========================== */

export async function checkIn(employeeId, location = "Web", device = "Web") {
  const res = await API.post("/check-in", {
    employeeId,
    location,
    device,
  });
  return res.data.data;
}

/* ===========================
        CHECK OUT
=========================== */

export async function checkOut(employeeId) {
  const res = await API.post("/check-out", {
    employeeId,
  });
  return res.data.data;
}