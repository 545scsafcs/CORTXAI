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
    <div className="rounded-3xl bg-white/5 border border-white/10 p-8 space-y-6">
      <h3 className="text-2xl font-bold text-white border-b border-white/10 pb-4">Performance Index</h3>
      {loading ? (
        <div className="flex justify-center py-6">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-cyan-400"></div>
        </div>
      ) : data.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No employee scores available.</p>
      ) : (
        <div className="space-y-6">
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={11} tickLine={false} />
                <YAxis stroke="#9ca3af" fontSize={11} domain={[0, 100]} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0f172a", border: "1px solid rgba(255,255,255,0.1)" }}
                  labelClassName="text-white"
                />
                <Bar dataKey="Score" fill="#a855f7" radius={[4, 4, 0, 0]} barSize={25} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-white text-sm">Rating Standings</h4>
            {data.map((item) => (
              <div key={item.name} className="flex justify-between items-center text-xs py-1">
                <span className="text-gray-300 font-bold">{item.name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-white/10 h-2 rounded-full overflow-hidden">
                    <div className="bg-purple-500 h-full" style={{ width: `${item.Score}%` }} />
                  </div>
                  <span className="text-purple-400 font-mono font-bold">{item.Score}/100</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
