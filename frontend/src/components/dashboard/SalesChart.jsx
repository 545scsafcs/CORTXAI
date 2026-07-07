import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
      <h2 className="text-2xl font-bold mb-8">
        Sales Analytics
      </h2>

      <div className="h-[320px]">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={data}>

            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />

            <XAxis dataKey="month" stroke="#94a3b8" />

            <YAxis stroke="#94a3b8" />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="sales"
              stroke="#22d3ee"
              strokeWidth={4}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}