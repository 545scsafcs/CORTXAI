import React, { useEffect, useState } from "react";
import GlassCard from "./GlassCard";

export function AnimatedNumber({ end, duration = 1.8, decimals = 0 }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    let frameId;
    const numericEnd = typeof end === "number" ? end : parseFloat(String(end).replace(/[^0-9.-]+/g, "")) || 0;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      const easeOutQuad = progress * (2 - progress);
      const currentValue = easeOutQuad * numericEnd;
      setValue(currentValue);
      if (progress < 1) {
        frameId = window.requestAnimationFrame(step);
      }
    };

    frameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(frameId);
  }, [end, duration]);

  return (
    <span>
      {decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString()}
    </span>
  );
}

export default function KPICard({
  title,
  value,
  change,
  period = "VS LAST MONTH",
  dept = "business",
  icon: Icon,
}) {
  const isNegative = change && change.includes("-");
  const numericVal = typeof value === "number" ? value : parseFloat(String(value).replace(/[^0-9.-]+/g, ""));
  const hasNumeric = !isNaN(numericVal) && String(value).match(/\d+/);
  const prefix = typeof value === "string" ? value.replace(/[\d.,]+/g, "") : "";

  return (
    <GlassCard dept={dept} accent className="flex flex-col justify-between h-full font-sans">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-slate-700 text-xs font-extrabold uppercase tracking-wider font-outfit">
            {title}
          </p>
          <h2 className="text-3xl lg:text-4xl font-black mt-2 text-slate-900 font-outfit tracking-tight flex items-baseline gap-1">
            {hasNumeric ? (
              <>
                {prefix && <span className="text-2xl font-bold">{prefix}</span>}
                <AnimatedNumber end={numericVal} decimals={String(value).includes(".") ? 1 : 0} />
              </>
            ) : (
              value
            )}
          </h2>
        </div>

        {Icon && (
          <div className="p-3 rounded-2xl bg-slate-100 border border-slate-200/80 text-slate-800 group-hover:scale-110 transition duration-300">
            <Icon size={20} />
          </div>
        )}
      </div>

      {change && (
        <div className="mt-6 flex items-center gap-2 pt-4 border-t border-slate-100">
          <span
            className={`text-xs font-bold px-2.5 py-1 rounded-full ${
              isNegative
                ? "bg-rose-50 text-rose-800 border border-rose-200"
                : "bg-emerald-50 text-emerald-800 border border-emerald-200"
            }`}
          >
            {change}
          </span>
          <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest font-mono">
            {period}
          </span>
        </div>
      )}
    </GlassCard>
  );
}
