import HRLayout from "../../components/layout/HRLayout";

import PerformanceWidget from "../../components/hr/PerformanceWidget";

export default function PerformancePage() {

  return (

    <HRLayout>

      <div className="space-y-8">

        <div>

          <h1 className="text-5xl font-black">

            Employee Performance

          </h1>

          <p className="mt-2 text-gray-400">

            AI Performance Analytics

          </p>

        </div>

        <PerformanceWidget />

      </div>

    </HRLayout>

  );

}