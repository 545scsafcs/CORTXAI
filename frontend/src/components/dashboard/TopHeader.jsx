import { Bell, Search, UserCircle } from "lucide-react";

export default function TopHeader() {
  return (
    <div className="flex justify-between items-center mb-10">

      <div className="relative w-[420px]">

        <Search
          className="absolute left-4 top-4 text-gray-400"
          size={18}
        />

        <input
          placeholder="Search employees, invoices, AI..."
          className="w-full rounded-2xl bg-white/5 border border-white/10
          py-3 pl-12 pr-4 outline-none
          focus:border-cyan-400"
        />

      </div>

      <div className="flex items-center gap-5">

        <button className="relative">

          <Bell />

          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-cyan-400"></span>

        </button>

        <UserCircle size={38} />

      </div>

    </div>
  );
}