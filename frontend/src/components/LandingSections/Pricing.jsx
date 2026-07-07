import { motion } from "framer-motion";

const plans = [
  {
    name: "Starter",
    price: "₹0",
    users: "Up to 10 Users",
    features: [
      "HR",
      "Inventory",
      "Finance",
      "Email Support"
    ],
    recommended: false,
  },
  {
    name: "Professional",
    price: "₹0",
    users: "Unlimited Users",
    features: [
      "Everything in Starter",
      "CRM",
      "AI Agents",
      "Analytics",
      "Priority Support"
    ],
    recommended: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    users: "Large Organizations",
    features: [
      "Dedicated AI",
      "Private Deployment",
      "Custom Modules",
      "API Access",
      "24/7 Support"
    ],
    recommended: false,
  },
];

export default function Pricing() {
  return (
    <section className="py-28 px-8">

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-20">

          <p className="text-cyan-400 font-semibold">
            PRICING
          </p>

          <h2 className="text-5xl font-bold mt-4">
            Choose Your Plan
          </h2>

          <p className="text-gray-400 mt-6">
            Flexible pricing for every business.
          </p>

        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {plans.map((plan, i) => (

            <motion.div

              key={i}

              whileHover={{
                y: -12,
                scale: 1.03,
              }}

              className={`rounded-3xl
              border
              ${
                plan.recommended
                  ? "border-cyan-400"
                  : "border-white/10"
              }
              bg-white/5
              backdrop-blur-xl
              p-8
              relative`}

            >

              {plan.recommended && (

                <span className="absolute top-5 right-5 bg-cyan-400 text-black text-xs font-bold px-3 py-1 rounded-full">

                  MOST POPULAR

                </span>

              )}

              <h3 className="text-3xl font-bold">

                {plan.name}

              </h3>

              <div className="mt-8">

                <span className="text-5xl font-black">

                  {plan.price}

                </span>

                <span className="text-gray-400">
                  /month
                </span>

              </div>

              <p className="text-gray-400 mt-3">

                {plan.users}

              </p>

              <div className="mt-8 space-y-4">

                {plan.features.map((feature) => (

                  <div
                    key={feature}
                    className="flex items-center gap-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-cyan-400" />

                    {feature}

                  </div>

                ))}

              </div>

              <button className="mt-10 w-full py-4 rounded-full bg-cyan-400 text-black font-bold hover:scale-105 transition">

                Get Started

              </button>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}