import { useState } from "react";
import toast from "react-hot-toast";
import {
  Plus,
  Users,
  UserCheck,
  UserX,
  CalendarClock,
} from "lucide-react";

import HRLayout from "../../components/layout/HRLayout";
import HRHeader from "../../components/hr/common/HRHeader";
import SearchBar from "../../components/hr/common/SearchBar";

import EmployeeTable from "../../components/hr/employee/EmployeeTable";
import AddEmployeeModal from "../../components/hr/employee/AddEmployeeModal";
import EditEmployeeModal from "../../components/hr/employee/EditEmployeeModal";

import useEmployees from "../../hooks/useEmployees";

export default function EmployeesPage() {
  const {
    employees,
    dashboardStats,

    loading,
    saving,

    search,
    setSearch,
    handleSearch,

    addEmployee,
    editEmployee,
    removeEmployee,
  } = useEmployees();

  const [addModal, setAddModal] =
    useState(false);

  const [editModal, setEditModal] =
    useState(false);

  const [selectedEmployee, setSelectedEmployee] =
    useState(null);

  /* ===========================================
              OPEN EDIT
  =========================================== */

  const openEdit = (employee) => {
    setSelectedEmployee(employee);
    setEditModal(true);
  };

  /* ===========================================
              VIEW
  =========================================== */

  const viewEmployee = (employee) => {
    toast.success(
      `${employee.firstName} ${employee.lastName}`
    );
  };

  /* ===========================================
              DELETE
  =========================================== */

  const deleteEmployee = async (id) => {
    const confirmDelete =
      window.confirm(
        "Delete this employee?"
      );

    if (!confirmDelete) return;

    await removeEmployee(id);
  };

  return (
    <HRLayout>

      <HRHeader
        title="Employees"
        subtitle="Manage all company employees"
      />

      {/* Dashboard */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        <div className="bg-white rounded-2xl shadow p-6">

          <div className="flex justify-between">

            <div>

              <p className="text-gray-500">
                Total Employees
              </p>

              <h2 className="text-3xl font-bold mt-2">

                {dashboardStats?.totalEmployees ??
                  employees.length}

              </h2>

            </div>

            <Users
              size={40}
              className="text-blue-600"
            />

          </div>

        </div>

        <div className="bg-white rounded-2xl shadow p-6">

          <div className="flex justify-between">

            <div>

              <p className="text-gray-500">
                Active
              </p>

              <h2 className="text-3xl font-bold mt-2 text-green-600">

                {dashboardStats?.activeEmployees ??
                  0}

              </h2>

            </div>

            <UserCheck
              size={40}
              className="text-green-600"
            />

          </div>

        </div>

        <div className="bg-white rounded-2xl shadow p-6">

          <div className="flex justify-between">

            <div>

              <p className="text-gray-500">
                Inactive
              </p>

              <h2 className="text-3xl font-bold mt-2 text-red-600">

                {dashboardStats?.inactiveEmployees ??
                  0}

              </h2>

            </div>

            <UserX
              size={40}
              className="text-red-600"
            />

          </div>

        </div>

        <div className="bg-white rounded-2xl shadow p-6">

          <div className="flex justify-between">

            <div>

              <p className="text-gray-500">
                On Leave
              </p>

              <h2 className="text-3xl font-bold mt-2 text-yellow-600">

                {dashboardStats?.onLeaveEmployees ??
                  0}

              </h2>

            </div>

            <CalendarClock
              size={40}
              className="text-yellow-600"
            />

          </div>

        </div>

      </div>

      {/* Toolbar */}

      <div className="bg-white rounded-2xl shadow p-5 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">

        <SearchBar
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            handleSearch(e.target.value);
          }}
          placeholder="Search employee..."
        />

        <button
          onClick={() => setAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2"
        >
          <Plus size={18} />

          Add Employee

        </button>

      </div>
            {/* Employee Table */}

      <EmployeeTable
        employees={employees}
        loading={loading}
        search={search}
        setSearch={(value) => {
          setSearch(value);
          handleSearch(value);
        }}
        onView={viewEmployee}
        onEdit={openEdit}
        onDelete={deleteEmployee}
      />

      {/* Add Employee Modal */}

      <AddEmployeeModal
        open={addModal}
        loading={saving}
        onClose={() =>
          setAddModal(false)
        }
        onSave={async (data) => {
          const success =
            await addEmployee(data);

          if (success) {
            setAddModal(false);
          }

          return success;
        }}
      />

      {/* Edit Employee Modal */}

      <EditEmployeeModal
        open={editModal}
        employee={selectedEmployee}
        loading={saving}
        onClose={() => {
          setEditModal(false);
          setSelectedEmployee(null);
        }}
        onUpdate={async (
          id,
          data
        ) => {
          const success =
            await editEmployee(
              id,
              data
            );

          if (success) {
            setEditModal(false);
            setSelectedEmployee(null);
          }

          return success;
        }}
      />

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

        <div className="bg-white rounded-xl shadow p-5">

          <p className="text-gray-500 text-sm">
            Departments
          </p>

          <h3 className="text-3xl font-bold mt-2">

            {dashboardStats
              ?.departmentWiseCount
              ? Object.keys(
                  dashboardStats.departmentWiseCount
                ).length
              : 0}

          </h3>

        </div>

        <div className="bg-white rounded-xl shadow p-5">

          <p className="text-gray-500 text-sm">
            Active Ratio
          </p>

          <h3 className="text-3xl font-bold text-green-600 mt-2">

            {dashboardStats?.totalEmployees
              ? Math.round(
                  (dashboardStats.activeEmployees /
                    dashboardStats.totalEmployees) *
                    100
                )
              : 0}
            %

          </h3>

        </div>

        <div className="bg-white rounded-xl shadow p-5">

          <p className="text-gray-500 text-sm">
            Leave Ratio
          </p>

          <h3 className="text-3xl font-bold text-yellow-600 mt-2">

            {dashboardStats?.totalEmployees
              ? Math.round(
                  (dashboardStats.onLeaveEmployees /
                    dashboardStats.totalEmployees) *
                    100
                )
              : 0}
            %

          </h3>

        </div>

        <div className="bg-white rounded-xl shadow p-5">

          <p className="text-gray-500 text-sm">
            Inactive Ratio
          </p>

          <h3 className="text-3xl font-bold text-red-600 mt-2">

            {dashboardStats?.totalEmployees
              ? Math.round(
                  (dashboardStats.inactiveEmployees /
                    dashboardStats.totalEmployees) *
                    100
                )
              : 0}
            %

          </h3>

        </div>

      </div>
            {/* Quick Insights */}

      <div className="mt-8 bg-white rounded-2xl shadow p-6">

        <h2 className="text-xl font-bold mb-4">
          HR Overview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

          <div className="border rounded-xl p-5">

            <p className="text-sm text-gray-500">
              Total Employees
            </p>

            <h3 className="text-2xl font-bold mt-2">
              {employees.length}
            </h3>

          </div>

          <div className="border rounded-xl p-5">

            <p className="text-sm text-gray-500">
              Active Employees
            </p>

            <h3 className="text-2xl font-bold text-green-600 mt-2">
              {dashboardStats?.activeEmployees || 0}
            </h3>

          </div>

          <div className="border rounded-xl p-5">

            <p className="text-sm text-gray-500">
              Employees On Leave
            </p>

            <h3 className="text-2xl font-bold text-yellow-600 mt-2">
              {dashboardStats?.onLeaveEmployees || 0}
            </h3>

          </div>

          <div className="border rounded-xl p-5">

            <p className="text-sm text-gray-500">
              Inactive Employees
            </p>

            <h3 className="text-2xl font-bold text-red-600 mt-2">
              {dashboardStats?.inactiveEmployees || 0}
            </h3>

          </div>

        </div>

      </div>

    </HRLayout>
  );
}