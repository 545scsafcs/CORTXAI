import React, { useEffect, useState } from "react";
import { getEmployees } from "../../services/employeeApi";

export default function PayrollWidget() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEmployees() {
      try {
        const res = await getEmployees();
        setEmployees(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadEmployees();
  }, []);

  const totalPayroll = employees.reduce((sum, emp) => sum + (emp.salary || 0), 0);
  const avgSalary = employees.length > 0 ? Math.round(totalPayroll / employees.length) : 0;

  function triggerPayout() {
    alert(`Disbursing salaries for ${employees.length} employees. Total amount: ₹${totalPayroll.toLocaleString()}`);
  }

  return (
    <div className="rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-8 space-y-6 shadow-sm font-sans">
      <h3 className="text-2xl font-bold text-slate-900 font-outfit border-b border-slate-100 pb-4">Payroll Overview</h3>
      {loading ? (
        <div className="flex justify-center py-6">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-slate-900"></div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Total Monthly Cost</p>
              <h4 className="text-3xl font-black text-indigo-700 mt-1 font-outfit">₹{(totalPayroll / 100000).toFixed(2)}L</h4>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Average Salary</p>
              <h4 className="text-3xl font-black text-slate-900 mt-1 font-outfit">₹{(avgSalary / 1000).toFixed(0)}k</h4>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider font-outfit">Recent Salary Slip Logs</h4>
            <div className="max-h-40 overflow-y-auto space-y-2 pr-1">
              {employees.slice(0, 5).map((e) => (
                <div key={e._id} className="text-xs flex justify-between items-center py-2.5 bg-slate-50 px-3.5 rounded-xl border border-slate-200 font-medium">
                  <span className="font-bold text-slate-900">{e.firstName} {e.lastName}</span>
                  <span className="text-slate-500 text-[11px]">{e.designation}</span>
                  <span className="text-emerald-700 font-mono font-bold">₹{e.salary?.toLocaleString() || "0"}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={triggerPayout}
            className="w-full bg-[#0F172A] text-white font-bold py-3.5 rounded-2xl hover:bg-slate-800 transition-all duration-200 shadow-sm cursor-pointer"
          >
            Disburse Monthly Salaries
          </button>
        </div>
      )}
    </div>
  );
}
