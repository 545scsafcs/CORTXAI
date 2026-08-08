import HRLayout from "../../components/layout/HRLayout";

import PerformanceWidget from "../../components/hr/PerformanceWidget";

export default function PerformancePage() {
  return (
    <HRLayout>
      <div className="space-y-8 font-sans">
        <div className="bg-white border border-slate-200/80 p-6 sm:p-8 rounded-3xl shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-600" />
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-outfit tracking-tight">
            Employee Performance
          </h1>
          <p className="mt-1.5 text-slate-600 text-xs sm:text-sm font-semibold leading-relaxed font-sans">
            AI Performance Analytics & Leaderboards
          </p>
        </div>

        <PerformanceWidget />
      </div>
    </HRLayout>
  );
}