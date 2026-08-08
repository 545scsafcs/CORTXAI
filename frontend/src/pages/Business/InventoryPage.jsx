import React from "react";
import UnifiedLayout from "../../components/layout/UnifiedLayout";
import PageHeader from "../../components/ui/PageHeader";
import KPICard from "../../components/ui/KPICard";
import DataTable from "../../components/ui/DataTable";
import Button from "../../components/ui/Button";
import { Boxes, Plus, AlertTriangle, ArrowUpRight, Warehouse } from "lucide-react";

const inventoryItems = [
  { sku: "SKU-9081", name: "iPhone 15 Pro Max", category: "Electronics", stock: "45 Units", status: "Stable" },
  { sku: "SKU-9082", name: "MacBook Pro M3 Max", category: "Laptops", stock: "2 Units", status: "Low Stock Alert" },
  { sku: "SKU-9083", name: "Sony WH-1000XM5", category: "Accessories", stock: "120 Units", status: "Stable" },
  { sku: "SKU-9084", name: "Dell XPS 15 OLED", category: "Laptops", stock: "0 Units", status: "Out of Stock" },
  { sku: "SKU-9085", name: "Logitech MX Master 3S", category: "Peripherals", stock: "85 Units", status: "Stable" },
];

export default function InventoryPage() {
  return (
    <UnifiedLayout>
      <div className="space-y-8 font-sans">
        <PageHeader
          title="Inventory & Warehouse Matrix"
          subtitle="Real-time stock level synchronization, low-stock warnings, and purchase request automation."
          badge="Inventory Suite"
          badgeColor="from-amber-400 to-emerald-500"
          breadcrumbs={[{ label: "Business Suite" }, { label: "Inventory" }]}
          actions={
            <Button variant="primary" className="bg-emerald-500 text-black hover:bg-emerald-400 font-bold text-xs">
              <Plus size={15} className="inline mr-1.5" /> Register New SKU
            </Button>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard title="Total SKUs" value={245} change="+12 catalog" dept="inventory" icon={Boxes} />
          <KPICard title="Low Stock Alerts" value={2} change="Action Required" dept="inventory" icon={AlertTriangle} />
          <KPICard title="Warehouse Hubs" value={3} change="Main, West, East" dept="inventory" icon={Warehouse} />
          <KPICard title="Inbound Shipments" value={14} change="En route" dept="inventory" icon={ArrowUpRight} />
        </div>

        <DataTable
          title="Active Stock Directory"
          subtitle="Real-time item status across registered distribution centers."
          columns={["SKU Code", "Product Name", "Category", "Stock Count", "Status"]}
          data={inventoryItems}
          searchPlaceholder="Filter SKUs by code, name, or status..."
        />
      </div>
    </UnifiedLayout>
  );
}