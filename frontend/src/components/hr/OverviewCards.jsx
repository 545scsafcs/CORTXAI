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
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 font-sans">
      <Card title="Total Team" value={loading ? "..." : data.total} icon={<Users size={20} />} color="text-indigo-700" />
      <Card title="Active Status" value={loading ? "..." : data.active} icon={<UserCheck size={20} />} color="text-emerald-700" />
      <Card title="Present Today" value={loading ? "..." : data.present} icon={<CalendarCheck size={20} />} color="text-amber-700" />
      <Card title="Pending Leaves" value={loading ? "..." : data.pendingLeaves} icon={<Clock size={20} />} color="text-rose-700" />
    </div>
  );
}

function Card({ title, value, icon, color }) {
  return (
    <div className="rounded-3xl bg-white border border-slate-200/80 p-6 flex items-center justify-between shadow-sm hover:shadow-md transition">
      <div>
        <p className="text-slate-500 text-[11px] font-extrabold uppercase tracking-wider font-outfit">{title}</p>
        <h2 className="text-3xl lg:text-4xl font-black mt-2 text-slate-900 font-outfit tracking-tight">{value}</h2>
      </div>
      <div className={`p-3.5 bg-slate-100 border border-slate-200 rounded-2xl ${color}`}>
        {icon}
      </div>
    </div>
  );
}
