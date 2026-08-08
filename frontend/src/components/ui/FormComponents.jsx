import React from "react";

export function FormSection({ title, subtitle, children }) {
  return (
    <div className="space-y-4 pb-6 border-b border-slate-200/80 last:border-0 font-sans">
      <div>
        <h4 className="text-base font-bold font-outfit text-slate-900">{title}</h4>
        {subtitle && <p className="text-xs text-slate-700 font-semibold font-sans mt-0.5">{subtitle}</p>}
      </div>
      <div className="grid md:grid-cols-2 gap-6">{children}</div>
    </div>
  );
}

export function TextInput({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  icon: Icon,
  required,
  className = "",
  ...props
}) {
  return (
    <div className={`space-y-1.5 font-sans ${className}`}>
      {label && (
        <label className="block text-xs font-extrabold text-slate-900">
          {label} {required && <span className="text-indigo-600">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full bg-slate-50 border rounded-2xl py-3 text-xs text-slate-900 font-medium placeholder-slate-500 focus:bg-white focus:outline-none focus:border-indigo-500 transition ${Icon ? "pl-10 pr-4" : "px-4"
            } ${error ? "border-rose-400" : "border-slate-200"}`}
          {...props}
        />
      </div>
      {error && <p className="text-[10px] text-rose-600 font-bold">{error}</p>}
    </div>
  );
}

export function SelectInput({
  label,
  options = [],
  value,
  onChange,
  required,
  className = "",
}) {
  return (
    <div className={`space-y-1.5 font-sans ${className}`}>
      {label && (
        <label className="block text-xs font-extrabold text-slate-900">
          {label} {required && <span className="text-indigo-600">*</span>}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs text-slate-900 font-medium focus:bg-white focus:outline-none focus:border-indigo-500 transition cursor-pointer font-sans"
      >
        {options.map((opt, i) => {
          const val = typeof opt === "string" ? opt : opt.value;
          const lbl = typeof opt === "string" ? opt : opt.label;
          return (
            <option key={i} value={val} className="bg-white text-slate-900">
              {lbl}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export function ToggleSwitch({ label, checked, onChange }) {
  return (
    <label className="flex items-center justify-between gap-4 cursor-pointer py-1 font-sans">
      {label && <span className="text-xs font-extrabold text-slate-900">{label}</span>}
      <div
        onClick={() => onChange(!checked)}
        className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${checked ? "bg-slate-900" : "bg-slate-200"
          }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${checked ? "translate-x-5" : "translate-x-0"
            }`}
        />
      </div>
    </label>
  );
}

export function TextArea({
  label,
  rows = 3,
  placeholder,
  value,
  onChange,
  className = "",
}) {
  return (
    <div className={`space-y-1.5 font-sans ${className}`}>
      {label && <label className="block text-xs font-extrabold text-slate-900">{label}</label>}
      <textarea
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-900 font-medium placeholder-slate-500 focus:bg-white focus:outline-none focus:border-indigo-500 transition"
      />
    </div>
  );
}
