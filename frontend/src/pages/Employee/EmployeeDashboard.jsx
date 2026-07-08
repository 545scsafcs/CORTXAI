import EmployeeLayout from "../../components/layout/EmployeeLayout";
import { useState } from "react";

export default function EmployeeDashboard() {

  const [checkedIn, setCheckedIn] = useState(false);

  return (
    <EmployeeLayout>

      <div className="space-y-8">

        {/* Header */}

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-5xl font-black">

              Employee Dashboard

            </h1>

            <p className="text-gray-400 mt-3">

              Welcome back, Vineet 👋

            </p>

          </div>

          <button
  onClick={() => setCheckedIn(true)}
  disabled={checkedIn}
  className={`px-6 py-3 rounded-xl font-semibold transition ${
    checkedIn
      ? "bg-green-500 text-white cursor-not-allowed"
      : "bg-cyan-400 text-black hover:scale-105"
  }`}
>
  {checkedIn ? "✅ Checked In" : "Check In"}
</button>

        </div>

        {/* Cards */}

        <div className="grid lg:grid-cols-4 gap-6">

          <div className="rounded-3xl bg-white/5 border border-white/10 p-6">

            <h3 className="text-gray-400">

              Attendance

            </h3>

            <h2 className="text-4xl font-black mt-3">

              96%

            </h2>

            <p className="text-green-400 mt-2">

              Excellent

            </p>

          </div>

          <div className="rounded-3xl bg-white/5 border border-white/10 p-6">

            <h3 className="text-gray-400">

              Leave Balance

            </h3>

            <h2 className="text-4xl font-black mt-3">

              12

            </h2>

            <p className="text-cyan-400 mt-2">

              Days Left

            </p>

          </div>

          <div className="rounded-3xl bg-white/5 border border-white/10 p-6">

            <h3 className="text-gray-400">

              Salary

            </h3>

            <h2 className="text-4xl font-black mt-3">

              ₹45K

            </h2>

            <p className="text-green-400 mt-2">

              Credited

            </p>

          </div>

          <div className="rounded-3xl bg-white/5 border border-white/10 p-6">

            <h3 className="text-gray-400">

              Tasks

            </h3>

            <h2 className="text-4xl font-black mt-3">

              8

            </h2>

            <p className="text-yellow-400 mt-2">

              Pending

            </p>

          </div>

        </div>

        {/* Profile + Tasks */}

        <div className="grid lg:grid-cols-3 gap-8">

          <div className="rounded-3xl bg-white/5 border border-white/10 p-8">

            <div className="w-24 h-24 rounded-full bg-cyan-500 flex items-center justify-center text-4xl font-bold">

              V

            </div>

            <h2 className="text-3xl font-bold mt-6">

              Vineet Yadav

            </h2>

            <p className="text-gray-400 mt-2">

              Software Engineer Intern

            </p>

            <div className="mt-8 space-y-3">

              <p>

                📧 vineet@email.com

              </p>

              <p>

                📱 +91 XXXXX XXXXX

              </p>

              <p>

                🏢 CORTXAI

              </p>

            </div>

          </div>

          <div className="lg:col-span-2 rounded-3xl bg-white/5 border border-white/10 p-8">

            <h2 className="text-3xl font-bold">

              Today's Tasks

            </h2>

            <div className="mt-8 space-y-4">

              <div className="p-5 rounded-xl bg-white/5">

                ✅ Complete Inventory Report

              </div>

              <div className="p-5 rounded-xl bg-white/5">

                ⏳ Attend AI Team Meeting

              </div>

              <div className="p-5 rounded-xl bg-white/5">

                📧 Reply Client Emails

              </div>

              <div className="p-5 rounded-xl bg-white/5">

                📊 Upload Weekly Progress

              </div>

            </div>

          </div>

        </div>

        {/* Quick Actions */}

        <div className="rounded-3xl bg-white/5 border border-white/10 p-8">

          <h2 className="text-3xl font-bold">

            Quick Actions

          </h2>

          <div className="grid lg:grid-cols-4 gap-5 mt-8">

            <button className="bg-cyan-400 text-black py-4 rounded-xl font-bold">

              Apply Leave

            </button>

            <button className="bg-cyan-400 text-black py-4 rounded-xl font-bold">

              Attendance

            </button>

            <button className="bg-cyan-400 text-black py-4 rounded-xl font-bold">

              Salary Slip

            </button>

            <button className="bg-cyan-400 text-black py-4 rounded-xl font-bold">

              Contact HR

            </button>

          </div>

        </div>

      </div>

    </EmployeeLayout>
  );
}