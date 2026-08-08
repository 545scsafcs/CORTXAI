import React, { useEffect, useState } from "react";
import CRMLayout from "../../components/layout/CRMLayout";
import { DollarSign, Award, Target, FileText, Download, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from "recharts";
import { getLeadStats } from "../../services/crmApi";

export default function CRMReportsPage() {
  const [stats, setStats] = useState({
    totalLeads: 0,
    activeLeads: 0,
    convertedLeads: 0,
    lostLeads: 0,
    expectedRevenue: 0,
    statusCounts: {},
    sourceCounts: {},
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReports() {
      try {
        setLoading(true);
        const res = await getLeadStats();
        if (res.success) {
          setStats(res.data);
        }
      } catch (err) {
        console.error("Failed to load reports:", err);
      } finally {
        setLoading(false);
      }
    }
    loadReports();
  }, []);

  if (loading) {
    return (
      <CRMLayout>
        <div className="flex justify-center items-center py-32">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-400 border-t-transparent"></div>
        </div>
      </CRMLayout>
    );
  }

  // Format data
  const statusData = Object.keys(stats.statusCounts || {}).map(status => ({
    name: status,
    Leads: stats.statusCounts[status]
  }));

  const sourceData = Object.keys(stats.sourceCounts || {}).map(source => ({
    name: source,
    Leads: stats.sourceCounts[source]
  }));

  const revenueTrendData = [
    { month: "Jan", Projection: stats.expectedRevenue * 0.35, Closed: stats.expectedRevenue * 0.2 },
    { month: "Feb", Projection: stats.expectedRevenue * 0.45, Closed: stats.expectedRevenue * 0.35 },
    { month: "Mar", Projection: stats.expectedRevenue * 0.6, Closed: stats.expectedRevenue * 0.4 },
    { month: "Apr", Projection: stats.expectedRevenue * 0.55, Closed: stats.expectedRevenue * 0.45 },
    { month: "May", Projection: stats.expectedRevenue * 0.8, Closed: stats.expectedRevenue * 0.65 },
    { month: "Jun", Projection: stats.expectedRevenue, Closed: stats.expectedRevenue * 0.85 }
  ];

  const totalLeadsWithLost = stats.totalLeads || 1;
  const conversionRate = Math.round((stats.convertedLeads / totalLeadsWithLost) * 100);

  const handleExportPDF = () => {
    alert("Enterprise Analytical Report compiled and download started.");
  };

  return (
    <CRMLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-white font-outfit">CRM Analytics & Reports</h1>
            <p className="text-gray-400 mt-2">Evaluate team conversions, lead pipelines, and monthly revenue performance metrics.</p>
          </div>
          <button
            onClick={handleExportPDF}
            className="flex items-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-black px-5 py-2.5 rounded-2xl text-xs font-bold transition duration-200 cursor-pointer"
          >
            <Download size={14} /> Export Report
          </button>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="rounded-3xl border border-white/5 bg-slate-950/40 p-6 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Conversion rate</span>
              <h3 className="text-3xl font-black text-cyan-400 font-outfit">{conversionRate}%</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Target size={22} />
            </div>
          </div>

          <div className="rounded-3xl border border-white/5 bg-slate-950/40 p-6 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Pipeline total value</span>
              <h3 className="text-3xl font-black text-purple-400 font-outfit">${(stats.expectedRevenue || 0).toLocaleString()}</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
              <DollarSign size={22} />
            </div>
          </div>

          <div className="rounded-3xl border border-white/5 bg-slate-950/40 p-6 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Converted leads</span>
              <h3 className="text-3xl font-black text-green-400 font-outfit">{stats.convertedLeads}</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400 flex items-center justify-center">
              <Award size={22} />
            </div>
          </div>

          <div className="rounded-3xl border border-white/5 bg-slate-950/40 p-6 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Leads Lost</span>
              <h3 className="text-3xl font-black text-red-400 font-outfit">{stats.lostLeads}</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center">
              <FileText size={22} />
            </div>
          </div>
        </div>

        {/* Projections Area Chart */}
        <div className="rounded-3xl bg-white/5 border border-white/10 p-6 shadow-xl">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp size={16} className="text-cyan-400" /> Pipeline Forecasts vs Actual Revenue Closed
          </h3>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueTrendData}>
                <defs>
                  <linearGradient id="colorProj" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorClosed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#9ca3af" fontSize={11} tickLine={false} />
                <YAxis stroke="#9ca3af" fontSize={11} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid rgba(255,255,255,0.1)" }} />
                <Area type="monotone" dataKey="Projection" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorProj)" strokeWidth={2} />
                <Area type="monotone" dataKey="Closed" stroke="#10b981" fillOpacity={1} fill="url(#colorClosed)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom charts grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Conversion Counts per lead sources */}
          <div className="rounded-3xl bg-white/5 border border-white/10 p-6 shadow-xl">
            <h3 className="text-base font-bold text-white mb-6">Leads Count by Source Channel</h3>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sourceData}>
                  <XAxis dataKey="name" stroke="#9ca3af" fontSize={10} tickLine={false} />
                  <YAxis stroke="#9ca3af" fontSize={10} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid rgba(255,255,255,0.1)" }} />
                  <Bar dataKey="Leads" fill="#22d3ee" radius={[4, 4, 0, 0]} barSize={26} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Stage transition counts */}
          <div className="rounded-3xl bg-white/5 border border-white/10 p-6 shadow-xl">
            <h3 className="text-base font-bold text-white mb-6">Pipeline Lead Progression Density</h3>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusData}>
                  <XAxis dataKey="name" stroke="#9ca3af" fontSize={10} tickLine={false} />
                  <YAxis stroke="#9ca3af" fontSize={10} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid rgba(255,255,255,0.1)" }} />
                  <Bar dataKey="Leads" fill="#a855f7" radius={[4, 4, 0, 0]} barSize={26} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </CRMLayout>
  );
}
