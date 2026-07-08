import AdminLayout from "../../components/layout/AdminLayout";

export default function AdminDashboard() {
  return (
    <AdminLayout>

      <div className="space-y-10">

        {/* Header */}

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-5xl font-black">

              Admin Dashboard

            </h1>

            <p className="text-gray-400 mt-3">

              Welcome Administrator 👋

            </p>

          </div>

          <button
            className="bg-cyan-400 text-black px-6 py-3 rounded-xl font-bold"
          >

            Create User

          </button>

        </div>

        {/* KPI */}

        <div className="grid lg:grid-cols-4 gap-6">

          <div className="rounded-3xl bg-white/5 border border-white/10 p-6">

            <p className="text-gray-400">

              Employees

            </p>

            <h2 className="text-5xl font-black mt-4">

              126

            </h2>

          </div>

          <div className="rounded-3xl bg-white/5 border border-white/10 p-6">

            <p className="text-gray-400">

              Departments

            </p>

            <h2 className="text-5xl font-black mt-4">

              8

            </h2>

          </div>

          <div className="rounded-3xl bg-white/5 border border-white/10 p-6">

            <p className="text-gray-400">

              AI Agents

            </p>

            <h2 className="text-5xl font-black mt-4">

              6

            </h2>

          </div>

          <div className="rounded-3xl bg-white/5 border border-white/10 p-6">

            <p className="text-gray-400">

              Revenue

            </p>

            <h2 className="text-5xl font-black mt-4">

              ₹24.5L

            </h2>

          </div>

        </div>

        {/* Middle */}

        <div className="grid lg:grid-cols-2 gap-8">

          <div className="rounded-3xl bg-white/5 border border-white/10 p-8">

            <h2 className="text-3xl font-bold">

              Recent Employees

            </h2>

            <div className="space-y-4 mt-8">

              <div className="p-5 rounded-xl bg-white/5">

                👨‍💼 Vineet Yadav

              </div>

              <div className="p-5 rounded-xl bg-white/5">

                👩‍💼 Anjali Singh

              </div>

              <div className="p-5 rounded-xl bg-white/5">

                👨‍💼 Utkarsh Kumar Singh

              </div>

            </div>

          </div>

          <div className="rounded-3xl bg-white/5 border border-white/10 p-8">

            <h2 className="text-3xl font-bold">

              Pending Approvals

            </h2>

            <div className="space-y-4 mt-8">

              <div className="p-5 rounded-xl bg-white/5">

                Leave Approval

              </div>

              <div className="p-5 rounded-xl bg-white/5">

                Salary Approval

              </div>

              <div className="p-5 rounded-xl bg-white/5">

                Expense Approval

              </div>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="rounded-3xl bg-white/5 border border-white/10 p-8">

          <h2 className="text-3xl font-bold">

            Quick Actions

          </h2>

          <div className="grid lg:grid-cols-4 gap-5 mt-8">

            <button className="bg-cyan-400 text-black py-4 rounded-xl font-bold">

              Add Employee

            </button>

            <button className="bg-cyan-400 text-black py-4 rounded-xl font-bold">

              Create Department

            </button>

            <button className="bg-cyan-400 text-black py-4 rounded-xl font-bold">

              Generate Report

            </button>

            <button className="bg-cyan-400 text-black py-4 rounded-xl font-bold">

              Manage AI

            </button>

          </div>

        </div>

      </div>

    </AdminLayout>
  );
}