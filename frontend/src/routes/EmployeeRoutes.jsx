import { Routes, Route, Navigate } from "react-router-dom";

import WorkspaceLoginPage from "../pages/Auth/WorkspaceLoginPage";
import EmployeeDashboard from "../pages/Employee/EmployeeDashboard";
import AttendancePage from "../pages/Employee/AttendancePage";
import LeavePage from "../pages/Employee/LeavePage";
import SalaryPage from "../pages/Employee/SalaryPage";
import ProfilePage from "../pages/Employee/ProfilePage";
import ContactHRPage from "../pages/Employee/ContactHRPage";

import { useEmployee } from "../context/EmployeeContext";

function ProtectedRoute({ children }) {
  const { employee } = useEmployee();

  if (!employee) {
    return <Navigate to="/login/employee" replace />;
  }

  return children;
}

export default function EmployeeRoutes() {
  return (
    <Routes>

      <Route
        path="/login"
        element={<WorkspaceLoginPage type="employee" />}
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <EmployeeDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/attendance"
        element={
          <ProtectedRoute>
            <AttendancePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/leave"
        element={
          <ProtectedRoute>
            <LeavePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/salary"
        element={
          <ProtectedRoute>
            <SalaryPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/contact-hr"
        element={
          <ProtectedRoute>
            <ContactHRPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="*"
        element={
          <Navigate
            to="/employee/dashboard"
            replace
          />
        }
      />

    </Routes>
  );
}