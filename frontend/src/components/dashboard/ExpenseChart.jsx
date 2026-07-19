import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "HR", value: 35 },
  { name: "Marketing", value: 20 },
  { name: "Finance", value: 15 },
  { name: "Sales", value: 30 },
];

const colors = [
  "#06b6d4",
  "#3b82f6",
  "#8b5cf6",
  "#14b8a6",
];

export default function ExpenseChart() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl shadow-xl relative overflow-hidden group">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white font-outfit">
            Expense Distribution
          </h2>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1.5 font-outfit">
            Department Budget Share
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6">
        <div className="h-[250px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(10, 15, 30, 0.85)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "16px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                  backdropFilter: "blur(12px)",
                }}
                labelClassName="text-white font-bold font-outfit text-xs"
                itemStyle={{ color: "#22d3ee", fontFamily: "monospace", fontSize: "11px" }}
              />
              <Pie
                data={data}
                dataKey="value"
                innerRadius={65}
                outerRadius={85}
                paddingAngle={4}
                cornerRadius={6}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={colors[index % colors.length]}
                    className="outline-none focus:outline-none"
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-3xl font-black text-white font-outfit tracking-tight">100%</span>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Allocated</span>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-3.5 pl-4 md:border-l border-white/5">
          {data.map((entry, index) => (
            <div key={entry.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full shadow-md" style={{ backgroundColor: colors[index % colors.length] }} />
                <span className="text-sm font-semibold text-gray-300 font-outfit">{entry.name}</span>
              </div>
              <span className="text-sm font-bold text-white font-mono">{entry.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}