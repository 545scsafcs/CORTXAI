import React from "react";
import { ClipboardList } from "lucide-react";

const orders = [
  ["#1023", "Rahul", "₹1200", "Completed"],
  ["#1024", "Aman", "₹3500", "Pending"],
  ["#1025", "Priya", "₹800", "Completed"],
  ["#1026", "Ankit", "₹6400", "Completed"],
];

export default function RecentOrders() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl shadow-xl overflow-hidden">
      <h2 className="text-2xl font-bold mb-6 text-white font-outfit flex items-center gap-2">
        <ClipboardList size={20} className="text-cyan-400" /> Recent Orders
      </h2>

      <div className="overflow-x-auto rounded-2xl border border-white/5 bg-white/[0.01]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-400 text-sm border-b border-white/10 bg-white/[0.01]">
              <th className="p-4 font-semibold font-outfit">ID</th>
              <th className="p-4 font-semibold font-outfit">Customer</th>
              <th className="p-4 font-semibold font-outfit">Amount</th>
              <th className="p-4 font-semibold font-outfit">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-gray-300">
            {orders.map((item) => (
              <tr key={item[0]} className="hover:bg-white/[0.01] transition-all duration-200">
                <td className="p-4 font-mono text-cyan-400 text-sm">{item[0]}</td>
                <td className="p-4 font-semibold text-white font-outfit">{item[1]}</td>
                <td className="p-4 font-mono text-sm">{item[2]}</td>
                <td className="p-4">
                  <span
                    className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${
                      item[3] === "Completed"
                        ? "bg-green-500/10 text-green-400 border border-green-500/10"
                        : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/10"
                    }`}
                  >
                    {item[3]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}