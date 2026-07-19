import React from "react";
import { Search } from "lucide-react";

export default function SearchBar({ value, onChange, placeholder = "Search..." }) {
  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
        <Search className="h-4.5 w-4.5" />
      </div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="block w-full pl-11 pr-4 py-3.5 bg-[#0B1220] border border-white/5 rounded-2xl text-sm text-white placeholder-gray-500 outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
      />
    </div>
  );
}
