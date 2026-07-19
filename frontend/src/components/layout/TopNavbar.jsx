import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, Bell, Bot, Search, Sun, Moon, Sparkles } from "lucide-react";
import { useSidebar } from "../../context/SidebarContext";
import { useEmployee } from "../../context/EmployeeContext";
import { useNora } from "../../context/NoraContext";

export default function TopNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toggleSidebar, toggleMobile } = useSidebar();
  const { employee } = useEmployee();
  const { setOpen: setNoraOpen } = useNora();
  const [isDark, setIsDark] = useState(true); // default dark

  // Determine Title based on pathname
  const getPageTitle = (path) => {
    switch (path) {
      // Business Portal
      case "/dashboard":
        return "Business Dashboard";
      case "/dashboard/hr":
        return "Business HR Suite";
      case "/dashboard/inventory":
        return "Inventory Manager";
      case "/dashboard/finance":
        return "Finance & Ledger";
      case "/dashboard/analytics":
        return "Analytics Intelligence";
      case "/dashboard/agents":
        return "Autonomous AI Workforce";
      case "/dashboard/settings":
        return "System Settings";

      // HR Portal
      case "/hr":
        return "HR Portal Dashboard";
      case "/hr/employees":
        return "Company Directory";
      case "/hr/attendance":
        return "Attendance Records";
      case "/hr/leave":
        return "Leave Requests Panel";
      case "/hr/payroll":
        return "Payroll Operations";
      case "/hr/recruitment":
        return "Talent Acquisition";
      case "/hr/performance":
        return "Performance Tracking";
      case "/hr/reports":
        return "HR Insights & Reports";
      case "/hr/agent":
        return "Nora HR Recruiter";
      case "/hr/settings":
        return "HR General Settings";

      // Employee Portal
      case "/employee":
        return "Employee Dashboard";
      case "/employee/attendance":
        return "My Attendance Log";
      case "/employee/leave":
        return "My Leave Portal";
      case "/employee/salary":
        return "My Compensation";
      case "/employee/profile":
        return "My Professional Profile";
      case "/employee/contact-hr":
        return "HR Helpdesk Chat";

      // Admin Portal
      case "/admin":
        return "System Control Hub";
      case "/admin/employees":
        return "User Permissions Manager";
      case "/admin/departments":
        return "Department Controller";
      case "/admin/reports":
        return "System Logs & Reports";
      case "/admin/agents":
        return "AI Orchestrator";
      case "/admin/settings":
        return "Master Core Settings";

      default:
        return "CortxAI Workspace";
    }
  };

  const title = getPageTitle(location.pathname);

  // Get current portal details based on path
  const getPortalUser = () => {
    const path = location.pathname;
    if (path.startsWith("/employee")) {
      return {
        name: employee ? `${employee.firstName} ${employee.lastName}` : "Employee User",
        sub: employee?.designation || "Staff",
        avatar: employee?.profilePhoto,
        initials: employee?.firstName?.charAt(0) || "E",
      };
    } else if (path.startsWith("/hr")) {
      return {
        name: employee ? `${employee.firstName} ${employee.lastName || ""}`.trim() : "HR Manager",
        sub: employee?.designation || "People Operations",
        avatar: employee?.profilePhoto,
        initials: employee?.firstName?.charAt(0) || "HR",
      };
    } else if (path.startsWith("/admin")) {
      return {
        name: "System Admin",
        sub: "Root Authority",
        avatar: null,
        initials: "AD",
      };
    } else {
      return {
        name: "Business Owner",
        sub: "Enterprise Owner",
        avatar: null,
        initials: "BO",
      };
    }
  };

  const user = getPortalUser();

  const handleHamburgerClick = () => {
    // If desktop (>= 1024px) toggle standard collapse, else toggle mobile drawer
    if (window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobile();
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-slate-950/60 backdrop-blur-md px-6 py-4 flex items-center justify-between">
      {/* Left Area: Hamburger & Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleHamburgerClick}
          className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition duration-200 cursor-pointer"
        >
          <Menu size={20} />
        </button>

        <div>
          <h1 className="text-xl font-bold tracking-tight text-white font-outfit">
            {title}
          </h1>
        </div>
      </div>

      {/* Middle Area: Search (Hidden on Mobile) */}
      <div className="hidden md:flex items-center w-full max-w-sm relative">
        <span className="absolute left-3.5 text-gray-500">
          <Search size={16} />
        </span>
        <input
          type="text"
          placeholder="Search workspace, AI commands, files..."
          className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm placeholder-gray-500 text-white outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-400/50 transition-all duration-300"
        />
      </div>

      {/* Right Area: Actions & Profile */}
      <div className="flex items-center gap-4">
        {/* Toggle Theme Mock */}
        <button
          onClick={() => setIsDark(!isDark)}
          className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition cursor-pointer"
          title="Toggle Theme"
        >
          {isDark ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        {/* Nora Quick Button */}
        <button
          onClick={() => setNoraOpen(true)}
          className="relative group p-2 rounded-xl bg-gradient-to-tr from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 hover:border-cyan-400 text-cyan-400 hover:text-cyan-300 transition duration-300 cursor-pointer flex items-center gap-1.5"
          title="Wake Nora AI"
        >
          <Bot size={18} className="group-hover:animate-pulse" />
          <span className="hidden sm:inline text-xs font-bold font-outfit uppercase tracking-wider">
            Nora AI
          </span>
          <Sparkles size={10} className="absolute -top-1 -right-1 text-purple-400 animate-bounce" />
        </button>

        {/* Notifications */}
        <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition relative cursor-pointer">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 shadow-md shadow-cyan-400/50" />
        </button>

        {/* Vertical divider */}
        <div className="h-6 w-[1px] bg-white/10 hidden sm:block" />

        {/* Profile Card Summary */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <h4 className="text-sm font-bold text-white leading-none font-outfit">
              {user.name}
            </h4>
            <span className="text-[10px] text-gray-400 font-semibold mt-1 block">
              {user.sub}
            </span>
          </div>

          <div
            onClick={() => {
              if (location.pathname.startsWith("/employee")) {
                navigate("/employee/profile");
              }
            }}
            className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-black text-sm uppercase cursor-pointer select-none overflow-hidden border ${
              location.pathname.startsWith("/employee")
                ? "border-cyan-400 hover:scale-105 transition"
                : "border-white/10"
            }`}
          >
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-cyan-400 flex items-center justify-center font-black">
                {user.initials}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
