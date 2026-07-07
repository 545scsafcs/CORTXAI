import { motion } from "framer-motion";

const modules = [
  {
    title: "HR Management",
    desc: "Attendance, Payroll, Recruitment",
    value: "12 Modules",
    color: "from-cyan-400 to-blue-500",
  },
  {
    title: "Inventory",
    desc: "Warehouse & Stock Tracking",
    value: "Live Sync",
    color: "from-green-400 to-emerald-500",
  },
  {
    title: "Finance",
    desc: "Invoices, Expenses & Reports",
    value: "$1.8B Managed",
    color: "from-yellow-400 to-orange-500",
  },
  {
    title: "CRM",
    desc: "Customers & Sales Pipeline",
    value: "24K Contacts",
    color: "from-pink-400 to-rose-500",
  },
];

export default function Stats() {
  return (
    <section className="py-28 px-8">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-20">
          <p className="text-cyan-400 font-semibold">
            BUSINESS MODULES
          </p>

          <h2 className="text-5xl font-bold mt-4">
            Everything Connected
          </h2>

          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Every department works together inside one AI-powered platform.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">

          {modules.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8, scale: 1.02 }}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8"
            >
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${item.color} mb-6`}
              />

              <h3 className="text-3xl font-bold">
                {item.title}
              </h3>

              <p className="text-gray-400 mt-4">
                {item.desc}
              </p>

              <div className="mt-8 text-cyan-400 font-bold text-xl">
                {item.value}
              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}