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
    <div className="rounded-3xl bg-white/5 border border-white/10 p-8 space-y-6">
      <h3 className="text-2xl font-bold text-white border-b border-white/10 pb-4">Recruitment Pipeline</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stages.map((stage) => {
          const list = candidates.filter((c) => c.stage === stage);
          return (
            <div key={stage} className="bg-[#0B1120] border border-white/5 rounded-2xl p-5 space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="font-bold text-white text-sm">{stage}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-400">
                  {list.length}
                </span>
              </div>
              <div className="space-y-3">
                {list.map((c) => (
                  <div key={c.name} className="p-3 bg-white/5 rounded-xl border border-white/5 hover:border-cyan-500/30 transition">
                    <h5 className="font-bold text-white text-sm">{c.name}</h5>
                    <p className="text-xs text-gray-400 mt-1">{c.role}</p>
                  </div>
                ))}
                {list.length === 0 && (
                  <p className="text-xs text-gray-500 text-center py-6">Empty</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
