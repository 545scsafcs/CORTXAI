import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { AreaChart, Area } from "recharts";

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
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl shadow-xl relative overflow-hidden group">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white font-outfit">
            Sales Analytics
          </h2>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1.5 font-outfit">
            Monthly Performance metrics
          </p>
        </div>
      </div>

      <div className="h-[325px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis
              dataKey="month"
              stroke="rgba(255,255,255,0.3)"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              dy={10}
              className="font-mono"
            />
            <YAxis
              stroke="rgba(255,255,255,0.3)"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              dx={-10}
              className="font-mono"
            />
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
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#22d3ee"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#salesGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}