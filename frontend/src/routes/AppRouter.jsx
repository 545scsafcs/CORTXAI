import { Routes, Route } from "react-router-dom";

import LandingPage from "../pages/Landing/LandingPage";
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";

import DashboardPage from "../pages/Business/DashboardPage";
import HRPage from "../pages/Business/HRPage";
import InventoryPage from "../pages/Business/InventoryPage";
import FinancePage from "../pages/Business/FinancePage";
import AnalyticsPage from "../pages/Business/AnalyticsPage";
import AIAgentsPage from "../pages/Business/AIAgentsPage";
import SettingsPage from "../pages/Business/SettingsPage";

import EmployeeDashboard from "../pages/Employee/EmployeeDashboard";
import AttendancePage from "../pages/Employee/AttendancePage";
import LeavePage from "../pages/Employee/LeavePage";
import SalaryPage from "../pages/Employee/SalaryPage";
import ProfilePage from "../pages/Employee/ProfilePage";

import AdminDashboard from "../pages/Admin/AdminDashboard";

export default function AppRouter() {
  return (
    <Routes>

      {/* Landing */}
      <Route path="/" element={<LandingPage />} />

      {/* Auth */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Business */}
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/dashboard/hr" element={<HRPage />} />
      <Route path="/dashboard/inventory" element={<InventoryPage />} />
      <Route path="/dashboard/finance" element={<FinancePage />} />
      <Route path="/dashboard/analytics" element={<AnalyticsPage />} />
      <Route path="/dashboard/agents" element={<AIAgentsPage />} />
      <Route path="/dashboard/settings" element={<SettingsPage />} />

      {/* Employee */}
      <Route path="/employee" element={<EmployeeDashboard />} />
      <Route path="/employee/attendance" element={<AttendancePage />} />
      <Route path="/employee/leave" element={<LeavePage />} />
      <Route path="/employee/salary" element={<SalaryPage />} />
      <Route path="/employee/profile" element={<ProfilePage />} />

      {/* Admin */}
      <Route path="/admin" element={<AdminDashboard />} />

    </Routes>
  );
}