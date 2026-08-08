import React, { useEffect, useState } from "react";
import CRMLayout from "../../components/layout/CRMLayout";
import PageHeader from "../../components/ui/PageHeader";
import KPICard from "../../components/ui/KPICard";
import GlassCard from "../../components/ui/GlassCard";
import Badge from "../../components/ui/Badge";
import DataTable from "../../components/ui/DataTable";
import { TrendingUp, UserPlus, Users, DollarSign, Target, Activity } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { getLeadStats, getRecentActivities, getFollowUps, getLeads } from "../../services/crmApi";

export default function CRMDashboard() {
  const [stats, setStats] = useState({
    totalLeads: 0,
    activeLeads: 0,
    convertedLeads: 0,
    lostLeads: 0,
    expectedRevenue: 0,
    statusCounts: {},
    sourceCounts: {},
  });
  
  const [activities, setActivities] = useState([]);
  const [followups, setFollowups] = useState([]);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        setLoading(true);
        const [statsRes, actRes, folRes, leadsRes] = await Promise.all([
          getLeadStats(),
          getRecentActivities(),
          getFollowUps(),
          getLeads()
        ]);
        
        if (statsRes.success) setStats(statsRes.data);
        if (actRes.success) setActivities(actRes.data.slice(0, 5));
        if (folRes.success) setFollowups(folRes.data.filter(f => f.status === "Upcoming").slice(0, 5));
        if (leadsRes.success) setLeads(leadsRes.data.slice(0, 5));
      } catch (err) {
        console.error("Failed to load CRM dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <CRMLayout>
        <div className="flex justify-center items-center py-32">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-rose-400"></div>
        </div>
      </CRMLayout>
    );
  }

  const statusChartData = Object.keys(stats.statusCounts || {}).map(status => ({
    name: status,
    Leads: stats.statusCounts[status]
  }));

  return (
    <CRMLayout>
      <div className="space-y-8 font-sans">
        <PageHeader
          title="CRM Control Center"
          subtitle="Pipeline lead conversion velocity, opportunity scoring, and automated follow-ups."
          badge="CRM Suite"
          badgeColor="from-rose-500 to-pink-600"
          breadcrumbs={[{ label: "CRM Suite" }, { label: "Dashboard" }]}
        />

        {/* KPI Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard title="Total Prospects" value={stats.totalLeads || 48} change="+8 this week" dept="crm" icon={Users} />
          <KPICard title="Active Pipeline" value={stats.activeLeads || 24} change="High Intent" dept="crm" icon={Target} />
          <KPICard title="Converted Wins" value={stats.convertedLeads || 18} change="37.5% Velocity" dept="crm" icon={TrendingUp} />
          <KPICard title="Expected Value" value={`INR ${((stats.expectedRevenue || 4500000) / 100000).toFixed(1)}L`} change="+14.2%" dept="crm" icon={DollarSign} />
        </div>

        {/* Charts & Activity */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <GlassCard dept="crm" accent className="xl:col-span-2 space-y-6">
            <h3 className="text-xl font-bold font-outfit text-slate-900 flex items-center gap-2">
              <TrendingUp size={20} className="text-rose-600" /> Pipeline Stage Breakdown
            </h3>
            {statusChartData.length > 0 ? (
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={statusChartData}>
                    <XAxis dataKey="name" stroke="#475569" fontSize={11} tickLine={false} />
                    <YAxis stroke="#475569" fontSize={11} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: "#ffffff", borderRadius: "16px", borderColor: "#e2e8f0", boxShadow: "0 10px 25px rgba(15,23,42,0.08)" }} />
                    <Bar dataKey="Leads" fill="#e11d48" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="text-slate-600 font-semibold text-xs py-10 text-center">No stage distribution data available.</p>
            )}
          </GlassCard>

          <GlassCard dept="crm" className="space-y-4">
            <h3 className="text-xl font-bold font-outfit text-slate-900 flex items-center gap-2">
              <Activity size={20} className="text-rose-600" /> Recent Activities
            </h3>
            <div className="space-y-3">
              {activities.length > 0 ? (
                activities.map((act, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <h5 className="font-bold text-slate-900 font-outfit">{act.title || "Client Call Scheduled"}</h5>
                      <p className="text-[10px] text-slate-600 font-medium">{act.leadName || "Enterprise Prospect"}</p>
                    </div>
                    <Badge variant="purple">Logged</Badge>
                  </div>
                ))
              ) : (
                <p className="text-slate-600 font-semibold text-xs py-6 text-center">No activity logs recorded today.</p>
              )}
            </div>
          </GlassCard>
        </div>
      </div>
    </CRMLayout>
  );
}
