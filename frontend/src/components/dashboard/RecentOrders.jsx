import React from "react";
import { ClipboardList } from "lucide-react";
import Badge from "../ui/Badge";

const orders = [
  ["#1023", "Rahul Sharma", "₹1,200", "Completed"],
  ["#1024", "Aman Verma", "₹3,500", "Pending"],
  ["#1025", "Priya Singh", "₹800", "Completed"],
  ["#1026", "Ankit Gupta", "₹6,400", "Completed"],
];

export default function RecentOrders() {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-200/40 font-sans">
      <h2 className="text-xl font-bold mb-6 text-slate-900 font-outfit flex items-center gap-2">
        <ClipboardList size={18} className="text-indigo-600" /> Recent Customer Orders
      </h2>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="text-slate-500 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200 bg-slate-50">
              <th className="px-5 py-3.5 font-outfit">Order ID</th>
              <th className="px-5 py-3.5 font-outfit">Customer</th>
              <th className="px-5 py-3.5 font-outfit">Amount</th>
              <th className="px-5 py-3.5 font-outfit">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-800">
            {orders.map((item) => (
              <tr key={item[0]} className="hover:bg-slate-50 transition-colors duration-150">
                <td className="px-5 py-3.5 font-mono font-bold text-slate-900">{item[0]}</td>
                <td className="px-5 py-3.5 font-bold text-slate-900 font-outfit">{item[1]}</td>
                <td className="px-5 py-3.5 font-mono">{item[2]}</td>
                <td className="px-5 py-3.5">
                  <Badge variant={item[3] === "Completed" ? "success" : "warning"}>{item[3]}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}