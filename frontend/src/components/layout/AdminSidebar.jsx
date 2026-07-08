import { NavLink } from "react-router-dom";

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
    <aside className="w-64 min-h-screen bg-[#0B1220] border-r border-white/10 p-6">

      <h1 className="text-4xl font-black text-cyan-400">
        CortxAI
      </h1>

      <p className="text-gray-400 mt-2">
        Admin Portal
      </p>

      <div className="mt-10 space-y-3">

        {menus.map((item) => (

          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/admin"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                isActive
                  ? "bg-cyan-400 text-black font-bold"
                  : "text-gray-300 hover:bg-white/10"
              }`
            }
          >

            <span>{item.icon}</span>

            <span>{item.name}</span>

          </NavLink>

        ))}

      </div>

    </aside>
  );
}