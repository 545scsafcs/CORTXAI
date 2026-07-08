import AdminLayout from "../../components/layout/AdminLayout";

export default function ReportsPage() {
  return (
    <AdminLayout>

      <h1 className="text-5xl font-black">

        Reports

      </h1>

      <div className="space-y-5 mt-10">

        <div className="rounded-2xl bg-white/5 p-6">

          📈 Revenue Report

        </div>

        <div className="rounded-2xl bg-white/5 p-6">

          👨‍💼 Employee Performance

        </div>

        <div className="rounded-2xl bg-white/5 p-6">

          📦 Inventory Report

        </div>

        <div className="rounded-2xl bg-white/5 p-6">

          💰 Finance Report

        </div>

      </div>

    </AdminLayout>
  );
}