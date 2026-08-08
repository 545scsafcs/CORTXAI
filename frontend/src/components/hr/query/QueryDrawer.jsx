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
    <>
      {/* Dark Blurred Backdrop Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Slide-in Panel Drawer Container */}
      <div
        ref={drawerRef}
        className={`fixed right-0 top-0 h-screen z-50 bg-white border-l border-slate-200 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out font-sans ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } w-full sm:w-[70%] lg:w-[480px]`}
      >
        {/* Sticky Header Section */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <button
              ref={backButtonRef}
              onClick={onClose}
              className="p-2 -ml-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
              aria-label="Go back and close panel"
            >
              <ArrowLeft size={18} />
            </button>
            <h2 className="text-lg font-bold text-slate-900 font-outfit">Query Details</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
            aria-label="Close panel"
          >
            <X size={18} />
          </button>
        </div>

        {/* Loading State Skeleton */}
        {loading && (
          <div className="flex-1 p-6 space-y-6 overflow-y-auto">
            <div className="animate-pulse flex items-center space-x-4">
              <div className="rounded-full bg-slate-100 h-12 w-12"></div>
              <div className="flex-1 space-y-2 py-1">
                <div className="h-4 bg-slate-100 rounded w-3/4"></div>
                <div className="h-3 bg-slate-100 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !query && isOpen && (
          <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-3">
            <AlertCircle size={36} className="text-slate-400" />
            <p className="text-slate-900 font-bold">No Query Loaded</p>
            <p className="text-xs text-slate-500 text-center font-medium">Please select a query from the table to view details.</p>
          </div>
        )}

        {/* Main Content Area */}
        {!loading && query && (
          <>
            {/* Section 1: Sticky/Fixed Employee details header */}
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 shrink-0">
              <div className="flex items-center gap-4 mb-4">
                {query.employee?.profilePhoto ? (
                  <img
                    src={query.employee.profilePhoto}
                    alt={query.employeeName}
                    className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 shrink-0 font-bold">
                    <User size={20} />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-bold text-slate-900 font-outfit truncate">{query.employeeName}</h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5 truncate">{query.designation} • {query.department}</p>
                </div>
              </div>

              {/* Status and Priority pills */}
              <div className="flex flex-wrap gap-2.5 items-center">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider ${getStatusBadgeColor(query.status)}`}>
                  {query.status}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider ${getPriorityBadgeColor(query.priority)}`}>
                  {query.priority}
                </span>
                <span className="text-[10px] font-bold text-slate-700 bg-slate-200/60 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Tag size={10} className="text-slate-900" />
                  {query.category}
                </span>
              </div>

              {/* Status Action Dropdown */}
              <div className="mt-4 flex items-center justify-between gap-4">
                <span className="text-xs font-bold text-slate-700">Update status:</span>
                <select
                  value={query.status}
                  disabled={statusUpdating}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-indigo-500 disabled:opacity-50 font-bold cursor-pointer shadow-2xs"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>

            {/* Section 2: Conversation timeline (scrolls independently) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin bg-slate-50/30">
              {/* Original Query Message */}
              <div className="flex items-start gap-3 bg-white border border-slate-200/80 rounded-2xl p-4 max-w-[88%] shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 shrink-0">
                  <User size={15} />
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs font-bold text-slate-900">{query.employeeName}</span>
                    <span className="text-[9px] text-slate-400 font-mono">
                      {new Date(query.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mt-1.5 font-outfit">{query.subject}</h4>
                  <p className="text-xs text-slate-700 mt-1 whitespace-pre-wrap leading-relaxed font-medium">
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
                    className={`flex items-start gap-3 max-w-[88%] ${isHRReply ? "ml-auto flex-row-reverse" : ""}`}
                  >
                    <div className={`w-8 h-8 rounded-lg shrink-0 mt-0.5 flex items-center justify-center ${
                      isHRReply
                        ? "bg-[#0F172A] text-white"
                        : "bg-indigo-50 text-indigo-700 border border-indigo-200"
                    }`}>
                      {isHRReply ? <AlertCircle size={15} /> : <User size={15} />}
                    </div>
                    <div className={`rounded-2xl p-4 border shadow-2xs ${
                      isHRReply
                        ? "bg-[#0F172A] text-white border-slate-900"
                        : "bg-white border-slate-200 text-slate-900"
                    }`}>
                      <div className="flex items-baseline gap-2">
                        <span className={`text-xs font-bold ${isHRReply ? "text-white" : "text-slate-900"}`}>{reply.senderName}</span>
                        <span className={`text-[9px] font-mono ${isHRReply ? "text-slate-300" : "text-slate-400"}`}>
                          {new Date(reply.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                      <p className={`text-xs mt-1 whitespace-pre-wrap leading-relaxed font-medium ${isHRReply ? "text-slate-100" : "text-slate-700"}`}>
                        {reply.message}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div ref={chatEndRef} />
            </div>

            {/* Section 3: Reply box (fixed at bottom) */}
            <div className="p-4 border-t border-slate-200 bg-white sticky bottom-0 shrink-0">
              <form onSubmit={handleSendReply} className="flex gap-3">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  disabled={submittingReply || query.status === "Closed"}
                  placeholder={query.status === "Closed" ? "This ticket has been closed." : "Type your response..."}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs text-slate-900 font-medium placeholder-slate-400 outline-none focus:bg-white focus:border-indigo-500 transition disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={submittingReply || !replyText.trim() || query.status === "Closed"}
                  className="bg-[#0F172A] hover:bg-slate-800 text-white p-3.5 rounded-2xl transition flex items-center justify-center disabled:opacity-50 shrink-0 cursor-pointer shadow-xs"
                  aria-label="Send reply"
                >
                  <Send size={15} />
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
}
