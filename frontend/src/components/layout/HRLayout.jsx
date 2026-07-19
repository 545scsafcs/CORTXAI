import HRSidebar from "./HRSidebar";

export default function HRLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#030712] text-white relative">
      <HRSidebar />
      <main className="flex-1 overflow-y-auto p-8 max-h-screen">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}