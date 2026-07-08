import AdminLayout from "../../components/layout/AdminLayout";

export default function DepartmentsPage() {
  return (
    <AdminLayout>

      <h1 className="text-5xl font-black">

        Departments

      </h1>

      <div className="grid lg:grid-cols-3 gap-6 mt-10">

        {[
          "HR",
          "Finance",
          "Inventory",
          "Sales",
          "Marketing",
          "Development",
        ].map((d) => (

          <div
            key={d}
            className="rounded-3xl bg-white/5 border border-white/10 p-8"
          >

            <h2 className="text-3xl font-bold">

              {d}

            </h2>

            <p className="mt-4 text-gray-400">

              Active Department

            </p>

          </div>

        ))}

      </div>

    </AdminLayout>
  );
}