import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "HR", value: 35 },
  { name: "Marketing", value: 20 },
  { name: "Finance", value: 15 },
  { name: "Sales", value: 30 },
];

const colors = ["#4f46e5", "#0284c7", "#059669", "#d97706"];

export default function ExpenseChart() {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-200/40 relative overflow-hidden font-sans">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-outfit">
            Expense Allocation Share
          </h2>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1 font-outfit">
            Departmental Budget Distribution
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6">
        <div className="h-[230px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #e2e8f0",
                  borderRadius: "16px",
                  boxShadow: "0 10px 25px rgba(15,23,42,0.08)",
                }}
                labelClassName="text-slate-900 font-bold font-outfit text-xs"
                itemStyle={{ fontSize: "11px", fontWeight: "bold" }}
              />
              <Pie
                data={data}
                dataKey="value"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={4}
                cornerRadius={6}
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={colors[index % colors.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-black text-slate-900 font-outfit">100%</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Allocated</span>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-3 pl-4 md:border-l border-slate-100">
          {data.map((entry, index) => (
            <div key={entry.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[index % colors.length] }} />
                <span className="text-xs font-bold text-slate-900 font-outfit">{entry.name}</span>
              </div>
              <span className="text-xs font-bold text-slate-900 font-mono">{entry.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}