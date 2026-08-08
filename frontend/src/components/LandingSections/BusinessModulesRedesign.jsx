import React from "react";
import { motion } from "framer-motion";
import VideoSection from "../common/VideoSection";

export default function BusinessModulesRedesign() {
  return (
    <div id="features" className="bg-[#ffffff]">
      
      {/* 1. HR MODULE - White Background - Split Layout */}
      <section className="py-28 px-8 bg-[#ffffff] text-[#0f172a] relative overflow-hidden border-b border-black/[0.03]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] font-bold tracking-[0.25em] text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase">
              Autonomous HR System
            </span>
            <h3 className="text-4xl md:text-5xl font-black font-outfit text-slate-900 tracking-tight leading-[1.1]">
              Automate human capital alignment.
            </h3>
            <p className="text-slate-500 font-sans leading-relaxed text-base">
              Nora coordinates employee check-ins, calculates hours, drafts monthly salary ledgers, and highlights compliance factors. Staff can request leaves directly via conversational text queries, avoiding complicated HR portals.
            </p>
            <div className="space-y-3 font-sans text-sm font-semibold text-slate-700">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                Conversational Leave Approvals via Nora
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                Live Attendance-to-Payroll Reconciliations
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                Automated Recruitment Ingest & Interview Prep
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <VideoSection type="hr" />
          </div>

        </div>
      </section>

      {/* 2. CRM MODULE - Soft Cream Background - Asymmetric Layout */}
      <section className="py-28 px-8 bg-[#F7F5F0] text-[#0f172a] relative overflow-hidden border-b border-black/[0.03]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-7 order-2 lg:order-1">
            <VideoSection type="crm" />
          </div>

          <div className="lg:col-span-5 space-y-6 order-1 lg:order-2">
            <span className="text-[10px] font-bold tracking-[0.25em] text-rose-600 bg-rose-50 px-3 py-1 rounded-full uppercase">
              Predictive CRM Layer
            </span>
            <h3 className="text-4xl md:text-5xl font-black font-outfit text-slate-900 tracking-tight leading-[1.1]">
              Close details before they go cold.
            </h3>
            <p className="text-slate-500 font-sans leading-relaxed text-base">
              Nora continuously grades inbound pipeline leads based on interactions. If an enterprise prospect shows high intent, Nora drafts tailored introductory emails, maps pricing parameters, and alerts representatives.
            </p>
            <div className="space-y-3 font-sans text-sm font-semibold text-slate-700">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                Cognitive Inbound Lead Enrichment
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                Auto-Triggered Email & Scheduling Flows
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                Real-Time Competitor Mention Alerts
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. FINANCE MODULE - Very Light Gray Background - Centered Widescreen Card */}
      <section className="py-28 px-8 bg-[#F5F5F7] text-[#0f172a] relative overflow-hidden border-b border-black/[0.03]">
        <div className="max-w-5xl mx-auto text-center space-y-6 mb-16">
          <span className="text-[10px] font-bold tracking-[0.25em] text-amber-600 bg-amber-50 px-3 py-1 rounded-full uppercase">
            Autonomous Ledger Engine
          </span>
          <h3 className="text-4xl md:text-5xl font-black font-outfit text-slate-900 tracking-tight leading-[1.1] max-w-2xl mx-auto">
            Zero-reconciliation financial accounting.
          </h3>
          <p className="text-slate-500 font-sans leading-relaxed text-base max-w-xl mx-auto">
            Transactions coordinate instantly into double-entry ledger columns. Balance sheets update in real-time as sales resolve, inventory reorders, or payroll executes.
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <VideoSection type="finance" />
        </div>
      </section>

      {/* 4. INVENTORY MODULE - White Background - Grid Card Detail */}
      <section className="py-28 px-8 bg-[#ffffff] text-[#0f172a] relative overflow-hidden border-b border-black/[0.03]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] font-bold tracking-[0.25em] text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase">
              Autonomous Stock Matrix
            </span>
            <h3 className="text-4xl md:text-5xl font-black font-outfit text-slate-900 tracking-tight leading-[1.1]">
              Never let sales outrun stock capacity.
            </h3>
            <p className="text-slate-500 font-sans leading-relaxed text-base">
              Nora maps inventory thresholds and schedules reorders directly with registered supplier directories. As soon as items fall below critical boundaries, Purchase Orders compile and route for sign-off.
            </p>
            <div className="space-y-3 font-sans text-sm font-semibold text-slate-700">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Live Multi-Warehouse Adjustments
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Auto-Generated Purchase Request Pipeline
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Supplier Scorecard Integration
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <VideoSection type="inventory" />
          </div>

        </div>
      </section>

      {/* 5. SALES & ANALYTICS MODULE - Warm Off White Background - Magazine Spread */}
      <section className="py-28 px-8 bg-[#FCFBF9] text-[#0f172a] relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-7 order-2 lg:order-1">
            <VideoSection type="sales" />
          </div>

          <div className="lg:col-span-5 space-y-6 order-1 lg:order-2">
            <span className="text-[10px] font-bold tracking-[0.25em] text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase">
              Sales & Predictive Analytics
            </span>
            <h3 className="text-4xl md:text-5xl font-black font-outfit text-slate-900 tracking-tight leading-[1.1]">
              Operational forecasting that predicts the future.
            </h3>
            <p className="text-slate-500 font-sans leading-relaxed text-base">
              Nora consolidates analytics parameters from HR expenses, sales margins, and material costs to generate multi-variable projections. Ask Nora, "What happens to margin if supply cost climbs 8% next month?" and get an instant forecast.
            </p>
            <div className="space-y-3 font-sans text-sm font-semibold text-slate-700">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                Predictive Margin Impact Calculations
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                Instant Natural Language Graph Drafting
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                Anomaly Detection Alerts across Ledgers
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
