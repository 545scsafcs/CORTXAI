import React from "react";
import CRMLayout from "../../components/layout/CRMLayout";
import { Settings, Shield, Bell, CheckCircle, Database } from "lucide-react";

export default function CRMSettingsPage() {
  return (
    <CRMLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-black text-white font-outfit">CRM Settings</h1>
          <p className="text-gray-400 mt-2">Adjust lead thresholds, pipeline targets, and sales notifications.</p>
        </div>

        <div className="max-w-3xl space-y-6">
          <div className="rounded-3xl border border-white/5 bg-slate-950/30 p-6 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Shield size={18} className="text-cyan-400" /> Lead Routing Logic
            </h3>
            <p className="text-xs text-gray-400">
              Configure how incoming organic website leads are allocated to sales reps (Round Robin, Capacity Based, or Manual).
            </p>
            <div className="p-4 rounded-xl bg-slate-900 border border-white/5 text-xs text-gray-300">
              Active Mode: <span className="font-bold text-cyan-400">Manual Assignment (Default)</span>
            </div>
          </div>

          <div className="rounded-3xl border border-white/5 bg-slate-950/30 p-6 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Bell size={18} className="text-cyan-400" /> Notifications Settings
            </h3>
            <div className="space-y-3 text-xs text-gray-300">
              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="rounded border-white/10 bg-slate-950" />
                <span>Notify me when a lead transitions to "Qualified"</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="rounded border-white/10 bg-slate-950" />
                <span>Email summaries of daily scheduled follow-ups</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </CRMLayout>
  );
}
