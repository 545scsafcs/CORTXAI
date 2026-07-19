import React, { useState } from "react";
import EmployeeLayout from "../../components/layout/EmployeeLayout";
import { Send, FileText, CheckCircle2 } from "lucide-react";

export default function ContactHRPage() {
  const [formData, setFormData] = useState({
    subject: "",
    category: "General Query",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!formData.subject.trim() || !formData.message.trim()) {
      alert("Please fill in all fields");
      return;
    }
    setSubmitted(true);
  }

  return (
    <EmployeeLayout>
      <div className="space-y-8 max-w-4xl">
        <div>
          <h1 className="text-5xl font-black text-white">Contact HR</h1>
          <p className="text-gray-400 mt-2 text-lg">Send queries directly to HR Managers and Nora AI.</p>
        </div>

        {submitted ? (
          <div className="rounded-3xl border border-green-500/20 bg-green-500/5 p-10 text-center space-y-4">
            <div className="flex justify-center text-green-400">
              <CheckCircle2 size={60} />
            </div>
            <h2 className="text-3xl font-bold text-white">Request Dispatched</h2>
            <p className="text-gray-400 max-w-md mx-auto">
              Your query has been logged and Nora AI has notified the HR manager. You will receive an email update shortly.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ subject: "", category: "General Query", message: "" });
              }}
              className="mt-6 bg-cyan-400 text-black px-6 py-3 rounded-xl font-bold hover:bg-cyan-300 transition"
            >
              Submit Another Query
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Brief summary of your query"
                    className="w-full bg-[#0B1120] border border-white/10 p-4 rounded-xl text-white outline-none focus:ring-2 focus:ring-cyan-500/50"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#0B1120] border border-white/10 p-4 rounded-xl text-white outline-none"
                  >
                    <option value="General Query">General Query</option>
                    <option value="Payroll Issue">Payroll Issue</option>
                    <option value="Leave Dispute">Leave Dispute</option>
                    <option value="IT Support">IT Support</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-2">Message</label>
                  <textarea
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your issue or query in detail..."
                    className="w-full bg-[#0B1120] border border-white/10 p-4 rounded-xl text-white outline-none focus:ring-2 focus:ring-cyan-500/50"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="bg-cyan-400 text-black px-8 py-3.5 rounded-xl font-bold hover:bg-cyan-300 transition flex items-center gap-2"
                >
                  <Send size={18} /> Submit Query
                </button>
              </form>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#0B1120] p-8 space-y-6">
              <h3 className="text-xl font-bold text-cyan-400">HR Helpdesk info</h3>
              <div className="space-y-4 text-sm text-gray-300">
                <div className="flex gap-3">
                  <FileText className="text-gray-400 shrink-0" size={18} />
                  <p>HR response times are typically under 24 hours.</p>
                </div>
                <div className="flex gap-3">
                  <FileText className="text-gray-400 shrink-0" size={18} />
                  <p>Nora AI will index this ticket to suggest solutions instantly.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </EmployeeLayout>
  );
}
