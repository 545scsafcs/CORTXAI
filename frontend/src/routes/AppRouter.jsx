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

// CRM Guard (allows business owner, admin, employee, hr, crm, inventory)
function CRMProtectedRoute({ children }) {
  const userRole = localStorage.getItem("userRole");
  const allowedRoles = ["business", "admin", "employee", "hr", "crm", "inventory"];
  if (!allowedRoles.includes(userRole)) {
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

// CRM Portal Pages
import CRMDashboard from "../pages/CRM/CRMDashboard";
import LeadsPage from "../pages/CRM/LeadsPage";
import PipelinePage from "../pages/CRM/PipelinePage";
import CustomersPage from "../pages/CRM/CustomersPage";
import FollowupsPage from "../pages/CRM/FollowupsPage";
import CRMReportsPage from "../pages/CRM/CRMReportsPage";
import CRMActivitiesPage from "../pages/CRM/CRMActivitiesPage";
import CRMSettingsPage from "../pages/CRM/CRMSettingsPage";

// Inventory Portal Pages
import InventoryDashboard from "../pages/Inventory/InventoryDashboard";
import InventoryPageTemplate from "../pages/Inventory/InventoryPageTemplate";

// Reusable login workspace portal page
import WorkspaceLoginPage from "../pages/Auth/WorkspaceLoginPage";

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
      <Route path="/login/employee" element={<WorkspaceLoginPage type="employee" />} />
      <Route path="/login/hr" element={<WorkspaceLoginPage type="hr" />} />
      <Route path="/login/business" element={<WorkspaceLoginPage type="business" />} />
      <Route path="/login/crm" element={<WorkspaceLoginPage type="crm" />} />
      <Route path="/login/inventory" element={<WorkspaceLoginPage type="inventory" />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Business Owner Portal (Protected) */}
      <Route
        path="/business/dashboard"
        element={
          <RoleProtectedRoute role="business">
            <DashboardPage />
          </RoleProtectedRoute>
        }
      />
      <Route
        path="/business/hr"
        element={
          <RoleProtectedRoute role="business">
            <HRPage />
          </RoleProtectedRoute>
        }
      />
      <Route
        path="/business/inventory"
        element={
          <RoleProtectedRoute role="business">
            <InventoryPage />
          </RoleProtectedRoute>
        }
      />
      <Route
        path="/business/finance"
        element={
          <RoleProtectedRoute role="business">
            <FinancePage />
          </RoleProtectedRoute>
        }
      />
      <Route
        path="/business/analytics"
        element={
          <RoleProtectedRoute role="business">
            <AnalyticsPage />
          </RoleProtectedRoute>
        }
      />
      <Route
        path="/business/agents"
        element={
          <RoleProtectedRoute role="business">
            <AIAgentsPage />
          </RoleProtectedRoute>
        }
      />
      <Route
        path="/business/settings"
        element={
          <RoleProtectedRoute role="business">
            <SettingsPage />
          </RoleProtectedRoute>
        }
      />

      {/* Employee Portal (Protected) */}
      <Route
        path="/employee/dashboard"
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
        path="/hr/dashboard"
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

      {/* CRM Portal (Protected Roles) */}
      <Route
        path="/crm/dashboard"
        element={
          <CRMProtectedRoute>
            <CRMDashboard />
          </CRMProtectedRoute>
        }
      />
      <Route
        path="/crm/leads"
        element={
          <CRMProtectedRoute>
            <LeadsPage />
          </CRMProtectedRoute>
        }
      />
      <Route
        path="/crm/pipeline"
        element={
          <CRMProtectedRoute>
            <PipelinePage />
          </CRMProtectedRoute>
        }
      />
      <Route
        path="/crm/customers"
        element={
          <CRMProtectedRoute>
            <CustomersPage />
          </CRMProtectedRoute>
        }
      />
      <Route
        path="/crm/followups"
        element={
          <CRMProtectedRoute>
            <FollowupsPage />
          </CRMProtectedRoute>
        }
      />
      <Route
        path="/crm/reports"
        element={
          <CRMProtectedRoute>
            <CRMReportsPage />
          </CRMProtectedRoute>
        }
      />
      <Route
        path="/crm/activities"
        element={
          <CRMProtectedRoute>
            <CRMActivitiesPage />
          </CRMProtectedRoute>
        }
      />
      <Route
        path="/crm/settings"
        element={
          <CRMProtectedRoute>
            <CRMSettingsPage />
          </CRMProtectedRoute>
        }
      />

      {/* Inventory Portal (Protected Roles) */}
      <Route
        path="/inventory/dashboard"
        element={
          <CRMProtectedRoute>
            <InventoryDashboard />
          </CRMProtectedRoute>
        }
      />
      <Route
        path="/inventory/products"
        element={
          <CRMProtectedRoute>
            <InventoryPageTemplate
              moduleName="products"
              title="Products"
              subtitle="Corporate product register list and SKUs details."
              stats={[
                { label: "Total SKUs", value: "245" },
                { label: "Average Value", value: "$450", color: "text-amber-400" },
                { label: "Active Categories", value: "8", color: "text-purple-400" }
              ]}
              columns={["SKU", "Product Name", "Category", "In Stock", "Alert Level", "Price"]}
              data={[
                { sku: "APP-IPH-15", name: "iPhone 15 Pro", cat: "Electronics", qty: 45, alert: "5 Units", price: 999 },
                { sku: "SAM-GAL-S24", name: "Galaxy S24 Ultra", cat: "Electronics", qty: 20, alert: "4 Units", price: 1199 },
                { sku: "LOG-MXM-3S", name: "MX Master 3S Mouse", cat: "Accessories", qty: 120, alert: "10 Units", price: 99 },
                { sku: "DELL-XPS-15", name: "Dell XPS 15 Laptop", cat: "Electronics", qty: 5, alert: "2 Units", price: 1899 },
                { sku: "SON-WH1000", name: "Sony WH-1000XM5", cat: "Accessories", qty: 15, alert: "3 Units", price: 349 }
              ]}
            />
          </CRMProtectedRoute>
        }
      />
      <Route
        path="/inventory/categories"
        element={
          <CRMProtectedRoute>
            <InventoryPageTemplate
              moduleName="categories"
              title="Categories"
              subtitle="Product classification categories."
              stats={[
                { label: "Total Categories", value: "8" },
                { label: "Associated SKUs", value: "245", color: "text-cyan-400" }
              ]}
              columns={["Category Name", "Description", "SKUs Count", "Status"]}
              data={[
                { name: "Electronics", desc: "Mobile phones, laptops, and tablets", count: 86, status: "Active" },
                { name: "Accessories", desc: "Keyboards, mice, and desk pads", count: 42, status: "Active" },
                { name: "Office Supplies", desc: "Notebooks, pens, and paper blocks", count: 110, status: "Active" },
                { name: "Networking", desc: "Routers, cables, and access points", count: 7, status: "Active" }
              ]}
            />
          </CRMProtectedRoute>
        }
      />
      <Route
        path="/inventory/stock"
        element={
          <CRMProtectedRoute>
            <InventoryPageTemplate
              moduleName="stock"
              title="Stock Tracker"
              subtitle="Quantities allocated, committed, and available inside warehouses."
              stats={[
                { label: "Total Stocked Units", value: "4,510" },
                { label: "Locations Count", value: "3", color: "text-amber-400" }
              ]}
              columns={["SKU", "Product Name", "Warehouse Location", "On Hand", "Committed", "Available"]}
              data={[
                { sku: "APP-IPH-15", name: "iPhone 15 Pro", loc: "Main WH (A)", hand: 45, comm: 5, avail: 40 },
                { sku: "SAM-GAL-S24", name: "Galaxy S24 Ultra", loc: "Main WH (A)", hand: 20, comm: 2, avail: 18 },
                { sku: "LOG-MXM-3S", name: "MX Master 3S Mouse", loc: "Secondary WH (B)", hand: 120, comm: 0, avail: 120 },
                { sku: "DELL-XPS-15", name: "Dell XPS 15 Laptop", loc: "Main WH (A)", hand: 5, comm: 1, avail: 4 }
              ]}
            />
          </CRMProtectedRoute>
        }
      />
      <Route
        path="/inventory/suppliers"
        element={
          <CRMProtectedRoute>
            <InventoryPageTemplate
              moduleName="suppliers"
              title="Suppliers Directory"
              subtitle="Approved vendor listings, contacts, and terms."
              stats={[
                { label: "Approved Vendors", value: "14" },
                { label: "Active POs Count", value: "6", color: "text-purple-400" }
              ]}
              columns={["Supplier Name", "Contact Person", "Email", "Phone", "Rating", "Status"]}
              data={[
                { name: "Apple Corp Distributor", contact: "John Appleseed", email: "john@apple.com", phone: "+1 555 0192", rating: "5 stars", status: "Active" },
                { name: "Samsung Logistics", contact: "Min-ho Lee", email: "minho@samsung.com", phone: "+82 2 1234", rating: "4.8 stars", status: "Active" },
                { name: "Logitech Supply Ltd", contact: "Emma Watson", email: "emma@logitech.com", phone: "+41 21 863", rating: "4.5 stars", status: "Active" }
              ]}
            />
          </CRMProtectedRoute>
        }
      />
      <Route
        path="/inventory/purchase-orders"
        element={
          <CRMProtectedRoute>
            <InventoryPageTemplate
              moduleName="purchase-orders"
              title="Purchase Orders"
              subtitle="Inbound purchase requests issued to suppliers."
              stats={[
                { label: "Total POs Value", value: "$45,200" },
                { label: "Pending Deliveries", value: "3", color: "text-red-400" }
              ]}
              columns={["PO Number", "Supplier", "Issue Date", "Due Date", "Total Value", "Status"]}
              data={[
                { po: "PO-2026-001", supplier: "Apple Corp Distributor", date: "2026-07-15", due: "2026-07-25", val: 12500, status: "Pending" },
                { po: "PO-2026-002", supplier: "Logitech Supply Ltd", date: "2026-07-18", due: "2026-07-22", val: 4200, status: "Approved" }
              ]}
            />
          </CRMProtectedRoute>
        }
      />
      <Route
        path="/inventory/sales-orders"
        element={
          <CRMProtectedRoute>
            <InventoryPageTemplate
              moduleName="sales-orders"
              title="Sales Orders"
              subtitle="Outbound customer orders mapping transactions."
              stats={[
                { label: "Orders Closed", value: "348" },
                { label: "Revenue generated", value: "$85,450", color: "text-green-400" }
              ]}
              columns={["SO Number", "Client Name", "Order Date", "Delivery Status", "Payment Status", "Value"]}
              data={[
                { so: "SO-2026-981", client: "Vercel Inc Corp", date: "2026-07-19", del: "Shipped", pay: "Paid", val: 5600 },
                { so: "SO-2026-982", client: "Linear App Ltd", date: "2026-07-19", del: "Processing", pay: "Paid", val: 1200 }
              ]}
            />
          </CRMProtectedRoute>
        }
      />
      <Route
        path="/inventory/stock-history"
        element={
          <CRMProtectedRoute>
            <InventoryPageTemplate
              moduleName="stock-history"
              title="Stock History Log"
              subtitle="Detailed movement logs and inventory adjustments."
              stats={[
                { label: "Logged Entries", value: "1,240" }
              ]}
              columns={["Tx ID", "SKU", "Product Name", "Movement Type", "Qty Adjusted", "Date"]}
              data={[
                { tx: "TX001", sku: "APP-IPH-15", name: "iPhone 15 Pro", type: "Stock In", qty: 45, date: "Today, 14:32" },
                { tx: "TX002", sku: "SAM-GAL-S24", name: "Galaxy S24 Ultra", type: "Stock Out", qty: -20, date: "Today, 12:15" },
                { tx: "TX003", sku: "LOG-MXM-3S", name: "MX Master 3S Mouse", type: "Stock In", qty: 100, date: "Yesterday, 17:00" }
              ]}
            />
          </CRMProtectedRoute>
        }
      />
      <Route
        path="/inventory/reports"
        element={
          <CRMProtectedRoute>
            <InventoryPageTemplate
              moduleName="reports"
              title="Inventory Reports"
              subtitle="Performance statistics, valuations, and safety stock factors."
              stats={[
                { label: "Safety Level Status", value: "98% Stable" }
              ]}
              columns={["Report Name", "Generated Date", "File Type", "Size", "Action"]}
              data={[
                { name: "Monthly Stock Valuation Report", date: "2026-07-01", type: "PDF", size: "2.4 MB", action: "Download" },
                { name: "Low Stock Alert Analytics Summary", date: "2026-07-10", type: "PDF", size: "1.1 MB", action: "Download" }
              ]}
            />
          </CRMProtectedRoute>
        }
      />
      <Route
        path="/inventory/settings"
        element={
          <CRMProtectedRoute>
            <InventoryPageTemplate
              moduleName="settings"
              title="Inventory Settings"
              subtitle="Safety limits, warehouse locations, and integrations thresholds."
            />
          </CRMProtectedRoute>
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