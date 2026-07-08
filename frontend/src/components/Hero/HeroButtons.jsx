import { useNavigate } from "react-router-dom";

export default function HeroButtons() {

  const navigate = useNavigate();

  return (

    <div className="flex gap-5 mt-10">

      <button

        onClick={() => navigate("/login")}

        className="px-8 py-4 rounded-full bg-cyan-400 text-black font-bold hover:scale-105 transition"

      >

        Get Started

      </button>

      <button

        onClick={() => navigate("/register")}

        className="px-8 py-4 rounded-full border border-cyan-400 hover:bg-cyan-400/10 transition"

      >

        Register

      </button>

    </div>

  );

}