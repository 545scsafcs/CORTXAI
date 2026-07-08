import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

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

    <div className="min-h-screen bg-[#050816] flex items-center justify-center px-6">

      <div className="w-full max-w-lg bg-white/5 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-10">

        <div className="text-center">

          <h1 className="text-4xl font-black text-white">

            Create Account

          </h1>

          <p className="text-gray-400 mt-3">

            Join CORTXAI Business OS

          </p>

        </div>

        <div className="mt-10 space-y-5">

          <input

            placeholder="Company Name"

            value={company}

            onChange={(e)=>setCompany(e.target.value)}

            className="w-full rounded-xl bg-[#111827] border border-cyan-500/20 px-5 py-4 outline-none text-white"

          />

          <input

            placeholder="Owner Name"

            value={owner}

            onChange={(e)=>setOwner(e.target.value)}

            className="w-full rounded-xl bg-[#111827] border border-cyan-500/20 px-5 py-4 outline-none text-white"

          />

          <input

            type="email"

            placeholder="Email"

            value={email}

            onChange={(e)=>setEmail(e.target.value)}

            className="w-full rounded-xl bg-[#111827] border border-cyan-500/20 px-5 py-4 outline-none text-white"

          />

          <input

            type="password"

            placeholder="Password"

            value={password}

            onChange={(e)=>setPassword(e.target.value)}

            className="w-full rounded-xl bg-[#111827] border border-cyan-500/20 px-5 py-4 outline-none text-white"

          />

          <button

            onClick={register}

            className="w-full bg-cyan-400 text-black py-4 rounded-xl font-bold hover:scale-[1.02] transition"

          >

            Create Account

          </button>

        </div>

        <p className="text-center text-gray-400 mt-8">

          Already have an account?

          <Link

            to="/login"

            className="text-cyan-400 ml-2"

          >

            Login

          </Link>

        </p>

      </div>

    </div>

  );

}