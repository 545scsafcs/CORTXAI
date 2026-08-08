import React, { useState, useEffect } from "react";
import CRMLayout from "../../components/layout/CRMLayout";
import { 
  Calendar, Clock, CheckCircle, AlertTriangle, Plus, 
  Trash2, X, Phone, Mail, MessageCircle, AlertCircle, Sparkles, User 
} from "lucide-react";
import { getFollowUps, createFollowUp, updateFollowUp, deleteFollowUp, getLeads, getCustomers } from "../../services/crmApi";

export default function FollowupsPage() {
  const [followups, setFollowups] = useState([]);
  const [leads, setLeads] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Selection/Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    type: "Call",
    title: "",
    description: "",
    scheduledAt: "",
    leadId: "",
    customerId: "",
    assignedTo: ""
  });

  // Active user details
  const [currentEmployee, setCurrentEmployee] = useState(null);

  useEffect(() => {
    // Read logged in employee for self-assigning
    try {
      const saved = localStorage.getItem("employee");
      if (saved) setCurrentEmployee(JSON.parse(saved));
    } catch (err) {}

    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      const [folsRes, leadsRes, custsRes] = await Promise.all([
        getFollowUps(),
        getLeads(),
        getCustomers()
      ]);
      if (folsRes.success) setFollowups(folsRes.data);
      if (leadsRes.success) setLeads(leadsRes.data || []);
      if (custsRes.success) setCustomers(custsRes.data || []);
    } catch (err) {
      console.error("Failed to load followups scheduler data:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleOpenCreateModal = () => {
    setFormData({
      type: "Call",
      title: "",
      description: "",
      scheduledAt: "",
      leadId: "",
      customerId: "",
      assignedTo: currentEmployee?._id || ""
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.scheduledAt) {
      alert("Title and Scheduled Date are required.");
      return;
    }

    try {
      setSubmitting(true);
      
      const payload = { ...formData };
      if (!payload.leadId) delete payload.leadId;
      if (!payload.customerId) delete payload.customerId;

      const res = await createFollowUp(payload);
      if (res.success) {
        setIsModalOpen(false);
        loadData();
      }
    } catch (err) {
      alert(err.message || "Failed to create follow-up task.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCompleteTask = async (id) => {
    const notes = prompt("Enter summary/resolution notes for this follow-up:");
    if (notes === null) return; // cancelled

    try {
      const res = await updateFollowUp(id, { 
        status: "Completed", 
        description: notes 
      });
      if (res.success) loadData();
    } catch (err) {
      alert("Failed to complete task.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      const res = await deleteFollowUp(id);
      if (res.success) loadData();
    } catch (err) {
      alert("Failed to delete task.");
    }
  };

  const getTaskIcon = (type) => {
    switch (type) {
      case "Call": return <Phone size={14} className="text-cyan-400" />;
      case "Email": return <Mail size={14} className="text-purple-400" />;
      case "WhatsApp": return <MessageCircle size={14} className="text-green-400" />;
      default: return <Clock size={14} className="text-yellow-400" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Completed": return "bg-green-500/15 text-green-400 border border-green-500/20";
      case "Missed": return "bg-red-500/15 text-red-400 border border-red-500/20";
      default: return "bg-yellow-500/15 text-yellow-400 border border-yellow-500/20";
    }
  };

  // Divide tasks into categorizations
  const upcomingTasks = followups.filter(f => f.status === "Upcoming");
  const completedTasks = followups.filter(f => f.status === "Completed");
  const missedTasks = followups.filter(f => f.status === "Missed");

  return (
    <CRMLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black text-white font-outfit">Follow-up Scheduler</h1>
            <p className="text-gray-400 mt-2">Manage customer schedules, sales calls, meetings, and action items.</p>
          </div>
          <button
            onClick={handleOpenCreateModal}
            className="flex items-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-black px-5 py-2.5 rounded-2xl text-xs font-bold transition duration-200 cursor-pointer self-start md:self-auto"
          >
            <Plus size={16} /> Schedule Follow-up
          </button>
        </div>

        {/* Task lists split column grids */}
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-400 border-t-transparent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Columns list 1: Upcoming */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2 pb-2 border-b border-white/5">
                <Clock size={16} className="text-cyan-400" /> Upcoming Tasks ({upcomingTasks.length})
              </h3>
              <div className="space-y-3">
                {upcomingTasks.length === 0 ? (
                  <div className="py-12 text-center border-2 border-dashed border-white/5 text-gray-500 rounded-2xl text-xs">No upcoming tasks scheduled.</div>
                ) : (
                  upcomingTasks.map(fol => (
                    <div key={fol._id} className="rounded-2xl border border-white/5 bg-slate-900/40 p-4 space-y-3 relative group">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <span className="text-[10px] text-gray-500 block">
                            {new Date(fol.scheduledAt).toLocaleString()}
                          </span>
                          <h4 className="font-bold text-white text-sm mt-1.5 truncate">{fol.title}</h4>
                        </div>
                        <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                          {getTaskIcon(fol.type)}
                        </div>
                      </div>
                      
                      {fol.description && <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{fol.description}</p>}
                      
                      {/* Relations info */}
                      <div className="text-[10px] text-cyan-300 font-mono">
                        {fol.leadId && <span>Lead: {fol.leadId.company} ({fol.leadId.name})</span>}
                        {fol.customerId && <span>Customer: {fol.customerId.company}</span>}
                      </div>

                      <div className="flex gap-2 pt-2 border-t border-white/5">
                        <button
                          onClick={() => handleCompleteTask(fol._id)}
                          className="flex-1 bg-green-500/10 hover:bg-green-500 hover:text-white border border-green-500/20 text-green-400 py-1.5 rounded-xl text-[10px] font-bold transition duration-200 cursor-pointer"
                        >
                          Mark Completed
                        </button>
                        <button
                          onClick={() => handleDelete(fol._id)}
                          className="p-1.5 bg-white/5 hover:bg-red-500 hover:text-white rounded-xl text-gray-400 transition cursor-pointer"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Column list 2: Completed */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2 pb-2 border-b border-white/5">
                <CheckCircle size={16} className="text-green-400" /> Completed Tasks ({completedTasks.length})
              </h3>
              <div className="space-y-3">
                {completedTasks.length === 0 ? (
                  <div className="py-12 text-center border-2 border-dashed border-white/5 text-gray-500 rounded-2xl text-xs">No completed tasks.</div>
                ) : (
                  completedTasks.map(fol => (
                    <div key={fol._id} className="rounded-2xl border border-white/5 bg-slate-900/10 p-4 space-y-2 opacity-75">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] text-gray-500 block">
                            Completed on: {fol.completedAt ? new Date(fol.completedAt).toLocaleDateString() : new Date(fol.updatedAt).toLocaleDateString()}
                          </span>
                          <h4 className="font-bold text-gray-300 text-sm mt-1.5 truncate">{fol.title}</h4>
                        </div>
                        <span className={`text-[9px] px-2.5 py-0.5 rounded-full font-bold ${getStatusBadge(fol.status)}`}>
                          {fol.status}
                        </span>
                      </div>
                      {fol.description && <p className="text-xs text-gray-500 italic">"{fol.description}"</p>}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Column list 3: Missed */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2 pb-2 border-b border-white/5">
                <AlertTriangle size={16} className="text-red-400" /> Overdue / Missed ({missedTasks.length})
              </h3>
              <div className="space-y-3">
                {missedTasks.length === 0 ? (
                  <div className="py-12 text-center border-2 border-dashed border-white/5 text-gray-500 rounded-2xl text-xs">No missed tasks. Good job!</div>
                ) : (
                  missedTasks.map(fol => (
                    <div key={fol._id} className="rounded-2xl border border-red-500/10 bg-red-950/5 p-4 space-y-2 border-l-4 border-l-red-500">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] text-red-400 block font-bold">
                            Missed: {new Date(fol.scheduledAt).toLocaleString()}
                          </span>
                          <h4 className="font-bold text-white text-sm mt-1">{fol.title}</h4>
                        </div>
                        <span className={`text-[9px] px-2.5 py-0.5 rounded-full font-bold ${getStatusBadge(fol.status)}`}>
                          {fol.status}
                        </span>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => handleCompleteTask(fol._id)}
                          className="flex-1 bg-green-500/10 hover:bg-green-500 hover:text-white border border-green-500/20 text-green-400 py-1.5 rounded-xl text-[10px] font-bold transition duration-200 cursor-pointer"
                        >
                          Mark Completed
                        </button>
                        <button
                          onClick={() => handleDelete(fol._id)}
                          className="p-1.5 bg-white/5 hover:bg-red-500 hover:text-white rounded-xl text-gray-400 transition cursor-pointer"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        )}

        {/* SCHEDULER POPUP MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div 
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-slate-950 border border-white/10 rounded-3xl p-8 relative shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white bg-white/5 p-2 rounded-xl"
              >
                <X size={18} />
              </button>
              <h2 className="text-2xl font-bold text-white mb-6 font-outfit">Schedule Follow-up Action</h2>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-gray-400 text-xs font-semibold mb-2">Subject / Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Lead follow-up call, Proposal review meeting"
                    className="w-full bg-slate-900 border border-white/10 p-3 rounded-xl text-white outline-none focus:ring-1 focus:ring-cyan-500/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-xs font-semibold mb-2">Contact Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full bg-slate-900 border border-white/10 p-3 rounded-xl text-white outline-none"
                    >
                      <option value="Call">Call</option>
                      <option value="Email">Email</option>
                      <option value="Meeting">Meeting</option>
                      <option value="WhatsApp">WhatsApp</option>
                      <option value="Reminder">Reminder</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs font-semibold mb-2">Date & Time</label>
                    <input
                      type="datetime-local"
                      required
                      value={formData.scheduledAt}
                      onChange={(e) => setFormData({ ...formData, scheduledAt: e.target.value })}
                      className="w-full bg-slate-900 border border-white/10 p-3 rounded-xl text-white outline-none focus:ring-1 focus:ring-cyan-500/50 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-xs font-semibold mb-2">Link Lead (Optional)</label>
                    <select
                      value={formData.leadId}
                      onChange={(e) => setFormData({ ...formData, leadId: e.target.value, customerId: "" })}
                      className="w-full bg-slate-900 border border-white/10 p-3 rounded-xl text-white outline-none"
                    >
                      <option value="">None</option>
                      {leads.map(ld => (
                        <option key={ld._id} value={ld._id}>{ld.company} ({ld.name})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs font-semibold mb-2">Link Customer (Optional)</label>
                    <select
                      value={formData.customerId}
                      onChange={(e) => setFormData({ ...formData, customerId: e.target.value, leadId: "" })}
                      className="w-full bg-slate-900 border border-white/10 p-3 rounded-xl text-white outline-none"
                    >
                      <option value="">None</option>
                      {customers.map(c => (
                        <option key={c._id} value={c._id}>{c.company}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-xs font-semibold mb-2">Task Details / Remarks</label>
                  <textarea
                    rows="3"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 p-3 rounded-xl text-white outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-cyan-400 hover:bg-cyan-300 text-black py-4 rounded-xl font-bold transition duration-200 cursor-pointer"
                >
                  {submitting ? "Scheduling..." : "Schedule Follow-up Task"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </CRMLayout>
  );
}
