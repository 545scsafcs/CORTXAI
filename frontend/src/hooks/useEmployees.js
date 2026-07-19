import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import {
  createEmployee,
  deleteEmployee,
  getDashboardStats,
  getEmployees,
  searchEmployees,
  updateEmployee,
} from "../services/employeeApi";

const useEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const [dashboardStats, setDashboardStats] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [search, setSearch] =
    useState("");

  /* ==========================================
              LOAD EMPLOYEES
  ========================================== */

  const fetchEmployees =
    useCallback(async () => {
      try {
        setLoading(true);

        const res =
          await getEmployees();

        const list =
          res.data || [];

        setEmployees(list);
        setFilteredEmployees(list);
      } catch (error) {
        console.error(error);

        toast.error(
          error.response?.data?.message ||
            "Unable to load employees."
        );
      } finally {
        setLoading(false);
      }
    }, []);

  /* ==========================================
            DASHBOARD
  ========================================== */

  const fetchDashboard =
    useCallback(async () => {
      try {
        const res =
          await getDashboardStats();

        setDashboardStats(
          res.data || null
        );
      } catch (error) {
        console.error(error);
      }
    }, []);

  /* ==========================================
            INITIAL LOAD
  ========================================== */

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchEmployees();
    fetchDashboard();
  }, [
    fetchEmployees,
    fetchDashboard,
  ]);

  /* ==========================================
            SEARCH
  ========================================== */

  const handleSearch =
    useCallback(
      async (keyword) => {
        setSearch(keyword);

        if (!keyword.trim()) {
          setFilteredEmployees(
            employees
          );

          return;
        }

        try {
          const res =
            await searchEmployees(
              keyword
            );

          setFilteredEmployees(
            res.data || []
          );
        } catch (error) {
          console.error(error);

          toast.error(
            error.response?.data
              ?.message ||
              "Search failed."
          );
        }
      },
      [employees]
    );

  /* ==========================================
            ADD EMPLOYEE
  ========================================== */

  const addEmployee =
    useCallback(
      async (payload) => {
        try {
          setSaving(true);

          await createEmployee(
            payload
          );

          toast.success(
            "Employee added successfully."
          );

          await fetchEmployees();
          await fetchDashboard();

          return true;
        } catch (error) {
          toast.error(
            error.response?.data
              ?.message ||
              error.message
          );

          return false;
        } finally {
          setSaving(false);
        }
      },
      [
        fetchEmployees,
        fetchDashboard,
      ]
    );

  /* ==========================================
            UPDATE EMPLOYEE
  ========================================== */

  const editEmployee =
    useCallback(
      async (id, payload) => {
        try {
          setSaving(true);

          await updateEmployee(
            id,
            payload
          );

          toast.success(
            "Employee updated successfully."
          );

          await fetchEmployees();
          await fetchDashboard();

          return true;
        } catch (error) {
          toast.error(
            error.response?.data
              ?.message ||
              error.message
          );

          return false;
        } finally {
          setSaving(false);
        }
      },
      [
        fetchEmployees,
        fetchDashboard,
      ]
    );

  /* ==========================================
            DELETE EMPLOYEE
  ========================================== */

  const removeEmployee =
    useCallback(
      async (id) => {
        try {
          await deleteEmployee(id);

          toast.success(
            "Employee deleted."
          );

          await fetchEmployees();
          await fetchDashboard();
        } catch (error) {
          toast.error(
            error.response?.data
              ?.message ||
              error.message
          );
        }
      },
      [
        fetchEmployees,
        fetchDashboard,
      ]
    );

  /* ==========================================
            REFRESH
  ========================================== */

  const refresh =
    useCallback(async () => {
      await fetchEmployees();
      await fetchDashboard();
    }, [
      fetchEmployees,
      fetchDashboard,
    ]);

  /* ==========================================
            MEMO
  ========================================== */

  const totalEmployees =
    useMemo(
      () =>
        dashboardStats
          ?.totalEmployees ??
        employees.length,
      [
        dashboardStats,
        employees,
      ]
    );

  return {
    employees,
    filteredEmployees,

    dashboardStats,

    totalEmployees,

    loading,
    saving,

    search,

    setSearch,

    handleSearch,

    addEmployee,

    editEmployee,

    removeEmployee,

    refresh,

    fetchEmployees,

    fetchDashboard,
  };
};

export default useEmployees;