import HRLayout from "../../components/layout/HRLayout";

export default function SettingsPage() {

  return (

    <HRLayout>

      <div className="space-y-8">

        <div>

          <h1 className="text-5xl font-black">

            HR Settings

          </h1>

          <p className="mt-2 text-gray-400">

            Configure HR System

          </p>

        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

          <div className="space-y-6">

            <Setting
              title="Attendance System"
              desc="Biometric + Face Recognition"
            />

            <Setting
              title="Payroll"
              desc="Monthly Auto Payroll"
            />

            <Setting
              title="Leave Policy"
              desc="Manage Leave Rules"
            />

            <Setting
              title="Recruitment"
              desc="AI Hiring Settings"
            />

            <Setting
              title="HR Agent"
              desc="Manage AI Agent Behaviour"
            />

          </div>

        </div>

      </div>

    </HRLayout>

  );

}

function Setting({ title, desc }) {

  return (

    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#0B1120] p-6">

      <div>

        <h3 className="text-xl font-bold">

          {title}

        </h3>

        <p className="mt-1 text-gray-400">

          {desc}

        </p>

      </div>

      <button className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black hover:bg-cyan-400">

        Configure

      </button>

    </div>

  );

}