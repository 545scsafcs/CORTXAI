import React, { useState, useEffect } from "react";
import CRMLayout from "../../components/layout/CRMLayout";
import { 
  Users, Search, Eye, Building, Mail, Phone, Calendar, 
  MapPin, CheckCircle, Plus, FileText, AlertCircle, Sparkles, X, MessageSquare 
} from "lucide-react";
import { getCustomers, updateCustomer, logCustomerInteraction } from "../../services/crmApi";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Selection/Detail View Drawer
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Forms inside drawer
  const [complianceData, setComplianceData] = useState({ gstIn: "", pan: "", address: "" });
  const [interactionForm, setInteractionForm] = useState({ type: "Call", summary: "" });
  const [updatingCompliance, setUpdatingCompliance] = useState(false);
  const [submittingInteraction, setSubmittingInteraction] = useState(false);

  useEffect(() => {
    loadCustomers();
  }, []);

  async function loadCustomers() {
    try {
      setLoading(true);
      const res = await getCustomers();
      if (res.success) {
        setCustomers(res.data);
      }
    } catch (err) {
      console.error("Failed to load customer profiles:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleOpenDrawer = (customer) => {
    setSelectedCustomer(customer);
    setComplianceData({
      gstIn: customer.gstIn || "",
      pan: customer.pan || "",
      address: customer.address || ""
    });
    setInteractionForm({ type: "Call", summary: "" });
    setIsDrawerOpen(true);
  };

  const handleSaveCompliance = async (e) => {
    e.preventDefault();
    if (!selectedCustomer) return;
    try {
      setUpdatingCompliance(true);
      const res = await updateCustomer(selectedCustomer._id, complianceData);
      if (res.success) {
        setSelectedCustomer(res.data);
        loadCustomers();
        alert("Corporate compliance details updated successfully.");
      }
    } catch (err) {
      alert("Failed to save compliance details.");
    } finally {
      setUpdatingCompliance(false);
    }
  };

  const handleLogInteraction = async (e) => {
    e.preventDefault();
    if (!selectedCustomer || !interactionForm.summary.trim()) return;
    try {
      setSubmittingInteraction(true);
      const res = await logCustomerInteraction(
        selectedCustomer._id, 
        interactionForm.type, 
        interactionForm.summary
      );
      if (res.success) {
        setSelectedCustomer(res.data);
        setInteractionForm({ ...interactionForm, summary: "" });
        loadCustomers();
      }
    } catch (err) {
      alert("Failed to record interaction.");
    } finally {
      setSubmittingInteraction(false);
    }
  };

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <CRMLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-black text-white font-outfit">Customer Accounts</h1>
          <p className="text-gray-400 mt-2">Manage corporate profiles, GST/PAN compliance details, and CRM interactions timeline.</p>
        </div>

        {/* Search */}
        <div className="rounded-3xl border border-white/5 bg-slate-950/30 p-6 shadow-xl">
          <div className="relative max-w-md">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
              <Search size={16} />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by customer name, company or email..."
              className="w-full bg-[#030712] border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-xs text-white outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-400/50 transition-all duration-300"
            />
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
            {loading ? (
              <div className="col-span-full py-16 text-center">
                <div className="w-8 h-8 border-3 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <span className="text-xs text-gray-500">Loading directory...</span>
              </div>
            ) : filteredCustomers.length === 0 ? (
              <div className="col-span-full py-16 text-center rounded-2xl border border-white/5 bg-slate-950/10">
                <Users size={36} className="text-gray-600 mx-auto mb-2 animate-bounce" />
                <p className="font-bold text-gray-400">No Customers Located</p>
                <p className="text-xs text-gray-600">Customers are initialized automatically when leads are marked "Won".</p>
              </div>
            ) : (
              filteredCustomers.map(cust => (
                <div 
                  key={cust._id}
                  className="rounded-2xl border border-white/5 bg-slate-900/40 p-6 flex flex-col justify-between hover:border-cyan-400/30 transition duration-150 relative overflow-hidden group"
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="min-w-0">
                        <h3 className="font-bold text-white text-base truncate">{cust.company}</h3>
                        <p className="text-xs text-gray-400 truncate mt-0.5">{cust.name}</p>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 flex items-center justify-center shrink-0">
                        <Building size={18} />
                      </div>
                    </div>

                    <hr className="border-white/5" />

                    {/* Metadata fields */}
                    <div className="space-y-2.5 text-xs text-gray-300">
                      <div className="flex items-center gap-2">
                        <Mail size={12} className="text-cyan-400" />
                        <span className="truncate">{cust.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={12} className="text-cyan-400" />
                        <span>{cust.phone || "No phone logged"}</span>
                      </div>
                      {cust.gstIn && (
                        <div className="flex items-center gap-2 font-mono">
                          <span className="text-[10px] bg-cyan-500/15 text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/20">GSTIN</span>
                          <span className="truncate">{cust.gstIn}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleOpenDrawer(cust)}
                    className="w-full mt-6 flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-cyan-400 hover:text-black py-2.5 rounded-xl text-xs font-bold transition duration-200 cursor-pointer"
                  >
                    <Eye size={14} /> View Timeline & Compliance
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* CUSTOMER DETAIL RIGHT SLIDE-IN DRAWER */}
      <div 
        onClick={() => setIsDrawerOpen(false)}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isDrawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />
      <div 
        className={`fixed right-0 top-0 h-screen bg-slate-950 border-l border-white/10 z-50 transition-transform duration-300 flex flex-col w-full sm:w-[75%] lg:w-[500px] shadow-2xl ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {selectedCustomer && (
          <>
            {/* Drawer Header */}
            <div className="p-6 border-b border-white/10 bg-slate-900/60 sticky top-0 z-10 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white font-outfit truncate max-w-[320px]">{selectedCustomer.company}</h2>
                <p className="text-xs text-gray-400 mt-0.5">Corporate Client Timeline</p>
              </div>
              <button 
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Panel Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
              
              {/* Profile Card */}
              <div className="rounded-2xl border border-white/5 bg-[#0b1120] p-4 space-y-3">
                <h4 className="text-xs font-extrabold text-cyan-400 uppercase tracking-wider">Contact Person Details</h4>
                <div className="text-xs text-gray-300 space-y-2">
                  <p><span className="text-gray-500">Contact:</span> {selectedCustomer.name}</p>
                  <p><span className="text-gray-500">Registered Email:</span> {selectedCustomer.email}</p>
                  <p><span className="text-gray-500">Registered Phone:</span> {selectedCustomer.phone || "N/A"}</p>
                  {selectedCustomer.website && <p><span className="text-gray-500">Website:</span> {selectedCustomer.website}</p>}
                </div>
              </div>

              {/* Compliance Info Form */}
              <form onSubmit={handleSaveCompliance} className="rounded-2xl border border-white/5 bg-[#0b1120] p-5 space-y-4">
                <h4 className="text-xs font-extrabold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Building size={12} /> Compliance & Billing
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-gray-500 uppercase font-bold mb-1.5">GST Identification No.</label>
                    <input 
                      type="text"
                      value={complianceData.gstIn}
                      onChange={(e) => setComplianceData({ ...complianceData, gstIn: e.target.value })}
                      placeholder="e.g. 22AAAAA0000A1Z5"
                      className="w-full bg-slate-900 border border-white/10 p-2.5 rounded-lg text-xs text-white outline-none focus:border-cyan-400/50"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-500 uppercase font-bold mb-1.5">Income Tax PAN No.</label>
                    <input 
                      type="text"
                      value={complianceData.pan}
                      onChange={(e) => setComplianceData({ ...complianceData, pan: e.target.value })}
                      placeholder="e.g. ABCDE1234F"
                      className="w-full bg-slate-900 border border-white/10 p-2.5 rounded-lg text-xs text-white outline-none focus:border-cyan-400/50"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] text-gray-500 uppercase font-bold mb-1.5">Corporate Registered Address</label>
                  <textarea
                    rows="2"
                    value={complianceData.address}
                    onChange={(e) => setComplianceData({ ...complianceData, address: e.target.value })}
                    placeholder="Physical billing address"
                    className="w-full bg-slate-900 border border-white/10 p-2.5 rounded-lg text-xs text-white outline-none focus:border-cyan-400/50"
                  />
                </div>
                <button
                  type="submit"
                  disabled={updatingCompliance}
                  className="w-full bg-cyan-400 hover:bg-cyan-300 text-black py-2 rounded-xl text-xs font-bold transition duration-200 cursor-pointer disabled:opacity-50"
                >
                  {updatingCompliance ? "Saving..." : "Update Compliance Information"}
                </button>
              </form>

              {/* Log Interaction Form */}
              <form onSubmit={handleLogInteraction} className="rounded-2xl border border-white/5 bg-[#0b1120] p-5 space-y-4">
                <h4 className="text-xs font-extrabold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare size={12} /> Log Sales Touchpoint
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-gray-500 uppercase font-bold mb-1.5">Contact Mode</label>
                    <select
                      value={interactionForm.type}
                      onChange={(e) => setInteractionForm({ ...interactionForm, type: e.target.value })}
                      className="w-full bg-slate-900 border border-white/10 p-2.5 rounded-lg text-xs text-white outline-none"
                    >
                      <option value="Call">Call</option>
                      <option value="Email">Email</option>
                      <option value="Meeting">Meeting</option>
                      <option value="WhatsApp">WhatsApp</option>
                      <option value="Note">Note</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] text-gray-500 uppercase font-bold mb-1.5">Interaction Summary</label>
                  <textarea
                    rows="2.5"
                    required
                    value={interactionForm.summary}
                    onChange={(e) => setInteractionForm({ ...interactionForm, summary: e.target.value })}
                    placeholder="Log summary of details negotiated..."
                    className="w-full bg-slate-900 border border-white/10 p-2.5 rounded-lg text-xs text-white outline-none focus:border-cyan-400/50"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submittingInteraction || !interactionForm.summary.trim()}
                  className="w-full bg-cyan-400 hover:bg-cyan-300 text-black py-2 rounded-xl text-xs font-bold transition duration-200 cursor-pointer disabled:opacity-50"
                >
                  {submittingInteraction ? "Logging..." : "Log Touchpoint"}
                </button>
              </form>

              {/* Interaction Feed */}
              <div className="space-y-4">
                <h4 className="text-xs font-extrabold text-cyan-400 uppercase tracking-wider">Interaction & Action Timeline</h4>
                <div className="relative border-l-2 border-white/5 pl-4 ml-2 space-y-5 py-2 text-xs">
                  {selectedCustomer.interactionHistory && selectedCustomer.interactionHistory.length > 0 ? (
                    selectedCustomer.interactionHistory.map((act, index) => (
                      <div key={index} className="relative">
                        <span className="absolute -left-6.5 top-0.5 w-3.5 h-3.5 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center shrink-0"></span>
                        <div className="flex items-center justify-between text-gray-500 text-[10px]">
                          <span>{act.type} • Logged</span>
                          <span>{new Date(act.date).toLocaleDateString()}</span>
                        </div>
                        <p className="text-gray-300 mt-1 font-medium">{act.summary}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-600">No client touchpoints recorded yet. Log one above.</div>
                  )}

                  {/* Converter trace event */}
                  {selectedCustomer.timeline && selectedCustomer.timeline.map((evt, idx) => (
                    <div key={`evt-${idx}`} className="relative">
                      <span className="absolute -left-6.5 top-0.5 w-3.5 h-3.5 rounded-full bg-slate-950 border-2 border-purple-500 flex items-center justify-center shrink-0"></span>
                      <div className="flex items-center justify-between text-gray-500 text-[10px]">
                        <span>{evt.event}</span>
                        <span>{new Date(evt.date).toLocaleDateString()}</span>
                      </div>
                      <p className="text-gray-300 mt-1">{evt.description}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </>
        )}
      </div>
    </CRMLayout>
  );
}
