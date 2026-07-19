import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import EmployeeLayout from "../../components/layout/EmployeeLayout";
import { useEmployee } from "../../context/EmployeeContext";
import { getEmployeeTodayAttendance, checkIn, checkOut } from "../../services/attendanceApi";

export default function EmployeeDashboard() {
  const { employee } = useEmployee();
  const [attendance, setAttendance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (employee?.employeeId) {
      // eslint-disable-next-line react-hooks/immutability
      loadTodayAttendance();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employee]);

  async function loadTodayAttendance() {
    try {
      setLoading(true);
      const data = await getEmployeeTodayAttendance(employee.employeeId);
      setAttendance(data || null);
    // eslint-disable-next-line no-unused-vars
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
        // Perform Check In
        const newRecord = await checkIn(employee.employeeId, "Web", "Web");
        setAttendance(newRecord);
        toast.success("Checked In successfully for today!");
      } else if (attendance && !attendance.checkOut) {
        // Perform Check Out
        const updatedRecord = await checkOut(employee.employeeId);
        setAttendance(updatedRecord);
        toast.success("Checked Out successfully for today!");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Action failed");
    }
  }

  // Determine button state
  const isCheckedIn = !!attendance;
  const isCheckedOut = !!(attendance && attendance.checkOut);
  
  let btnText = "Check In";
  if (isCheckedIn && !isCheckedOut) {
    btnText = "Check Out";
  } else if (isCheckedOut) {
    btnText = "Checked Out for Today";
  }

  // Calculate total leave balance
  const leavesTotal = employee?.leaveBalance
    ? (employee.leaveBalance.casual || 0) + (employee.leaveBalance.sick || 0) + (employee.leaveBalance.earned || 0)
    : 12;

  return (
    <EmployeeLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-5xl font-black text-white">Employee Dashboard</h1>
            <p className="text-gray-400 mt-3 text-lg">
              Welcome back, {employee?.firstName || "Team Member"} 👋
            </p>
          </div>

          <button
            onClick={handleAttendanceAction}
            disabled={isCheckedOut || loading}
            className={`px-6 py-3 rounded-xl font-bold transition duration-300 transform active:scale-95 ${
              isCheckedOut
                ? "bg-green-600/20 text-green-400 cursor-not-allowed border border-green-500/20"
                : isCheckedIn
                ? "bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/10"
                : "bg-cyan-400 hover:bg-cyan-300 text-black shadow-lg shadow-cyan-400/10 hover:scale-105"
            }`}
          >
            {loading ? "Syncing..." : btnText}
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
            <h3 className="text-gray-400 text-sm">Today's Status</h3>
            <h2 className="text-4xl font-black mt-3 text-cyan-400">
              {isCheckedOut ? "Done" : isCheckedIn ? "Checked In" : "Absent"}
            </h2>
            <p className="text-gray-400 mt-2 text-xs">
              {attendance?.checkIn
                ? `Logged: ${new Date(attendance.checkIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                : "Awaiting Clock-in"}
            </p>
          </div>

          <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
            <h3 className="text-gray-400 text-sm">Leave Balance</h3>
            <h2 className="text-4xl font-black mt-3 text-white">{leavesTotal}</h2>
            <p className="text-cyan-400 mt-2 text-xs">Days Available</p>
          </div>

          <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
            <h3 className="text-gray-400 text-sm">Monthly Salary</h3>
            <h2 className="text-4xl font-black mt-3 text-green-400">
              ₹{employee?.salary ? employee.salary.toLocaleString() : "0"}
            </h2>
            <p className="text-green-500/80 mt-2 text-xs">Direct Deposit</p>
          </div>

          <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
            <h3 className="text-gray-400 text-sm">Active Portal</h3>
            <h2 className="text-4xl font-black mt-3 text-white">Nora</h2>
            <p className="text-yellow-400 mt-2 text-xs">General Support AI</p>
          </div>
        </div>

        {/* Profile + Tasks */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="rounded-3xl bg-white/5 border border-white/10 p-8 flex flex-col items-center text-center lg:items-start lg:text-left">
            <div className="w-24 h-24 rounded-full bg-cyan-500 flex items-center justify-center text-4xl font-bold text-black uppercase">
              {employee?.firstName?.charAt(0)}
            </div>

            <h2 className="text-3xl font-bold mt-6 text-white">
              {employee?.firstName} {employee?.lastName}
            </h2>

            <p className="text-gray-400 mt-2">
              {employee?.designation || "Intern Specialist"}
            </p>

            <div className="mt-8 space-y-3 text-sm text-gray-300 w-full">
              <p className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-500">Email:</span>
                <span>{employee?.email}</span>
              </p>
              <p className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-500">Phone:</span>
                <span>{employee?.phone || "--"}</span>
              </p>
              <p className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-500">Dept:</span>
                <span>{employee?.department || "General"}</span>
              </p>
              <p className="flex justify-between pb-2">
                <span className="text-gray-500">ID:</span>
                <span className="font-mono text-cyan-300">{employee?.employeeId}</span>
              </p>
            </div>
          </div>

          <div className="lg:col-span-2 rounded-3xl bg-white/5 border border-white/10 p-8 space-y-6">
            <h2 className="text-3xl font-bold text-white">Workplace Tasks</h2>
            <div className="space-y-4 text-sm text-gray-300">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3">
                <span className="text-green-400">✓</span>
                <span>Submit leave request form for approval in system.</span>
              </div>
              <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3">
                <span className="text-yellow-400">⏳</span>
                <span>Review client design mockups for project layout updates.</span>
              </div>
              <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3">
                <span className="text-cyan-400">🤖</span>
                <span>Index database keys using Nora AI workforce commands.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-3xl bg-white/5 border border-white/10 p-8">
          <h2 className="text-3xl font-bold text-white mb-8">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            <Link
              to="/employee/leave"
              className="bg-cyan-400 hover:bg-cyan-300 text-black py-4 rounded-xl font-bold text-center transition active:scale-95 shadow-lg shadow-cyan-400/5"
            >
              Apply Leave
            </Link>
            <Link
              to="/employee/attendance"
              className="bg-cyan-400 hover:bg-cyan-300 text-black py-4 rounded-xl font-bold text-center transition active:scale-95 shadow-lg shadow-cyan-400/5"
            >
              Attendance
            </Link>
            <Link
              to="/employee/salary"
              className="bg-cyan-400 hover:bg-cyan-300 text-black py-4 rounded-xl font-bold text-center transition active:scale-95 shadow-lg shadow-cyan-400/5"
            >
              Salary Slip
            </Link>
            <Link
              to="/employee/contact-hr"
              className="bg-cyan-400 hover:bg-cyan-300 text-black py-4 rounded-xl font-bold text-center transition active:scale-95 shadow-lg shadow-cyan-400/5"
            >
              Contact HR
            </Link>
          </div>
        </div>
      </div>
    </EmployeeLayout>
  );
}