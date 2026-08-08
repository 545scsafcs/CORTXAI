import React, { useState, useMemo } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import Badge from "./Badge";

export default function DataTable({
  columns = [],
  data = [],
  searchable = true,
  searchPlaceholder = "Search records...",
  title,
  subtitle,
  actions,
  pageSize = 6,
  onRowClick,
  isLoading = false,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    const term = searchTerm.toLowerCase();
    return data.filter((row) =>
      Object.values(row).some(
        (val) => val && String(val).toLowerCase().includes(term)
      )
    );
  }, [data, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const renderBadgeForStatus = (val) => {
    const str = String(val).toLowerCase();
    if (str.includes("active") || str.includes("paid") || str.includes("shipped") || str.includes("approved") || str.includes("stable") || str.includes("success")) {
      return <Badge variant="success">{val}</Badge>;
    }
    if (str.includes("pending") || str.includes("processing") || str.includes("reorder") || str.includes("review")) {
      return <Badge variant="warning">{val}</Badge>;
    }
    if (str.includes("inactive") || str.includes("out") || str.includes("rejected") || str.includes("cancelled") || str.includes("failed")) {
      return <Badge variant="danger">{val}</Badge>;
    }
    return val;
  };

  return (
    <div className="rounded-3xl bg-white border border-slate-200/80 p-6 shadow-xl shadow-slate-200/40 space-y-6 font-sans">
      {/* Header & Controls Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          {title && <h3 className="text-xl font-bold font-outfit text-slate-900">{title}</h3>}
          {subtitle && <p className="text-xs text-slate-700 font-semibold mt-0.5">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {searchable && (
            <div className="relative min-w-[240px]">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-2 text-xs text-slate-900 placeholder-slate-500 focus:outline-none focus:bg-white focus:border-indigo-500 transition font-sans"
              />
            </div>
          )}

          {actions}
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200/80 bg-white">
        <table className="w-full text-left border-collapse font-sans text-xs">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-100 text-slate-900 uppercase font-black text-[11px] tracking-wider sticky top-0 backdrop-blur-md">
              {columns.map((col, i) => (
                <th key={i} className="px-5 py-4 font-outfit">
                  {typeof col === "string" ? col : col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, idx) => (
                <tr key={idx}>
                  {columns.map((_, cidx) => (
                    <td key={cidx} className="px-5 py-4">
                      <div className="h-4 w-full rounded skeleton-shimmer-light" />
                    </td>
                  ))}
                </tr>
              ))
            ) : paginatedData.length > 0 ? (
              paginatedData.map((row, rindex) => (
                <tr
                  key={rindex}
                  onClick={() => onRowClick && onRowClick(row)}
                  className={`hover:bg-slate-50/80 transition-colors duration-150 ${onRowClick ? "cursor-pointer" : ""
                    }`}
                >
                  {columns.map((col, cindex) => {
                    const key = typeof col === "string" ? col.toLowerCase().replace(/\s+/g, "") : col.accessor;
                    const value = row[key] !== undefined ? row[key] : Object.values(row)[cindex];
                    return (
                      <td key={cindex} className="px-5 py-4 whitespace-nowrap font-medium text-slate-900">
                        {typeof value === "string" && (value.includes("Active") || value.includes("Pending") || value.includes("Shipped") || value.includes("Paid"))
                          ? renderBadgeForStatus(value)
                          : value}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-5 py-12 text-center text-slate-400 font-sans">
                  No matching records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
        <span>
          Showing {paginatedData.length} of {filteredData.length} entries
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 disabled:opacity-40 transition cursor-pointer text-slate-700"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="font-mono text-[11px] px-2 font-bold text-slate-900">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 disabled:opacity-40 transition cursor-pointer text-slate-700"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
