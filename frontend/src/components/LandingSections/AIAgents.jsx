import { motion } from "framer-motion";

const agents = [
  {
    name: "Nora AI",
    role: "Business Command Center",
    color: "from-cyan-400 to-blue-500",
    icon: "🧠",
  },
  {
    name: "Sales Agent",
    role: "Lead Conversion & Follow-ups",
    color: "from-green-400 to-emerald-600",
    icon: "📈",
  },
  {
    name: "HR Agent",
    role: "Attendance & Recruitment",
    color: "from-violet-400 to-purple-600",
    icon: "👥",
  },
  {
    name: "Inventory Agent",
    role: "Stock & Warehouse",
    color: "from-orange-400 to-red-500",
    icon: "📦",
  },
  {
    name: "Finance Agent",
    role: "Expenses & Reports",
    color: "from-yellow-400 to-orange-500",
    icon: "💰",
  },
  {
    name: "CRM Agent",
    role: "Customer Intelligence",
    color: "from-pink-400 to-rose-500",
    icon: "📊",
  },
];

export default function AIAgents() {
  return (
    <section className="py-28 px-8">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-20">
          <p className="text-cyan-400 font-semibold">
            AI AGENTS
          </p>

          <h2 className="text-5xl font-bold mt-4">
            Meet Your AI Workforce
          </h2>

          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Every department gets its own intelligent AI assistant.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {agents.map((agent, i) => (

            <motion.div
              key={i}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              className="rounded-3xl
              border border-white/10
              bg-white/5
              backdrop-blur-xl
              p-8
              overflow-hidden
              relative"
            >

              <div
                className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${agent.color}`}
              />

              <div className="text-5xl mb-6">
                {agent.icon}
              </div>

              <h3 className="text-2xl font-bold">
                {agent.name}
              </h3>

              <p className="text-gray-400 mt-4">
                {agent.role}
              </p>

              <button className="mt-8 px-5 py-2 rounded-full border border-cyan-400/30 hover:bg-cyan-400/10 transition">
                Learn More
              </button>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}