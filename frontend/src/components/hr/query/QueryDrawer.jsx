import React, { useState, useEffect, useRef } from "react";
import { X, ArrowLeft, Send, User, Calendar, Tag, MessageSquare, AlertCircle } from "lucide-react";
import { getQueryById, updateQueryStatus, addQueryReply } from "../../../services/queryApi";
import { useEmployee } from "../../../context/EmployeeContext";

export default function QueryDrawer({ isOpen, queryId, onClose, onStatusUpdated }) {
  const { employee: currentHR } = useEmployee();
  const [query, setQuery] = useState(null);
  const [loading, setLoading] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [submittingReply, setSubmittingReply] = useState(false);
  const [statusUpdating, setStatusUpdating] = useState(false);
  
  const chatEndRef = useRef(null);
  const drawerRef = useRef(null);
  const backButtonRef = useRef(null);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (queryId) {
        fetchQueryDetails();
      }
    } else {
      document.body.style.overflow = "unset";
      setQuery(null);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, queryId]);

  // Handle ESC key and focus trapping
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      // Simple focus trap: focus back button on open
      setTimeout(() => {
        backButtonRef.current?.focus();
      }, 100);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Scroll to bottom on replies update
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [query?.replies, loading]);

  async function fetchQueryDetails() {
    try {
      setLoading(true);
      const res = await getQueryById(queryId);
      if (res.success) {
        setQuery(res.data);
      }
    } catch (err) {
      console.error("Failed to load query details:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(newStatus) {
    try {
      setStatusUpdating(true);
      const res = await updateQueryStatus(queryId, newStatus);
      if (res.success) {
        setQuery(res.data);
        if (onStatusUpdated) onStatusUpdated(queryId, newStatus);
      }
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Failed to update query status.");
    } finally {
      setStatusUpdating(false);
    }
  }

  async function handleSendReply(e) {
    e.preventDefault();
    if (!replyText.trim()) return;

    try {
      setSubmittingReply(true);
      
      const hrSender = {
        _id: currentHR._id,
        firstName: currentHR.firstName,
        lastName: currentHR.lastName,
        isHR: true,
      };

      const res = await addQueryReply(queryId, hrSender, replyText);
      if (res.success) {
        setQuery(res.data);
        setReplyText("");
        if (onStatusUpdated && res.data.status !== query.status) {
          onStatusUpdated(queryId, res.data.status);
        }
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
    <>
      {/* Dark Blurred Backdrop Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Slide-in Panel Drawer Container */}
      <div
        ref={drawerRef}
        className={`fixed right-0 top-0 h-screen z-50 bg-slate-950 border-l border-white/10 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } w-full sm:w-[70%] lg:w-[480px]`}
      >
        {/* Sticky Header Section */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-900/60 sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <button
              ref={backButtonRef}
              onClick={onClose}
              className="p-2 -ml-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              aria-label="Go back and close panel"
            >
              <ArrowLeft size={20} />
            </button>
            <h2 className="text-lg font-bold text-white font-outfit">Query Details</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            aria-label="Close panel"
          >
            <X size={20} />
          </button>
        </div>

        {/* Loading State Skeleton */}
        {loading && (
          <div className="flex-1 p-6 space-y-6 overflow-y-auto">
            <div className="animate-pulse flex items-center space-x-4">
              <div className="rounded-full bg-slate-800 h-12 w-12"></div>
              <div className="flex-1 space-y-2 py-1">
                <div className="h-4 bg-slate-800 rounded w-3/4"></div>
                <div className="h-3 bg-slate-800 rounded w-1/2"></div>
              </div>
            </div>
            <div className="animate-pulse space-y-3 pt-4">
              <div className="h-4 bg-slate-800 rounded"></div>
              <div className="h-4 bg-slate-800 rounded w-5/6"></div>
              <div className="h-4 bg-slate-800 rounded w-2/3"></div>
            </div>
            <div className="animate-pulse space-y-4 pt-10">
              <div className="h-12 bg-slate-800 rounded-2xl w-3/4"></div>
              <div className="h-16 bg-slate-800 rounded-2xl w-4/5 ml-auto"></div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !query && isOpen && (
          <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-3">
            <AlertCircle size={40} className="text-gray-500" />
            <p className="text-gray-400 font-semibold">No Query Loaded</p>
            <p className="text-xs text-gray-600 text-center">Please select a query from the table to view details.</p>
          </div>
        )}

        {/* Main Content Area */}
        {!loading && query && (
          <>
            {/* Section 1: Sticky/Fixed Employee details header */}
            <div className="p-6 border-b border-white/10 bg-slate-900/20 shrink-0">
              <div className="flex items-center gap-4 mb-4">
                {query.employee?.profilePhoto ? (
                  <img
                    src={query.employee.profilePhoto}
                    alt={query.employeeName}
                    className="w-12 h-12 rounded-2xl object-cover border border-white/10"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                    <User size={20} />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-bold text-white leading-tight truncate">{query.employeeName}</h3>
                  <p className="text-xs text-gray-400 mt-0.5 truncate">{query.designation} • {query.department}</p>
                </div>
              </div>

              {/* Status and Priority pills */}
              <div className="flex flex-wrap gap-2.5 items-center">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${getStatusBadgeColor(query.status)}`}>
                  {query.status}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${getPriorityBadgeColor(query.priority)}`}>
                  {query.priority}
                </span>
                <span className="text-[10px] text-gray-400 bg-white/5 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Tag size={10} className="text-cyan-400" />
                  {query.category}
                </span>
              </div>

              {/* Status Action Dropdown */}
              <div className="mt-4 flex items-center justify-between gap-4">
                <span className="text-xs text-gray-500">Update status:</span>
                <select
                  value={query.status}
                  disabled={statusUpdating}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className="bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-cyan-500/50 disabled:opacity-50 font-bold cursor-pointer"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>

            {/* Section 2: Conversation timeline (scrolls independently) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin bg-[#030712]/30">
              {/* Original Query Message */}
              <div className="flex items-start gap-3 bg-white/[0.02] border border-white/5 rounded-2xl p-4 max-w-[85%]">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                  <User size={16} />
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs font-bold text-white">{query.employeeName}</span>
                    <span className="text-[9px] text-gray-500">
                      {new Date(query.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mt-1.5">{query.subject}</h4>
                  <p className="text-xs text-gray-300 mt-1 whitespace-pre-wrap leading-relaxed">
                    {query.message}
                  </p>
                </div>
              </div>

              {/* Timeline replies */}
              {query.replies && query.replies.map((reply) => {
                const isHRReply = reply.senderRole === "hr";
                return (
                  <div
                    key={reply._id}
                    className={`flex items-start gap-3 max-w-[85%] ${isHRReply ? "ml-auto flex-row-reverse" : ""}`}
                  >
                    <div className={`w-8 h-8 rounded-lg shrink-0 mt-0.5 flex items-center justify-center ${
                      isHRReply
                        ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                        : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                    }`}>
                      {isHRReply ? <AlertCircle size={16} /> : <User size={16} />}
                    </div>
                    <div className={`rounded-2xl p-4 border ${
                      isHRReply
                        ? "bg-purple-500/5 border-purple-500/10"
                        : "bg-white/[0.02] border-white/5"
                    }`}>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xs font-bold text-white">{reply.senderName}</span>
                        <span className="text-[9px] text-gray-500">
                          {new Date(reply.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                      <p className="text-xs text-gray-300 mt-1 whitespace-pre-wrap leading-relaxed">
                        {reply.message}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div ref={chatEndRef} />
            </div>

            {/* Section 3: Reply box (fixed at bottom) */}
            <div className="p-4 border-t border-white/10 bg-slate-950 sticky bottom-0 shrink-0">
              <form onSubmit={handleSendReply} className="flex gap-3">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  disabled={submittingReply || query.status === "Closed"}
                  placeholder={query.status === "Closed" ? "This ticket has been closed." : "Type your response..."}
                  className="flex-1 bg-[#090f1d] border border-white/10 rounded-2xl px-4 py-3 text-xs text-white outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-400/50 transition duration-300 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={submittingReply || !replyText.trim() || query.status === "Closed"}
                  className="bg-cyan-400 hover:bg-cyan-300 text-black p-3.5 rounded-2xl transition duration-300 flex items-center justify-center disabled:opacity-50 shrink-0 cursor-pointer"
                  aria-label="Send reply"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
}
