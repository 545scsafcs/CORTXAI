import { Link, useLocation } from "react-router-dom";

export default function EmployeeLayout({ children }) {

  const location = useLocation();

  const menu = [
    {
      name: "Dashboard",
      icon: "🏠",
      path: "/employee",
    },
    {
      name: "Attendance",
      icon: "🗓️",
      path: "/employee/attendance",
    },
    {
      name: "Leave",
      icon: "📝",
      path: "/employee/leave",
    },
    {
      name: "Salary",
      icon: "💰",
      path: "/employee/salary",
    },
    {
      name: "Profile",
      icon: "👤",
      path: "/employee/profile",
    },
  ];

  return (
    <div className="min-h-screen flex bg-[#050816] text-white">

      <aside className="w-64 bg-[#08111f] border-r border-white/10 p-8">

        <h1 className="text-4xl font-black text-cyan-400">
          CortxAI
        </h1>

        <p className="text-gray-400 mt-2">
          Employee Portal
        </p>

        <div className="mt-10 space-y-3">

          {menu.map((item) => (

            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition
              ${
                location.pathname === item.path
                  ? "bg-cyan-500 text-black font-bold"
                  : "hover:bg-white/10"
              }`}
            >

              <span>{item.icon}</span>

              {item.name}

            </Link>

          ))}

        </div>

      </aside>

      <main className="flex-1 p-10">

        {children}

      </main>

    </div>
  );
}