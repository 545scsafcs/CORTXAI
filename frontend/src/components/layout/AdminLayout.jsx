import AdminSidebar from "./AdminSidebar";
import FloatingNora from "../nora/FloatingNora";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-[#030712] text-white relative">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-y-auto max-h-screen">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
      <FloatingNora />
    </div>
  );
}