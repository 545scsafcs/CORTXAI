import EmployeeLayout from "../../components/layout/EmployeeLayout";

export default function AttendancePage() {
  return (
    <EmployeeLayout>

      <h1 className="text-5xl font-black">
        Attendance
      </h1>

      <p className="text-gray-400 mt-2">
        Your attendance overview
      </p>

      <div className="grid lg:grid-cols-4 gap-6 mt-10">

        <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
          <h3 className="text-gray-400">Today's Status</h3>
          <h2 className="text-4xl font-bold mt-3 text-green-400">
            Present
          </h2>
        </div>

        <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
          <h3 className="text-gray-400">Check In</h3>
          <h2 className="text-4xl font-bold mt-3">
            09:05 AM
          </h2>
        </div>

        <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
          <h3 className="text-gray-400">Check Out</h3>
          <h2 className="text-4xl font-bold mt-3">
            --
          </h2>
        </div>

        <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
          <h3 className="text-gray-400">Monthly Attendance</h3>
          <h2 className="text-4xl font-bold mt-3 text-cyan-400">
            96%
          </h2>
        </div>

      </div>

    </EmployeeLayout>
  );
}