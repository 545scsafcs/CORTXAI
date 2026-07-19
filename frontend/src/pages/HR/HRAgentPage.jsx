import HRLayout from "../../components/layout/HRLayout";

export default function HRAgentPage() {

  return (

    <HRLayout>

      <div className="space-y-8">

        <div>

          <h1 className="text-5xl font-black text-white">

            HR Agent

          </h1>

          <p className="text-gray-400 mt-2">

            AI Powered Human Resource Assistant

          </p>

        </div>

        <div className="rounded-3xl border border-cyan-500/20 bg-[#111827] p-10">

          <div className="flex items-center justify-center h-[500px]">

            <div className="text-center">

              <h2 className="text-3xl font-bold">

                🤖 HR Agent

              </h2>

              <p className="mt-4 text-gray-400">

                Coming Soon...

              </p>

            </div>

          </div>

        </div>

      </div>

    </HRLayout>

  );

}