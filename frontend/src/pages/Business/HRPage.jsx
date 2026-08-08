import React from "react";
import UnifiedLayout from "../../components/layout/UnifiedLayout";
import PageHeader from "../../components/ui/PageHeader";
import KPICard from "../../components/ui/KPICard";
import DataTable from "../../components/ui/DataTable";
import Button from "../../components/ui/Button";
import { Users, UserPlus, CalendarCheck, Wallet, Building2 } from "lucide-react";

const employees = [
  { name: "Rahul Sharma", role: "Fullstack Developer", dept: "Engineering", status: "Present" },
  { name: "Priya Singh", role: "HR Operations Lead", dept: "Human Resources", status: "On Leave" },
  { name: "Aman Verma", role: "Sales Account Exec", dept: "Sales", status: "Present" },
  { name: "Neha Gupta", role: "Financial Auditor", dept: "Finance", status: "Present" },
  { name: "Vikram Malhotra", role: "Product Designer", dept: "Design", status: "Present" },
];

export default function HRPage() {
  return (
    <UnifiedLayout>
      <div className="space-y-8 font-sans">
        <PageHeader
          title="HR Management Portal"
          subtitle="Autonomous human capital coordination, payroll schedules, and personnel directories."
          badge="HR Suite"
          badgeColor="from-indigo-500 to-purple-600"
          breadcrumbs={[{ label: "Business Suite" }, { label: "HR Portal" }]}
          actions={
            <Button variant="primary" className="bg-indigo-600 text-white hover:bg-indigo-500 font-bold text-xs">
              <UserPlus size={15} className="inline mr-1.5" /> Add New Employee
            </Button>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard title="Total Roster" value={126} change="+4 this month" dept="hr" icon={Users} />
          <KPICard title="Present Today" value={118} change="93.6% Rate" dept="hr" icon={CalendarCheck} />
          <KPICard title="Monthly Payroll" value="INR 18.2L" change="Auto-disbursed" dept="hr" icon={Wallet} />
          <KPICard title="Departments" value={8} change="Active" dept="hr" icon={Building2} />
        </div>

        <DataTable
          title="Company Employee Roster"
          subtitle="Live personnel status and department assignments."
          columns={["Name", "Role", "Department", "Status"]}
          data={employees}
          searchPlaceholder="Search staff by name or department..."
        />
      </div>
    </UnifiedLayout>
  );
}