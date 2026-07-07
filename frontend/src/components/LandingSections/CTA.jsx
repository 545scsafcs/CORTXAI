import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="py-32 px-8">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: .7 }}
        className="max-w-6xl mx-auto rounded-[40px]
        border border-cyan-400/20
        bg-gradient-to-br
        from-cyan-500/10
        via-white/5
        to-blue-500/10
        backdrop-blur-2xl
        p-16
        text-center"
      >

        <p className="text-cyan-400 font-semibold">
          READY TO BUILD?
        </p>

        <h2 className="text-6xl font-black mt-6">
          Build Your Business
          <br />
          with AI
        </h2>

        <p className="mt-8 text-gray-400 max-w-2xl mx-auto text-lg">

          Join businesses using CortxAI to automate HR,
          Finance, CRM, Sales and Inventory.

        </p>

        <div className="flex justify-center gap-6 mt-12 flex-wrap">

          <button className="px-10 py-5 rounded-full bg-cyan-400 text-black font-bold hover:scale-105 transition">

            Start Free

          </button>

          <button className="px-10 py-5 rounded-full border border-cyan-400">

            Book Demo

          </button>

        </div>

      </motion.div>

    </section>
  );
}