import DashboardLayout from "../../components/layout/DashboardLayout";
import { Package, Plus, Warehouse, AlertTriangle } from "lucide-react";

const products = [
  { name: "Laptop", stock: 25, warehouse: "A-12" },
  { name: "Mouse", stock: 180, warehouse: "B-02" },
  { name: "Keyboard", stock: 96, warehouse: "B-11" },
  { name: "Monitor", stock: 12, warehouse: "A-08" },
];

export default function InventoryPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div className="flex justify-between items-center">

          <div>

            <h1 className="text-5xl font-black">
              Inventory
            </h1>

            <p className="text-gray-400 mt-2">
              Products, warehouse and stock management.
            </p>

          </div>

          <button className="flex items-center gap-2 bg-cyan-400 text-black px-6 py-3 rounded-xl">

            <Plus size={18} />

            Add Product

          </button>

        </div>

        <div className="grid lg:grid-cols-4 gap-6">

          <Card title="Products" value="245" icon={<Package />} />

          <Card title="Warehouses" value="5" icon={<Warehouse />} />

          <Card title="Low Stock" value="14" icon={<AlertTriangle />} />

          <Card title="Stock Value" value="₹1.8Cr" icon={<Package />} />

        </div>

        <div className="rounded-3xl bg-white/5 border border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">

            Products

          </h2>

          <table className="w-full">

            <thead>

              <tr className="text-left text-gray-400">

                <th>Name</th>

                <th>Stock</th>

                <th>Warehouse</th>

              </tr>

            </thead>

            <tbody>

              {products.map((item) => (

                <tr
                  key={item.name}
                  className="border-t border-white/10"
                >

                  <td className="py-5">
                    {item.name}
                  </td>

                  <td>
                    {item.stock}
                  </td>

                  <td>
                    {item.warehouse}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>
    </DashboardLayout>
  );
}

function Card({ title, value, icon }) {
  return (
    <div className="rounded-3xl bg-white/5 border border-white/10 p-6">

      <div className="text-cyan-400">
        {icon}
      </div>

      <p className="text-gray-400 mt-5">
        {title}
      </p>

      <h2 className="text-4xl font-bold mt-3">
        {value}
      </h2>

    </div>
  );
}