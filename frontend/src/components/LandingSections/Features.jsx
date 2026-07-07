import { motion } from "framer-motion";

const features = [
  {
    title: "AI Automation",
    desc: "Automate repetitive business workflows with intelligent AI agents.",
    icon: "🤖",
  },
  {
    title: "HR Management",
    desc: "Employee attendance, payroll, recruitment and performance tracking.",
    icon: "👥",
  },
  {
    title: "Inventory",
    desc: "Track stock, warehouses, suppliers and purchase orders.",
    icon: "📦",
  },
  {
    title: "Finance",
    desc: "Expenses, invoices, profit analytics and financial reporting.",
    icon: "💰",
  },
  {
    title: "CRM",
    desc: "Manage leads, customers and communication in one place.",
    icon: "📊",
  },
  {
    title: "Analytics",
    desc: "Real-time insights powered by AI for smarter decisions.",
    icon: "📈",
  },
];

export default function Features() {
  return (
    <section className="py-28 px-8">
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .6 }}
          className="text-center mb-20"
        >
          <p className="text-cyan-400 font-semibold">
            BUSINESS FEATURES
          </p>

          <h2 className="text-5xl font-bold mt-4">
            Everything your business needs
          </h2>

          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            One platform to manage operations, automate workflows and
            scale your business with AI.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((item, i) => (

            <motion.div
              key={i}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              className="rounded-3xl
              border
              border-white/10
              bg-white/5
              backdrop-blur-xl
              p-8
              transition-all"
            >

              <div className="text-5xl mb-6">
                {item.icon}
              </div>

              <h3 className="text-2xl font-semibold">
                {item.title}
              </h3>

              <p className="text-gray-400 mt-5 leading-8">
                {item.desc}
              </p>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}