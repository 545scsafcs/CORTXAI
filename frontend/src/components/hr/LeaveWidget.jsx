import React, { useEffect, useState } from "react";
import { getLeaves } from "../../services/leave/leaveApi";

export default function LeaveWidget() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLeaves() {
      try {
        const data = await getLeaves();
        setLeaves(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadLeaves();
  }, []);

  const pending = leaves.filter(l => l.status === "Pending").length;
  const approved = leaves.filter(l => l.status === "Approved").length;
  const rejected = leaves.filter(l => l.status === "Rejected").length;

  return (
    <div className="rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-8 space-y-6 shadow-sm font-sans">
      <h3 className="text-2xl font-bold text-slate-900 font-outfit border-b border-slate-100 pb-4">Leave Summary</h3>
      {loading ? (
        <div className="flex justify-center py-6">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-slate-900"></div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-center">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Pending</p>
              <h4 className="text-2xl font-black text-amber-700 mt-1 font-outfit">{pending}</h4>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-center">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Approved</p>
              <h4 className="text-2xl font-black text-emerald-700 mt-1 font-outfit">{approved}</h4>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-center">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Rejected</p>
              <h4 className="text-2xl font-black text-rose-700 mt-1 font-outfit">{rejected}</h4>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider font-outfit">Recent Activity Log</h4>
            {leaves.slice(0, 3).map((l) => (
              <div key={l._id} className="text-xs flex justify-between items-center py-2.5 border-b border-slate-100">
                <span className="text-slate-900 font-bold">{l.employeeName}</span>
                <span className="text-slate-500 font-medium">{l.leaveType} ({l.totalDays}d)</span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                  l.status === "Approved" ? "bg-emerald-50 text-emerald-800 border border-emerald-200/80" :
                  l.status === "Rejected" ? "bg-rose-50 text-rose-800 border border-rose-200/80" :
                  "bg-amber-50 text-amber-900 border border-amber-200/80"
                }`}>
                  {l.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
