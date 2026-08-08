import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import EmployeeLayout from "../../components/layout/EmployeeLayout";
import PageHeader from "../../components/ui/PageHeader";
import KPICard from "../../components/ui/KPICard";
import GlassCard from "../../components/ui/GlassCard";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import { useEmployee } from "../../context/EmployeeContext";
import { getEmployeeTodayAttendance, checkIn, checkOut } from "../../services/attendanceApi";
import { Clock, CalendarCheck, Briefcase, Wallet, CheckCircle2, UserCheck, MessageSquare, ClipboardList } from "lucide-react";

export default function EmployeeDashboard() {
  const { employee } = useEmployee();
  const [attendance, setAttendance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (employee?.employeeId) {
      loadTodayAttendance();
    }
  }, [employee]);

  async function loadTodayAttendance() {
    try {
      setLoading(true);
      const data = await getEmployeeTodayAttendance(employee.employeeId);
      setAttendance(data || null);
    } catch (err) {
      setAttendance(null);
    } finally {
      setLoading(false);
    }
  }

  async function handleAttendanceAction() {
    if (!employee?.employeeId) return;

    try {
      if (!attendance) {
        const newRecord = await checkIn(employee.employeeId, "Web", "Web");
        setAttendance(newRecord);
        toast.success("Checked In successfully for today!");
      } else if (attendance && !attendance.checkOut) {
        const updatedRecord = await checkOut(employee.employeeId);
        setAttendance(updatedRecord);
        toast.success("Checked Out successfully for today!");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Action failed");
    }
  }

  const isCheckedIn = !!attendance;
  const isCheckedOut = !!(attendance && attendance.checkOut);
  
  let btnText = "Check In";
  if (isCheckedIn && !isCheckedOut) {
    btnText = "Check Out";
  } else if (isCheckedOut) {
    btnText = "Checked Out";
  }

  const leavesTotal = employee?.leaveBalance
    ? (employee.leaveBalance.casual || 0) + (employee.leaveBalance.sick || 0) + (employee.leaveBalance.earned || 0)
    : 12;

  const displaySalary = employee?.salary ? `₹${(employee.salary / 1000).toFixed(0)}K` : "₹45K";

  return (
    <EmployeeLayout>
      <div className="space-y-8 font-sans">
        <PageHeader
          title="Employee Dashboard"
          subtitle={`Welcome back, ${employee?.name || "Employee"} 👋`}
          badge="Employee Portal"
          badgeColor="from-emerald-500 to-teal-600"
          breadcrumbs={[{ label: "Employee Space" }, { label: "Dashboard" }]}
          actions={
            <Button
              onClick={handleAttendanceAction}
              disabled={isCheckedOut}
              variant="primary"
              className={`px-6 py-3 text-xs font-bold uppercase tracking-wider rounded-2xl ${
                isCheckedIn && !isCheckedOut
                  ? "bg-amber-500 text-white hover:bg-amber-600 shadow-sm"
                  : isCheckedOut
                  ? "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
                  : "bg-slate-900 text-white hover:bg-slate-800 shadow-sm"
              }`}
            >
              <Clock size={14} className="inline mr-1.5" />
              {btnText}
            </Button>
          }
        />

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard title="Attendance" value="96%" change="Excellent" dept="employee" icon={CalendarCheck} />
          <KPICard title="Leave Balance" value={`${leavesTotal} Days`} change="Available" dept="employee" icon={Briefcase} />
          <KPICard title="Salary" value={displaySalary} change="Credited" dept="employee" icon={Wallet} />
          <KPICard title="Tasks" value={8} change="Pending" dept="employee" icon={ClipboardList} />
        </div>

        {/* Profile + Tasks Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Employee Information Card */}
          <GlassCard dept="employee" accent className="space-y-6">
            <div className="flex flex-col items-center text-center space-y-4 pt-4">
              {employee?.profilePhoto ? (
                <img src={employee.profilePhoto} alt={employee?.name} className="w-24 h-24 rounded-full object-cover border-2 border-slate-200 shadow-md" />
              ) : (
                <div className="w-24 h-24 rounded-full bg-slate-900 flex items-center justify-center text-4xl font-bold text-white shadow-md font-outfit">
                  {employee?.name ? employee.name[0].toUpperCase() : "E"}
                </div>
              )}
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-outfit leading-none">{employee?.name || "Employee"}</h3>
                <p className="text-xs text-slate-500 font-semibold font-mono mt-1">{employee?.designation || "Software Engineer Intern"}</p>
              </div>
            </div>

            <div className="space-y-3.5 pt-4 border-t border-slate-100 text-xs text-slate-700 font-semibold">
              <div className="flex items-center gap-2">
                <span>📧</span>
                <span className="truncate">{employee?.email || "employee@cortxai.in"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📱</span>
                <span>{employee?.phoneNumber || "+91 XXXXX XXXXX"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🏢</span>
                <span>{employee?.department || "Logistics"} Suite</span>
              </div>
            </div>
          </GlassCard>

          {/* Today's Tasks */}
          <GlassCard dept="employee" className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-bold font-outfit text-slate-900 flex items-center gap-2">
              <ClipboardList size={20} className="text-emerald-600" /> Today's Tasks
            </h3>
            <div className="space-y-3">
              {[
                { text: "Complete Inventory Report", status: "completed" },
                { text: "Attend AI Team Meeting", status: "pending" },
                { text: "Reply Client Emails", status: "completed" },
                { text: "Upload Weekly Progress", status: "completed" },
              ].map((task, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="text-base">{task.status === "completed" ? "✅" : "⏳"}</span>
                    <span className="font-bold text-slate-900 font-outfit">{task.text}</span>
                  </div>
                  <Badge variant={task.status === "completed" ? "success" : "warning"}>
                    {task.status === "completed" ? "Done" : "Pending"}
                  </Badge>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Quick Actions */}
        <GlassCard dept="employee" className="space-y-6">
          <h3 className="text-xl font-bold font-outfit text-slate-900">Quick Action Controls</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              to="/employee/leave"
              className="bg-slate-900 hover:bg-slate-800 text-white py-3.5 rounded-2xl font-bold text-center text-xs transition duration-200 shadow-sm"
            >
              Apply Leave
            </Link>
            <Link
              to="/employee/attendance"
              className="bg-slate-900 hover:bg-slate-800 text-white py-3.5 rounded-2xl font-bold text-center text-xs transition duration-200 shadow-sm"
            >
              Attendance Logs
            </Link>
            <Link
              to="/employee/salary"
              className="bg-slate-900 hover:bg-slate-800 text-white py-3.5 rounded-2xl font-bold text-center text-xs transition duration-200 shadow-sm"
            >
              Salary Slip
            </Link>
            <Link
              to="/employee/contact-hr"
              className="bg-slate-900 hover:bg-slate-800 text-white py-3.5 rounded-2xl font-bold text-center text-xs transition duration-200 shadow-sm"
            >
              Contact HR
            </Link>
          </div>
        </GlassCard>
      </div>
    </EmployeeLayout>
  );
}