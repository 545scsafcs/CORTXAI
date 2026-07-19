import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Shield, Building, User, Mail, Key, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [company, setCompany] = useState("");
  const [owner, setOwner] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function register() {
    if (!company || !owner || !email || !password) {
      alert("Please fill all fields");
      return;
    }
    // Demo Registration
    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030712] px-6 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-lg rounded-3xl bg-white/[0.02] border border-white/10 p-8 sm:p-12 backdrop-blur-2xl shadow-2xl relative">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider text-cyan-400">
            <Shield size={14} /> ENTERPRISE JOINING
          </div>
          <h1 className="text-4xl font-black text-white font-outfit tracking-tight">
            Create Account
          </h1>
          <p className="mt-3 text-sm text-gray-400">
            Set up your organization on CORTXAI Business OS.
          </p>
        </div>

        <div className="space-y-4">
          {/* Company Name */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Company Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-cyan-400">
                <Building size={18} />
              </span>
              <input
                type="text"
                placeholder="e.g. Acme Corp"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#0B1220] pl-12 pr-4 py-4 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-400/50 transition-all duration-300 text-sm font-medium"
              />
            </div>
          </div>

          {/* Owner Name */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Owner Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-cyan-400">
                <User size={18} />
              </span>
              <input
                type="text"
                placeholder="e.g. Vineet Yadav"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#0B1220] pl-12 pr-4 py-4 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-400/50 transition-all duration-300 text-sm font-medium"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Work Email
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
                className="w-full rounded-xl border border-white/10 bg-[#0B1220] pl-12 pr-4 py-4 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-400/50 transition-all duration-300 text-sm font-medium"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2 mb-6">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-cyan-400">
                <Key size={18} />
              </span>
              <input
                type="password"
                placeholder="Min 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#0B1220] pl-12 pr-4 py-4 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-400/50 transition-all duration-300 text-sm font-medium"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={register}
            className="w-full rounded-xl bg-cyan-400 hover:bg-cyan-300 py-4 text-sm font-bold text-black transition-all duration-300 transform active:scale-[0.98] shadow-lg shadow-cyan-500/10 flex items-center justify-center gap-2 hover:scale-[1.01]"
          >
            Create Account <ArrowRight size={16} />
          </button>
        </div>

        <p className="mt-8 text-center text-xs text-gray-500">
          Already have an account?
          <Link
            to="/login"
            className="ml-1.5 text-cyan-400 hover:text-cyan-300 font-semibold hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}