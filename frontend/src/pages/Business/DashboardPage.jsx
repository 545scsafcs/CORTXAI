import React from "react";
import UnifiedLayout from "../../components/layout/UnifiedLayout";
import PageHeader from "../../components/ui/PageHeader";
import KPICard from "../../components/ui/KPICard";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentActivity from "../../components/dashboard/RecentActivity";
import AIInsights from "../../components/dashboard/AIInsights";
import RevenueChart from "../../components/dashboard/RevenueChart";
import Notifications from "../../components/dashboard/Notifications";
import TeamPerformance from "../../components/dashboard/TeamPerformance";
import OverviewCards from "../../components/dashboard/OverviewCards";
import RecentOrders from "../../components/dashboard/RecentOrders";
import SalesChart from "../../components/dashboard/SalesChart";
import ExpenseChart from "../../components/dashboard/ExpenseChart";
import CalendarWidget from "../../components/dashboard/CalendarWidget";
import UpcomingTasks from "../../components/dashboard/UpcomingTasks";
import NoraPanel from "../../components/dashboard/NoraPanel";
import { Sparkles, BarChart3, TrendingUp, Users, Wallet, Bot } from "lucide-react";
import Button from "../../components/ui/Button";

export default function DashboardPage() {
  return (
    <UnifiedLayout>
      <div className="space-y-8 font-sans">
        {/* Unified Page Header */}
        <PageHeader
          title="Business Command Center"
          subtitle="Real-time multi-department telemetry and continuous Nora AI orchestration."
          badge="Core Business OS"
          badgeColor="from-cyan-400 to-indigo-600"
          breadcrumbs={[{ label: "Business Suite" }, { label: "Dashboard" }]}
          actions={
            <Button variant="primary" className="bg-cyan-500 text-black hover:bg-cyan-400 font-bold text-xs">
              <Sparkles size={14} className="inline mr-1.5" /> Invoke Nora Audit
            </Button>
          }
        />

        {/* Overview Banner Cards */}
        <OverviewCards />

        {/* Key Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="Monthly Revenue"
            value="INR 24,50,000"
            change="+12.4%"
            dept="business"
            icon={Wallet}
          />
          <KPICard
            title="Active Workforce"
            value={126}
            change="+6 staff"
            dept="hr"
            icon={Users}
          />
          <KPICard
            title="Orders Processed"
            value={842}
            change="+18.2%"
            dept="inventory"
            icon={BarChart3}
          />
          <KPICard
            title="AI Tasks Automated"
            value={1248}
            change="+35.0%"
            dept="sales"
            icon={Bot}
          />
        </div>

        {/* Quick Actions & AI Recommendations */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <QuickActions />
          </div>
          <AIInsights />
        </div>

        {/* Recent Activity */}
        <RecentActivity />

        {/* Revenue Chart & System Notifications */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <RevenueChart />
          </div>
          <Notifications />
        </div>

        {/* Team Performance */}
        <TeamPerformance />

        {/* Recent Orders */}
        <RecentOrders />

        {/* Calendar, Tasks & Nora Panel */}
        <div className="grid lg:grid-cols-3 gap-8">
          <CalendarWidget />
          <UpcomingTasks />
          <NoraPanel />
        </div>

        {/* Sales & Expense Charts */}
        <div className="grid lg:grid-cols-2 gap-8">
          <SalesChart />
          <ExpenseChart />
        </div>
      </div>
    </UnifiedLayout>
  );
}