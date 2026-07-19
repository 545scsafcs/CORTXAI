import {
  LayoutDashboard,
  Users,
  Boxes,
  Wallet,
  ChartNoAxesCombined,
  Bot,
  Settings,
  LogOut
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
    <aside className="w-72 h-[calc(100vh-2rem)] sticky top-4 left-4 m-4 rounded-3xl bg-white/5 border border-white/10 p-6 flex flex-col justify-between backdrop-blur-xl shadow-2xl">
      <div>
        <div className="px-4 py-6 mb-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-400 to-purple-500 flex items-center justify-center font-bold text-black text-lg shadow-lg shadow-cyan-500/20">
            C
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white font-outfit">
              CortxAI
            </h1>
            <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-400/80">
              Business Suite
            </span>
          </div>
        </div>

        <nav className="space-y-1.5">
          {menu.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3.5 rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all duration-300 group relative overflow-hidden
                  ${
                    isActive
                      ? "bg-white/10 text-cyan-300 border-l-4 border-cyan-400 shadow-md"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                <Icon size={18} className="transition-transform group-hover:scale-110 duration-300" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="pt-6 border-t border-white/5">
        <button
          onClick={() => {
            localStorage.removeItem("userRole");
            window.location.href = "/login";
          }}
          className="w-full flex items-center justify-center gap-2.5 rounded-2xl bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white py-3.5 text-sm font-bold transition-all duration-300 border border-red-500/20"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
}