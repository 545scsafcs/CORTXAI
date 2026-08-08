import React, { useState, useEffect } from "react";
import CRMLayout from "../../components/layout/CRMLayout";
import { 
  Plus, Search, Edit2, Trash2, CheckCircle, Download, Upload, 
  Trash, ArrowUpDown, ChevronLeft, ChevronRight, UserPlus, Filter, X 
} from "lucide-react";
import { 
  getLeads, createLead, updateLead, deleteLead, 
  bulkUpdateLeads, bulkDeleteLeads 
} from "../../services/crmApi";
import { getEmployees } from "../../services/employeeApi";

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Search & Filter
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  // Pagination & Sorting
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  // Selection
  const [selectedIds, setSelectedIds] = useState([]);

  // Modals / Forms
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    industry: "",
    email: "",
    phone: "",
    address: "",
    website: "",
    leadSource: "Website",
    assignedTo: "",
    priority: "Medium",
    status: "New",
    expectedRevenue: 0,
    notes: ""
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      const [leadsRes, empsRes] = await Promise.all([getLeads(), getEmployees()]);
      if (leadsRes.success) setLeads(leadsRes.data);
      if (empsRes.success) setEmployees(empsRes.data || []);
    } catch (err) {
      console.error("Failed to load Leads workspace data:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleOpenCreateModal = () => {
    setEditingLead(null);
    setFormData({
      name: "",
      company: "",
      industry: "",
      email: "",
      phone: "",
      address: "",
      website: "",
      leadSource: "Website",
      assignedTo: "",
      priority: "Medium",
      status: "New",
      expectedRevenue: 0,
      notes: ""
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (lead) => {
    setEditingLead(lead);
    setFormData({
      name: lead.name,
      company: lead.company,
      industry: lead.industry || "",
      email: lead.email,
      phone: lead.phone || "",
      address: lead.address || "",
      website: lead.website || "",
      leadSource: lead.leadSource || "Website",
      assignedTo: lead.assignedTo?._id || lead.assignedTo || "",
      priority: lead.priority || "Medium",
      status: lead.status || "New",
      expectedRevenue: lead.expectedRevenue || 0,
      notes: lead.notes || ""
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData };
      if (!payload.assignedTo) delete payload.assignedTo;

      let res;
      if (editingLead) {
        res = await updateLead(editingLead._id, payload);
      } else {
        res = await createLead(payload);
      }

      if (res.success) {
        setIsModalOpen(false);
        loadData();
      }
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Failed to save lead.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;
    try {
      const res = await deleteLead(id);
      if (res.success) loadData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(currentItems.map(item => item._id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Bulk Actions
  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm(`Are you sure you want to delete the ${selectedIds.length} selected leads?`)) return;
    try {
      const res = await bulkDeleteLeads(selectedIds);
      if (res.success) {
        setSelectedIds([]);
        loadData();
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleBulkStatusChange = async (status) => {
    if (selectedIds.length === 0) return;
    try {
      const res = await bulkUpdateLeads(selectedIds, status);
      if (res.success) {
        setSelectedIds([]);
        loadData();
      }
    } catch (err) {
      alert(err.message);
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = "Name,Company,Industry,Email,Phone,Website,LeadSource,Priority,Status,ExpectedRevenue\n";
    const rows = sortedLeads.map(l => 
      `"${l.name}","${l.company}","${l.industry || ""}","${l.email}","${l.phone || ""}","${l.website || ""}","${l.leadSource}","${l.priority}","${l.status}",${l.expectedRevenue}`
    ).join("\n");
    
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", "CORTXAI_Leads.csv");
    a.click();
  };

  // Lightweight Import Parser (Mock / local parsing)
  const handleImportCSV = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      const text = evt.target.result;
      const lines = text.split("\n").slice(1); // skip headers
      
      let importedCount = 0;
      for (const line of lines) {
        if (!line.trim()) continue;
        const columns = line.split(",").map(c => c.replace(/"/g, "").trim());
        
        if (columns.length >= 2) {
          try {
            await createLead({
              name: columns[0],
              company: columns[1],
              industry: columns[2] || "",
              email: columns[3] || `${columns[0].toLowerCase().replace(/ /g, "")}@example.com`,
              phone: columns[4] || "",
              website: columns[5] || "",
              leadSource: columns[6] || "Website",
              priority: columns[7] || "Medium",
              status: columns[8] || "New",
              expectedRevenue: parseFloat(columns[9]) || 0
            });
            importedCount++;
          } catch (err) {
            console.error("Failed to import line:", line, err);
          }
        }
      }
      alert(`Import completed! Successfully imported ${importedCount} leads.`);
      loadData();
    };
    reader.readAsText(file);
  };

  // Filtering
  const filteredLeads = leads.filter(l => {
    const matchesSearch = 
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.company.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || l.status === statusFilter;
    const matchesPriority = priorityFilter === "All" || l.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Sorting
  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  const sortedLeads = [...filteredLeads].sort((a, b) => {
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

  // Pagination
  const totalPages = Math.ceil(sortedLeads.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedLeads.slice(indexOfFirstItem, indexOfLastItem);

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "High": return "bg-red-500/10 text-red-400 border border-red-500/20";
      case "Medium": return "bg-blue-500/10 text-blue-400 border border-blue-500/20";
      default: return "bg-gray-500/10 text-gray-400 border border-gray-500/20";
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "New": return "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20";
      case "Contacted": return "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20";
      case "Qualified": return "bg-purple-500/10 text-purple-400 border border-purple-500/20";
      case "Won": return "bg-green-500/10 text-green-400 border border-green-500/20";
      case "Lost": return "bg-red-500/10 text-red-400 border border-red-500/20";
      default: return "bg-slate-500/10 text-slate-400 border border-slate-500/20";
    }
  };

  return (
    <CRMLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black text-white font-outfit">Lead Management</h1>
            <p className="text-gray-400 mt-2">Log, track, and convert sales prospects to customer profiles.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white px-4 py-2.5 rounded-2xl cursor-pointer text-xs font-bold transition duration-200">
              <Upload size={14} />
              <span>Import CSV</span>
              <input type="file" accept=".csv" onChange={handleImportCSV} className="hidden" />
            </label>
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white px-4 py-2.5 rounded-2xl text-xs font-bold transition duration-200 cursor-pointer"
            >
              <Download size={14} /> Export CSV
            </button>
            <button
              onClick={handleOpenCreateModal}
              className="flex items-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-black px-5 py-2.5 rounded-2xl text-xs font-bold transition duration-200 cursor-pointer"
            >
              <Plus size={16} /> Add New Lead
            </button>
          </div>
        </div>

        {/* Toolbar & Filters */}
        <div className="rounded-3xl border border-white/5 bg-slate-950/30 p-6 space-y-4 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                <Search size={16} />
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                placeholder="Search by lead, company, email..."
                className="w-full bg-[#030712] border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-xs text-white outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-400/50 transition-all duration-300"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 bg-[#030712] border border-white/10 rounded-2xl px-3.5 py-2 text-xs text-gray-300">
                <Filter size={12} className="text-cyan-400" />
                <span>Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                  className="bg-transparent border-none text-white focus:outline-none font-bold"
                >
                  <option value="All">All</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Proposal">Proposal</option>
                  <option value="Negotiation">Negotiation</option>
                  <option value="Won">Won</option>
                  <option value="Lost">Lost</option>
                </select>
              </div>

              <div className="flex items-center gap-2 bg-[#030712] border border-white/10 rounded-2xl px-3.5 py-2 text-xs text-gray-300">
                <Filter size={12} className="text-cyan-400" />
                <span>Priority:</span>
                <select
                  value={priorityFilter}
                  onChange={(e) => { setPriorityFilter(e.target.value); setCurrentPage(1); }}
                  className="bg-transparent border-none text-white focus:outline-none font-bold"
                >
                  <option value="All">All</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>
          </div>

          {/* Bulk Action Controls */}
          {selectedIds.length > 0 && (
            <div className="flex items-center gap-4 bg-cyan-950/20 border border-cyan-500/20 p-4 rounded-2xl text-xs text-cyan-300 animate-fadeIn">
              <span className="font-bold">{selectedIds.length} leads selected</span>
              <div className="h-4 w-[1px] bg-white/15"></div>
              <div className="flex items-center gap-2">
                <span>Change Status:</span>
                <select
                  onChange={(e) => handleBulkStatusChange(e.target.value)}
                  defaultValue=""
                  className="bg-slate-900 border border-white/10 rounded-xl px-2 py-1 text-xs text-white focus:outline-none focus:ring-1 focus:ring-cyan-500/50 cursor-pointer"
                >
                  <option value="" disabled>Select Status</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Proposal">Proposal</option>
                  <option value="Negotiation">Negotiation</option>
                  <option value="Won">Won</option>
                  <option value="Lost">Lost</option>
                </select>
              </div>
              <button
                onClick={handleBulkDelete}
                className="flex items-center gap-1 bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white px-3 py-1.5 rounded-xl font-bold transition duration-200 ml-auto cursor-pointer"
              >
                <Trash size={12} /> Bulk Delete
              </button>
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto rounded-2xl border border-white/5">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/80 text-gray-400 text-[10px] uppercase tracking-wider border-b border-white/5">
                  <th className="py-4.5 px-6 w-12 text-center">
                    <input 
                      type="checkbox" 
                      onChange={handleSelectAll} 
                      checked={currentItems.length > 0 && selectedIds.length === currentItems.length}
                    />
                  </th>
                  <th className="py-4.5 px-6 font-extrabold cursor-pointer" onClick={() => handleSort("name")}>Lead Name <ArrowUpDown size={10} className="inline ml-1" /></th>
                  <th className="py-4.5 px-6 font-extrabold cursor-pointer" onClick={() => handleSort("company")}>Company <ArrowUpDown size={10} className="inline ml-1" /></th>
                  <th className="py-4.5 px-6 font-extrabold">Email / Phone</th>
                  <th className="py-4.5 px-6 font-extrabold">Industry</th>
                  <th className="py-4.5 px-6 font-extrabold">Rep Assigned</th>
                  <th className="py-4.5 px-6 font-extrabold cursor-pointer" onClick={() => handleSort("priority")}>Priority</th>
                  <th className="py-4.5 px-6 font-extrabold cursor-pointer" onClick={() => handleSort("status")}>Status</th>
                  <th className="py-4.5 px-6 font-extrabold cursor-pointer" onClick={() => handleSort("expectedRevenue")}>Est. Revenue</th>
                  <th className="py-4.5 px-6 font-extrabold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs text-gray-300">
                {loading ? (
                  <tr>
                    <td colSpan={10} className="py-16 text-center">
                      <div className="inline-flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-3 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-gray-400 text-xs font-semibold">Loading Leads...</span>
                      </div>
                    </td>
                  </tr>
                ) : currentItems.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="py-16 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <UserPlus size={36} className="text-gray-600 animate-bounce" />
                        <p className="font-bold text-gray-400">No Leads Logged</p>
                        <p className="text-[10px] text-gray-600">Create a lead or import a CSV file to get started.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  currentItems.map((l) => (
                    <tr key={l._id} className="hover:bg-white/[0.02] transition-colors duration-150">
                      <td className="py-4.5 px-6 text-center">
                        <input 
                          type="checkbox" 
                          checked={selectedIds.includes(l._id)}
                          onChange={() => handleSelectOne(l._id)}
                        />
                      </td>
                      <td className="py-4.5 px-6 font-bold text-white">{l.name}</td>
                      <td className="py-4.5 px-6 font-semibold">{l.company}</td>
                      <td className="py-4.5 px-6">
                        <span className="block text-gray-300">{l.email}</span>
                        <span className="block text-[10px] text-gray-500 mt-0.5">{l.phone || "No Phone"}</span>
                      </td>
                      <td className="py-4.5 px-6">{l.industry || "General"}</td>
                      <td className="py-4.5 px-6">
                        {l.assignedTo 
                          ? `${l.assignedTo.firstName} ${l.assignedTo.lastName || ""}` 
                          : <span className="text-gray-600 font-italic">Unassigned</span>}
                      </td>
                      <td className="py-4.5 px-6">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${getPriorityBadge(l.priority)}`}>
                          {l.priority}
                        </span>
                      </td>
                      <td className="py-4.5 px-6">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${getStatusBadge(l.status)}`}>
                          {l.status}
                        </span>
                      </td>
                      <td className="py-4.5 px-6 font-semibold text-white">
                        ${(l.expectedRevenue || 0).toLocaleString()}
                      </td>
                      <td className="py-4.5 px-6 text-right">
                        <div className="inline-flex gap-2">
                          <button
                            onClick={() => handleOpenEditModal(l)}
                            className="p-2 bg-white/5 hover:bg-cyan-400 hover:text-black border border-white/5 rounded-xl transition duration-200 cursor-pointer"
                          >
                            <Edit2 size={12} />
                          </button>
                          <button
                            onClick={() => handleDelete(l._id)}
                            className="p-2 bg-white/5 hover:bg-red-500 hover:text-white border border-white/5 rounded-xl transition duration-200 cursor-pointer"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <span className="text-xs text-gray-500">
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, sortedLeads.length)} of {sortedLeads.length} entries
              </span>
              <div className="flex gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="px-3.5 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-gray-400 hover:text-white disabled:opacity-40 disabled:hover:text-gray-400 transition cursor-pointer"
                >
                  <ChevronLeft size={14} className="inline" /> Prev
                </button>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="px-3.5 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-gray-400 hover:text-white disabled:opacity-40 disabled:hover:text-gray-400 transition cursor-pointer"
                >
                  Next <ChevronRight size={14} className="inline" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CREATE & EDIT LEAD MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-slate-950 border border-white/10 rounded-3xl p-8 relative overflow-y-auto max-h-[90vh] shadow-2xl"
          >
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white bg-white/5 p-2 rounded-xl"
            >
              <X size={18} />
            </button>
            <h2 className="text-2xl font-bold text-white mb-6 font-outfit">
              {editingLead ? "Edit Lead Account" : "Add New Lead"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-xs font-semibold mb-2">Lead Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 p-3 rounded-xl text-white outline-none focus:ring-1 focus:ring-cyan-500/50"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-xs font-semibold mb-2">Company / Corporate Account</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 p-3 rounded-xl text-white outline-none focus:ring-1 focus:ring-cyan-500/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-xs font-semibold mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 p-3 rounded-xl text-white outline-none focus:ring-1 focus:ring-cyan-500/50"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-xs font-semibold mb-2">Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 p-3 rounded-xl text-white outline-none focus:ring-1 focus:ring-cyan-500/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-xs font-semibold mb-2">Industry Sector</label>
                  <input
                    type="text"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    placeholder="e.g. IT, Healthcare, Retail"
                    className="w-full bg-slate-900 border border-white/10 p-3 rounded-xl text-white outline-none focus:ring-1 focus:ring-cyan-500/50"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-xs font-semibold mb-2">Website URL</label>
                  <input
                    type="text"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 p-3 rounded-xl text-white outline-none focus:ring-1 focus:ring-cyan-500/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-400 text-xs font-semibold mb-2">Lead Source</label>
                  <select
                    value={formData.leadSource}
                    onChange={(e) => setFormData({ ...formData, leadSource: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 p-3 rounded-xl text-white outline-none"
                  >
                    <option value="Organic">Organic</option>
                    <option value="Referral">Referral</option>
                    <option value="Website">Website</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Cold Call">Cold Call</option>
                    <option value="Email Campaign">Email Campaign</option>
                    <option value="Advertisement">Advertisement</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 text-xs font-semibold mb-2">Urgency Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 p-3 rounded-xl text-white outline-none"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 text-xs font-semibold mb-2">Lead Stage Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 p-3 rounded-xl text-white outline-none"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Proposal">Proposal</option>
                    <option value="Negotiation">Negotiation</option>
                    <option value="Won">Won</option>
                    <option value="Lost">Lost</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-xs font-semibold mb-2">Assigned Sales Executive</label>
                  <select
                    value={formData.assignedTo}
                    onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 p-3 rounded-xl text-white outline-none"
                  >
                    <option value="">Unassigned</option>
                    {employees.map(emp => (
                      <option key={emp._id} value={emp._id}>
                        {emp.firstName} {emp.lastName || ""} ({emp.department})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 text-xs font-semibold mb-2">Expected Revenue ($)</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.expectedRevenue}
                    onChange={(e) => setFormData({ ...formData, expectedRevenue: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-slate-900 border border-white/10 p-3 rounded-xl text-white outline-none focus:ring-1 focus:ring-cyan-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-xs font-semibold mb-2">Internal Remarks / Notes</label>
                <textarea
                  rows="3"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-slate-900 border border-white/10 p-3 rounded-xl text-white outline-none focus:ring-1 focus:ring-cyan-500/50"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-cyan-400 hover:bg-cyan-300 text-black py-4 rounded-xl font-bold transition duration-200 cursor-pointer mt-4"
              >
                {editingLead ? "Save Changes" : "Create Lead"}
              </button>
            </form>
          </div>
        </div>
      )}
    </CRMLayout>
  );
}
