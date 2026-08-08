import React from "react";
import UnifiedLayout from "../../components/layout/UnifiedLayout";
import PageHeader from "../../components/ui/PageHeader";
import AIAgentsRedesign from "../../components/LandingSections/AIAgentsRedesign";
import Button from "../../components/ui/Button";
import { Bot, Sparkles, Plus } from "lucide-react";

export default function AIAgentsPage() {
  return (
    <UnifiedLayout>
      <div className="space-y-8 font-sans">
        <PageHeader
          title="Autonomous AI Workforce Guild"
          subtitle="Deploy, configure, and monitor department-specific Nora AI Agents."
          badge="AI Agents"
          badgeColor="from-cyan-400 to-indigo-600"
          breadcrumbs={[{ label: "Business Suite" }, { label: "AI Agents" }]}
          actions={
            <Button variant="primary" className="bg-cyan-400 text-black hover:bg-cyan-300 font-bold text-xs">
              <Plus size={15} className="inline mr-1.5" /> Deploy Custom Agent
            </Button>
          }
        />

        <div className="rounded-3xl bg-white border border-slate-200/80 p-6 md:p-8 shadow-xl shadow-slate-200/40">
          <AIAgentsRedesign />
        </div>
      </div>
    </UnifiedLayout>
  );
}