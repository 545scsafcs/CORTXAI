import HRLayout from "../../components/layout/HRLayout";

import RecruitmentPipeline from "../../components/hr/RecruitmentPipeline";
import QuickActions from "../../components/hr/QuickActions";
import NoraHRPanel from "../../components/hr/NoraHRPanel";

export default function RecruitmentPage() {

  return (

    <HRLayout>

      <div className="space-y-8">

        <div>

          <h1 className="text-5xl font-black">

            Recruitment

          </h1>

          <p className="mt-2 text-gray-400">

            Hiring Pipeline, Interviews & AI Recruitment

          </p>

        </div>

        <NoraHRPanel />

        <RecruitmentPipeline />

        <QuickActions />

      </div>

    </HRLayout>

  );

}