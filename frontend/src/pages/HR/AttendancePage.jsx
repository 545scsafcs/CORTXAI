import HRLayout from "../../components/layout/HRLayout";
import AttendanceWidget from "../../components/hr/AttendanceWidget";

export default function AttendancePage() {

  return (

    <HRLayout>

      <div className="space-y-8">

        <div>

          <h1 className="text-5xl font-black">

            Attendance Management

          </h1>

          <p className="text-gray-400 mt-3">

            Live attendance records of all employees

          </p>

        </div>

        <AttendanceWidget />

      </div>

    </HRLayout>

  );

}