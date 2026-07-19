import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSidebar } from "../../context/SidebarContext";
import { useEmployee } from "../../context/EmployeeContext";
import { useNora } from "../../context/NoraContext";
import FloatingNora from "../nora/FloatingNora";
import TopNavbar from "./TopNavbar";
import {
  LayoutDashboard,
  Users,
  Building2,
  FileText,
  Bot,
  Settings,
  CalendarDays,
  Briefcase,
  Wallet,
  UserPlus,
  TrendingUp,
  User,
  MessageSquare,
  Boxes,
  ChartNoAxesCombined,
  LogOut,
  X
} from "lucide-react";

export default function UnifiedLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { isCollapsed, isMobileOpen, setIsMobileOpen } = useSidebar();
  const { logoutEmployee, employee } = useEmployee();

  // Detect section by path prefix
  const path = location.pathname;
  let section = "business"; // fallback
  if (path.startsWith("/admin")) section = "admin";
  else if (path.startsWith("/hr")) section = "hr";
  else if (path.startsWith("/employee")) section = "employee";

  // Build menu mapping
  const menus = {
    admin: [
      { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
      { name: "Employees", path: "/admin/employees", icon: Users },
      { name: "Departments", path: "/admin/departments", icon: Building2 },
      { name: "Reports", path: "/admin/reports", icon: FileText },
      { name: "AI Agents", path: "/admin/agents", icon: Bot },
      { name: "Settings", path: "/admin/settings", icon: Settings },
    ],
    hr: [
      { name: "Dashboard", path: "/hr", icon: LayoutDashboard },
      { name: "Employees", path: "/hr/employees", icon: Users },
      { name: "Attendance", path: "/hr/attendance", icon: CalendarDays },
      { name: "Leave", path: "/hr/leave", icon: Briefcase },
      { name: "Payroll", path: "/hr/payroll", icon: Wallet },
      { name: "Queries", path: "/hr/queries", icon: MessageSquare },
      { name: "Recruitment", path: "/hr/recruitment", icon: UserPlus },
      { name: "Performance", path: "/hr/performance", icon: TrendingUp },
      { name: "Reports", path: "/hr/reports", icon: FileText },
      { name: "HR Agent", path: "/hr/agent", icon: Bot },
      { name: "Settings", path: "/hr/settings", icon: Settings },
    ],
    employee: [
      { name: "Dashboard", path: "/employee", icon: LayoutDashboard },
      { name: "Attendance", path: "/employee/attendance", icon: CalendarDays },
      { name: "Leave", path: "/employee/leave", icon: Briefcase },
      { name: "Salary", path: "/employee/salary", icon: Wallet },
      { name: "Profile", path: "/employee/profile", icon: User },
      { name: "Contact HR", path: "/employee/contact-hr", icon: MessageSquare },
    ],
    business: [
      { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
      { name: "HR Portal", path: "/dashboard/hr", icon: Users },
      { name: "Inventory", path: "/dashboard/inventory", icon: Boxes },
      { name: "Finance", path: "/dashboard/finance", icon: Wallet },
      { name: "Analytics", path: "/dashboard/analytics", icon: ChartNoAxesCombined },
      { name: "AI Agents", path: "/dashboard/agents", icon: Bot },
      { name: "Settings", path: "/dashboard/settings", icon: Settings },
    ],
  };

  const menuItems = menus[section];

  // Section titles and badges
  const getSectionDetails = () => {
    switch (section) {
      case "admin":
        return {
          logoLetter: "A",
          title: "CortxAI",
          badge: "Admin Suite",
          themeColor: "from-amber-400 to-red-500",
        };
      case "hr":
        return {
          logoLetter: "H",
          title: "CortxAI",
          badge: "HR Module",
          themeColor: "from-blue-400 to-cyan-500",
        };
      case "employee":
        return {
          logoLetter: "E",
          title: "CortxAI",
          badge: "Employee Space",
          themeColor: "from-emerald-400 to-teal-500",
        };
      default:
        return {
          logoLetter: "C",
          title: "CortxAI",
          badge: "Business Suite",
          themeColor: "from-cyan-400 to-purple-500",
        };
    }
  };

  const details = getSectionDetails();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    if (logoutEmployee) {
      logoutEmployee();
    }
    navigate("/login");
  };

  // Check if current route matches menu item (exact or prefix)
  const isRouteActive = (itemPath) => {
    if (itemPath === "/dashboard" || itemPath === "/hr" || itemPath === "/employee" || itemPath === "/admin") {
      return path === itemPath;
    }
    return path.startsWith(itemPath);
  };

  // Inner menu lists
  const renderNavLinks = (closeMobile = false) => (
    <nav className="flex-1 space-y-1.5 px-3 py-4 overflow-y-auto scrollbar-thin">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const active = isRouteActive(item.path);
        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => closeMobile && setIsMobileOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-2xl transition-all duration-300 group relative overflow-hidden ${
              active
                ? "bg-white/10 text-cyan-300 border-l-4 border-cyan-400 shadow-lg shadow-cyan-500/5"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Icon
              size={18}
              className={`transition-transform duration-300 group-hover:scale-110 flex-shrink-0 ${
                active ? "text-cyan-300" : "text-gray-400 group-hover:text-white"
              }`}
            />
            {(!isCollapsed || closeMobile) && (
              <span className="truncate transition-opacity duration-300">
                {item.name}
              </span>
            )}
            {/* Tooltip on Collapsed Desktop Hover */}
            {isCollapsed && !closeMobile && (
              <div className="absolute left-16 scale-0 group-hover:scale-100 transition-all duration-200 z-50 bg-[#0B1120] border border-white/10 text-xs text-white rounded-lg py-1.5 px-3 shadow-xl whitespace-nowrap pointer-events-none">
                {item.name}
              </div>
            )}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen flex bg-[#030712] text-white overflow-hidden relative">
      {/* 1. Desktop Sidebar (≥ 1024px) */}
      <aside
        className={`hidden lg:flex flex-col border-r border-white/5 bg-slate-950/60 backdrop-blur-2xl transition-all duration-300 h-screen sticky top-0 left-0 ${
          isCollapsed ? "w-20" : "w-[260px]"
        }`}
      >
        {/* Logo and Header */}
        <div className="flex items-center gap-3 px-5 py-6 border-b border-white/5 h-[80px] flex-shrink-0">
          <div
            className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${details.themeColor} flex items-center justify-center font-black text-black text-lg shadow-lg flex-shrink-0`}
          >
            {details.logoLetter}
          </div>
          {!isCollapsed && (
            <div className="min-w-0">
              <h2 className="text-lg font-black tracking-tight text-white leading-none font-outfit truncate">
                {details.title}
              </h2>
              <span className="text-[9px] uppercase font-bold tracking-widest text-cyan-400 mt-1 block">
                {details.badge}
              </span>
            </div>
          )}
        </div>

        {/* Sidebar Nav Links */}
        {renderNavLinks(false)}

        {/* Fixed Logout bottom section */}
        <div className="p-4 border-t border-white/5 flex-shrink-0">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center justify-center gap-2.5 rounded-2xl bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white py-3.5 text-sm font-bold transition-all duration-300 border border-red-500/20 cursor-pointer ${
              isCollapsed ? "px-0" : "px-4"
            }`}
            title="Log Out"
          >
            <LogOut size={16} className="flex-shrink-0" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* 2. Mobile Left Drawer (< 1024px) */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop overlay */}
          <div
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
          />

          {/* Drawer container */}
          <aside className="relative flex flex-col w-[260px] max-w-[80vw] h-full bg-[#080d1a] border-r border-white/10 shadow-2xl z-10 transition-transform duration-300">
            {/* Header / Top */}
            <div className="flex items-center justify-between px-5 py-6 border-b border-white/5 h-[80px]">
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${details.themeColor} flex items-center justify-center font-black text-black text-lg`}
                >
                  {details.logoLetter}
                </div>
                <div>
                  <h2 className="text-lg font-black tracking-tight text-white leading-none font-outfit">
                    {details.title}
                  </h2>
                  <span className="text-[9px] uppercase font-bold tracking-widest text-cyan-400 mt-1 block">
                    {details.badge}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Menu */}
            {renderNavLinks(true)}

            {/* Logout bottom */}
            <div className="p-4 border-t border-white/5">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2.5 rounded-2xl bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white py-3.5 px-4 text-sm font-bold transition-all duration-300 border border-red-500/20 cursor-pointer"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* 3. Main Workspace Container */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Navbar */}
        <TopNavbar />

        {/* Content View Area */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto scrollbar-thin max-h-[calc(100vh-80px)] bg-[#030712]">
          <div className="w-full max-w-[1600px] mx-auto transition-all duration-300 animate-fadeIn">
            {children}
          </div>
        </main>
      </div>

      {/* 4. Global Nora Floating Drawer */}
      <FloatingNora />
    </div>
  );
}
