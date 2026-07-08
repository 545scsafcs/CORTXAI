import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("business");

  function login() {

    if (!email || !password) {

      alert("Please fill all fields");

      return;

    }

    // Business Login

    if (
      role === "business" &&
      email === "business@cortxai.com" &&
      password === "Business@123"
    ) {

      navigate("/dashboard");

      return;

    }

    // Employee Login

    if (
      role === "employee" &&
      email === "employee@cortxai.com" &&
      password === "Employee@123"
    ) {

      navigate("/employee");

      return;

    }

    // Admin Login

    if (
      role === "admin" &&
      email === "admin@cortxai.com" &&
      password === "Admin@123"
    ) {

      navigate("/admin");

      return;

    }

    alert("Invalid Email, Password or Role");

  }

  return (

    <div className="min-h-screen bg-[#050816] flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-10">

        <div className="text-center">

          <h1 className="text-4xl font-black text-white">

            CORTXAI

          </h1>

          <p className="text-gray-400 mt-3">

            Welcome Back

          </p>

        </div>

        {/* Role */}

        <div className="mt-8">

          <p className="text-gray-300 mb-3">

            Login As

          </p>

          <select

            value={role}

            onChange={(e)=>setRole(e.target.value)}

            className="w-full rounded-xl bg-[#111827] border border-cyan-500/20 px-5 py-4 outline-none text-white"

          >

            <option value="business">

              Business

            </option>

            <option value="employee">

              Employee

            </option>

            <option value="admin">

              Admin

            </option>

          </select>

        </div>

        <div className="mt-6 space-y-5">

          <input

            type="email"

            placeholder="Email"

            value={email}

            onChange={(e)=>setEmail(e.target.value)}

            onKeyDown={(e)=>{

              if(e.key==="Enter"){

                login();

              }

            }}

            className="w-full rounded-xl bg-[#111827] border border-cyan-500/20 px-5 py-4 outline-none text-white"

          />

          <input

            type="password"

            placeholder="Password"

            value={password}

            onChange={(e)=>setPassword(e.target.value)}

            onKeyDown={(e)=>{

              if(e.key==="Enter"){

                login();

              }

            }}

            className="w-full rounded-xl bg-[#111827] border border-cyan-500/20 px-5 py-4 outline-none text-white"

          />

          <button

            onClick={login}

            className="w-full bg-cyan-400 text-black py-4 rounded-xl font-bold hover:scale-105 transition"

          >

            Login

          </button>

        </div>

        {/* Demo Credentials */}

        <div className="mt-8 rounded-xl bg-white/5 border border-white/10 p-4">

          <h3 className="font-bold text-cyan-400">

            Demo Credentials

          </h3>

          <div className="mt-3 text-sm space-y-3 text-gray-300">

            <div>

              <p className="font-semibold">

                👔 Business

              </p>

              <p>Email : business@cortxai.com</p>

              <p>Password : Business@123</p>

            </div>

            <div>

              <p className="font-semibold">

                👨‍💼 Employee

              </p>

              <p>Email : employee@cortxai.com</p>

              <p>Password : Employee@123</p>

            </div>

            <div>

              <p className="font-semibold">

                🛡️ Admin

              </p>

              <p>Email : admin@cortxai.com</p>

              <p>Password : Admin@123</p>

            </div>

          </div>

        </div>

        <p className="text-center text-gray-400 mt-8">

          Don't have an account?

          <Link

            to="/register"

            className="text-cyan-400 ml-2"

          >

            Register

          </Link>

        </p>

      </div>

    </div>

  );

}