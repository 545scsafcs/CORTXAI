import React from "react";

const candidates = [
  { name: "Aditya Kumar", role: "UI Architect", stage: "Interviewing" },
  { name: "Sneha Patel", role: "DevOps Engineer", stage: "Screening" },
  { name: "Kunal Kapoor", role: "Node Developer", stage: "Offered" },
  { name: "Shweta Verma", role: "AI Specialist", stage: "Hired" },
];

export default function RecruitmentPipeline() {
  const stages = ["Screening", "Interviewing", "Offered", "Hired"];

  return (
    <div className="rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-8 space-y-6 shadow-sm font-sans">
      <h3 className="text-2xl font-bold text-slate-900 font-outfit border-b border-slate-100 pb-4">Recruitment Pipeline</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stages.map((stage) => {
          const list = candidates.filter((c) => c.stage === stage);
          return (
            <div key={stage} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-200/80 pb-3">
                <span className="font-bold text-slate-900 text-xs font-outfit uppercase tracking-wider">{stage}</span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-mono">
                  {list.length}
                </span>
              </div>
              <div className="space-y-3">
                {list.map((c) => (
                  <div key={c.name} className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs hover:border-slate-300 transition">
                    <h5 className="font-bold text-slate-900 text-xs font-outfit">{c.name}</h5>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">{c.role}</p>
                  </div>
                ))}
                {list.length === 0 && (
                  <p className="text-xs text-slate-400 text-center py-6 font-medium">Empty</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
