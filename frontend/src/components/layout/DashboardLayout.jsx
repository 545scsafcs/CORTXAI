import Sidebar from "./Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#050816] text-white">

      <Sidebar />

      <main className="flex-1 overflow-auto p-10">

        {children}

      </main>

    </div>
  );
}