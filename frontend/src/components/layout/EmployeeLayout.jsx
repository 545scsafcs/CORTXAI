import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEmployee } from "../../context/EmployeeContext";
import { LogOut } from "lucide-react";

export default function EmployeeLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    employee,
    logoutEmployee,
  } = useEmployee();

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

  function logout() {
    logoutEmployee();
    navigate("/login");
  }

  return (
    <div className="min-h-screen flex bg-[#030712] text-white font-outfit relative">
      {/* Sidebar Wrapper */}
      <aside className="w-72 h-[calc(100vh-2rem)] sticky top-4 left-4 m-4 rounded-3xl bg-white/5 border border-white/10 p-6 flex flex-col justify-between backdrop-blur-xl shadow-2xl">
        <div>
          {/* Logo */}
          <div className="px-4 py-6 border-b border-white/5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-400 to-purple-500 flex items-center justify-center font-bold text-black text-lg shadow-lg shadow-cyan-500/20">
              E
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-white">
                CortxAI
              </h1>
              <p className="text-[10px] uppercase font-bold tracking-widest text-cyan-400/80">
                Employee Portal
              </p>
            </div>
          </div>

          {/* Profile Card Summary */}
          <div className="py-6 border-b border-white/5">
            <div className="flex items-center gap-4 bg-white/5 p-3 rounded-2xl border border-white/5">
              {employee?.profilePhoto ? (
                <img
                  src={employee.profilePhoto}
                  alt={employee?.firstName}
                  className="w-12 h-12 rounded-full object-cover border border-cyan-400/50"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center text-xl font-bold text-black uppercase">
                  {employee?.firstName?.charAt(0)}
                </div>
              )}
              <div className="min-w-0">
                <h3 className="font-bold text-sm text-white truncate">
                  {employee?.firstName} {employee?.lastName}
                </h3>
                <p className="text-xs text-gray-400 truncate">
                  {employee?.employeeId}
                </p>
                <p className="text-[10px] text-cyan-400 truncate font-semibold">
                  {employee?.designation}
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="space-y-1.5 mt-6">
            {menu.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex
                  items-center
                  gap-3.5
                  rounded-2xl
                  px-4
                  py-3.5
                  text-sm
                  font-semibold
                  transition-all
                  duration-300
                  group
                  relative
                  overflow-hidden
                  ${
                    location.pathname === item.path
                      ? "bg-white/10 text-cyan-300 border-l-4 border-cyan-400 shadow-md"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }
                `}
              >
                <span className="text-base transition-transform group-hover:scale-110 duration-300">
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="pt-6 border-t border-white/5">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2.5 rounded-2xl bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white py-3.5 text-sm font-bold transition-all duration-300 border border-red-500/20"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Panel Content */}
      <main className="flex-1 p-8 overflow-y-auto max-h-screen">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}