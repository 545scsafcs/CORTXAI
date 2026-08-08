import React, { useState, useEffect } from "react";
import InventoryLayout from "../../components/layout/InventoryLayout";
import PageHeader from "../../components/ui/PageHeader";
import KPICard from "../../components/ui/KPICard";
import GlassCard from "../../components/ui/GlassCard";
import Badge from "../../components/ui/Badge";
import DataTable from "../../components/ui/DataTable";
import { Boxes, AlertTriangle, TrendingUp, Package, ArrowUpRight, Warehouse } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function InventoryDashboard() {
  const stockFlowData = [
    { name: "Mon", StockIn: 120, StockOut: 80 },
    { name: "Tue", StockIn: 220, StockOut: 150 },
    { name: "Wed", StockIn: 150, StockOut: 190 },
    { name: "Thu", StockIn: 320, StockOut: 240 },
    { name: "Fri", StockIn: 280, StockOut: 300 },
    { name: "Sat", StockIn: 180, StockOut: 90 },
    { name: "Sun", StockIn: 90,  StockOut: 50 }
  ];

  const recentTransactions = [
    { tx: "TX001", sku: "APP-IPH-15", name: "iPhone 15 Pro", qty: 45, type: "Stock In", source: "Apple Corp", date: "Today, 14:32" },
    { tx: "TX002", sku: "SAM-GAL-S24", name: "Galaxy S24 Ultra", qty: 20, type: "Stock Out", source: "Online Sale", date: "Today, 12:15" },
    { tx: "TX003", sku: "LOG-MXM-3S", name: "MX Master 3S Mouse", qty: 100, type: "Stock In", source: "Logitech Ltd", date: "Yesterday, 17:00" },
    { tx: "TX004", sku: "DELL-XPS-15", name: "Dell XPS 15 Laptop", qty: 5, type: "Stock Out", source: "IT Dept", date: "Yesterday, 10:45" },
  ];

  return (
    <InventoryLayout>
      <div className="space-y-8 font-sans">
        <PageHeader
          title="Inventory & Warehouse Matrix"
          subtitle="Multi-warehouse stock allocations, low-stock warnings, and reorder automations."
          badge="Inventory Suite"
          badgeColor="from-amber-400 to-emerald-500"
          breadcrumbs={[{ label: "Inventory" }, { label: "Dashboard" }]}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard title="Total SKUs" value={245} change="+12 this month" dept="inventory" icon={Boxes} />
          <KPICard title="Low Stock Alerts" value={3} change="Action Required" dept="inventory" icon={AlertTriangle} />
          <KPICard title="Total Stock Units" value="4,510" change="+14.2%" dept="inventory" icon={Package} />
          <KPICard title="Warehouse Hubs" value={3} change="Main, West, East" dept="inventory" icon={Warehouse} />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <GlassCard dept="inventory" accent className="xl:col-span-2 space-y-6">
            <h3 className="text-xl font-bold font-outfit text-white flex items-center gap-2">
              <TrendingUp size={20} className="text-emerald-400" /> Weekly Stock Movement (In vs Out)
            </h3>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stockFlowData}>
                  <XAxis dataKey="name" stroke="#9ca3af" fontSize={11} tickLine={false} />
                  <YAxis stroke="#9ca3af" fontSize={11} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderRadius: "16px", borderColor: "rgba(255,255,255,0.1)" }} />
                  <Bar dataKey="StockIn" fill="#10b981" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="StockOut" fill="#f59e0b" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          <GlassCard dept="inventory" className="space-y-4">
            <h3 className="text-xl font-bold font-outfit text-white flex items-center gap-2">
              <AlertTriangle size={20} className="text-amber-400" /> Critical Stock Warnings
            </h3>
            <div className="space-y-3">
              {[
                { name: "Dell XPS 13", stock: "2 Units Left", status: "Reorder" },
                { name: "MacBook Air M3", stock: "1 Unit Left", status: "Critical" },
                { name: "Logitech K380", stock: "0 Units Left", status: "Out of Stock" },
              ].map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between text-xs">
                  <div>
                    <h5 className="font-bold text-white font-outfit">{item.name}</h5>
                    <p className="text-[10px] text-gray-400">{item.stock}</p>
                  </div>
                  <Badge variant="warning">{item.status}</Badge>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        <DataTable
          title="Recent Stock Movement Logs"
          subtitle="Latest transactions across fulfillment centers."
          columns={["TX ID", "SKU", "Product Name", "Quantity", "Type", "Source/Destination", "Timestamp"]}
          data={recentTransactions}
          searchPlaceholder="Search movement history..."
        />
      </div>
    </InventoryLayout>
  );
}
