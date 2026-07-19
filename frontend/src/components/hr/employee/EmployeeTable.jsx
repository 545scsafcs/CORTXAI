import React from "react";
import { Eye, Edit2, Trash2 } from "lucide-react";

export default function EmployeeTable({
  employees,
  loading,
  onView,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  if (!employees || employees.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400 bg-white/[0.02] border border-white/10 rounded-3xl">
        <p className="text-xl font-bold font-outfit">No employees found.</p>
        <p className="text-sm mt-2 text-gray-500 font-outfit">Create a new employee to get started.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl shadow-xl">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/10 text-gray-400 text-sm bg-white/[0.01]">
            <th className="p-5 font-semibold font-outfit">ID</th>
            <th className="p-5 font-semibold font-outfit">Name</th>
            <th className="p-5 font-semibold font-outfit">Email</th>
            <th className="p-5 font-semibold font-outfit">Department</th>
            <th className="p-5 font-semibold font-outfit">Designation</th>
            <th className="p-5 font-semibold font-outfit">Salary</th>
            <th className="p-5 font-semibold font-outfit">Status</th>
            <th className="p-5 font-semibold font-outfit text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 text-gray-300">
          {employees.map((emp) => (
            <tr key={emp._id} className="hover:bg-white/[0.02] transition-colors duration-200">
              <td className="p-5 font-mono text-cyan-400 text-sm">
                {emp.employeeId}
              </td>
              <td className="p-5 font-bold text-white font-outfit">
                {emp.firstName} {emp.lastName}
              </td>
              <td className="p-5 text-sm font-mono">{emp.email}</td>
              <td className="p-5 font-outfit">{emp.department || "--"}</td>
              <td className="p-5 text-sm font-outfit">{emp.designation || "--"}</td>
              <td className="p-5 text-sm font-mono">
                ₹{emp.salary ? emp.salary.toLocaleString() : "0"}
              </td>
              <td className="p-5">
                <span
                  className={`inline-block px-3 py-1.5 rounded-full text-xs font-bold ${
                    emp.status === "Active"
                      ? "bg-green-500/10 text-green-400 border border-green-500/10"
                      : emp.status === "Inactive"
                      ? "bg-red-500/10 text-red-400 border border-red-500/10"
                      : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/10"
                  }`}
                >
                  {emp.status || "Active"}
                </span>
              </td>
              <td className="p-5">
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => onView(emp)}
                    className="w-8 h-8 rounded-xl bg-white/5 hover:bg-cyan-500 hover:text-black flex items-center justify-center transition-all duration-300 text-cyan-400 cursor-pointer border border-white/5"
                    title="View Profile"
                  >
                    <Eye size={14} />
                  </button>
                  <button
                    onClick={() => onEdit(emp)}
                    className="w-8 h-8 rounded-xl bg-white/5 hover:bg-yellow-500 hover:text-black flex items-center justify-center transition-all duration-300 text-yellow-400 cursor-pointer border border-white/5"
                    title="Edit Employee"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => onDelete(emp._id)}
                    className="w-8 h-8 rounded-xl bg-white/5 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all duration-300 text-red-400 cursor-pointer border border-white/5"
                    title="Delete Employee"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
