import { motion } from "framer-motion";

const cards = [
  { title: "HR", top: "8%", left: "42%" },
  { title: "CRM", top: "30%", left: "5%" },
  { title: "Sales", top: "72%", left: "18%" },
  { title: "Inventory", top: "18%", right: "2%" },
  { title: "Finance", top: "70%", right: "10%" },
  { title: "Nora AI", bottom: "2%", left: "38%" },
];

export default function HeroOrb() {
  return (
    <div className="relative w-[600px] h-[600px] flex items-center justify-center">

      {cards.map((card, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -12, 0] }}
          transition={{
            duration: 3 + i * 0.3,
            repeat: Infinity,
          }}
          className="absolute px-4 py-2 rounded-xl
          bg-white/10 backdrop-blur-xl
          border border-cyan-400/20
          text-white text-sm shadow-lg"
          style={card}
        >
          {card.title}
        </motion.div>
      ))}

      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute h-[360px] w-[360px]
        rounded-full border border-cyan-400/20"
      />

      <motion.div
        animate={{
          scale: [1, 1.06, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        className="relative
        h-[250px]
        w-[250px]
        rounded-full
        bg-gradient-to-br
        from-cyan-400
        via-blue-500
        to-indigo-700
        flex
        items-center
        justify-center
        shadow-[0_0_120px_rgba(0,255,255,.45)]"
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold">NORA</h2>
          <p className="text-sm mt-2 opacity-80">
            AI Command Center
          </p>
        </div>
      </motion.div>

    </div>
  );
}