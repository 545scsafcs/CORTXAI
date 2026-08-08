import React from "react";
import EmployeeLayout from "../../components/layout/EmployeeLayout";
import { useEmployee } from "../../context/EmployeeContext";

export default function SalaryPage() {
  const { employee } = useEmployee();

  function downloadSlip() {
    alert("Downloading salary slip via Nora invoice worker...");
  }

  return (
    <EmployeeLayout>
      <div className="space-y-8 max-w-4xl font-sans">
        <div className="bg-white border border-slate-200/80 p-6 sm:p-8 rounded-3xl shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-teal-600" />
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-outfit tracking-tight">Salary</h1>
          <p className="text-slate-600 mt-2 text-xs sm:text-sm font-semibold leading-relaxed font-sans">Your compensations and payroll details.</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 max-w-xl space-y-6 shadow-sm">
          <div>
            <h2 className="text-slate-500 text-[10px] font-extrabold uppercase tracking-wider font-outfit">Current Base Salary</h2>
            <p className="text-4xl sm:text-5xl font-black mt-3 text-slate-900 font-outfit tracking-tight">
              ₹{employee?.salary ? employee.salary.toLocaleString() : "0"}
              <span className="text-xs font-normal text-slate-500 font-sans"> /month</span>
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-xs text-slate-900 space-y-3.5 font-medium">
            <div className="flex justify-between">
              <span className="text-slate-500">Payroll Cycle:</span>
              <span className="font-bold text-slate-900">Monthly (1st of month)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Deposit Mode:</span>
              <span className="font-bold text-slate-900">Direct Bank Payout</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Status:</span>
              <span className="text-emerald-700 font-extrabold uppercase text-[10px] tracking-wider bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">Active</span>
            </div>
          </div>

          <button
            onClick={downloadSlip}
            className="w-full bg-[#0F172A] hover:bg-slate-800 text-white py-3.5 rounded-2xl font-bold text-xs transition shadow-sm cursor-pointer"
          >
            Download Salary Slip
          </button>
        </div>
      </div>
    </EmployeeLayout>
  );
}