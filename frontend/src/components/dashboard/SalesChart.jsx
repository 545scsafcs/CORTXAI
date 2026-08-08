import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", sales: 4200 },
  { month: "Feb", sales: 6800 },
  { month: "Mar", sales: 5600 },
  { month: "Apr", sales: 8900 },
  { month: "May", sales: 7600 },
  { month: "Jun", sales: 9800 },
  { month: "Jul", sales: 11200 },
];

export default function SalesChart() {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-200/40 relative overflow-hidden font-sans">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-outfit">
            Sales Performance Analytics
          </h2>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1 font-outfit">
            Monthly Performance Trends
          </p>
        </div>
      </div>

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="salesGradLight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} dy={10} />
            <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} dx={-10} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #e2e8f0",
                borderRadius: "16px",
                boxShadow: "0 10px 25px rgba(15,23,42,0.08)",
              }}
              labelClassName="text-slate-900 font-bold font-outfit text-xs"
              itemStyle={{ color: "#4f46e5", fontSize: "11px", fontWeight: "bold" }}
            />
            <Area type="monotone" dataKey="sales" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#salesGradLight)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}