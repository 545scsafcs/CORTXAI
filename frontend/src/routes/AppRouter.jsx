import { Routes, Route } from "react-router-dom";

import LandingPage from "../pages/Landing/LandingPage";
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";

import DashboardPage from "../pages/Business/DashboardPage";
import EmployeeDashboard from "../pages/Employee/EmployeeDashboard";
import AdminDashboard from "../pages/Admin/AdminDashboard";

import HRPage from "../pages/Business/HRPage";
import InventoryPage from "../pages/Business/InventoryPage";
import FinancePage from "../pages/Business/FinancePage";
import AnalyticsPage from "../pages/Business/AnalyticsPage";
import AIAgentsPage from "../pages/Business/AIAgentsPage";
import SettingsPage from "../pages/Business/SettingsPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/dashboard/hr" element={<HRPage />} />
      <Route path="/dashboard/inventory" element={<InventoryPage />} />
      <Route path="/dashboard/finance" element={<FinancePage />} />
      <Route path="/dashboard/analytics" element={<AnalyticsPage />} />
      <Route path="/dashboard/agents" element={<AIAgentsPage />} />
      <Route path="/dashboard/settings" element={<SettingsPage />} />

      <Route path="/employee" element={<EmployeeDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}