import React from "react";
import UnifiedLayout from "../../components/layout/UnifiedLayout";
import PageHeader from "../../components/ui/PageHeader";
import KPICard from "../../components/ui/KPICard";
import DataTable from "../../components/ui/DataTable";
import Button from "../../components/ui/Button";
import { Wallet, TrendingUp, DollarSign, FileText, ArrowDownLeft, ArrowUpRight } from "lucide-react";

const transactions = [
  { id: "TX-1092", desc: "Vercel Enterprise Subscription", category: "Software SaaS", amount: "INR 1,25,000", type: "Expense", status: "Approved" },
  { id: "TX-1093", desc: "Linear App Customer Invoice", category: "Revenue", amount: "INR 4,50,000", type: "Income", status: "Paid" },
  { id: "TX-1094", desc: "Monthly Staff Payroll Disbursal", category: "Human Capital", amount: "INR 18,20,000", type: "Expense", status: "Approved" },
  { id: "TX-1095", desc: "Apple Hardware Procurement", category: "Assets", amount: "INR 3,40,000", type: "Expense", status: "Processing" },
];

export default function FinancePage() {
  return (
    <UnifiedLayout>
      <div className="space-y-8 font-sans">
        <PageHeader
          title="Finance & Ledger Control"
          subtitle="Continuous double-entry ledger reconciliations, revenue tracking, and automated tax reporting."
          badge="Finance Suite"
          badgeColor="from-amber-400 to-orange-500"
          breadcrumbs={[{ label: "Business Suite" }, { label: "Finance" }]}
          actions={
            <Button variant="primary" className="bg-amber-500 text-black hover:bg-amber-400 font-bold text-xs">
              <FileText size={15} className="inline mr-1.5" /> Download Tax Statement
            </Button>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard title="Gross Managed" value="INR 1.8B" change="+14.2%" dept="finance" icon={Wallet} />
          <KPICard title="Monthly Income" value="INR 45.2L" change="+18.5%" dept="finance" icon={ArrowDownLeft} />
          <KPICard title="Monthly Expenses" value="INR 22.8L" change="-4.1% vs budget" dept="finance" icon={ArrowUpRight} />
          <KPICard title="Net Margin" value="49.5%" change="Optimal Health" dept="finance" icon={TrendingUp} />
        </div>

        <DataTable
          title="General Accounts Ledger"
          subtitle="Real-time transaction entries logged across corporate bank accounts."
          columns={["TX ID", "Description", "Category", "Amount", "Type", "Status"]}
          data={transactions}
          searchPlaceholder="Search transactions by ID or vendor..."
        />
      </div>
    </UnifiedLayout>
  );
}