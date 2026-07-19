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
    <div className="rounded-3xl bg-white/5 border border-white/10 p-8 space-y-6">
      {/* Header Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 border-b border-white/10 pb-6">
        <div>
          <h3 className="text-2xl font-bold text-white">Live Attendance Log</h3>
          <span className="mt-1.5 inline-block bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Live Sync Active
          </span>
        </div>

        {/* Local Search Input */}
        <div className="relative w-full md:max-w-xs">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <Search size={16} />
          </span>
          <input
            type="text"
            placeholder="Search records..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#0B1120] border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-cyan-400"></div>
        </div>
      ) : processedLogs.length === 0 ? (
        <p className="text-gray-500 text-center py-20 bg-white/5 border border-white/5 rounded-2xl">
          {searchQuery ? "No matching records found." : "No attendance logs found."}
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 text-sm border-b border-white/10">
                <th
                  onClick={() => handleSort("date")}
                  className="pb-4 font-semibold cursor-pointer select-none hover:text-white transition"
                >
                  Date {renderSortIcon("date")}
                </th>
                <th
                  onClick={() => handleSort("name")}
                  className="pb-4 font-semibold cursor-pointer select-none hover:text-white transition"
                >
                  Employee {renderSortIcon("name")}
                </th>
                <th
                  onClick={() => handleSort("checkIn")}
                  className="pb-4 font-semibold cursor-pointer select-none hover:text-white transition"
                >
                  Check In {renderSortIcon("checkIn")}
                </th>
                <th
                  onClick={() => handleSort("checkOut")}
                  className="pb-4 font-semibold cursor-pointer select-none hover:text-white transition"
                >
                  Check Out {renderSortIcon("checkOut")}
                </th>
                <th
                  onClick={() => handleSort("workingHours")}
                  className="pb-4 font-semibold cursor-pointer select-none hover:text-white transition"
                >
                  Working Hours {renderSortIcon("workingHours")}
                </th>
                <th
                  onClick={() => handleSort("status")}
                  className="pb-4 font-semibold cursor-pointer select-none hover:text-white transition text-center"
                >
                  Status {renderSortIcon("status")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-300">
              {processedLogs.map((log) => (
                <tr key={log._id} className="hover:bg-white/5 transition">
                  <td className="py-4 font-mono text-cyan-400 text-sm">
                    {formatDate(log.date)}
                  </td>
                  <td className="py-4">
                    <div className="font-bold text-white">{log.employeeName}</div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      {log.employeeId} • {log.department}
                    </div>
                  </td>
                  <td className="py-4 font-mono text-sm">
                    {log.checkIn
                      ? new Date(log.checkIn).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "--"}
                  </td>
                  <td className="py-4 font-mono text-sm">
                    {log.checkOut
                      ? new Date(log.checkOut).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "--"}
                  </td>
                  <td className="py-4 font-mono">
                    {log.workingHours ? `${log.workingHours.toFixed(2)}h` : "0.00h"}
                  </td>
                  <td className="py-4 text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                        log.attendanceStatus === "Present"
                          ? "bg-green-500/20 text-green-400 border border-green-500/10"
                          : log.attendanceStatus === "Leave"
                          ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/10"
                          : "bg-red-500/20 text-red-400 border border-red-500/10"
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
