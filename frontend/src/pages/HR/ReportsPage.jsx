import HRLayout from "../../components/layout/HRLayout";

import OverviewCards from "../../components/hr/OverviewCards";
import AttendanceWidget from "../../components/hr/AttendanceWidget";
import LeaveWidget from "../../components/hr/LeaveWidget";
import PayrollWidget from "../../components/hr/PayrollWidget";
import PerformanceWidget from "../../components/hr/PerformanceWidget";

export default function ReportsPage() {

  return (

    <HRLayout>

      <div className="space-y-8">

        <div>

          <h1 className="text-5xl font-black">

            HR Reports

          </h1>

          <p className="mt-2 text-gray-400">

            Complete HR Analytics

          </p>

        </div>

        <OverviewCards />

        <div className="grid xl:grid-cols-2 gap-8">

          <AttendanceWidget />

          <LeaveWidget />

        </div>

        <div className="grid xl:grid-cols-2 gap-8">

          <PayrollWidget />

          <PerformanceWidget />

        </div>

      </div>

    </HRLayout>

  );

}