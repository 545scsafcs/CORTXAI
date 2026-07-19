import React from "react";
import { PlusCircle, Calendar, MessageSquare, Briefcase } from "lucide-react";

export default function QuickActions() {
  function handleAction(action) {
    alert(`Quick Action: "${action}" triggered. AI Nora agent is indexing the layout.`);
  }

  return (
    <div className="rounded-3xl bg-white/5 border border-white/10 p-8 space-y-6">
      <h3 className="text-2xl font-bold text-white border-b border-white/10 pb-4">Quick HR Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ActionButton
          title="Post a Job"
          icon={<PlusCircle size={20} />}
          onClick={() => handleAction("Create Job Posting")}
        />
        <ActionButton
          title="Schedule Interview"
          icon={<Calendar size={20} />}
          onClick={() => handleAction("Schedule Candidate Interview")}
        />
        <ActionButton
          title="Broadcast announcement"
          icon={<MessageSquare size={20} />}
          onClick={() => handleAction("Broadcast Team message")}
        />
        <ActionButton
          title="Hire Candidate"
          icon={<Briefcase size={20} />}
          onClick={() => handleAction("Initiate Candidate Onboarding")}
        />
      </div>
    </div>
  );
}

function ActionButton({ title, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center p-5 bg-[#0B1120] border border-white/5 rounded-2xl hover:border-cyan-400/40 hover:bg-[#0e1627] transition group text-center"
    >
      <div className="p-3 bg-white/5 rounded-xl text-cyan-400 group-hover:scale-110 transition duration-300">
        {icon}
      </div>
      <span className="text-xs text-gray-300 font-semibold mt-3 block">{title}</span>
    </button>
  );
}
