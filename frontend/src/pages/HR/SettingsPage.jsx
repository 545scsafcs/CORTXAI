import HRLayout from "../../components/layout/HRLayout";

export default function SettingsPage() {
  return (
    <HRLayout>
      <div className="space-y-8 font-sans">
        <div className="bg-white border border-slate-200/80 p-6 sm:p-8 rounded-3xl shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-600" />
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-outfit tracking-tight">
            HR Settings
          </h1>
          <p className="mt-1.5 text-slate-600 text-xs sm:text-sm font-semibold leading-relaxed font-sans">
            Configure HR System & Automated Rules
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
          <div className="space-y-4">
            <Setting title="Attendance System" desc="Biometric + Face Recognition" />
            <Setting title="Payroll" desc="Monthly Auto Payroll" />
            <Setting title="Leave Policy" desc="Manage Leave Rules" />
            <Setting title="Recruitment" desc="AI Hiring Settings" />
            <Setting title="HR Agent" desc="Manage AI Agent Behaviour" />
          </div>
        </div>
      </div>
    </HRLayout>
  );
}

function Setting({ title, desc }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-6 gap-4 hover:bg-slate-100/50 transition">
      <div>
        <h3 className="text-base font-bold text-slate-900 font-outfit">
          {title}
        </h3>
        <p className="mt-0.5 text-slate-500 text-xs font-medium">
          {desc}
        </p>
      </div>

      <button className="rounded-xl bg-[#0F172A] px-5 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition cursor-pointer shadow-2xs self-start sm:self-auto">
        Configure
      </button>
    </div>
  );
}