import React, { useState, useEffect } from "react";
import CRMLayout from "../../components/layout/CRMLayout";
import { Activity, Search, Clock, Award, TrendingUp, Filter } from "lucide-react";
import { getCustomerActivities } from "../../services/crmApi";

export default function CRMActivitiesPage() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadActivities() {
      try {
        setLoading(true);
        const res = await getCustomerActivities();
        if (res.success) {
          setActivities(res.data);
        }
      } catch (err) {
        console.error("Failed to load activities:", err);
      } finally {
        setLoading(false);
      }
    }
    loadActivities();
  }, []);

  return (
    <CRMLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-black text-white font-outfit">Activities Feed</h1>
          <p className="text-gray-400 mt-2">Realtime system log of client interactions, lead assignments, and status updates.</p>
        </div>

        {/* Feed List */}
        <div className="rounded-3xl border border-white/5 bg-slate-950/30 p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 pb-4 border-b border-white/5 text-gray-400 text-xs">
            <Filter size={12} className="text-cyan-400" />
            <span>Showing all recorded events</span>
          </div>

          <div className="relative border-l-2 border-white/5 pl-6 ml-4 space-y-6 py-2 text-xs">
            {loading ? (
              <div className="py-8 text-center text-gray-500">Loading feeds...</div>
            ) : activities.length === 0 ? (
              <div className="py-12 text-center text-gray-500">
                <Activity size={32} className="text-gray-600 mx-auto mb-2" />
                <p className="font-bold">No Activities Logged</p>
                <p className="text-[10px] mt-1">Activities are generated automatically during lead updates and contact actions.</p>
              </div>
            ) : (
              activities.map((act) => (
                <div key={act._id} className="relative group">
                  <span className="absolute -left-8.5 top-0.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center shrink-0"></span>
                  <div className="flex items-center justify-between text-gray-500 text-[10px]">
                    <span className="font-bold uppercase tracking-wider text-cyan-400">{act.type}</span>
                    <span>{new Date(act.createdAt).toLocaleString()}</span>
                  </div>
                  <h4 className="text-white font-bold text-sm mt-1.5">{act.title}</h4>
                  <p className="text-gray-300 mt-1 leading-relaxed">{act.description}</p>
                  
                  {act.employeeId && (
                    <div className="text-[9px] text-gray-500 mt-2 font-mono">
                      Logged by Rep: {act.employeeId.firstName || "System Operator"}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </CRMLayout>
  );
}
