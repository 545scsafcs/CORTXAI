import React from "react";
import InventoryLayout from "../../components/layout/InventoryLayout";
import PageHeader from "../../components/ui/PageHeader";
import KPICard from "../../components/ui/KPICard";
import DataTable from "../../components/ui/DataTable";
import Button from "../../components/ui/Button";
import { Plus, Download, Boxes, Tag, Package, Building, ShoppingBag, History, FileText, Settings } from "lucide-react";

export default function InventoryPageTemplate({ moduleName, title, subtitle, stats, columns, data }) {
  return (
    <InventoryLayout>
      <div className="space-y-8 font-sans">
        <PageHeader
          title={title}
          subtitle={subtitle}
          badge="Inventory Suite"
          badgeColor="from-amber-400 to-emerald-500"
          breadcrumbs={[{ label: "Inventory" }, { label: title }]}
          actions={
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => alert(`Exporting ${title} workspace data...`)}
                className="text-xs border-white/10 text-gray-300 hover:text-white"
              >
                <Download size={14} className="inline mr-1.5" /> Export CSV
              </Button>
              {moduleName !== "stock-history" && moduleName !== "reports" && moduleName !== "settings" && (
                <Button
                  variant="primary"
                  onClick={() => alert(`Opening creation wizard for ${title}...`)}
                  className="bg-amber-400 text-black hover:bg-amber-300 font-bold text-xs"
                >
                  <Plus size={15} className="inline mr-1.5" /> Add {title.replace(/s$/, "")}
                </Button>
              )}
            </div>
          }
        />

        {/* Stats Row */}
        {stats && stats.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, idx) => (
              <KPICard
                key={idx}
                title={s.label}
                value={s.value}
                dept="inventory"
                icon={Boxes}
              />
            ))}
          </div>
        )}

        {/* Data Table View */}
        {columns && data && (
          <DataTable
            title={`${title} Directory`}
            subtitle={`Active records logged inside ${title.toLowerCase()} repository.`}
            columns={columns}
            data={data}
            searchPlaceholder={`Filter ${title.toLowerCase()}...`}
          />
        )}
      </div>
    </InventoryLayout>
  );
}
