import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSidebar } from "../../context/SidebarContext";
import { useEmployee } from "../../context/EmployeeContext";
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

  const path = location.pathname;
  let section = "business";
  if (path.startsWith("/admin")) section = "admin";
  else if (path.startsWith("/hr")) section = "hr";
  else if (path.startsWith("/employee")) section = "employee";
  else if (path.startsWith("/crm")) section = "crm";
  else if (path.startsWith("/inventory")) section = "inventory";
  else if (path.startsWith("/business")) section = "business";

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
      { name: "Dashboard", path: "/hr/dashboard", icon: LayoutDashboard },
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
      { name: "Dashboard", path: "/employee/dashboard", icon: LayoutDashboard },
      { name: "Attendance", path: "/employee/attendance", icon: CalendarDays },
      { name: "Leave", path: "/employee/leave", icon: Briefcase },
      { name: "Salary", path: "/employee/salary", icon: Wallet },
      { name: "Profile", path: "/employee/profile", icon: User },
      { name: "Contact HR", path: "/employee/contact-hr", icon: MessageSquare },
    ],
    crm: [
      { name: "Dashboard", path: "/crm/dashboard", icon: LayoutDashboard },
      { name: "Leads", path: "/crm/leads", icon: UserPlus },
      { name: "Customers", path: "/crm/customers", icon: Users },
      { name: "Pipeline", path: "/crm/pipeline", icon: TrendingUp },
      { name: "Follow Ups", path: "/crm/followups", icon: CalendarDays },
      { name: "Activities", path: "/crm/activities", icon: MessageSquare },
      { name: "Reports", path: "/crm/reports", icon: FileText },
      { name: "Settings", path: "/crm/settings", icon: Settings },
    ],
    inventory: [
      { name: "Dashboard", path: "/inventory/dashboard", icon: LayoutDashboard },
      { name: "Products", path: "/inventory/products", icon: Boxes },
      { name: "Categories", path: "/inventory/categories", icon: Building2 },
      { name: "Stock", path: "/inventory/stock", icon: TrendingUp },
      { name: "Suppliers", path: "/inventory/suppliers", icon: Users },
      { name: "Purchase Orders", path: "/inventory/purchase-orders", icon: Wallet },
      { name: "Sales Orders", path: "/inventory/sales-orders", icon: FileText },
      { name: "Stock History", path: "/inventory/stock-history", icon: CalendarDays },
      { name: "Reports", path: "/inventory/reports", icon: FileText },
      { name: "Settings", path: "/inventory/settings", icon: Settings },
    ],
    business: [
      { name: "Dashboard", path: "/business/dashboard", icon: LayoutDashboard },
      { name: "HR Portal", path: "/business/hr", icon: Users },
      { name: "Inventory", path: "/business/inventory", icon: Boxes },
      { name: "Finance", path: "/business/finance", icon: Wallet },
      { name: "Analytics", path: "/business/analytics", icon: ChartNoAxesCombined },
      { name: "AI Agents", path: "/business/agents", icon: Bot },
      { name: "Settings", path: "/business/settings", icon: Settings },
    ],
  };

  const menuItems = menus[section] || [];

  const getSectionDetails = () => {
    switch (section) {
      case "admin":
        return { logoLetter: "A", title: "CortxAI", badge: "Admin Suite", themeColor: "bg-red-600 text-white", activeText: "text-red-900", activeBg: "bg-red-50/90" };
      case "hr":
        return { logoLetter: "H", title: "CortxAI", badge: "HR Module", themeColor: "bg-indigo-600 text-white", activeText: "text-indigo-900", activeBg: "bg-indigo-50/90" };
      case "employee":
        return { logoLetter: "E", title: "CortxAI", badge: "Employee Space", themeColor: "bg-teal-600 text-white", activeText: "text-teal-900", activeBg: "bg-teal-50/90" };
      case "crm":
        return { logoLetter: "C", title: "CortxAI", badge: "CRM Suite", themeColor: "bg-rose-600 text-white", activeText: "text-rose-900", activeBg: "bg-rose-50/90" };
      case "inventory":
        return { logoLetter: "I", title: "CortxAI", badge: "Inventory Suite", themeColor: "bg-emerald-600 text-white", activeText: "text-emerald-900", activeBg: "bg-emerald-50/90" };
      default:
        return { logoLetter: "B", title: "CortxAI", badge: "Business OS", themeColor: "bg-[#0F172A] text-white", activeText: "text-slate-900", activeBg: "bg-slate-100" };
    }
  };

  const details = getSectionDetails();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    if (logoutEmployee) logoutEmployee();
    navigate("/login");
  };

  const isRouteActive = (itemPath) => {
    if (
      itemPath === "/business/dashboard" ||
      itemPath === "/hr/dashboard" ||
      itemPath === "/employee/dashboard" ||
      itemPath === "/crm/dashboard" ||
      itemPath === "/inventory/dashboard" ||
      itemPath === "/admin"
    ) {
      return path === itemPath;
    }
    return path.startsWith(itemPath);
  };

  const renderNavLinks = (closeMobile = false) => (
    <nav className="flex-1 space-y-1.5 px-3 py-4 overflow-y-auto scrollbar-thin font-sans">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const active = isRouteActive(item.path);
        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => closeMobile && setIsMobileOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 text-xs font-bold rounded-2xl transition-all duration-200 group relative overflow-hidden ${active
                ? `${details.activeBg} ${details.activeText} shadow-sm border border-slate-200/60 font-black`
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
              }`}
          >
            {active && (
              <motion.div
                layoutId="activeNavIndicatorLight"
                className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-current"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <Icon
              size={17}
              className={`transition-transform duration-200 group-hover:scale-110 flex-shrink-0 ${active ? details.activeText : "text-slate-400 group-hover:text-slate-900"
                }`}
            />
            {(!isCollapsed || closeMobile) && (
              <span className="truncate transition-opacity duration-200">
                {item.name}
              </span>
            )}
            {isCollapsed && !closeMobile && (
              <div className="absolute left-16 scale-0 group-hover:scale-100 transition-all duration-200 z-50 bg-slate-900 text-white text-[11px] rounded-xl py-1.5 px-3 shadow-2xl whitespace-nowrap pointer-events-none font-bold">
                {item.name}
              </div>
            )}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen flex bg-[#F8F9FA] text-slate-900 overflow-hidden relative font-sans selection:bg-slate-900 selection:text-white">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col border-r border-slate-200/80 bg-white/90 backdrop-blur-2xl transition-all duration-300 h-screen sticky top-0 left-0 z-40 ${isCollapsed ? "w-20" : "w-[250px]"
          }`}
      >
        {/* Header Logo */}
        <div className="flex items-center gap-3 px-5 py-6 border-b border-slate-100 h-[76px] flex-shrink-0">
          <div
            className={`w-9 h-9 rounded-xl ${details.themeColor} flex items-center justify-center font-black text-lg shadow-sm flex-shrink-0 font-outfit`}
          >
            {details.logoLetter}
          </div>
          {!isCollapsed && (
            <div className="min-w-0">
              <h2 className="text-base font-black tracking-tight text-slate-900 leading-none font-outfit truncate">
                {details.title}
              </h2>
              <span className={`text-[9px] uppercase font-extrabold tracking-widest ${details.activeText} mt-1 block font-mono`}>
                {details.badge}
              </span>
            </div>
          )}
        </div>

        {/* Employee Profile Card */}
        {section === "employee" && !isCollapsed && (
          <div className="px-5 py-4 border-b border-slate-100 flex flex-col items-center text-center space-y-2 flex-shrink-0 font-sans">
            {employee?.profilePhoto ? (
              <img src={employee.profilePhoto} alt={employee?.name} className="w-14 h-14 rounded-full object-cover border border-slate-200 shadow-sm" />
            ) : (
              <div className="w-14 h-14 rounded-full bg-slate-900 flex items-center justify-center font-bold text-white text-xl shadow-sm font-outfit">
                {employee?.name ? employee.name[0].toUpperCase() : "E"}
              </div>
            )}
            <div>
              <h4 className="text-xs font-bold text-slate-900 font-outfit leading-none">{employee?.name || "Employee"}</h4>
              <p className="text-[9px] text-slate-500 font-mono mt-1 uppercase tracking-wider">{employee?.employeeId || "EMP001"}</p>
            </div>
            <div className="text-[10px] text-slate-600 font-semibold leading-tight">
              <p>{employee?.designation || "Intern"}</p>
              <p className="text-slate-400 text-[8px] uppercase font-black">{employee?.department || "Logistics"}</p>
            </div>
          </div>
        )}

        {/* Links */}
        {renderNavLinks(false)}

        {/* Logout bottom */}
        <div className="p-4 border-t border-slate-100 flex-shrink-0">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center justify-center gap-2.5 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 py-3 text-xs font-bold transition-all duration-200 border border-rose-200 cursor-pointer ${isCollapsed ? "px-0" : "px-4"
              }`}
            title="Log Out"
          >
            <LogOut size={15} className="flex-shrink-0" />
            {!isCollapsed && <span>Logout Session</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
          />
          <aside className="relative flex flex-col w-[250px] max-w-[80vw] h-full bg-white border-r border-slate-200 shadow-2xl z-10">
            <div className="flex items-center justify-between px-5 py-6 border-b border-slate-100 h-[76px]">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl ${details.themeColor} flex items-center justify-center font-black text-lg font-outfit`}>
                  {details.logoLetter}
                </div>
                <div>
                  <h2 className="text-base font-black tracking-tight text-slate-900 font-outfit">
                    {details.title}
                  </h2>
                  <span className={`text-[9px] uppercase font-bold tracking-widest ${details.activeText} block font-mono`}>
                    {details.badge}
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile Employee Profile Card */}
            {section === "employee" && (
              <div className="px-5 py-4 border-b border-slate-100 flex flex-col items-center text-center space-y-2 flex-shrink-0 font-sans">
                {employee?.profilePhoto ? (
                  <img src={employee.profilePhoto} alt={employee?.name} className="w-14 h-14 rounded-full object-cover border border-slate-200 shadow-sm" />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-slate-900 flex items-center justify-center font-bold text-white text-xl shadow-sm font-outfit">
                    {employee?.name ? employee.name[0].toUpperCase() : "E"}
                  </div>
                )}
                <div>
                  <h4 className="text-xs font-bold text-slate-900 font-outfit leading-none">{employee?.name || "Employee"}</h4>
                  <p className="text-[9px] text-slate-500 font-mono mt-1 uppercase tracking-wider">{employee?.employeeId || "EMP001"}</p>
                </div>
                <div className="text-[10px] text-slate-600 font-semibold leading-tight">
                  <p>{employee?.designation || "Intern"}</p>
                  <p className="text-slate-400 text-[8px] uppercase font-black">{employee?.department || "Logistics"}</p>
                </div>
              </div>
            )}

            {renderNavLinks(true)}
            <div className="p-4 border-t border-slate-100">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2.5 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 py-3 text-xs font-bold transition duration-200 border border-rose-200"
              >
                <LogOut size={15} />
                <span>Logout Session</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <TopNavbar />

        <main className="flex-1 p-6 md:p-8 overflow-y-auto scrollbar-thin max-h-[calc(100vh-76px)] bg-[#F8F9FA] relative">
          <div className="w-full max-w-[1600px] mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={path}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Nora Layer 3 AI Drawer */}
      <FloatingNora />
    </div>
  );
}
