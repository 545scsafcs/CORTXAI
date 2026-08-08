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
      case "Urgent": return "bg-rose-50 text-rose-800 border border-rose-200/90 font-extrabold";
      case "High": return "bg-amber-50 text-amber-900 border border-amber-200/90 font-extrabold";
      case "Medium": return "bg-blue-50 text-blue-900 border border-blue-200/90 font-extrabold";
      default: return "bg-slate-100 text-slate-700 border border-slate-200 font-extrabold";
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Pending": return "bg-amber-50 text-amber-900 border border-amber-200/90 font-extrabold";
      case "In Progress": return "bg-indigo-50 text-indigo-900 border border-indigo-200/90 font-extrabold";
      case "Resolved": return "bg-emerald-50 text-emerald-800 border border-emerald-200/90 font-extrabold";
      default: return "bg-slate-100 text-slate-700 border border-slate-200 font-extrabold";
    }
  };

  return (
    <HRLayout>
      <div className="space-y-8 font-sans">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white border border-slate-200/80 p-6 sm:p-8 rounded-3xl shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-600" />
          <div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 font-outfit">
              Department Queries
            </h1>
            <p className="text-slate-600 mt-2 text-xs sm:text-sm font-semibold leading-relaxed font-sans">
              Manage and resolve employee tickets for the <span className="text-indigo-700 font-bold">{currentHR?.department || "HR"}</span> department.
            </p>
          </div>
          <button
            onClick={fetchData}
            className="flex items-center gap-2 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-800 px-4 py-2.5 rounded-2xl text-xs font-bold transition duration-200 self-start md:self-auto cursor-pointer shadow-2xs"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            <span>Sync Queries</span>
          </button>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 flex items-center justify-between shadow-sm">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider font-outfit">Total Queries</span>
              <h3 className="text-3xl font-black text-slate-900 font-outfit">{stats.total}</h3>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-700 border border-indigo-200">
              <MessageSquare size={20} />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 flex items-center justify-between shadow-sm">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider font-outfit">Pending Action</span>
              <h3 className="text-3xl font-black text-amber-700 font-outfit">{stats.pending}</h3>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-800 border border-amber-200">
              <AlertCircle size={20} />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 flex items-center justify-between shadow-sm">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider font-outfit">Resolved Tickets</span>
              <h3 className="text-3xl font-black text-emerald-700 font-outfit">{stats.resolved + stats.closed}</h3>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-800 border border-emerald-200">
              <CheckCircle2 size={20} />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 flex items-center justify-between shadow-sm">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider font-outfit">Avg Resolution</span>
              <h3 className="text-3xl font-black text-slate-900 font-outfit">
                {stats.avgResponseHours} <span className="text-xs text-slate-500 font-medium">Hrs</span>
              </h3>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-700 border border-purple-200">
              <Clock size={20} />
            </div>
          </div>
        </div>

        {/* Toolbar & Filters */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 space-y-4 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Search size={16} />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search by Employee, ID, Subject..."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-xs text-slate-900 font-medium placeholder-slate-400 outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
              {["All", "Pending", "In Progress", "Resolved", "Closed"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setStatusFilter(tab);
                    setCurrentPage(1);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition duration-150 cursor-pointer ${
                    statusFilter === tab
                      ? "bg-[#0F172A] text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Data Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100/90 text-slate-900 text-[11px] font-black uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3.5 px-5 font-outfit cursor-pointer" onClick={() => handleSort("employeeName")}>Employee</th>
                  <th className="py-3.5 px-5 font-outfit cursor-pointer" onClick={() => handleSort("employeeCode")}>ID</th>
                  <th className="py-3.5 px-5 font-outfit cursor-pointer" onClick={() => handleSort("department")}>Dept</th>
                  <th className="py-3.5 px-5 font-outfit cursor-pointer" onClick={() => handleSort("subject")}>Subject</th>
                  <th className="py-3.5 px-5 font-outfit cursor-pointer" onClick={() => handleSort("category")}>Category</th>
                  <th className="py-3.5 px-5 font-outfit cursor-pointer" onClick={() => handleSort("priority")}>Priority</th>
                  <th className="py-3.5 px-5 font-outfit cursor-pointer" onClick={() => handleSort("status")}>Status</th>
                  <th className="py-3.5 px-5 font-outfit cursor-pointer" onClick={() => handleSort("createdAt")}>Date</th>
                  <th className="py-3.5 px-5 font-outfit text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
                {loading ? (
                  <tr>
                    <td colSpan={9} className="py-16 text-center">
                      <div className="inline-flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-slate-500 text-xs font-semibold">Loading queries...</span>
                      </div>
                    </td>
                  </tr>
                ) : currentItems.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-16 text-center text-slate-500">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <MessageSquare size={32} className="text-slate-400" />
                        <p className="font-bold text-slate-900">No Queries Found</p>
                        <p className="text-xs text-slate-500 font-medium">No queries match the active filter or search keywords.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  currentItems.map((q) => (
                    <tr key={q._id} className="hover:bg-slate-50/80 transition-colors duration-150">
                      <td className="py-3.5 px-5 font-bold text-slate-900 font-outfit">{q.employeeName}</td>
                      <td className="py-3.5 px-5 font-mono text-indigo-700 font-bold text-xs">{q.employeeCode}</td>
                      <td className="py-3.5 px-5">{q.department}</td>
                      <td className="py-3.5 px-5 max-w-xs truncate font-medium text-slate-800">{q.subject}</td>
                      <td className="py-3.5 px-5">{q.category}</td>
                      <td className="py-3.5 px-5">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider ${getPriorityBadgeClass(q.priority)}`}>
                          {q.priority}
                        </span>
                      </td>
                      <td className="py-3.5 px-5">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider ${getStatusBadgeClass(q.status)}`}>
                          {q.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-xs font-mono text-slate-500">
                        {new Date(q.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3.5 px-5 text-right">
                        <button
                          onClick={() => {
                            setSelectedQueryId(q._id);
                            setIsDetailOpen(true);
                          }}
                          className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 px-3 py-1.5 rounded-xl text-xs font-bold transition duration-150 cursor-pointer"
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
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <span className="text-xs text-slate-500 font-medium">
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, sortedQueries.length)} of {sortedQueries.length} entries
              </span>
              <div className="flex gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="px-3.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-40 transition cursor-pointer"
                >
                  Prev
                </button>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="px-3.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-40 transition cursor-pointer"
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
