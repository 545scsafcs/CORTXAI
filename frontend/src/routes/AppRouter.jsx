import { Routes, Route, Navigate } from "react-router-dom";
import { useEmployee } from "../context/EmployeeContext";

// Auth Guard for Employee Role (uses Context state)
function EmployeeProtectedRoute({ children }) {
  const { employee } = useEmployee();
  if (!employee) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

// General Role Guard (uses localStorage session)
function RoleProtectedRoute({ role, children }) {
  const userRole = localStorage.getItem("userRole");
  if (userRole !== role) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

// Pages
import LandingPage from "../pages/Landing/LandingPage";
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";

// Business Owner Portal
import DashboardPage from "../pages/Business/DashboardPage";
import HRPage from "../pages/Business/HRPage";
import InventoryPage from "../pages/Business/InventoryPage";
import FinancePage from "../pages/Business/FinancePage";
import AnalyticsPage from "../pages/Business/AnalyticsPage";
import AIAgentsPage from "../pages/Business/AIAgentsPage";
import SettingsPage from "../pages/Business/SettingsPage";

// Employee Portal
import EmployeeDashboard from "../pages/Employee/EmployeeDashboard";
import AttendancePage from "../pages/Employee/AttendancePage";
import LeavePage from "../pages/Employee/LeavePage";
import SalaryPage from "../pages/Employee/SalaryPage";
import ProfilePage from "../pages/Employee/ProfilePage";
import ContactHRPage from "../pages/Employee/ContactHRPage";

// HR Manager Portal
import HRDashboard from "../pages/HR/HRDashboard";
import HREmployeesPage from "../pages/HR/EmployeesPage";
import HRAttendancePage from "../pages/HR/AttendancePage";
import HRLeavePage from "../pages/HR/LeavePage";
import HRPayrollPage from "../pages/HR/PayrollPage";
import HRRecruitmentPage from "../pages/HR/RecruitmentPage";
import HRPerformancePage from "../pages/HR/PerformancePage";
import HRReportsPage from "../pages/HR/ReportsPage";
import HRSettingsPage from "../pages/HR/SettingsPage";
import HRAgentPage from "../pages/HR/HRAgentPage";
import HRQueriesPage from "../pages/HR/QueriesPage";

// Admin Portal
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminEmployeesPage from "../pages/Admin/EmployeesPage";
import DepartmentsPage from "../pages/Admin/DepartmentsPage";
import ReportsPage from "../pages/Admin/ReportsPage";
import AgentsPage from "../pages/Admin/AgentsPage";
import AdminSettingsPage from "../pages/Admin/AdminSettingsPage";

export default function AppRouter() {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Auth */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Business Owner Portal (Protected) */}
      <Route
        path="/dashboard"
        element={
          <RoleProtectedRoute role="business">
            <DashboardPage />
          </RoleProtectedRoute>
        }
      />
      <Route
        path="/dashboard/hr"
        element={
          <RoleProtectedRoute role="business">
            <HRPage />
          </RoleProtectedRoute>
        }
      />
      <Route
        path="/dashboard/inventory"
        element={
          <RoleProtectedRoute role="business">
            <InventoryPage />
          </RoleProtectedRoute>
        }
      />
      <Route
        path="/dashboard/finance"
        element={
          <RoleProtectedRoute role="business">
            <FinancePage />
          </RoleProtectedRoute>
        }
      />
      <Route
        path="/dashboard/analytics"
        element={
          <RoleProtectedRoute role="business">
            <AnalyticsPage />
          </RoleProtectedRoute>
        }
      />
      <Route
        path="/dashboard/agents"
        element={
          <RoleProtectedRoute role="business">
            <AIAgentsPage />
          </RoleProtectedRoute>
        }
      />
      <Route
        path="/dashboard/settings"
        element={
          <RoleProtectedRoute role="business">
            <SettingsPage />
          </RoleProtectedRoute>
        }
      />

      {/* Employee Portal (Protected) */}
      <Route
        path="/employee"
        element={
          <EmployeeProtectedRoute>
            <EmployeeDashboard />
          </EmployeeProtectedRoute>
        }
      />
      <Route
        path="/employee/attendance"
        element={
          <EmployeeProtectedRoute>
            <AttendancePage />
          </EmployeeProtectedRoute>
        }
      />
      <Route
        path="/employee/leave"
        element={
          <EmployeeProtectedRoute>
            <LeavePage />
          </EmployeeProtectedRoute>
        }
      />
      <Route
        path="/employee/salary"
        element={
          <EmployeeProtectedRoute>
            <SalaryPage />
          </EmployeeProtectedRoute>
        }
      />
      <Route
        path="/employee/profile"
        element={
          <EmployeeProtectedRoute>
            <ProfilePage />
          </EmployeeProtectedRoute>
        }
      />
      <Route
        path="/employee/contact-hr"
        element={
          <EmployeeProtectedRoute>
            <ContactHRPage />
          </EmployeeProtectedRoute>
        }
      />

      {/* HR Manager Portal (Protected) */}
      <Route
        path="/hr"
        element={
          <RoleProtectedRoute role="hr">
            <HRDashboard />
          </RoleProtectedRoute>
        }
      />
      <Route
        path="/hr/employees"
        element={
          <RoleProtectedRoute role="hr">
            <HREmployeesPage />
          </RoleProtectedRoute>
        }
      />
      <Route
        path="/hr/attendance"
        element={
          <RoleProtectedRoute role="hr">
            <HRAttendancePage />
          </RoleProtectedRoute>
        }
      />
      <Route
        path="/hr/leave"
        element={
          <RoleProtectedRoute role="hr">
            <HRLeavePage />
          </RoleProtectedRoute>
        }
      />
      <Route
        path="/hr/payroll"
        element={
          <RoleProtectedRoute role="hr">
            <HRPayrollPage />
          </RoleProtectedRoute>
        }
      />
      <Route
        path="/hr/queries"
        element={
          <RoleProtectedRoute role="hr">
            <HRQueriesPage />
          </RoleProtectedRoute>
        }
      />
      <Route
        path="/hr/recruitment"
        element={
          <RoleProtectedRoute role="hr">
            <HRRecruitmentPage />
          </RoleProtectedRoute>
        }
      />
      <Route
        path="/hr/performance"
        element={
          <RoleProtectedRoute role="hr">
            <HRPerformancePage />
          </RoleProtectedRoute>
        }
      />
      <Route
        path="/hr/reports"
        element={
          <RoleProtectedRoute role="hr">
            <HRReportsPage />
          </RoleProtectedRoute>
        }
      />
      <Route
        path="/hr/settings"
        element={
          <RoleProtectedRoute role="hr">
            <HRSettingsPage />
          </RoleProtectedRoute>
        }
      />
      <Route
        path="/hr/agent"
        element={
          <RoleProtectedRoute role="hr">
            <HRAgentPage />
          </RoleProtectedRoute>
        }
      />

      {/* Admin Portal (Protected) */}
      <Route
        path="/admin"
        element={
          <RoleProtectedRoute role="admin">
            <AdminDashboard />
          </RoleProtectedRoute>
        }
      />
      <Route
        path="/admin/employees"
        element={
          <RoleProtectedRoute role="admin">
            <AdminEmployeesPage />
          </RoleProtectedRoute>
        }
      />
      <Route
        path="/admin/departments"
        element={
          <RoleProtectedRoute role="admin">
            <DepartmentsPage />
          </RoleProtectedRoute>
        }
      />
      <Route
        path="/admin/reports"
        element={
          <RoleProtectedRoute role="admin">
            <ReportsPage />
          </RoleProtectedRoute>
        }
      />
      <Route
        path="/admin/agents"
        element={
          <RoleProtectedRoute role="admin">
            <AgentsPage />
          </RoleProtectedRoute>
        }
      />
      <Route
        path="/admin/settings"
        element={
          <RoleProtectedRoute role="admin">
            <AdminSettingsPage />
          </RoleProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}