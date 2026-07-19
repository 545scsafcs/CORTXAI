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
    <div className="rounded-3xl bg-white/5 border border-white/10 p-8 space-y-6">
      <h3 className="text-2xl font-bold text-white border-b border-white/10 pb-4">Leave Summary</h3>
      {loading ? (
        <div className="flex justify-center py-6">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-cyan-400"></div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-[#0B1120] border border-white/5 p-4 rounded-2xl text-center">
              <p className="text-xs text-gray-400">Pending</p>
              <h4 className="text-2xl font-black text-yellow-400 mt-1">{pending}</h4>
            </div>
            <div className="bg-[#0B1120] border border-white/5 p-4 rounded-2xl text-center">
              <p className="text-xs text-gray-400">Approved</p>
              <h4 className="text-2xl font-black text-green-400 mt-1">{approved}</h4>
            </div>
            <div className="bg-[#0B1120] border border-white/5 p-4 rounded-2xl text-center">
              <p className="text-xs text-gray-400">Rejected</p>
              <h4 className="text-2xl font-black text-red-400 mt-1">{rejected}</h4>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-white text-sm">Recent Activity Log</h4>
            {leaves.slice(0, 3).map((l) => (
              <div key={l._id} className="text-xs flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-gray-300 font-bold">{l.employeeName}</span>
                <span className="text-gray-400">{l.leaveType} ({l.totalDays}d)</span>
                <span className={l.status === "Approved" ? "text-green-400" : l.status === "Rejected" ? "text-red-400" : "text-yellow-400"}>
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
