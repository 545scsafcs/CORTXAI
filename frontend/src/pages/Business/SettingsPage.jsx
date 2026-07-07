import DashboardLayout from "../../components/layout/DashboardLayout";

export default function SettingsPage() {
  return (
    <DashboardLayout>

      <div className="space-y-8">

        <h1 className="text-5xl font-black">
          Settings
        </h1>

        <div className="rounded-3xl bg-white/5 border border-white/10 p-8">

          <div className="space-y-6">

            <Setting label="Dark Mode" />

            <Setting label="Voice Assistant" />

            <Setting label="Email Notifications" />

            <Setting label="AI Suggestions" />

            <Setting label="Auto Backup" />

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

function Setting({ label }) {
  return (
    <div className="flex justify-between items-center">

      <span>{label}</span>

      <input type="checkbox" defaultChecked />

    </div>
  );
}