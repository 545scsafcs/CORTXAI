import React, { useState, useEffect } from "react";
import HRLayout from "../../components/layout/HRLayout";
import { MessageSquare, Clock, CheckCircle2, AlertCircle, Search, Eye, Filter, RefreshCw } from "lucide-react";
import { getQueries, getQueryStats } from "../../services/queryApi";
import { useEmployee } from "../../context/EmployeeContext";
import QueryDrawer from "../../components/hr/query/QueryDrawer";

export default function QueriesPage() {
  const { employee: currentHR } = useEmployee();
  
  const [queries, setQueries] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
    closed: 0,
    avgResponseHours: 0
  });
  
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedQueryId, setSelectedQueryId] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Sorting
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    fetchData();
  }, [currentHR?.department, statusFilter]);

  async function fetchData() {
    try {
      setLoading(true);
      const dept = currentHR?.department || "";
      
      const [queriesRes, statsRes] = await Promise.all([
        getQueries(dept, statusFilter),
        getQueryStats(dept)
      ]);

      if (queriesRes.success) {
        setQueries(queriesRes.data);
      }
      if (statsRes.success) {
        setStats(statsRes.data);
      }
    } catch (err) {
      console.error("Failed to load ticketing data:", err);
    } finally {
      setLoading(false);
    }
  }

  // Handle status update from modal without refetching the whole list if we want,
  // but a refetch ensures stats are perfectly synced.
  const handleStatusUpdated = () => {
    fetchData();
  };

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  // Filter & Search Logic
  const filteredQueries = queries.filter((q) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      q.employeeName.toLowerCase().includes(searchLower) ||
      q.employeeCode.toLowerCase().includes(searchLower) ||
      q.subject.toLowerCase().includes(searchLower) ||
      q.category.toLowerCase().includes(searchLower)
    );
  });

  // Sort Logic
  const sortedQueries = [...filteredQueries].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];

    if (sortField === "createdAt") {
      aVal = new Date(a.createdAt).getTime();
      bVal = new Date(b.createdAt).getTime();
    }

    if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
    if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination Logic
  const totalPages = Math.ceil(sortedQueries.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedQueries.slice(indexOfFirstItem, indexOfLastItem);

  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case "Urgent": return "bg-red-500/10 text-red-400 border border-red-500/20";
      case "High": return "bg-amber-500/10 text-amber-400 border border-amber-500/20";
      case "Medium": return "bg-blue-500/10 text-blue-400 border border-blue-500/20";
      default: return "bg-gray-500/10 text-gray-400 border border-gray-500/20";
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Pending": return "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20";
      case "In Progress": return "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20";
      case "Resolved": return "bg-green-500/10 text-green-400 border border-green-500/20";
      default: return "bg-slate-500/10 text-slate-400 border border-slate-500/20";
    }
  };

  return (
    <HRLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-white font-outfit">
              Department Queries
            </h1>
            <p className="text-gray-400 mt-2 text-base">
              Manage and resolve employee tickets for the <span className="text-cyan-400 font-bold">{currentHR?.department || "HR"}</span> department.
            </p>
          </div>
          <button
            onClick={fetchData}
            className="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white px-5 py-3 rounded-2xl transition duration-200 self-start md:self-auto cursor-pointer"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            <span>Sync Queries</span>
          </button>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="rounded-3xl border border-white/5 bg-slate-950/40 p-6 flex items-center justify-between shadow-lg">
            <div className="space-y-1">
              <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Total Queries</span>
              <h3 className="text-3xl font-black text-white font-outfit">{stats.total}</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20">
              <MessageSquare size={22} />
            </div>
          </div>

          <div className="rounded-3xl border border-white/5 bg-slate-950/40 p-6 flex items-center justify-between shadow-lg">
            <div className="space-y-1">
              <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Pending Action</span>
              <h3 className="text-3xl font-black text-yellow-400 font-outfit">{stats.pending}</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 flex items-center justify-center text-yellow-400 border border-yellow-500/20">
              <AlertCircle size={22} />
            </div>
          </div>

          <div className="rounded-3xl border border-white/5 bg-slate-950/40 p-6 flex items-center justify-between shadow-lg">
            <div className="space-y-1">
              <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Resolved Tickets</span>
              <h3 className="text-3xl font-black text-green-400 font-outfit">{stats.resolved + stats.closed}</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-400 border border-green-500/20">
              <CheckCircle2 size={22} />
            </div>
          </div>

          <div className="rounded-3xl border border-white/5 bg-slate-950/40 p-6 flex items-center justify-between shadow-lg">
            <div className="space-y-1">
              <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Avg Resolution</span>
              <h3 className="text-3xl font-black text-white font-outfit">
                {stats.avgResponseHours} <span className="text-xs text-gray-400 font-medium">Hrs</span>
              </h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20">
              <Clock size={22} />
            </div>
          </div>
        </div>

        {/* Toolbar & Filters */}
        <div className="rounded-3xl border border-white/5 bg-slate-950/30 p-6 space-y-4 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                <Search size={18} />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search by Employee, ID, Subject..."
                className="w-full bg-[#030712] border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-400/50 transition-all duration-300"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 bg-slate-900/60 p-1.5 rounded-2xl border border-white/5">
              {["All", "Pending", "In Progress", "Resolved", "Closed"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setStatusFilter(tab);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                    statusFilter === tab
                      ? "bg-cyan-400 text-black shadow-lg shadow-cyan-400/10"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Data Table */}
          <div className="overflow-x-auto rounded-2xl border border-white/5">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/80 text-gray-400 text-[11px] uppercase tracking-wider border-b border-white/5">
                  <th className="py-4.5 px-6 font-extrabold cursor-pointer" onClick={() => handleSort("employeeName")}>Employee</th>
                  <th className="py-4.5 px-6 font-extrabold cursor-pointer" onClick={() => handleSort("employeeCode")}>ID</th>
                  <th className="py-4.5 px-6 font-extrabold cursor-pointer" onClick={() => handleSort("department")}>Dept</th>
                  <th className="py-4.5 px-6 font-extrabold cursor-pointer" onClick={() => handleSort("subject")}>Subject</th>
                  <th className="py-4.5 px-6 font-extrabold cursor-pointer" onClick={() => handleSort("category")}>Category</th>
                  <th className="py-4.5 px-6 font-extrabold cursor-pointer" onClick={() => handleSort("priority")}>Priority</th>
                  <th className="py-4.5 px-6 font-extrabold cursor-pointer" onClick={() => handleSort("status")}>Status</th>
                  <th className="py-4.5 px-6 font-extrabold cursor-pointer" onClick={() => handleSort("createdAt")}>Date</th>
                  <th className="py-4.5 px-6 font-extrabold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm text-gray-300">
                {loading ? (
                  <tr>
                    <td colSpan={9} className="py-16 text-center">
                      <div className="inline-flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-3 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-gray-400 text-xs font-semibold">Loading queries...</span>
                      </div>
                    </td>
                  </tr>
                ) : currentItems.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-16 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <MessageSquare size={36} className="text-gray-600 animate-bounce" />
                        <p className="font-bold text-gray-400">No Queries Found</p>
                        <p className="text-xs text-gray-600">No queries match the active filter or search keywords.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  currentItems.map((q) => (
                    <tr key={q._id} className="hover:bg-white/[0.02] transition-colors duration-150">
                      <td className="py-4.5 px-6 font-bold text-white">{q.employeeName}</td>
                      <td className="py-4.5 px-6 font-mono text-xs">{q.employeeCode}</td>
                      <td className="py-4.5 px-6">{q.department}</td>
                      <td className="py-4.5 px-6 max-w-xs truncate font-medium">{q.subject}</td>
                      <td className="py-4.5 px-6">{q.category}</td>
                      <td className="py-4.5 px-6">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${getPriorityBadgeClass(q.priority)}`}>
                          {q.priority}
                        </span>
                      </td>
                      <td className="py-4.5 px-6">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${getStatusBadgeClass(q.status)}`}>
                          {q.status}
                        </span>
                      </td>
                      <td className="py-4.5 px-6 text-xs text-gray-400">
                        {new Date(q.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4.5 px-6 text-right">
                        <button
                          onClick={() => {
                            setSelectedQueryId(q._id);
                            setIsDetailOpen(true);
                          }}
                          className="inline-flex items-center gap-1.5 bg-cyan-400/10 hover:bg-cyan-400 hover:text-black border border-cyan-400/20 text-cyan-400 px-3.5 py-1.5 rounded-xl text-xs font-bold transition duration-200 cursor-pointer"
                        >
                          <Eye size={13} />
                          <span>View Thread</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {!loading && totalPages > 1 && (
            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <span className="text-xs text-gray-500">
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, sortedQueries.length)} of {sortedQueries.length} entries
              </span>
              <div className="flex gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="px-3.5 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-gray-400 hover:text-white disabled:opacity-40 disabled:hover:text-gray-400 transition cursor-pointer"
                >
                  Prev
                </button>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="px-3.5 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-gray-400 hover:text-white disabled:opacity-40 disabled:hover:text-gray-400 transition cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Query detail drawer */}
      <QueryDrawer
        isOpen={isDetailOpen}
        queryId={selectedQueryId}
        onClose={() => {
          setIsDetailOpen(false);
          setSelectedQueryId(null);
        }}
        onStatusUpdated={handleStatusUpdated}
      />
    </HRLayout>
  );
}
