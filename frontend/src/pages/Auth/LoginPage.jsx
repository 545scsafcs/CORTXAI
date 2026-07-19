import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { employeeLogin } from "../../services/employeeApi";
import { useEmployee } from "../../context/EmployeeContext";
import { Shield, Mail, Key, User, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setEmployee } = useEmployee();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("business");

  async function login() {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    if (
      role === "business" &&
      email === "business@cortxai.com" &&
      password === "Business@123"
    ) {
      localStorage.setItem("userRole", "business");
      navigate("/dashboard");
      return;
    }

    if (
      role === "hr" &&
      email === "hr@cortxai.com" &&
      password === "HR@123"
    ) {
      localStorage.setItem("userRole", "hr");
      navigate("/hr");
      return;
    }

    if (role === "employee") {
      try {
        const employee = await employeeLogin(email, password);
        if (!employee) {
          alert("Invalid Employee Email or Employee ID");
          return;
        }
        localStorage.setItem("userRole", "employee");
        setEmployee(employee);
        navigate("/employee");
        return;
      } catch (err) {
        alert(
          err?.response?.data?.message ||
          err.message ||
          "Employee Login Failed"
        );
        return;
      }
    }

    if (
      role === "admin" &&
      email === "admin@cortxai.com" &&
      password === "Admin@123"
    ) {
      localStorage.setItem("userRole", "admin");
      navigate("/admin");
      return;
    }

    alert("Invalid Email, Password or Role");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030712] px-6 relative overflow-hidden">
      {/* Background glowing decorations */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-xl rounded-3xl bg-white/[0.02] border border-white/10 p-8 sm:p-12 backdrop-blur-2xl shadow-2xl relative">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider text-cyan-400">
            <Shield size={14} /> ENTERPRISE CLOUD PORTAL
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white font-outfit tracking-tight">
            CORTX<span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">AI</span>
          </h1>
          <p className="mt-3 text-sm text-gray-400">
            Sign in to access your business workflows and AI agents.
          </p>
        </div>

        {/* Role Selection */}
        <div className="space-y-2 mb-5">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Log In As
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-cyan-400">
              <User size={18} />
            </span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#0B1220] pl-12 pr-4 py-4 text-white outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-400/50 transition-all duration-300 appearance-none font-semibold text-sm cursor-pointer"
            >
              <option value="business">👔 Business Owner</option>
              <option value="hr">👥 HR Manager</option>
              <option value="employee">👨‍💼 Employee</option>
              <option value="admin">🛡 Admin</option>
            </select>
          </div>
        </div>

        {/* Email Input */}
        <div className="space-y-2 mb-5">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Email Address
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-cyan-400">
              <Mail size={18} />
            </span>
            <input
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") login();
              }}
              className="w-full rounded-xl border border-white/10 bg-[#0B1220] pl-12 pr-4 py-4 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-400/50 transition-all duration-300 text-sm font-medium"
            />
          </div>
        </div>

        {/* Password / ID Input */}
        <div className="space-y-2 mb-6">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
            {role === "employee" ? "Employee ID" : "Password"}
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-cyan-400">
              <Key size={18} />
            </span>
            <input
              type="password"
              placeholder={role === "employee" ? "Enter Employee ID" : "Enter Password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") login();
              }}
              className="w-full rounded-xl border border-white/10 bg-[#0B1220] pl-12 pr-4 py-4 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-400/50 transition-all duration-300 text-sm font-medium"
            />
          </div>
        </div>

        {/* Login Button */}
        <button
          onClick={login}
          className="w-full rounded-xl bg-cyan-400 hover:bg-cyan-300 py-4 text-sm font-bold text-black transition-all duration-300 transform active:scale-[0.98] shadow-lg shadow-cyan-500/10 flex items-center justify-center gap-2 hover:scale-[1.01]"
        >
          Sign In <ArrowRight size={16} />
        </button>

        {/* Demo Credentials Section */}
        <div className="mt-8 rounded-2xl border border-white/5 bg-white/[0.01] p-5">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-cyan-400 flex items-center gap-1.5">
            <Shield size={14} /> Shared Demo Credentials
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-400">
            <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
              <p className="font-bold text-white mb-1">👔 Business Owner</p>
              <p className="font-mono">business@cortxai.com</p>
              <p className="font-mono">Business@123</p>
            </div>
            <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
              <p className="font-bold text-white mb-1">👥 HR Manager</p>
              <p className="font-mono">hr@cortxai.com</p>
              <p className="font-mono">HR@123</p>
            </div>
            <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
              <p className="font-bold text-white mb-1">🛡 System Admin</p>
              <p className="font-mono">admin@cortxai.com</p>
              <p className="font-mono">Admin@123</p>
            </div>
            <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
              <p className="font-bold text-white mb-1">👨‍💼 Employee Login</p>
              <p>Email: Employee Email</p>
              <p>Pass: Employee ID</p>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-gray-500">
          Don't have an account?
          <Link
            to="/register"
            className="ml-1.5 text-cyan-400 hover:text-cyan-300 font-semibold hover:underline"
          >
            Create an Account
          </Link>
        </p>
      </div>
    </div>
  );
}