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
    <div className="rounded-3xl bg-white/5 border border-white/10 p-8 space-y-6">
      <h3 className="text-2xl font-bold text-white border-b border-white/10 pb-4">Payroll Overview</h3>
      {loading ? (
        <div className="flex justify-center py-6">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-cyan-400"></div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-400">Total Monthly Cost</p>
              <h4 className="text-3xl font-black text-cyan-400 mt-1">₹{(totalPayroll / 100000).toFixed(2)}L</h4>
            </div>
            <div>
              <p className="text-xs text-gray-400">Average Salary</p>
              <h4 className="text-3xl font-black text-white mt-1">₹{(avgSalary / 1000).toFixed(0)}k</h4>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-white text-sm">Recent Salary Slip Logs</h4>
            <div className="max-h-40 overflow-y-auto space-y-2 pr-2">
              {employees.slice(0, 5).map((e) => (
                <div key={e._id} className="text-xs flex justify-between items-center py-2.5 bg-white/5 px-3 rounded-lg border border-white/5">
                  <span className="font-bold text-white">{e.firstName} {e.lastName}</span>
                  <span className="text-gray-400">{e.designation}</span>
                  <span className="text-green-400 font-bold">₹{e.salary?.toLocaleString() || "0"}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={triggerPayout}
            className="w-full bg-cyan-400 text-black font-bold py-3.5 rounded-xl hover:bg-cyan-300 transition-all duration-300 shadow-lg shadow-cyan-400/10"
          >
            Disburse Monthly Salaries
          </button>
        </div>
      )}
    </div>
  );
}
