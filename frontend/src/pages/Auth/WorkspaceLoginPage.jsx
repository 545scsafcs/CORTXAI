import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Shield, Mail, Key, ArrowLeft, Copy, ClipboardCheck, Sparkles, CheckCircle2 } from "lucide-react";
import { useEmployee } from "../../context/EmployeeContext";
import { employeeLogin, hrLogin } from "../../services/employeeApi";

export default function WorkspaceLoginPage({ type }) {
  const navigate = useNavigate();
  const { setEmployee } = useEmployee();

  const [username, setUsername] = useState(""); // Email or Employee ID
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const getWorkspaceDetails = () => {
    switch (type) {
      case "employee":
        return { name: "Employee Space", icon: "👨‍💼", theme: "from-emerald-400 to-teal-500", placeholder: "Email or Employee ID" };
      case "hr":
        return { name: "HR Manager Portal", icon: "👥", theme: "from-blue-400 to-cyan-500", placeholder: "Email or Employee ID" };
      case "business":
        return { name: "Business Owner Suite", icon: "👔", theme: "from-cyan-400 to-purple-500", placeholder: "Email Address" };
      case "crm":
        return { name: "CRM Control Center", icon: "🤝", theme: "from-purple-400 to-pink-500", placeholder: "Email or Employee ID" };
      case "inventory":
        return { name: "Inventory Suite", icon: "📦", theme: "from-amber-400 to-orange-500", placeholder: "Email or Employee ID" };
      default:
        return { name: "Workspace", icon: "🛡️", theme: "from-gray-400 to-gray-500", placeholder: "Email or Employee ID" };
    }
  };

  const workspace = getWorkspaceDetails();

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2200);
  };

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    triggerToast(`Copied ${label} to clipboard`);
  };

  const handleAutoFill = () => {
    if (type === "crm") {
      setUsername("crm@cortxai.in");
      setPassword("crm123");
      triggerToast("CRM credentials auto filled");
    } else if (type === "inventory") {
      setUsername("inventory@cortxai.in");
      setPassword("inventory123");
      triggerToast("Inventory credentials auto filled");
    }
  };

  async function handleLogin(e) {
    e.preventDefault();
    if (!username || !password) {
      alert("Please fill all fields");
      return;
    }

    // 1. Business Owner Login (Existing Auth)
    if (type === "business") {
      if (username === "business@cortxai.com" && password === "Business@123") {
        localStorage.setItem("userRole", "business");
        navigate("/business/dashboard");
      } else {
        alert("Invalid Business credentials.");
      }
      return;
    }

    // 2. HR Portal Login (MERN Auth)
    if (type === "hr") {
      try {
        const response = await hrLogin(username, password);
        if (!response || !response.success) {
          alert(response?.message || "HR Authentication Failed");
          return;
        }
        localStorage.setItem("userRole", "hr");
        setEmployee(response.data);
        navigate("/hr/dashboard");
      } catch (err) {
        alert(err?.response?.data?.message || err.message || "HR Authentication Failed");
      }
      return;
    }

    // 3. Employee Portal Login (MERN Auth)
    if (type === "employee") {
      try {
        const employeeData = await employeeLogin(username, password);
        if (!employeeData) {
          alert("Invalid Employee Email or Employee ID");
          return;
        }
        localStorage.setItem("userRole", "employee");
        setEmployee(employeeData);
        navigate("/employee/dashboard");
      } catch (err) {
        alert(err?.response?.data?.message || err.message || "Employee Login Failed");
      }
      return;
    }

    // 4. CRM Portal Login (Dummy Auth - Task 4)
    if (type === "crm") {
      const isMailMatch = username.toLowerCase() === "crm@cortxai.in" && password === "crm123";
      const isIdMatch = username.toUpperCase() === "CRM001" && password === "crm123";

      if (isMailMatch || isIdMatch) {
        localStorage.setItem("userRole", "crm");
        setEmployee({
          _id: "crm-dummy-id",
          firstName: "CRM",
          lastName: "Operator",
          email: "crm@cortxai.in",
          employeeId: "CRM001",
          designation: "Sales Lead",
          department: "Sales",
          profilePhoto: ""
        });
        navigate("/crm/dashboard");
      } else {
        alert("Invalid CRM login credentials.");
      }
      return;
    }

    // 5. Inventory Portal Login (Dummy Auth - Task 4)
    if (type === "inventory") {
      const isMailMatch = username.toLowerCase() === "inventory@cortxai.in" && password === "inventory123";
      const isIdMatch = username.toUpperCase() === "INV001" && password === "inventory123";

      if (isMailMatch || isIdMatch) {
        localStorage.setItem("userRole", "inventory");
        setEmployee({
          _id: "inv-dummy-id",
          firstName: "Inventory",
          lastName: "Manager",
          email: "inventory@cortxai.in",
          employeeId: "INV001",
          designation: "Stock Controller",
          department: "Logistics",
          profilePhoto: ""
        });
        navigate("/inventory/dashboard");
      }
      return;
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA] px-6 py-12 relative overflow-hidden font-sans">
      {/* Toast Alert message */}
      {toastMessage && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl flex items-center gap-2 text-xs font-bold shadow-2xl animate-fadeIn">
          <ClipboardCheck size={14} className="text-cyan-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Radial highlight lights */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-slate-200/60 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-xl rounded-3xl bg-white border border-slate-200/80 p-8 sm:p-12 shadow-2xl shadow-slate-200/50 relative space-y-8">

        {/* Back Link */}
        <Link
          to="/login"
          className="absolute top-8 left-8 text-slate-500 hover:text-slate-900 flex items-center gap-1.5 text-xs font-bold transition duration-200"
        >
          <ArrowLeft size={14} /> Back to selection
        </Link>

        {/* Logo & Header */}
        <div className="text-center mt-4">
          <div className="inline-flex items-center gap-2 mb-3 bg-slate-100 border border-slate-200 px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-wider text-slate-900 font-mono">
            <Shield size={12} className="text-indigo-600" /> ENTERPRISE SECURE GATEWAY
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-outfit">
            {workspace.icon} <span>{workspace.name}</span>
          </h1>
          <p className="mt-2 text-xs text-slate-500 font-sans">
            Secure login for registered credentials or demo environment workspace.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email / Employee ID */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
              {type === "business" ? "Email Address" : "Email or Employee ID"}
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Mail size={16} />
              </span>
              <input
                type="text"
                required
                placeholder={workspace.placeholder}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 py-3.5 text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-indigo-500 transition duration-200 text-xs font-medium"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Password
              </label>
              <a href="#" onClick={(e) => { e.preventDefault(); alert("Please contact HR or your system administrator to recover password."); }} className="text-xs text-indigo-600 hover:text-indigo-700 transition font-semibold">
                Forgot Password?
              </a>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Key size={16} />
              </span>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 py-3.5 text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-indigo-500 transition duration-200 text-xs font-medium"
              />
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center">
            <input
              id="remember_me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-slate-900 border-slate-300 rounded focus:ring-slate-900 cursor-pointer"
            />
            <label htmlFor="remember_me" className="ml-2 block text-xs text-slate-600 cursor-pointer font-medium select-none">
              Remember my session
            </label>
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-slate-900 hover:bg-slate-800 text-white py-4 font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md cursor-pointer"
          >
            Access Dashboard
          </button>
        </form>

        <hr className="border-slate-100" />

        {/* 1. Employee / HR Info Card */}
        {(type === "employee" || type === "hr") && (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-3.5">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 font-outfit">
              <CheckCircle2 size={14} className="text-emerald-600" /> Login Information
            </h4>
            <div className="text-xs text-slate-600 space-y-2 leading-relaxed">
              <p>✔ Login using your registered account Employee ID OR Email Address.</p>
              <p>✔ Password is your registered account password.</p>
              <div className="p-3.5 bg-white border border-slate-200 rounded-xl font-mono text-[10px] text-slate-800 space-y-1 shadow-sm">
                <span className="block text-slate-400 uppercase tracking-wider font-bold">Example Identity:</span>
                <p>ID: <span className="text-slate-900 font-bold">{type === "hr" ? "HR001" : "EMP001"}</span> or <span className="text-slate-900 font-bold">{type === "hr" ? "hr@company.com" : "employee@company.com"}</span></p>
                <p>Pass: <span className="text-slate-900 font-bold">Your Registered Password</span></p>
              </div>
            </div>
          </div>
        )}

        {/* 2. Business Owner Info Card */}
        {type === "business" && (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-3.5">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 font-outfit">
              <CheckCircle2 size={14} className="text-cyan-600" /> Login Information
            </h4>
            <div className="text-xs text-slate-600 space-y-2 leading-relaxed">
              <p>✔ Login using your registered Business Owner Email.</p>
              <div className="p-3.5 bg-white border border-slate-200 rounded-xl font-mono text-[10px] text-slate-800 space-y-1 shadow-sm">
                <span className="block text-slate-400 uppercase tracking-wider font-bold">Example Identity:</span>
                <p>Email: <span className="text-slate-900 font-bold">business@cortxai.com</span></p>
                <p>Pass: <span className="text-slate-900 font-bold">Business@123</span></p>
              </div>
            </div>
          </div>
        )}

        {/* 3. CRM Demo Credentials Card */}
        {type === "crm" && (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-4 shadow-2xs">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 font-outfit">
                <Sparkles size={14} className="text-indigo-600" /> Demo Credentials
              </h4>
              <button
                type="button"
                onClick={handleAutoFill}
                className="text-[10px] bg-[#0F172A] hover:bg-slate-800 text-white px-3 py-1.5 rounded-xl transition font-bold cursor-pointer shadow-2xs"
              >
                Auto Fill Credentials
              </button>
            </div>

            <div className="text-xs text-slate-600 font-medium leading-relaxed">
              <p className="mb-3 text-[11px] text-slate-500 font-sans">Login using either of the following demo configurations:</p>
              <div className="space-y-2.5">
                {/* Copy Email */}
                <div className="flex items-center justify-between p-3 bg-white border border-slate-200/80 rounded-xl shadow-2xs">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase text-slate-400 font-mono">Email:</span>
                    <span className="font-mono text-xs font-bold text-slate-900">crm@cortxai.in</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy("crm@cortxai.in", "Email")}
                    className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-900 transition cursor-pointer"
                    title="Copy Email"
                  >
                    <Copy size={13} />
                  </button>
                </div>

                {/* Copy ID */}
                <div className="flex items-center justify-between p-3 bg-white border border-slate-200/80 rounded-xl shadow-2xs">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase text-slate-400 font-mono">Emp ID:</span>
                    <span className="font-mono text-xs font-bold text-slate-900">CRM001</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy("CRM001", "Employee ID")}
                    className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-900 transition cursor-pointer"
                    title="Copy Employee ID"
                  >
                    <Copy size={13} />
                  </button>
                </div>

                {/* Copy Password */}
                <div className="flex items-center justify-between p-3 bg-white border border-slate-200/80 rounded-xl shadow-2xs">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase text-slate-400 font-mono">Password:</span>
                    <span className="font-mono text-xs font-bold text-slate-900">crm123</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy("crm123", "Password")}
                    className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-900 transition cursor-pointer"
                    title="Copy Password"
                  >
                    <Copy size={13} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. Inventory Demo Credentials Card */}
        {type === "inventory" && (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-4 shadow-2xs">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 font-outfit">
                <Sparkles size={14} className="text-amber-600" /> Demo Credentials
              </h4>
              <button
                type="button"
                onClick={handleAutoFill}
                className="text-[10px] bg-[#0F172A] hover:bg-slate-800 text-white px-3 py-1.5 rounded-xl transition font-bold cursor-pointer shadow-2xs"
              >
                Auto Fill Credentials
              </button>
            </div>

            <div className="text-xs text-slate-600 font-medium leading-relaxed">
              <p className="mb-3 text-[11px] text-slate-500 font-sans">Login using either of the following demo configurations:</p>
              <div className="space-y-2.5">
                {/* Copy Email */}
                <div className="flex items-center justify-between p-3 bg-white border border-slate-200/80 rounded-xl shadow-2xs">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase text-slate-400 font-mono">Email:</span>
                    <span className="font-mono text-xs font-bold text-slate-900">inventory@cortxai.in</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy("inventory@cortxai.in", "Email")}
                    className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-900 transition cursor-pointer"
                    title="Copy Email"
                  >
                    <Copy size={13} />
                  </button>
                </div>

                {/* Copy ID */}
                <div className="flex items-center justify-between p-3 bg-white border border-slate-200/80 rounded-xl shadow-2xs">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase text-slate-400 font-mono">Emp ID:</span>
                    <span className="font-mono text-xs font-bold text-slate-900">INV001</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy("INV001", "Employee ID")}
                    className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-900 transition cursor-pointer"
                    title="Copy Employee ID"
                  >
                    <Copy size={13} />
                  </button>
                </div>

                {/* Copy Password */}
                <div className="flex items-center justify-between p-3 bg-white border border-slate-200/80 rounded-xl shadow-2xs">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase text-slate-400 font-mono">Password:</span>
                    <span className="font-mono text-xs font-bold text-slate-900">inventory123</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy("inventory123", "Password")}
                    className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-900 transition cursor-pointer"
                    title="Copy Password"
                  >
                    <Copy size={13} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
