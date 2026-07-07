import DashboardLayout from "../../components/layout/DashboardLayout";
import SalesChart from "../../components/dashboard/SalesChart";
import ExpenseChart from "../../components/dashboard/ExpenseChart";
import RevenueChart from "../../components/dashboard/RevenueChart";

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div>
          <h1 className="text-5xl font-black">
            Analytics
          </h1>

          <p className="text-gray-400 mt-3">
            Business performance powered by AI.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          <Card title="Revenue Growth" value="+18%" />

          <Card title="Customer Growth" value="+26%" />

          <Card title="Conversion" value="61%" />

        </div>

        <div className="grid lg:grid-cols-2 gap-8">

          <SalesChart />

          <ExpenseChart />

        </div>

        <RevenueChart />

      </div>
    </DashboardLayout>
  );
}

function Card({ title, value }) {
  return (
    <div className="rounded-3xl bg-white/5 border border-white/10 p-8">
      <p className="text-gray-400">{title}</p>
      <h2 className="text-5xl font-black mt-3">{value}</h2>
    </div>
  );
}