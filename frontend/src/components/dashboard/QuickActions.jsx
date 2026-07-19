import React from "react";
import { Plus, Users, Package, Wallet, Bot } from "lucide-react";

const actions = [
  {
    title: "Add Employee",
    icon: Users,
  },
  {
    title: "New Product",
    icon: Package,
  },
  {
    title: "Create Invoice",
    icon: Wallet,
  },
  {
    title: "Run AI Agent",
    icon: Bot,
  },
  {
    title: "New Project",
    icon: Plus,
  },
];

export default function QuickActions() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-white font-outfit">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {actions.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.title}
              className="rounded-2xl border border-white/5 bg-white/[0.01] p-5 hover:border-cyan-500/30 hover:bg-cyan-500/[0.03] hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center mx-auto text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500/10 group-hover:text-cyan-300 transition-all duration-300">
                <Icon size={20} />
              </div>
              <p className="mt-4 text-xs font-semibold text-gray-300 group-hover:text-white transition-colors duration-300 font-outfit">
                {item.title}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}