import React, { useEffect, useState } from "react";
import { getAttendance } from "../../services/attendanceApi";
import { Search } from "lucide-react";

export default function AttendanceWidget() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "desc", // Default sorting is Latest Date First
  });

  useEffect(() => {
    async function loadLogs() {
      try {
        const data = await getAttendance();
        setLogs(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadLogs();
  }, []);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <span className="text-gray-500 ml-1 text-xs">⇅</span>;
    }
    return sortConfig.direction === "asc" ? (
      <span className="text-cyan-400 ml-1 text-xs">▲</span>
    ) : (
      <span className="text-cyan-400 ml-1 text-xs">▼</span>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "--";
    const d = new Date(dateString);
    const day = d.getDate();
    const month = d.toLocaleString("en-US", { month: "short" });
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  };

  // Filter and sort logs
  const getProcessedLogs = () => {
    let processed = [...logs];

    // Local search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      processed = processed.filter(
        (log) =>
          log.employeeName?.toLowerCase().includes(q) ||
          log.employeeId?.toLowerCase().includes(q) ||
          log.department?.toLowerCase().includes(q) ||
          log.attendanceStatus?.toLowerCase().includes(q)
      );
    }

    // Sort logs
    processed.sort((a, b) => {
      let aVal;
      let bVal;

      switch (sortConfig.key) {
        case "date":
          aVal = a.date ? new Date(a.date).getTime() : 0;
          bVal = b.date ? new Date(b.date).getTime() : 0;
          break;
        case "name":
          aVal = a.employeeName || "";
          bVal = b.employeeName || "";
          break;
        case "checkIn":
          aVal = a.checkIn ? new Date(a.checkIn).getTime() : 0;
          bVal = b.checkIn ? new Date(b.checkIn).getTime() : 0;
          break;
        case "checkOut":
          aVal = a.checkOut ? new Date(a.checkOut).getTime() : 0;
          bVal = b.checkOut ? new Date(b.checkOut).getTime() : 0;
          break;
        case "workingHours":
          aVal = a.workingHours || 0;
          bVal = b.workingHours || 0;
          break;
        case "status":
          aVal = a.attendanceStatus || "";
          bVal = b.attendanceStatus || "";
          break;
        default:
          return 0;
      }

      if (typeof aVal === "string") {
        return sortConfig.direction === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      } else {
        return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
      }
    });

    return processed;
  };

  const processedLogs = getProcessedLogs();

  return (
    <div className="rounded-3xl bg-white border border-slate-200/80 p-8 space-y-6 shadow-sm font-sans">
      {/* Header Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 border-b border-slate-100 pb-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 font-outfit">Live Attendance Log</h3>
          <span className="mt-1.5 inline-block bg-indigo-50 text-indigo-900 border border-indigo-200/80 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider font-mono">
            Live Sync Active
          </span>
        </div>

        {/* Local Search Input */}
        <div className="relative w-full md:max-w-xs">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search size={16} />
          </span>
          <input
            type="text"
            placeholder="Search records..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-medium placeholder-slate-400 focus:bg-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-slate-900"></div>
        </div>
      ) : processedLogs.length === 0 ? (
        <p className="text-slate-500 text-center py-20 bg-slate-50 border border-slate-200/60 rounded-2xl text-xs font-medium">
          {searchQuery ? "No matching records found." : "No attendance logs found."}
        </p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200/80">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-900 text-[11px] font-black uppercase tracking-wider bg-slate-100/90 border-b border-slate-200">
                <th
                  onClick={() => handleSort("date")}
                  className="p-4 font-outfit cursor-pointer select-none hover:text-indigo-700 transition"
                >
                  Date {renderSortIcon("date")}
                </th>
                <th
                  onClick={() => handleSort("name")}
                  className="p-4 font-outfit cursor-pointer select-none hover:text-indigo-700 transition"
                >
                  Employee {renderSortIcon("name")}
                </th>
                <th
                  onClick={() => handleSort("checkIn")}
                  className="p-4 font-outfit cursor-pointer select-none hover:text-indigo-700 transition"
                >
                  Check In {renderSortIcon("checkIn")}
                </th>
                <th
                  onClick={() => handleSort("checkOut")}
                  className="p-4 font-outfit cursor-pointer select-none hover:text-indigo-700 transition"
                >
                  Check Out {renderSortIcon("checkOut")}
                </th>
                <th
                  onClick={() => handleSort("workingHours")}
                  className="p-4 font-outfit cursor-pointer select-none hover:text-indigo-700 transition"
                >
                  Working Hours {renderSortIcon("workingHours")}
                </th>
                <th
                  onClick={() => handleSort("status")}
                  className="p-4 font-outfit cursor-pointer select-none hover:text-indigo-700 transition text-center"
                >
                  Status {renderSortIcon("status")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 text-xs font-medium">
              {processedLogs.map((log) => (
                <tr key={log._id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-mono text-indigo-700 font-bold text-xs">
                    {formatDate(log.date)}
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-slate-900 font-outfit">{log.employeeName}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {log.employeeId} • {log.department}
                    </div>
                  </td>
                  <td className="p-4 font-mono text-xs text-slate-600">
                    {log.checkIn
                      ? new Date(log.checkIn).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "--"}
                  </td>
                  <td className="p-4 font-mono text-xs text-slate-600">
                    {log.checkOut
                      ? new Date(log.checkOut).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "--"}
                  </td>
                  <td className="p-4 font-mono text-slate-900 font-bold">
                    {log.workingHours ? `${log.workingHours.toFixed(2)}h` : "0.00h"}
                  </td>
                  <td className="p-4 text-center">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                        log.attendanceStatus === "Present"
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-200/90"
                          : log.attendanceStatus === "Leave"
                          ? "bg-amber-50 text-amber-900 border border-amber-200/90"
                          : "bg-rose-50 text-rose-800 border border-rose-200/90"
                      }`}
                    >
                      {log.attendanceStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
