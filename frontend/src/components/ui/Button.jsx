import { motion } from "framer-motion";

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const base =
    "px-6 py-3 rounded-xl font-medium transition-all duration-300";

  const styles = {
    primary:
      "bg-primary text-black hover:scale-105 hover:shadow-[0_0_30px_rgba(6,230,255,.5)]",

    secondary:
      "glass text-white",

    outline:
      "border border-white/20 text-white hover:border-primary hover:text-primary",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      className={`${base} ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}