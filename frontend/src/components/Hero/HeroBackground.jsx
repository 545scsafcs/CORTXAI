import { motion } from "framer-motion";

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">

      {/* Base */}
      <div className="absolute inset-0 bg-[#050816]" />

      {/* Aurora */}
      <motion.div
        animate={{
          x: [0, 120, 0],
          y: [0, -60, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-120px] left-[-150px] h-[650px] w-[650px]
        rounded-full bg-cyan-500/20 blur-[140px]"
      />

      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 70, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-180px] right-[-150px]
        h-[650px] w-[650px]
        rounded-full bg-blue-600/20 blur-[170px]"
      />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
          linear-gradient(rgba(255,255,255,.18) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,.18) 1px, transparent 1px)
          `,
          backgroundSize: "70px 70px",
        }}
      />

    </div>
  );
}