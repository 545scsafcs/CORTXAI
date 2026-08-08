import React from "react";
import UnifiedLayout from "../../components/layout/UnifiedLayout";
import PageHeader from "../../components/ui/PageHeader";
import KPICard from "../../components/ui/KPICard";
import SalesChart from "../../components/dashboard/SalesChart";
import ExpenseChart from "../../components/dashboard/ExpenseChart";
import RevenueChart from "../../components/dashboard/RevenueChart";
import AIInsights from "../../components/dashboard/AIInsights";
import { ChartNoAxesCombined, Sparkles, TrendingUp, Zap, Target } from "lucide-react";
import Button from "../../components/ui/Button";

export default function AnalyticsPage() {
  return (
    <UnifiedLayout>
      <div className="space-y-8 font-sans">
        <PageHeader
          title="Predictive Analytics Intelligence"
          subtitle="Cross-departmental telemetry analytics, anomaly detection, and natural language forecasting powered by Nora."
          badge="Analytics Suite"
          badgeColor="from-cyan-400 to-purple-500"
          breadcrumbs={[{ label: "Business Suite" }, { label: "Analytics" }]}
          actions={
            <Button variant="primary" className="bg-cyan-400 text-black hover:bg-cyan-300 font-bold text-xs">
              <Sparkles size={15} className="inline mr-1.5" /> Run Anomaly Scan
            </Button>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard title="Forecast Precision" value="98.4%" change="High Confidence" dept="sales" icon={Target} />
          <KPICard title="Data Points Analyzed" value="2.4M" change="+450K today" dept="business" icon={Zap} />
          <KPICard title="Conversion Margin" value="38.2%" change="+5.4% YoY" dept="crm" icon={TrendingUp} />
          <KPICard title="Anomaly Score" value="0.02" change="Normal Bounds" dept="finance" icon={ChartNoAxesCombined} />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <RevenueChart />
          </div>
          <AIInsights />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <SalesChart />
          <ExpenseChart />
        </div>
      </div>
    </UnifiedLayout>
  );
}