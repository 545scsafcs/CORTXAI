import React, { useState, useEffect, useRef } from "react";
import EmployeeLayout from "../../components/layout/EmployeeLayout";
import { Send, FileText, CheckCircle2, MessageSquare, AlertCircle, Clock, ChevronDown, ChevronUp, User } from "lucide-react";
import { useEmployee } from "../../context/EmployeeContext";
import { submitQuery, getEmployeeQueries, addQueryReply } from "../../services/queryApi";

export default function ContactHRPage() {
  const { employee } = useEmployee();
  
  const [formData, setFormData] = useState({
    subject: "",
    category: "General Query",
    priority: "Medium",
    message: "",
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Tickets state
  const [tickets, setTickets] = useState([]);
  const [loadingTickets, setLoadingTickets] = useState(true);
  const [expandedTicketId, setExpandedTicketId] = useState(null);
  
  // Reply state
  const [replyText, setReplyText] = useState("");
  const [submittingReply, setSubmittingReply] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (employee?._id) {
      fetchEmployeeTickets();
    }
  }, [employee?._id]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [expandedTicketId, tickets]);

  async function fetchEmployeeTickets() {
    try {
      setLoadingTickets(true);
      const res = await getEmployeeQueries(employee._id);
      if (res.success) {
        setTickets(res.data);
      }
    } catch (err) {
      console.error("Failed to load your queries:", err);
    } finally {
      setLoadingTickets(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData.subject.trim() || !formData.message.trim()) {
      alert("Please fill in all fields");
      return;
    }

    try {
      setSubmitting(true);
      
      const payload = {
        employee: employee, // passes the full employee object containing department, designation, id, etc.
        subject: formData.subject,
        category: formData.category,
        priority: formData.priority,
        message: formData.message,
      };

      const res = await submitQuery(payload);
      if (res.success) {
        setSubmitted(true);
        // Refresh ticket list
        fetchEmployeeTickets();
      }
    } catch (err) {
      console.error("Failed to submit query:", err);
      alert(err?.response?.data?.message || "Failed to submit query. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSendReply(e, ticketId) {
    e.preventDefault();
    if (!replyText.trim()) return;

    try {
      setSubmittingReply(true);
      
      const sender = {
        _id: employee._id,
        firstName: employee.firstName,
        lastName: employee.lastName,
        isHR: false,
      };

      const res = await addQueryReply(ticketId, sender, replyText);
      if (res.success) {
        setReplyText("");
        // Update the specific ticket replies in state locally without reloading everything
        setTickets(prevTickets => 
          prevTickets.map(t => t._id === ticketId ? res.data : t)
        );
      }
    } catch (err) {
      console.error("Failed to send reply:", err);
      alert("Failed to submit reply.");
    } finally {
      setSubmittingReply(false);
    }
  }

  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case "Urgent": return "bg-rose-50 text-rose-800 border border-rose-200/90 font-extrabold";
      case "High": return "bg-amber-50 text-amber-900 border border-amber-200/90 font-extrabold";
      case "Medium": return "bg-blue-50 text-blue-900 border border-blue-200/90 font-extrabold";
      default: return "bg-slate-100 text-slate-700 border border-slate-200 font-extrabold";
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Pending": return "bg-amber-50 text-amber-900 border border-amber-200/90 font-extrabold";
      case "In Progress": return "bg-indigo-50 text-indigo-900 border border-indigo-200/90 font-extrabold";
      case "Resolved": return "bg-emerald-50 text-emerald-800 border border-emerald-200/90 font-extrabold";
      default: return "bg-slate-100 text-slate-700 border border-slate-200 font-extrabold";
    }
  };

  return (
    <EmployeeLayout>
      <div className="space-y-8 max-w-4xl font-sans">
        {/* Title Header */}
        <div className="bg-white border border-slate-200/80 p-6 sm:p-8 rounded-3xl shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-teal-600" />
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-outfit">Contact HR</h1>
          <p className="text-slate-600 mt-2 text-xs sm:text-sm font-semibold leading-relaxed font-sans">
            Submit support tickets and questions directly to your department HR Manager.
          </p>
        </div>

        {submitted ? (
          <div className="rounded-3xl border border-emerald-200 bg-emerald-50/50 p-10 text-center space-y-4 shadow-sm">
            <div className="flex justify-center text-emerald-600">
              <CheckCircle2 size={56} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 font-outfit">Query Dispatched</h2>
            <p className="text-slate-600 max-w-md mx-auto text-xs font-medium leading-relaxed">
              Your support ticket has been recorded successfully. The HR manager for the <span className="text-teal-700 font-bold">{employee?.department || "General"}</span> department has been notified.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ subject: "", category: "General Query", priority: "Medium", message: "" });
              }}
              className="mt-6 bg-[#0F172A] text-white px-6 py-3 rounded-2xl font-bold text-xs hover:bg-slate-800 transition duration-200 cursor-pointer shadow-sm"
            >
              Submit Another Query
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Ticket Submission Form */}
            <div className="lg:col-span-2 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-slate-900 font-extrabold uppercase tracking-wider mb-1.5 text-xs">Subject *</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Brief summary of your query"
                    className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-2xl text-xs text-slate-900 font-medium placeholder-slate-400 outline-none focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-900 font-extrabold uppercase tracking-wider mb-1.5 text-xs">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-2xl text-xs text-slate-900 font-medium outline-none focus:bg-white focus:border-teal-500 transition cursor-pointer"
                    >
                      <option value="General Query">General Query</option>
                      <option value="Payroll Issue">Payroll Issue</option>
                      <option value="Leave Dispute">Leave Dispute</option>
                      <option value="IT Support">IT Support</option>
                      <option value="Policy Clarification">Policy Clarification</option>
                      <option value="Workplace Issue">Workplace Issue</option>
                      <option value="Benefits">Benefits</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-900 font-extrabold uppercase tracking-wider mb-1.5 text-xs">Priority</label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-2xl text-xs text-slate-900 font-medium outline-none focus:bg-white focus:border-teal-500 transition cursor-pointer"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-900 font-extrabold uppercase tracking-wider mb-1.5 text-xs">Message *</label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your issue or query in detail..."
                    className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-2xl text-xs text-slate-900 font-medium placeholder-slate-400 outline-none focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-[#0F172A] hover:bg-slate-800 text-white px-6 py-3 rounded-2xl font-bold text-xs transition duration-200 flex items-center gap-2 cursor-pointer disabled:opacity-50 shadow-sm"
                >
                  <Send size={15} />
                  <span>{submitting ? "Sending Query..." : "Submit Query"}</span>
                </button>
              </form>
            </div>

            {/* Helpdesk Info Panel */}
            <div className="rounded-3xl border border-slate-200/80 bg-slate-50 p-6 sm:p-8 space-y-6 h-fit shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 font-outfit">HR Helpdesk Info</h3>
              <div className="space-y-4 text-xs text-slate-700 font-medium leading-relaxed">
                <div className="flex gap-3">
                  <Clock className="text-slate-400 shrink-0 mt-0.5" size={16} />
                  <p>HR response times are typically under 24 hours.</p>
                </div>
                <div className="flex gap-3">
                  <FileText className="text-slate-400 shrink-0 mt-0.5" size={16} />
                  <p>Your ticket is auto-routed based on your registered department: <span className="text-teal-700 font-bold">{employee?.department || "General"}</span></p>
                </div>
                <div className="flex gap-3">
                  <MessageSquare className="text-slate-400 shrink-0 mt-0.5" size={16} />
                  <p>You can track resolution and chat directly with HR in the "My Queries" panel below.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* My Queries / Tickets History Section */}
        <div className="space-y-6 pt-4">
          <h2 className="text-2xl font-black text-slate-900 font-outfit">My Queries</h2>
          
          {loadingTickets ? (
            <div className="flex items-center gap-2 justify-center py-10 text-slate-500 text-xs">
              <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
              <span>Fetching query history...</span>
            </div>
          ) : tickets.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
              <AlertCircle className="mx-auto text-slate-400 mb-2" size={28} />
              <p className="font-bold text-slate-900 text-sm">No tickets logged yet</p>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">Submit a query above to start a thread with HR.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {tickets.map((ticket) => {
                const isExpanded = expandedTicketId === ticket._id;
                return (
                  <div 
                    key={ticket._id}
                    className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all duration-200 shadow-2xs"
                  >
                    {/* Collapsible header */}
                    <div 
                      onClick={() => setExpandedTicketId(isExpanded ? null : ticket._id)}
                      className="p-5 flex items-center justify-between gap-4 hover:bg-slate-50/80 cursor-pointer"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full ${getStatusBadgeColor(ticket.status)}`}>
                            {ticket.status}
                          </span>
                          <span className={`text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full ${getPriorityBadgeColor(ticket.priority)}`}>
                            {ticket.priority}
                          </span>
                          <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                            Category: {ticket.category}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 mt-1.5 truncate font-outfit">{ticket.subject}</h4>
                      </div>
                      
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-xs font-mono text-slate-500">
                          {new Date(ticket.createdAt).toLocaleDateString()}
                        </span>
                        {isExpanded ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                      </div>
                    </div>

                    {/* Chat body when expanded */}
                    {isExpanded && (
                      <div className="border-t border-slate-100 bg-slate-50/50 p-5 space-y-4">
                        {/* Conversation Thread */}
                        <div className="max-h-[300px] overflow-y-auto space-y-4 pr-2 scrollbar-thin">
                          {/* Original employee message */}
                          <div className="flex items-start gap-3 bg-white border border-slate-200 rounded-2xl p-4 max-w-[88%] shadow-2xs">
                            <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 shrink-0 mt-0.5 font-bold">
                              <User size={15} />
                            </div>
                            <div>
                              <div className="flex items-baseline gap-2">
                                <span className="text-xs font-bold text-slate-900">{ticket.employeeName}</span>
                                <span className="text-[9px] text-slate-400 font-mono">
                                  {new Date(ticket.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                </span>
                              </div>
                              <p className="text-xs text-slate-700 mt-1 whitespace-pre-wrap leading-relaxed font-medium">
                                {ticket.message}
                              </p>
                            </div>
                          </div>

                          {/* Replies */}
                          {ticket.replies && ticket.replies.map((reply) => {
                            const isHRReply = reply.senderRole === "hr";
                            return (
                              <div 
                                key={reply._id} 
                                className={`flex items-start gap-3 max-w-[88%] ${!isHRReply ? "ml-auto flex-row-reverse" : ""}`}
                              >
                                <div className={`w-8 h-8 rounded-lg shrink-0 mt-0.5 flex items-center justify-center ${
                                  isHRReply 
                                    ? "bg-[#0F172A] text-white" 
                                    : "bg-teal-50 text-teal-700 border border-teal-200"
                                }`}>
                                  {isHRReply ? <AlertCircle size={15} /> : <User size={15} />}
                                </div>
                                <div className={`rounded-2xl p-4 border shadow-2xs ${
                                  !isHRReply 
                                    ? "bg-white border-slate-200 text-slate-900 text-right" 
                                    : "bg-[#0F172A] text-white border-slate-900"
                                }`}>
                                  <div className={`flex items-baseline gap-2 ${!isHRReply ? "justify-end" : ""}`}>
                                    <span className={`text-xs font-bold ${isHRReply ? "text-white" : "text-slate-900"}`}>{reply.senderName}</span>
                                    <span className={`text-[9px] font-mono ${isHRReply ? "text-slate-300" : "text-slate-400"}`}>
                                      {new Date(reply.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                    </span>
                                  </div>
                                  <p className={`text-xs mt-1 whitespace-pre-wrap leading-relaxed font-medium text-left ${isHRReply ? "text-slate-100" : "text-slate-700"}`}>
                                    {reply.message}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                          <div ref={chatEndRef} />
                        </div>

                        {/* Reply Form */}
                        {ticket.status !== "Closed" ? (
                          <form onSubmit={(e) => handleSendReply(e, ticket._id)} className="flex gap-3 pt-3 border-t border-slate-200">
                            <input
                              type="text"
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              disabled={submittingReply}
                              placeholder="Type a follow-up reply..."
                              className="flex-1 bg-white border border-slate-200 rounded-2xl px-4 py-2.5 text-xs text-slate-900 font-medium placeholder-slate-400 outline-none focus:border-teal-500 transition"
                            />
                            <button
                              type="submit"
                              disabled={submittingReply || !replyText.trim()}
                              className="bg-[#0F172A] hover:bg-slate-800 text-white px-5 py-2.5 rounded-2xl font-bold transition flex items-center justify-center disabled:opacity-50 shrink-0 cursor-pointer text-xs shadow-xs"
                            >
                              Send
                            </button>
                          </form>
                        ) : (
                          <div className="bg-slate-100 border border-slate-200 rounded-2xl p-3.5 text-center text-xs text-slate-500 font-medium">
                            This ticket has been resolved and closed. You cannot send replies.
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </EmployeeLayout>
  );
}
