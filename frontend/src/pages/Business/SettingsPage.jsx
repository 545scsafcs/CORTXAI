// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import UnifiedLayout from "../../components/layout/UnifiedLayout";
import PageHeader from "../../components/ui/PageHeader";
import GlassCard from "../../components/ui/GlassCard";
// eslint-disable-next-line no-unused-vars
import { FormSection, TextInput, SelectInput, ToggleSwitch, TextArea } from "../../components/ui/FormComponents";
import Button from "../../components/ui/Button";
// eslint-disable-next-line no-unused-vars
import { Settings, Save, ShieldCheck } from "lucide-react";

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    orgName: "CortxAI Enterprise",
    timezone: "UTC+05:30 (IST)",
    currency: "INR (₹)",
    autoAudit: true,
    noraMode: "Continuous Autonomous",
    apiKey: "cortx_live_9081249812904812",
  });

  return (
    <UnifiedLayout>
      <div className="space-y-8 font-sans">
        <PageHeader
          title="System Settings & Governance"
          subtitle="Configure business parameters, security policies, and Nora AI execution thresholds."
          badge="System Control"
          badgeColor="from-slate-400 to-cyan-500"
          breadcrumbs={[{ label: "Business Suite" }, { label: "Settings" }]}
          actions={
            <Button variant="primary" className="bg-cyan-400 text-black hover:bg-cyan-300 font-bold text-xs">
              <Save size={15} className="inline mr-1.5" /> Save Configuration
            </Button>
          }
        />

        <GlassCard dept="business" className="space-y-8 max-w-4xl">
          <FormSection title="Organization Details" subtitle="General company identification parameters.">
            <TextInput
              label="Organization Display Name"
              value={formData.orgName}
              onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
            />
            <SelectInput
              label="Default Currency"
              value={formData.currency}
              options={["INR (₹)", "USD ($)", "EUR (€)"]}
              onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
            />
          </FormSection>

          <FormSection title="Nora AI Governance" subtitle="Telemetry frequency and automatic reconciliation toggles.">
            <SelectInput
              label="Nora Execution Mode"
              value={formData.noraMode}
              options={["Continuous Autonomous", "Human-in-the-Loop Signoff", "Strict Audit Only"]}
              onChange={(e) => setFormData({ ...formData, noraMode: e.target.value })}
            />
            <div className="flex items-center justify-between pt-4">
              <ToggleSwitch
                label="Automatic Ledger Reconciliation"
                checked={formData.autoAudit}
                onChange={(val) => setFormData({ ...formData, autoAudit: val })}
              />
            </div>
          </FormSection>

          <FormSection title="API & Key Security" subtitle="System integration secret tokens.">
            <TextInput
              label="Master API Secret Key"
              type="password"
              value={formData.apiKey}
              onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
            />
          </FormSection>
        </GlassCard>
      </div>
    </UnifiedLayout>
  );
}