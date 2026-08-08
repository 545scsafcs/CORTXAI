import React from "react";
import CountUp from "react-countup";

// Safe dynamic resolution of CountUp component to avoid CJS/ESM bundler wrapping crashes
const CountUpComponent = typeof CountUp === "function"
  ? CountUp
  : (CountUp && typeof CountUp.default === "function" ? CountUp.default : null);

export default function HeroStats() {
  const stats = [
    { value: 9200, suffix: "+", label: "ACTIVE ENTERPRISES" },
    { value: 1.8, suffix: "B+", label: "TRANSACTIONS AUDITED", prefix: "INR " },
    { value: 60, suffix: "%", label: "WORKFLOW EFFICIENCY INCREASE" },
  ];

  return (
    <div className="flex gap-10 mt-16 flex-wrap md:flex-nowrap">
      {stats.map((item, idx) => (
        <div key={idx} className="border-l border-black/[0.06] pl-6 py-1 select-none">
          <h2 className="text-3xl font-black font-outfit text-slate-900 tracking-tight flex items-baseline">
            {item.prefix}
            {CountUpComponent ? (
              <CountUpComponent end={item.value} duration={3} decimals={item.value % 1 !== 0 ? 1 : 0} />
            ) : (
              <span>{item.value}</span>
            )}
            {item.suffix}
          </h2>
          <p className="text-[10px] font-bold tracking-wider text-slate-400 font-sans mt-1.5 uppercase">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}