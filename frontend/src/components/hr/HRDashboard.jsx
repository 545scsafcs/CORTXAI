import React, { useEffect, useState } from "react";
import { Users, CalendarCheck, Briefcase, Bot, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { getEmployees, getDashboardStats } from "../../services/employeeApi";
import { getLeaves } from "../../services/leave/leaveApi";

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
          // Fallback client computation
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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  // Map department counts for Recharts
  const chartData = Object.keys(stats.departmentWiseCount || {}).map(dept => ({
    name: dept,
    Employees: stats.departmentWiseCount[dept],
  }));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-5xl font-black text-white">HR Dashboard</h1>
        <p className="text-gray-400 mt-2 text-lg">Realtime overview of corporate workforce and AI agents.</p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <KPICard title="Total Employees" value={stats.totalEmployees} icon={<Users />} color="text-cyan-400" />
        <KPICard title="Active" value={stats.activeEmployees} icon={<CalendarCheck />} color="text-green-400" />
        <KPICard title="On Leave" value={stats.onLeaveEmployees} icon={<Briefcase />} color="text-yellow-400" />
        <KPICard title="AI Workers" value="3 Active" icon={<Bot />} color="text-purple-400" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Department chart */}
        <div className="xl:col-span-2 rounded-3xl bg-white/5 border border-white/10 p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="text-cyan-400" /> Department Distribution
          </h2>
          {chartData.length > 0 ? (
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} />
                  <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#0f172a", border: "1px solid rgba(255,255,255,0.1)" }}
                    labelClassName="text-white font-bold"
                  />
                  <Bar dataKey="Employees" fill="#22d3ee" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-500">
              No department data available.
            </div>
          )}
        </div>

        {/* Recent Leaves */}
        <div className="rounded-3xl bg-white/5 border border-white/10 p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Recent Leave Requests</h2>
          <div className="space-y-4">
            {recentLeaves.length > 0 ? (
              recentLeaves.map(leave => (
                <div key={leave._id} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-white text-sm">{leave.employeeName}</h4>
                    <p className="text-xs text-gray-400 mt-1">{leave.leaveType} • {leave.totalDays} Days</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    leave.status === "Approved"
                      ? "bg-green-500/20 text-green-400"
                      : leave.status === "Rejected"
                      ? "bg-red-500/20 text-red-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}>
                    {leave.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-10">No recent leaves.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function KPICard({ title, value, icon, color }) {
  return (
    <div className="rounded-3xl bg-white/5 border border-white/10 p-6 flex items-center justify-between">
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <h2 className="text-4xl font-black mt-3 text-white">{value}</h2>
      </div>
      <div className={`p-4 bg-white/5 rounded-2xl ${color}`}>
        {icon}
      </div>
    </div>
  );
}
