import React, { useEffect, useState } from "react";
import { Users, CalendarCheck, Briefcase, Bot, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { getEmployees, getDashboardStats } from "../../services/employeeApi";
import { getLeaves } from "../../services/leave/leaveApi";
import PageHeader from "../ui/PageHeader";
import KPICard from "../ui/KPICard";
import GlassCard from "../ui/GlassCard";
import Badge from "../ui/Badge";

export default function HRDashboard() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    activeEmployees: 0,
    inactiveEmployees: 0,
    onLeaveEmployees: 0,
    departmentWiseCount: {},
  });
  const [loading, setLoading] = useState(true);
  const [recentLeaves, setRecentLeaves] = useState([]);

  useEffect(() => {
    async function loadStats() {
      try {
        const statsRes = await getDashboardStats();
        if (statsRes && statsRes.data) {
          setStats(statsRes.data);
        } else {
          const empRes = await getEmployees();
          const emps = empRes.data || [];
          const active = emps.filter(e => e.status === "Active").length;
          const inactive = emps.filter(e => e.status === "Inactive").length;
          const onLeave = emps.filter(e => e.status === "On Leave").length;
          const deptCount = {};
          emps.forEach(e => {
            if (e.department) {
              deptCount[e.department] = (deptCount[e.department] || 0) + 1;
            }
          });
          setStats({
            totalEmployees: emps.length,
            activeEmployees: active,
            inactiveEmployees: inactive,
            onLeaveEmployees: onLeave,
            departmentWiseCount: deptCount,
          });
        }

        const leaves = await getLeaves();
        setRecentLeaves((leaves || []).slice(0, 5));
      } catch (err) {
        console.error("Error loading dashboard data", err);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-400"></div>
      </div>
    );
  }

  const chartData = Object.keys(stats.departmentWiseCount || {}).map(dept => ({
    name: dept,
    Employees: stats.departmentWiseCount[dept],
  }));

  return (
    <div className="space-y-8 font-sans">
      <PageHeader
        title="HR Manager Portal"
        subtitle="Workforce telemetry, leave approvals pipeline, and department distribution."
        badge="HR Module"
        badgeColor="from-indigo-500 to-purple-600"
        breadcrumbs={[{ label: "HR Portal" }, { label: "Dashboard" }]}
      />

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <KPICard title="Total Roster" value={stats.totalEmployees} dept="hr" icon={Users} />
        <KPICard title="Active Staff" value={stats.activeEmployees} change="Optimal" dept="hr" icon={CalendarCheck} />
        <KPICard title="On Leave" value={stats.onLeaveEmployees} change="Pending Checks" dept="hr" icon={Briefcase} />
        <KPICard title="Nora HR Agents" value="3 Active" change="Autonomous" dept="hr" icon={Bot} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Department chart */}
        <GlassCard dept="hr" accent className="xl:col-span-2 space-y-6">
          <h2 className="text-xl font-bold font-outfit text-slate-900 flex items-center gap-2">
            <TrendingUp size={20} className="text-indigo-600" /> Department Wise Distribution
          </h2>
          {chartData.length > 0 ? (
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" stroke="#475569" fontSize={11} tickLine={false} />
                  <YAxis stroke="#475569" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#ffffff", borderRadius: "16px", borderColor: "#e2e8f0", boxShadow: "0 10px 25px rgba(15,23,42,0.08)" }}
                  />
                  <Bar dataKey="Employees" fill="#4f46e5" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-slate-600 font-semibold text-xs py-10 text-center">No department metrics available yet.</p>
          )}
        </GlassCard>

        {/* Leave Requests Stream */}
        <GlassCard dept="hr" className="space-y-4">
          <h2 className="text-xl font-bold font-outfit text-slate-900 flex items-center gap-2">
            <Briefcase size={20} className="text-indigo-600" /> Recent Leave Requests
          </h2>
          <div className="space-y-3">
            {recentLeaves.length > 0 ? (
              recentLeaves.map((l, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 font-outfit">{l.employeeName || "Employee"}</h5>
                    <p className="text-[10px] text-slate-600 font-medium font-sans mt-0.5">{l.reason || "Personal Leave"}</p>
                  </div>
                  <Badge variant={l.status === "Approved" ? "success" : "warning"}>{l.status || "Pending"}</Badge>
                </div>
              ))
            ) : (
              <p className="text-slate-600 font-semibold text-xs py-6 text-center">No pending leave requests.</p>
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
