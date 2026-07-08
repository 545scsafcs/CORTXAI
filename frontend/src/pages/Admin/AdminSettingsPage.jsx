import AdminLayout from "../../components/layout/AdminLayout";

export default function AdminSettingsPage() {

  return (

    <AdminLayout>

      <h1 className="text-5xl font-black">

        Settings

      </h1>

      <div className="mt-10 rounded-3xl bg-white/5 border border-white/10 p-8 space-y-6">

        <button className="w-full bg-cyan-400 text-black py-4 rounded-xl">

          Company Settings

        </button>

        <button className="w-full bg-cyan-400 text-black py-4 rounded-xl">

          User Permissions

        </button>

        <button className="w-full bg-cyan-400 text-black py-4 rounded-xl">

          Security

        </button>

        <button className="w-full bg-cyan-400 text-black py-4 rounded-xl">

          Backup Data

        </button>

      </div>

    </AdminLayout>

  );

}