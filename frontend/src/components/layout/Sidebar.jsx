import {
  LayoutDashboard,
  Users,
  Boxes,
  Wallet,
  ChartNoAxesCombined,
  Bot,
  Settings,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menu = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "HR",
    icon: Users,
    path: "/dashboard/hr",
  },
  {
    name: "Inventory",
    icon: Boxes,
    path: "/dashboard/inventory",
  },
  {
    name: "Finance",
    icon: Wallet,
    path: "/dashboard/finance",
  },
  {
    name: "Analytics",
    icon: ChartNoAxesCombined,
    path: "/dashboard/analytics",
  },
  {
    name: "AI Agents",
    icon: Bot,
    path: "/dashboard/agents",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/dashboard/settings",
  },
];

export default function Sidebar() {
  return (
    <div className="w-72 min-h-screen border-r border-white/10 bg-[#08111f]">

      <div className="p-8">

        <h1 className="text-4xl font-black text-cyan-400">
          CortxAI
        </h1>

      </div>

      <div className="space-y-3 px-4">

        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300
                ${
                  isActive
                    ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20"
                    : "hover:bg-white/10 text-gray-300"
                }`
              }
            >
              <Icon size={22} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}

      </div>
    </div>
  );
}