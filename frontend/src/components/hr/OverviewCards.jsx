import React, { useEffect, useState } from "react";
import { Users, UserCheck, CalendarCheck, Clock } from "lucide-react";
import { getEmployees, getDashboardStats } from "../../services/employeeApi";
import { getTodayAttendance } from "../../services/attendanceApi";
import { getLeaves } from "../../services/leave/leaveApi";

export default function OverviewCards() {
  const [data, setData] = useState({
    total: 0,
    active: 0,
    present: 0,
    pendingLeaves: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const statsRes = await getDashboardStats();
        const empsRes = await getEmployees();
        const attRes = await getTodayAttendance();
        const leavesRes = await getLeaves();

        const empsList = empsRes.data || [];
        const presentCount = (attRes || []).filter(a => a.attendanceStatus === "Present").length;
        const pendingCount = (leavesRes || []).filter(l => l.status === "Pending").length;

        setData({
          total: statsRes?.data?.totalEmployees || empsList.length,
          active: statsRes?.data?.activeEmployees || empsList.filter(e => e.status === "Active").length,
          present: presentCount,
          pendingLeaves: pendingCount,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <Card title="Total Team" value={loading ? "..." : data.total} icon={<Users />} color="text-cyan-400" />
      <Card title="Active Status" value={loading ? "..." : data.active} icon={<UserCheck />} color="text-green-400" />
      <Card title="Present Today" value={loading ? "..." : data.present} icon={<CalendarCheck />} color="text-yellow-400" />
      <Card title="Pending Leaves" value={loading ? "..." : data.pendingLeaves} icon={<Clock />} color="text-purple-400" />
    </div>
  );
}

function Card({ title, value, icon, color }) {
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
