import { motion } from "framer-motion";

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {/* Light Clean Canvas */}
      <div className="absolute inset-0 bg-[#ffffff]" />

      {/* Floating Soft Cream Aurora Light */}
      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-10%] left-[-10%] h-[700px] w-[700px] rounded-full bg-[#f5f2eb]/60 blur-[130px]"
      />

      <motion.div
        animate={{
          x: [0, -30, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-10%] right-[-10%] h-[700px] w-[700px] rounded-full bg-[#f4f4f5]/80 blur-[150px]"
      />

      {/* Subtle Mesh Grid Gridline (Editorial aesthetic) */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
          linear-gradient(rgba(0,0,0,.15) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,.15) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}