import { Routes, Route, Navigate } from "react-router-dom";

import DashboardPage from "../pages/Business/DashboardPage";
import HRPage from "../pages/Business/HRPage";
import InventoryPage from "../pages/Business/InventoryPage";
import FinancePage from "../pages/Business/FinancePage";
import AnalyticsPage from "../pages/Business/AnalyticsPage";
import AIAgentsPage from "../pages/Business/AIAgentsPage";
import SettingsPage from "../pages/Business/SettingsPage";

export default function BusinessRoutes() {
  return (
    <Routes>
      <Route index element={<DashboardPage />} />
      <Route path="hr" element={<HRPage />} />
      <Route path="inventory" element={<InventoryPage />} />
      <Route path="finance" element={<FinancePage />} />
      <Route path="analytics" element={<AnalyticsPage />} />
      <Route path="agents" element={<AIAgentsPage />} />
      <Route path="settings" element={<SettingsPage />} />

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}