import React, { useState, useEffect } from "react";
import CRMLayout from "../../components/layout/CRMLayout";
import { TrendingUp, Award, Frown, Users, DollarSign, ChevronRight } from "lucide-react";
import { getLeads, updateLead } from "../../services/crmApi";

const STAGES = ["New", "Contacted", "Qualified", "Proposal", "Negotiation", "Won", "Lost"];

export default function PipelinePage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [draggingId, setDraggingId] = useState(null);

  useEffect(() => {
    loadLeads();
  }, []);

  async function loadLeads() {
    try {
      setLoading(true);
      const res = await getLeads();
      if (res.success) {
        setLeads(res.data);
      }
    } catch (err) {
      console.error("Failed to load pipeline leads:", err);
    } finally {
      setLoading(false);
    }
  }

  // HTML5 Drag and Drop handlers
  const handleDragStart = (e, id) => {
    setDraggingId(id);
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e, targetStage) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain") || draggingId;
    if (!id) return;

    // Find the lead to check if stage actually changed
    const targetLead = leads.find(l => l._id === id);
    if (!targetLead || targetLead.status === targetStage) return;

    // Optimistic UI update
    setLeads(prev => 
      prev.map(l => l._id === id ? { ...l, status: targetStage } : l)
    );

    try {
      // Backend status update. This will auto-convert to customer if stage is "Won"
      const res = await updateLead(id, { status: targetStage });
      if (res.success) {
        // If transitioned to "Won", alert that customer profile is initialized
        if (targetStage === "Won") {
          alert(`Lead converted successfully! A Customer Profile has been initialized for "${targetLead.company}".`);
        }
        loadLeads();
      }
    } catch (err) {
      console.error("Pipeline transition failed:", err);
      alert("Failed to update lead stage.");
      loadLeads(); // roll back
    } finally {
      setDraggingId(null);
    }
  };

  const getPriorityBorder = (priority) => {
    switch (priority) {
      case "High": return "border-l-4 border-l-red-500";
      case "Medium": return "border-l-4 border-l-blue-500";
      default: return "border-l-4 border-l-gray-500";
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "High": return "bg-red-500/10 text-red-400";
      case "Medium": return "bg-blue-500/10 text-blue-400";
      default: return "bg-gray-500/10 text-gray-400";
    }
  };

  // Group leads by stage
  const columns = {};
  STAGES.forEach(stage => {
    columns[stage] = leads.filter(l => l.status === stage);
  });

  // Calculate sum of Expected Revenue per column
  const getStageTotalRevenue = (stageLeads) => {
    return stageLeads.reduce((sum, item) => sum + (item.expectedRevenue || 0), 0);
  };

  return (
    <CRMLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-black text-white font-outfit">Sales Pipeline Board</h1>
          <p className="text-gray-400 mt-2">Drag and drop leads through stages of conversion. Transitioning to "Won" triggers Customer Profile conversion.</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-400 border-t-transparent"></div>
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-thin min-h-[70vh] items-start">
            {STAGES.map(stage => {
              const stageLeads = columns[stage] || [];
              const totalRev = getStageTotalRevenue(stageLeads);
              return (
                <div
                  key={stage}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, stage)}
                  className="w-80 shrink-0 bg-slate-950/40 border border-white/5 rounded-3xl p-4 flex flex-col max-h-[70vh] shadow-lg"
                >
                  {/* Column Header */}
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
                    <div>
                      <h3 className="font-extrabold text-white text-sm flex items-center gap-1.5">
                        {stage === "Won" ? (
                          <Award size={14} className="text-green-400" />
                        ) : stage === "Lost" ? (
                          <Frown size={14} className="text-red-400" />
                        ) : (
                          <TrendingUp size={14} className="text-cyan-400" />
                        )}
                        {stage}
                      </h3>
                      <span className="text-[10px] text-gray-500 mt-0.5 block">{stageLeads.length} Leads</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-black text-cyan-300 font-mono">${totalRev.toLocaleString()}</span>
                      <span className="text-[8px] text-gray-500 uppercase block font-bold tracking-wider">Est. Revenue</span>
                    </div>
                  </div>

                  {/* Column Cards Scrollable */}
                  <div className="flex-1 space-y-3 overflow-y-auto pr-1 scrollbar-thin">
                    {stageLeads.length === 0 ? (
                      <div className="py-12 border-2 border-dashed border-white/5 rounded-2xl text-center text-gray-600 text-xs font-medium">
                        Drop leads here
                      </div>
                    ) : (
                      stageLeads.map(lead => (
                        <div
                          key={lead._id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, lead._id)}
                          className={`bg-[#0b1120] border border-white/5 p-4 rounded-2xl shadow hover:border-cyan-500/40 cursor-grab active:cursor-grabbing transition duration-150 relative ${getPriorityBorder(lead.priority)}`}
                        >
                          <h4 className="font-bold text-white text-xs truncate leading-snug">{lead.company}</h4>
                          <p className="text-[10px] text-gray-400 mt-0.5 truncate">{lead.name}</p>

                          <div className="mt-3 flex items-center justify-between">
                            <span className="text-xs font-black text-cyan-400 font-mono">
                              ${(lead.expectedRevenue || 0).toLocaleString()}
                            </span>
                            <span className={`text-[8px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${getPriorityBadge(lead.priority)}`}>
                              {lead.priority}
                            </span>
                          </div>
                          
                          <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[9px] text-gray-500">
                            <span>Src: {lead.leadSource}</span>
                            <span className="font-bold truncate max-w-[100px]">
                              {lead.assignedTo?.firstName || "Unassigned"}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </CRMLayout>
  );
}
