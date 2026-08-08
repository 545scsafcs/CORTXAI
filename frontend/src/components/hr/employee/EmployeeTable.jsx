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
      <div className="text-center py-20 text-slate-500 bg-white border border-slate-200/80 rounded-3xl shadow-sm">
        <p className="text-lg font-bold font-outfit text-slate-900">No employees found.</p>
        <p className="text-xs mt-1 text-slate-500 font-sans">Create a new employee to get started.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-3xl border border-slate-200/80 bg-white shadow-sm font-sans">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-200 text-slate-900 text-[11px] font-black uppercase tracking-wider bg-slate-100/90 backdrop-blur-md">
            <th className="p-4 font-outfit">ID</th>
            <th className="p-4 font-outfit">Name</th>
            <th className="p-4 font-outfit">Email</th>
            <th className="p-4 font-outfit">Department</th>
            <th className="p-4 font-outfit">Designation</th>
            <th className="p-4 font-outfit">Salary</th>
            <th className="p-4 font-outfit">Status</th>
            <th className="p-4 font-outfit text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-slate-700 text-xs">
          {employees.map((emp) => (
            <tr key={emp._id} className="hover:bg-slate-50/80 transition-colors duration-150">
              <td className="p-4 font-mono text-indigo-700 font-bold text-xs">
                {emp.employeeId}
              </td>
              <td className="p-4 font-bold text-slate-900 font-outfit text-xs">
                {emp.firstName} {emp.lastName}
              </td>
              <td className="p-4 text-xs font-mono text-slate-600">{emp.email}</td>
              <td className="p-4 font-medium text-slate-700">{emp.department || "--"}</td>
              <td className="p-4 text-xs font-medium text-slate-700">{emp.designation || "--"}</td>
              <td className="p-4 text-xs font-mono font-bold text-slate-900">
                ₹{emp.salary ? emp.salary.toLocaleString() : "0"}
              </td>
              <td className="p-4">
                <span
                  className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                    emp.status === "Active"
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200/90"
                      : emp.status === "Inactive"
                      ? "bg-rose-50 text-rose-800 border border-rose-200/90"
                      : "bg-amber-50 text-amber-900 border border-amber-200/90"
                  }`}
                >
                  {emp.status || "Active"}
                </span>
              </td>
              <td className="p-4">
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => onView(emp)}
                    className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-indigo-700 flex items-center justify-center transition-all duration-200 border border-slate-200 cursor-pointer"
                    title="View Profile"
                  >
                    <Eye size={14} />
                  </button>
                  <button
                    onClick={() => onEdit(emp)}
                    className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-amber-700 flex items-center justify-center transition-all duration-200 border border-slate-200 cursor-pointer"
                    title="Edit Employee"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => onDelete(emp._id)}
                    className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-rose-100 text-rose-700 flex items-center justify-center transition-all duration-200 border border-slate-200 cursor-pointer"
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
