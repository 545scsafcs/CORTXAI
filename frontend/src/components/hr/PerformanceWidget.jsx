import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { getEmployees } from "../../services/employeeApi";

export default function PerformanceWidget() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPerformance() {
      try {
        const res = await getEmployees();
        const list = res.data || [];
        // Map mock performance review scores (between 70 and 100) for active employees
        const mapped = list.slice(0, 5).map((e) => ({
          name: e.firstName,
          Score: Math.floor(Math.random() * (100 - 75 + 1)) + 75,
        }));
        setData(mapped);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadPerformance();
  }, []);

  return (
    <div className="rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-8 space-y-6 shadow-sm font-sans">
      <h3 className="text-2xl font-bold text-slate-900 font-outfit border-b border-slate-100 pb-4">Performance Index</h3>
      {loading ? (
        <div className="flex justify-center py-6">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-slate-900"></div>
        </div>
      ) : data.length === 0 ? (
        <p className="text-slate-500 text-center py-10 text-xs">No employee scores available.</p>
      ) : (
        <div className="space-y-6">
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} domain={[0, 100]} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #E2E8F0", borderRadius: "1rem", color: "#0F172A", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
                  labelStyle={{ color: "#0F172A", fontWeight: "bold" }}
                />
                <Bar dataKey="Score" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={25} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider font-outfit">Rating Standings</h4>
            {data.map((item) => (
              <div key={item.name} className="flex justify-between items-center text-xs py-1.5 border-b border-slate-100 last:border-0">
                <span className="text-slate-900 font-bold">{item.name}</span>
                <div className="flex items-center gap-3">
                  <div className="w-28 bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200/60">
                    <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${item.Score}%` }} />
                  </div>
                  <span className="text-indigo-700 font-mono font-bold text-xs">{item.Score}/100</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
