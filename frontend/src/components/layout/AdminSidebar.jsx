import { NavLink } from "react-router-dom";
import { LogOut } from "lucide-react";

const menus = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: "🏠",
  },
  {
    name: "Employees",
    path: "/admin/employees",
    icon: "👨‍💼",
  },
  {
    name: "Departments",
    path: "/admin/departments",
    icon: "🏢",
  },
  {
    name: "Reports",
    path: "/admin/reports",
    icon: "📊",
  },
  {
    name: "AI Agents",
    path: "/admin/agents",
    icon: "🤖",
  },
  {
    name: "Settings",
    path: "/admin/settings",
    icon: "⚙️",
  },
];

export default function AdminSidebar() {
  return (
    <aside className="w-72 h-[calc(100vh-2rem)] sticky top-4 left-4 m-4 rounded-3xl bg-white/5 border border-white/10 p-6 flex flex-col justify-between backdrop-blur-xl shadow-2xl">
      <div>
        <div className="px-4 py-6 mb-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-400 to-purple-500 flex items-center justify-center font-bold text-black text-lg shadow-lg shadow-cyan-500/20">
            A
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white font-outfit">
              CortxAI
            </h1>
            <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-400/80">
              Admin Portal
            </span>
          </div>
        </div>

        <nav className="space-y-1.5">
          {menus.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-2xl px-5 py-4 text-sm font-semibold transition-all duration-300 group relative overflow-hidden
                ${
                  isActive
                    ? "bg-white/10 text-cyan-300 border-l-4 border-cyan-400 shadow-md"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`
              }
            >
              <span className="text-lg transition-transform group-hover:scale-110 duration-300">
                {item.icon}
              </span>
              <span>{item.name}</span>
            </NavLink>
          ))}
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