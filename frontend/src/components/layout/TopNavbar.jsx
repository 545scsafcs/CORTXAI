import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu, Bell, Search, Sparkles, Command, X } from "lucide-react";
import { useSidebar } from "../../context/SidebarContext";
import { useEmployee } from "../../context/EmployeeContext";
import { useNora } from "../../context/NoraContext";
import { motion, AnimatePresence } from "framer-motion";

export default function TopNavbar() {
  const location = useLocation();
  const { toggleSidebar, toggleMobile } = useSidebar();
  const { employee } = useEmployee();
  const { setOpen: setNoraOpen } = useNora();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const path = location.pathname;

  const getSectionBadge = () => {
    if (path.startsWith("/admin")) return { label: "Admin Suite", col: "bg-red-50 text-red-900 border-red-200" };
    if (path.startsWith("/hr")) return { label: "HR Portal", col: "bg-indigo-50 text-indigo-900 border-indigo-200" };
    if (path.startsWith("/employee")) return { label: "Employee Space", col: "bg-teal-50 text-teal-900 border-teal-200" };
    if (path.startsWith("/crm")) return { label: "CRM Suite", col: "bg-rose-50 text-rose-900 border-rose-200" };
    if (path.startsWith("/inventory")) return { label: "Inventory Matrix", col: "bg-emerald-50 text-emerald-900 border-emerald-200" };
    return { label: "Business OS", col: "bg-slate-100 text-slate-900 border-slate-200" };
  };

  const badge = getSectionBadge();

  return (
    <header className="h-[76px] border-b border-slate-200/80 bg-white/80 backdrop-blur-2xl px-6 flex items-center justify-between sticky top-0 z-30 font-sans">
      {/* Left: Mobile/Sidebar toggle & Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="hidden lg:flex p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition cursor-pointer"
          title="Toggle Sidebar"
        >
          <Menu size={18} />
        </button>

        <button
          onClick={toggleMobile}
          className="lg:hidden p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition cursor-pointer"
        >
          <Menu size={18} />
        </button>

        <div className="hidden sm:flex items-center gap-3">
          <span className={`text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border ${badge.col} font-mono shadow-sm`}>
            {badge.label}
          </span>
        </div>
      </div>

      {/* Center: Command-Bar Search Input */}
      <div className="flex-1 max-w-md mx-6 hidden md:block">
        <div className="relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search commands, employees, SKUs, or metrics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-100/90 border border-slate-200 rounded-2xl pl-10 pr-12 py-2 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-indigo-500 transition font-sans shadow-inner"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-[10px] font-mono text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-200">
            <Command size={10} /> K
          </div>
        </div>
      </div>

      {/* Right: Actions, Nora Trigger, Notifications, Profile */}
      <div className="flex items-center gap-3">
        {/* Ask Nora AI Quick Trigger */}
        <button
          onClick={() => setNoraOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#0F172A] text-white hover:bg-slate-800 transition duration-200 text-xs font-bold shadow-md cursor-pointer"
        >
          <Sparkles size={14} className="text-cyan-400 animate-pulse" />
          <span className="hidden sm:inline">Ask Nora AI</span>
        </button>

        {/* Notifications Popover Trigger */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2.5 rounded-2xl bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition relative cursor-pointer"
          >
            <Bell size={16} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-600" />
          </button>

          {/* Notifications Drawer Popover */}
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                className="absolute right-0 mt-3 w-80 rounded-3xl bg-white border border-slate-200 p-5 shadow-2xl backdrop-blur-2xl z-50 space-y-4 text-slate-900"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h4 className="text-xs font-bold font-outfit uppercase tracking-wider text-slate-900">System Telemetry</h4>
                  <button onClick={() => setShowNotifications(false)} className="text-slate-400 hover:text-slate-900">
                    <X size={14} />
                  </button>
                </div>
                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>Nora Ledger Auto-Sync</span>
                      <span className="text-[9px] text-slate-400 font-mono">2m ago</span>
                    </div>
                    <p className="text-slate-500 text-[11px]">Reconciled 14 invoices into general accounts ledger.</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>Stock Reorder Compiled</span>
                      <span className="text-[9px] text-slate-400 font-mono">15m ago</span>
                    </div>
                    <p className="text-slate-500 text-[11px]">Purchase Request issued for MacBook Pro SKUs.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Profile Pill */}
        <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
          {employee?.profilePhoto ? (
            <img src={employee.profilePhoto} alt={employee?.name} className="w-8 h-8 rounded-full object-cover shadow-sm" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-[#0F172A] flex items-center justify-center font-bold text-white text-xs shadow-sm">
              {employee?.name ? employee.name[0].toUpperCase() : "U"}
            </div>
          )}
          <div className="hidden lg:block text-left">
            <h5 className="text-xs font-bold text-slate-900 font-outfit leading-none">
              {employee?.name || "Workspace Admin"}
            </h5>
            <span className="text-[10px] text-slate-400 font-mono uppercase">
              {employee?.designation || employee?.role || "Authorized"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
