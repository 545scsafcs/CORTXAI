import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function HeroButtons() {
  const navigate = useNavigate();

  return (
    <div className="flex gap-4 mt-10 items-center">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate("/login")}
        className="px-8 py-4 text-xs font-bold uppercase tracking-wider rounded-2xl bg-slate-900 text-white hover:bg-slate-800 transition duration-300 shadow-md shadow-slate-900/10"
      >
        Launch Command Center
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate("/register")}
        className="px-8 py-4 text-xs font-bold uppercase tracking-wider rounded-2xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition duration-300"
      >
        Configure Free Account
      </motion.button>
    </div>
  );
}