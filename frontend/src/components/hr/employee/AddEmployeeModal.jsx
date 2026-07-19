import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

export default function AddEmployeeModal({ open, loading, onClose, onSave }) {
  const [formData, setFormData] = useState({
    employeeId: "",
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

  if (!open) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData.employeeId || !formData.firstName || !formData.email) {
      alert("Please fill out the required fields (ID, Name, and Email)");
      return;
    }

    const success = await onSave({
      ...formData,
      salary: Number(formData.salary) || 0,
    });

    if (success) {
      setFormData({
        employeeId: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        department: "",
        designation: "",
        salary: "",
        status: "Active",
      });
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="w-full max-w-2xl bg-[#08111f] border border-white/10 rounded-3xl p-8 max-h-[90vh] overflow-y-auto shadow-2xl outline-none focus:outline-none"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white font-outfit">Add New Employee</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition cursor-pointer">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-gray-300 text-sm font-semibold mb-2">Employee ID *</label>
              <input
                type="text"
                placeholder="e.g. EMP042"
                value={formData.employeeId}
                onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                className="w-full bg-[#0B1120] border border-white/10 p-4 rounded-xl text-white outline-none focus:ring-2 focus:ring-cyan-500/50"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-semibold mb-2">Email Address *</label>
              <input
                type="email"
                placeholder="e.g. name@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#0B1120] border border-white/10 p-4 rounded-xl text-white outline-none focus:ring-2 focus:ring-cyan-500/50"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-semibold mb-2">First Name *</label>
              <input
                type="text"
                placeholder="e.g. Priya"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full bg-[#0B1120] border border-white/10 p-4 rounded-xl text-white outline-none focus:ring-2 focus:ring-cyan-500/50"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-semibold mb-2">Last Name</label>
              <input
                type="text"
                placeholder="e.g. Sharma"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full bg-[#0B1120] border border-white/10 p-4 rounded-xl text-white outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-semibold mb-2">Phone Number</label>
              <input
                type="text"
                placeholder="e.g. +91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-[#0B1120] border border-white/10 p-4 rounded-xl text-white outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-semibold mb-2">Salary (INR/month)</label>
              <input
                type="number"
                placeholder="e.g. 50000"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                className="w-full bg-[#0B1120] border border-white/10 p-4 rounded-xl text-white outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-semibold mb-2">Department</label>
              <input
                type="text"
                placeholder="e.g. Technology"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full bg-[#0B1120] border border-white/10 p-4 rounded-xl text-white outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-semibold mb-2">Designation</label>
              <input
                type="text"
                placeholder="e.g. Senior Architect"
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                className="w-full bg-[#0B1120] border border-white/10 p-4 rounded-xl text-white outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-semibold mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full bg-[#0B1120] border border-white/10 p-4 rounded-xl text-white outline-none"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="On Leave">On Leave</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-8 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold disabled:opacity-50 transition"
            >
              {loading ? "Saving..." : "Add Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
