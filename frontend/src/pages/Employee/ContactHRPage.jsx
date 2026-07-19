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
      case "Urgent": return "bg-red-500/10 text-red-400 border border-red-500/20";
      case "High": return "bg-amber-500/10 text-amber-400 border border-amber-500/20";
      case "Medium": return "bg-blue-500/10 text-blue-400 border border-blue-500/20";
      default: return "bg-gray-500/10 text-gray-400 border border-gray-500/20";
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Pending": return "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20";
      case "In Progress": return "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20";
      case "Resolved": return "bg-green-500/10 text-green-400 border border-green-500/20";
      default: return "bg-slate-500/10 text-slate-400 border border-slate-500/20";
    }
  };

  return (
    <EmployeeLayout>
      <div className="space-y-8 max-w-4xl">
        {/* Title Header */}
        <div>
          <h1 className="text-5xl font-black text-white tracking-tight font-outfit">Contact HR</h1>
          <p className="text-gray-400 mt-2 text-lg">
            Submit support tickets and questions directly to your department HR Manager.
          </p>
        </div>

        {submitted ? (
          <div className="rounded-3xl border border-green-500/20 bg-green-500/5 p-10 text-center space-y-4">
            <div className="flex justify-center text-green-400">
              <CheckCircle2 size={60} />
            </div>
            <h2 className="text-3xl font-bold text-white font-outfit">Query Dispatched</h2>
            <p className="text-gray-400 max-w-md mx-auto">
              Your support ticket has been recorded successfully. The HR manager for the <span className="text-cyan-400 font-bold">{employee?.department || "General"}</span> department has been notified.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ subject: "", category: "General Query", priority: "Medium", message: "" });
              }}
              className="mt-6 bg-cyan-400 text-black px-6 py-3 rounded-xl font-bold hover:bg-cyan-300 transition duration-200 cursor-pointer"
            >
              Submit Another Query
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Ticket Submission Form */}
            <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-300 font-semibold mb-2 text-sm">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Brief summary of your query"
                    className="w-full bg-[#0B1120] border border-white/10 p-4 rounded-xl text-white outline-none focus:ring-2 focus:ring-cyan-500/50"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-2 text-sm">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-[#0B1120] border border-white/10 p-4 rounded-xl text-white outline-none"
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
                    <label className="block text-gray-300 font-semibold mb-2 text-sm">Priority</label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                      className="w-full bg-[#0B1120] border border-white/10 p-4 rounded-xl text-white outline-none"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-2 text-sm">Message</label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your issue or query in detail..."
                    className="w-full bg-[#0B1120] border border-white/10 p-4 rounded-xl text-white outline-none focus:ring-2 focus:ring-cyan-500/50"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-cyan-400 hover:bg-cyan-300 text-black px-8 py-3.5 rounded-xl font-bold transition duration-200 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send size={18} />
                  <span>{submitting ? "Sending Query..." : "Submit Query"}</span>
                </button>
              </form>
            </div>

            {/* Helpdesk Info Panel */}
            <div className="rounded-3xl border border-white/10 bg-[#0B1120] p-8 space-y-6 h-fit">
              <h3 className="text-xl font-bold text-cyan-400 font-outfit">HR Helpdesk info</h3>
              <div className="space-y-4 text-sm text-gray-300">
                <div className="flex gap-3">
                  <Clock className="text-gray-400 shrink-0 mt-0.5" size={18} />
                  <p>HR response times are typically under 24 hours.</p>
                </div>
                <div className="flex gap-3">
                  <FileText className="text-gray-400 shrink-0 mt-0.5" size={18} />
                  <p>Your ticket is auto-routed based on your registered department: <span className="text-cyan-400 font-bold">{employee?.department || "General"}</span></p>
                </div>
                <div className="flex gap-3">
                  <MessageSquare className="text-gray-400 shrink-0 mt-0.5" size={18} />
                  <p>You can track resolution and chat directly with HR in the "My Queries" panel below.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* My Queries / Tickets History Section */}
        <div className="space-y-6 pt-6">
          <h2 className="text-3xl font-black text-white font-outfit">My Queries</h2>
          
          {loadingTickets ? (
            <div className="flex items-center gap-2 justify-center py-10 text-gray-500">
              <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
              <span>Fetching query history...</span>
            </div>
          ) : tickets.length === 0 ? (
            <div className="rounded-3xl border border-white/5 bg-slate-950/20 p-8 text-center text-gray-500">
              <AlertCircle className="mx-auto text-gray-600 mb-2" size={32} />
              <p className="font-bold">No tickets logged yet</p>
              <p className="text-xs text-gray-600">Submit a query above to start a thread with HR.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {tickets.map((ticket) => {
                const isExpanded = expandedTicketId === ticket._id;
                return (
                  <div 
                    key={ticket._id}
                    className="rounded-2xl border border-white/5 bg-slate-950/40 overflow-hidden transition-all duration-200"
                  >
                    {/* Collapsible header */}
                    <div 
                      onClick={() => setExpandedTicketId(isExpanded ? null : ticket._id)}
                      className="p-5 flex items-center justify-between gap-4 hover:bg-white/[0.02] cursor-pointer"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${getStatusBadgeColor(ticket.status)}`}>
                            {ticket.status}
                          </span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${getPriorityBadgeColor(ticket.priority)}`}>
                            {ticket.priority}
                          </span>
                          <span className="text-[10px] text-gray-500">
                            Category: {ticket.category}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-white mt-1.5 truncate">{ticket.subject}</h4>
                      </div>
                      
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-xs text-gray-500">
                          {new Date(ticket.createdAt).toLocaleDateString()}
                        </span>
                        {isExpanded ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
                      </div>
                    </div>

                    {/* Chat body when expanded */}
                    {isExpanded && (
                      <div className="border-t border-white/5 bg-slate-950/60 p-5 space-y-4">
                        {/* Conversation Thread */}
                        <div className="max-h-[300px] overflow-y-auto space-y-4 pr-2 scrollbar-thin">
                          {/* Original employee message */}
                          <div className="flex items-start gap-3 bg-white/[0.02] border border-white/5 rounded-2xl p-4 max-w-[85%]">
                            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                              <User size={16} />
                            </div>
                            <div>
                              <div className="flex items-baseline gap-2">
                                <span className="text-sm font-bold text-white">{ticket.employeeName}</span>
                                <span className="text-[10px] text-gray-500">
                                  {new Date(ticket.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                </span>
                              </div>
                              <p className="text-sm text-gray-300 mt-1 whitespace-pre-wrap leading-relaxed">
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
                                className={`flex items-start gap-3 max-w-[85%] ${!isHRReply ? "ml-auto flex-row-reverse" : ""}`}
                              >
                                <div className={`w-8 h-8 rounded-lg shrink-0 mt-0.5 flex items-center justify-center ${
                                  isHRReply 
                                    ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" 
                                    : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                                }`}>
                                  {isHRReply ? <AlertCircle size={16} /> : <User size={16} />}
                                </div>
                                <div className={`rounded-2xl p-4 border ${
                                  !isHRReply 
                                    ? "bg-cyan-500/5 border-cyan-500/10 text-right" 
                                    : "bg-white/[0.02] border-white/5"
                                }`}>
                                  <div className={`flex items-baseline gap-2 ${!isHRReply ? "justify-end" : ""}`}>
                                    <span className="text-sm font-bold text-white">{reply.senderName}</span>
                                    <span className="text-[10px] text-gray-500">
                                      {new Date(reply.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-300 mt-1 whitespace-pre-wrap leading-relaxed text-left">
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
                          <form onSubmit={(e) => handleSendReply(e, ticket._id)} className="flex gap-3 pt-3 border-t border-white/5">
                            <input
                              type="text"
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              disabled={submittingReply}
                              placeholder="Type a follow-up reply..."
                              className="flex-1 bg-[#090f1d] border border-white/10 rounded-2xl px-5 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-400/50 transition duration-300"
                            />
                            <button
                              type="submit"
                              disabled={submittingReply || !replyText.trim()}
                              className="bg-cyan-400 hover:bg-cyan-300 text-black px-5 py-3 rounded-2xl font-bold transition duration-300 flex items-center justify-center disabled:opacity-50 shrink-0 cursor-pointer text-sm"
                            >
                              Send
                            </button>
                          </form>
                        ) : (
                          <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-4 text-center text-xs text-gray-500">
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
