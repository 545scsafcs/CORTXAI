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
      <div className="space-y-8 max-w-4xl">
        <div>
          <h1 className="text-5xl font-black text-white">Salary</h1>
          <p className="text-gray-400 mt-2 text-lg">Your compensations and payroll details.</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 max-w-xl space-y-6">
          <div>
            <h2 className="text-gray-400 text-sm uppercase tracking-wider">Current Base Salary</h2>
            <p className="text-6xl font-black mt-4 text-white">
              ₹{employee?.salary ? employee.salary.toLocaleString() : "0"}
              <span className="text-lg font-normal text-gray-500"> /month</span>
            </p>
          </div>

          <div className="bg-[#0B1120] border border-white/5 rounded-2xl p-6 text-sm text-gray-300 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Payroll Cycle:</span>
              <span className="font-semibold">Monthly (1st of month)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Deposit Mode:</span>
              <span className="font-semibold">Direct Bank Payout</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Status:</span>
              <span className="text-green-400 font-semibold font-bold">Active</span>
            </div>
          </div>

          <button
            onClick={downloadSlip}
            className="w-full bg-cyan-400 hover:bg-cyan-300 text-black py-4 rounded-xl font-bold transition active:scale-95 shadow-lg shadow-cyan-400/10"
          >
            Download Salary Slip
          </button>
        </div>
      </div>
    </EmployeeLayout>
  );
}