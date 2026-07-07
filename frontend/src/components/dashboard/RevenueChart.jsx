import { TrendingUp } from "lucide-react";

export default function RevenueChart() {
  const bars = [45, 80, 65, 100, 70, 90, 120];

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

      <div className="flex justify-between items-center">

        <div>

          <h2 className="text-2xl font-bold">
            Revenue Overview
          </h2>

          <p className="text-gray-400 mt-2">
            Last 7 Days
          </p>

        </div>

        <TrendingUp className="text-cyan-400"/>

      </div>

      <div className="flex items-end justify-between h-64 mt-10">

        {bars.map((bar,index)=>(

          <div
            key={index}
            className="w-10 rounded-t-xl bg-gradient-to-t from-cyan-500 to-blue-500 hover:scale-105 transition"
            style={{height:`${bar}%`}}
          />

        ))}

      </div>

    </div>
  );
}