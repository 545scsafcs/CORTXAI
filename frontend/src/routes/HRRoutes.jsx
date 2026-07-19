import { Routes, Route } from "react-router-dom";

import HRDashboard from "../pages/HR/HRDashboard";
import EmployeesPage from "../pages/HR/EmployeesPage";
import AttendancePage from "../pages/HR/AttendancePage";
import LeavePage from "../pages/HR/LeavePage";
import PayrollPage from "../pages/HR/PayrollPage";
import RecruitmentPage from "../pages/HR/RecruitmentPage";
import PerformancePage from "../pages/HR/PerformancePage";
import ReportsPage from "../pages/HR/ReportsPage";
import SettingsPage from "../pages/HR/SettingsPage";
import HRAgentPage from "../pages/HR/HRAgentPage";

export default function HRRoutes() {

  return (

    <Routes>

      <Route
        index
        element={<HRDashboard />}
      />

      <Route
        path="employees"
        element={<EmployeesPage />}
      />

      <Route
        path="attendance"
        element={<AttendancePage />}
      />

      <Route
        path="leave"
        element={<LeavePage />}
      />

      <Route
        path="payroll"
        element={<PayrollPage />}
      />

      <Route
        path="recruitment"
        element={<RecruitmentPage />}
      />

      <Route
        path="performance"
        element={<PerformancePage />}
      />

      <Route
        path="reports"
        element={<ReportsPage />}
      />

      <Route
        path="settings"
        element={<SettingsPage />}
      />
      <Route
        path="agent"
        element={<HRAgentPage />}
    />

    </Routes>

  );

}