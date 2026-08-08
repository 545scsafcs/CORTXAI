import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

export default function EditEmployeeModal({ open, employee, loading, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    salary: "",
    status: "Active",
  });

  const modalRef = useRef(null);

  useEffect(() => {
    if (employee) {
      setFormData({
        firstName: employee.firstName || "",
        lastName: employee.lastName || "",
        email: employee.email || "",
        phone: employee.phone || "",
        department: employee.department || "",
        designation: employee.designation || "",
        salary: employee.salary || "",
        status: employee.status || "Active",
      });
    }
  }, [employee]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      modalRef.current?.focus();
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open || !employee) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData.firstName || !formData.email) {
      alert("Name and Email are required fields");
      return;
    }

    const success = await onUpdate(employee._id, {
      ...formData,
      salary: Number(formData.salary) || 0,
    });

    if (success) {
      onClose();
    }
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 font-sans"
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-8 max-h-[90vh] overflow-y-auto shadow-2xl outline-none focus:outline-none"
      >
        <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 font-outfit">Edit Employee Details</h2>
            <p className="text-xs text-slate-500 font-sans mt-0.5">Update record details for ID: <span className="font-mono text-indigo-700 font-bold">{employee.employeeId}</span></p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-900 transition cursor-pointer">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-slate-900 text-xs font-extrabold uppercase tracking-wider mb-1.5">Email Address *</label>
              <input
                type="email"
                placeholder="name@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-2xl text-xs text-slate-900 font-medium placeholder-slate-400 outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition"
                required
              />
            </div>
            <div>
              <label className="block text-slate-900 text-xs font-extrabold uppercase tracking-wider mb-1.5">First Name *</label>
              <input
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-2xl text-xs text-slate-900 font-medium placeholder-slate-400 outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition"
                required
              />
            </div>
            <div>
              <label className="block text-slate-900 text-xs font-extrabold uppercase tracking-wider mb-1.5">Last Name</label>
              <input
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-2xl text-xs text-slate-900 font-medium placeholder-slate-400 outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition"
              />
            </div>
            <div>
              <label className="block text-slate-900 text-xs font-extrabold uppercase tracking-wider mb-1.5">Phone Number</label>
              <input
                type="text"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-2xl text-xs text-slate-900 font-medium placeholder-slate-400 outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition"
              />
            </div>
            <div>
              <label className="block text-slate-900 text-xs font-extrabold uppercase tracking-wider mb-1.5">Salary (INR/month)</label>
              <input
                type="number"
                placeholder="Salary"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-2xl text-xs text-slate-900 font-medium placeholder-slate-400 outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition"
              />
            </div>
            <div>
              <label className="block text-slate-900 text-xs font-extrabold uppercase tracking-wider mb-1.5">Department</label>
              <input
                type="text"
                placeholder="Department"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-2xl text-xs text-slate-900 font-medium placeholder-slate-400 outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition"
              />
            </div>
            <div>
              <label className="block text-slate-900 text-xs font-extrabold uppercase tracking-wider mb-1.5">Designation</label>
              <input
                type="text"
                placeholder="Designation"
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-2xl text-xs text-slate-900 font-medium placeholder-slate-400 outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition"
              />
            </div>
            <div>
              <label className="block text-slate-900 text-xs font-extrabold uppercase tracking-wider mb-1.5">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-2xl text-xs text-slate-900 font-medium outline-none focus:bg-white focus:border-indigo-500 transition cursor-pointer"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="On Leave">On Leave</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs disabled:opacity-50 transition shadow-sm cursor-pointer"
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
