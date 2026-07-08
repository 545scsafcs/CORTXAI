import AdminSidebar from "./AdminSidebar";
import FloatingNora from "../nora/FloatingNora";

export default function AdminLayout({ children }) {

  return (

    <div className="min-h-screen flex bg-[#050816] text-white">

      <AdminSidebar />

      <main className="flex-1 p-10 overflow-y-auto">

        {children}

      </main>

      <FloatingNora />

    </div>

  );

}