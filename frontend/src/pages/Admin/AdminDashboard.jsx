import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import PageHeader from "../../components/ui/PageHeader";
import KPICard from "../../components/ui/KPICard";
import GlassCard from "../../components/ui/GlassCard";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import { Users, Building2, Bot, Wallet, UserPlus, ShieldCheck, FileText, CheckCircle2 } from "lucide-react";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-8 font-sans">
        <PageHeader
          title="System Control Hub"
          subtitle="Master administrator controls, user permission grants, and system-wide telemetry."
          badge="Admin Suite"
          badgeColor="from-red-500 to-amber-500"
          breadcrumbs={[{ label: "Admin Suite" }, { label: "Control Hub" }]}
          actions={
            <Button variant="primary" className="bg-red-500 text-white hover:bg-red-400 font-bold text-xs">
              <UserPlus size={15} className="inline mr-1.5" /> Provision New User
            </Button>
          }
        />

        {/* Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard title="Total Roster" value={126} change="Active Users" dept="admin" icon={Users} />
          <KPICard title="Departments" value={8} change="Configured" dept="admin" icon={Building2} />
          <KPICard title="Active Nora Agents" value={6} change="Healthy" dept="admin" icon={Bot} />
          <KPICard title="Monthly Budget" value="INR 24.5L" change="Allocated" dept="admin" icon={Wallet} />
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <GlassCard dept="admin" accent className="space-y-6">
            <h3 className="text-xl font-bold font-outfit text-slate-900 flex items-center gap-2">
              <Users size={20} className="text-rose-600" /> Recent User Registrations
            </h3>
            <div className="space-y-3">
              {[
                { name: "Vineet Yadav", role: "Root Owner", dept: "Executive" },
                { name: "Anjali Singh", role: "HR Manager", dept: "Human Resources" },
                { name: "Utkarsh Kumar Singh", role: "Sales Lead", dept: "Sales" },
              ].map((usr, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-slate-900 font-outfit text-xs">{usr.name}</h5>
                    <p className="text-[10px] text-slate-600 font-medium mt-0.5">{usr.role} • {usr.dept}</p>
                  </div>
                  <Badge variant="cyan">Authorized</Badge>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard dept="admin" className="space-y-6">
            <h3 className="text-xl font-bold font-outfit text-slate-900 flex items-center gap-2">
              <ShieldCheck size={20} className="text-amber-600" /> Pending Admin Approvals
            </h3>
            <div className="space-y-3">
              {[
                { title: "Leave Policy Modification", req: "HR Suite", type: "Policy" },
                { title: "Salary Ledger Disbursal", req: "Finance Suite", type: "Payroll" },
                { title: "Purchase Order #PO-9081", req: "Inventory Suite", type: "Expense" },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-slate-900 font-outfit text-xs">{item.title}</h5>
                    <p className="text-[10px] text-slate-600 font-medium mt-0.5">{item.req}</p>
                  </div>
                  <Badge variant="warning">{item.type}</Badge>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Quick Action Matrix */}
        <GlassCard dept="admin" className="space-y-6">
          <h3 className="text-xl font-bold font-outfit text-slate-900">System Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="py-3.5 text-xs font-bold text-slate-900 border-slate-200 bg-slate-50 hover:bg-slate-100">
              <UserPlus size={15} className="inline mr-2 text-rose-600" /> Add Employee
            </Button>
            <Button variant="outline" className="py-3.5 text-xs font-bold text-slate-900 border-slate-200 bg-slate-50 hover:bg-slate-100">
              <Building2 size={15} className="inline mr-2 text-amber-600" /> New Department
            </Button>
            <Button variant="outline" className="py-3.5 text-xs font-bold text-slate-900 border-slate-200 bg-slate-50 hover:bg-slate-100">
              <FileText size={15} className="inline mr-2 text-indigo-600" /> Audit Report
            </Button>
            <Button variant="outline" className="py-3.5 text-xs font-bold text-slate-900 border-slate-200 bg-slate-50 hover:bg-slate-100">
              <Bot size={15} className="inline mr-2 text-purple-600" /> Orchestrate Nora
            </Button>
          </div>
        </GlassCard>
      </div>
    </AdminLayout>
  );
}