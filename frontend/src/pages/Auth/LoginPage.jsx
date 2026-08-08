import React from "react";
import { useNavigate } from "react-router-dom";
import { Shield, ArrowRight } from "lucide-react";
import GlassCard from "../../components/ui/GlassCard";
import Button from "../../components/ui/Button";

export default function LoginPage() {
  const navigate = useNavigate();

  const workspaces = [
    {
      id: "employee",
      name: "Employee Space",
      desc: "Track attendance, file leaves, and view compensations.",
      icon: "👨‍💼",
      path: "/login/employee",
      dept: "employee",
    },
    {
      id: "hr",
      name: "HR Manager Portal",
      desc: "Manage payroll, employee directories, and leaves.",
      icon: "👥",
      path: "/login/hr",
      dept: "hr",
    },
    {
      id: "business",
      name: "Business Owner Suite",
      desc: "Review business stats, financial ledgers, and systems.",
      icon: "👔",
      path: "/login/business",
      dept: "business",
    },
    {
      id: "crm",
      name: "CRM Control Center",
      desc: "Log prospects, schedule tasks, and track pipelines.",
      icon: "🤝",
      path: "/login/crm",
      dept: "crm",
    },
    {
      id: "inventory",
      name: "Inventory Suite",
      desc: "Verify warehouse stock in/out history and supplies.",
      icon: "📦",
      path: "/login/inventory",
      dept: "inventory",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F9FA] px-6 py-16 relative overflow-hidden font-sans">
      {/* Background radial ambient lights */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-slate-200/50 rounded-full blur-[140px] pointer-events-none" />

      {/* Header Area */}
      <div className="text-center mb-16 relative z-10 max-w-xl space-y-4">
        <div className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest text-slate-900 font-mono shadow-sm">
          <Shield size={14} className="text-indigo-600" /> CORTXAI CLOUD SYSTEMS
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 font-outfit tracking-tight leading-none">
          Welcome to CORTX<span className="text-indigo-600">AI</span>
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed font-sans max-w-md mx-auto">
          Select a dedicated corporate workspace to access your operational dashboards and Nora AI agents.
        </p>
      </div>

      {/* Grid of Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 w-full max-w-7xl relative z-10">
        {workspaces.map((ws) => (
          <GlassCard
            key={ws.id}
            dept={ws.dept}
            accent
            onClick={() => navigate(ws.path)}
            className="flex flex-col justify-between cursor-pointer group bg-white border-slate-200/80 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:-translate-y-1 transition duration-300"
          >
            <div className="space-y-4">
              <div className="text-4xl mb-2">{ws.icon}</div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 leading-tight font-outfit group-hover:text-indigo-600 transition">
                  {ws.name}
                </h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed font-sans">
                  {ws.desc}
                </p>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between pt-4 border-t border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-slate-900 transition">
              <span>Open Portal</span>
              <ArrowRight size={12} className="group-hover:translate-x-1 transition" />
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Registration Section */}
      <div className="w-full max-w-md mt-16 pt-8 border-t border-slate-200/80 text-center relative z-10 space-y-4">
        <p className="text-xs text-slate-500 font-sans">
          Don't have an organization registered yet?
        </p>
        <Button
          onClick={() => navigate("/register")}
          variant="outline"
          className="px-8 py-3.5 text-xs uppercase tracking-wider font-bold rounded-2xl border-slate-200 text-slate-900 hover:bg-slate-900 hover:text-white transition duration-200 shadow-sm"
        >
          Register Your Business Suite
        </Button>
      </div>

      <div className="text-center text-[10px] text-slate-400 mt-12 relative z-10 font-mono">
        Secured by CORTX AI Continuous Telemetry Layer.
      </div>
    </div>
  );
}