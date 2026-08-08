import React from "react";
import { Plus, Users, Package, Wallet, Bot } from "lucide-react";

const actions = [
  { title: "Add Employee", icon: Users },
  { title: "New Product", icon: Package },
  { title: "Create Invoice", icon: Wallet },
  { title: "Run AI Agent", icon: Bot },
  { title: "New Project", icon: Plus },
];

export default function QuickActions() {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-200/40 font-sans">
      <h2 className="text-xl font-bold mb-6 text-slate-900 font-outfit">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {actions.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5 hover:bg-slate-100 hover:-translate-y-1 transition-all duration-200 group cursor-pointer text-center"
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center mx-auto text-slate-800 group-hover:scale-110 shadow-sm transition duration-200">
                <Icon size={18} />
              </div>
              <p className="mt-3 text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition font-outfit">
                {item.title}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}