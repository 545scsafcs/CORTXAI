import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  to,
  onClick,
  disabled = false,
  type = "button",
  ...props
}) {
  const navigate = useNavigate();

  const sizes = {
    sm: "px-4 py-2 text-[11px] rounded-xl",
    md: "px-6 py-3 rounded-xl",
    lg: "px-8 py-4 rounded-2xl",
  };

  const base = `${sizes[size]} font-bold transition-all duration-300 cursor-pointer inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`;

  const styles = {
    // Primary: Solid slate-900 / dark confident weight
    primary:
      "bg-[#0F172A] text-white hover:bg-slate-800 shadow-sm border border-slate-900/10 font-bold active:scale-[0.98]",

    // Secondary: White surface → slate border → dark slate text
    secondary:
      "bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 hover:border-slate-300 shadow-2xs font-semibold",

    // Outline: Transparent → slate border → dark text
    outline:
      "bg-transparent border border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-100/70 font-semibold",

    // Danger: Solid Rose
    danger:
      "bg-rose-600 text-white hover:bg-rose-700 shadow-sm font-bold",

    // Success: Solid Emerald
    success:
      "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm font-bold",

    // Warning: Solid Amber
    warning:
      "bg-amber-600 text-white hover:bg-amber-700 shadow-sm font-bold",

    // Ghost: No background, clean text
    ghost:
      "bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900 font-semibold",
  };

  function handleClick(e) {
    if (disabled) return;
    if (onClick) onClick(e);
    if (to) navigate(to);
  }

  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.03 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      onClick={handleClick}
      disabled={disabled}
      type={type}
      className={`${base} ${styles[variant] || styles.primary} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
