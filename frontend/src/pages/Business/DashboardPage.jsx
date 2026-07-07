import DashboardLayout from "../../components/layout/DashboardLayout";
import KPICard from "../../components/dashboard/KPICard";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentActivity from "../../components/dashboard/RecentActivity";
import AIInsights from "../../components/dashboard/AIInsights";
import RevenueChart from "../../components/dashboard/RevenueChart";
import Notifications from "../../components/dashboard/Notifications";
import TeamPerformance from "../../components/dashboard/TeamPerformance";
import TopHeader from "../../components/dashboard/TopHeader";
import OverviewCards from "../../components/dashboard/OverviewCards";
import RecentOrders from "../../components/dashboard/RecentOrders";
import SalesChart from "../../components/dashboard/SalesChart";
import ExpenseChart from "../../components/dashboard/ExpenseChart";
import CalendarWidget from "../../components/dashboard/CalendarWidget";
import UpcomingTasks from "../../components/dashboard/UpcomingTasks";
import NoraPanel from "../../components/dashboard/NoraPanel";


export default function DashboardPage() {
  return (
    <DashboardLayout>
        <TopHeader />

      <div className="space-y-10">

        {/* Header */}

        <div>

          <h1 className="text-5xl font-black">
            Business Dashboard
          </h1>

          <p className="text-gray-400 mt-3">
            Manage your entire business with AI.
          </p>

        </div>
        <OverviewCards />

        {/* KPI Cards */}

        <div className="grid lg:grid-cols-4 gap-6">

          <KPICard
            title="Revenue"
            value="₹24.5L"
            change="+12%"
          />

          <KPICard
            title="Employees"
            value="126"
            change="+6"
          />

          <KPICard
            title="Orders"
            value="842"
            change="+18%"
          />

          <KPICard
            title="AI Tasks"
            value="1248"
            change="+35%"
          />

        </div>

        {/* Quick Actions + AI */}

        <div className="grid lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2">

            <QuickActions />

          </div>

          <AIInsights />

        </div>

        {/* Recent Activity */}

        <RecentActivity />

        {/* Revenue + Notifications */}

        <div className="grid lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2">

            <RevenueChart />

          </div>

          <Notifications />

        </div>

        {/* Team */}

        <TeamPerformance />
        <div className="mt-8">

            <RecentOrders/>
            <div className="grid lg:grid-cols-3 gap-8 mt-8">

            <div>

            <CalendarWidget/>

                </div>

                <div>

            <UpcomingTasks/>

            </div>

        <div>

        <NoraPanel/>

        </div>

        </div>
            <div className="grid lg:grid-cols-2 gap-8 mt-8">

                <SalesChart/>

                <ExpenseChart/>

            </div>

            </div>

      </div>

    </DashboardLayout>
    
  );
}