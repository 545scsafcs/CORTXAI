/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#06E6FF",
        secondary: "#7C5CFF",
        background: "#050816",
        surface: "#0E1529",
        glass: "rgba(255,255,255,0.08)",
        border: "rgba(255,255,255,0.12)",
        // Custom gray palette for light theme contrast
        gray: {
          50: "#F8F9FA",      // light background
          100: "#E2E8F0",     // very light
          200: "#CBD5E1",     // light gray
          300: "#94A3B8",     // muted text
          400: "#64748B",     // descriptions / muted
          500: "#475569",     // labels
          600: "#334155",     // normal text
          700: "#1E293B",     // secondary heading
          800: "#0F172A",     // main heading
          900: "#0F172A",     // darkest
        },
      },

      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"]
      },

      boxShadow: {
        glow: "0 0 40px rgba(6,230,255,.25)",
        glass: "0 8px 32px rgba(0,0,0,.35)"
      },

      backdropBlur: {
        glass: "18px"
      },

      borderRadius: {
        xl2: "22px"
      }
    },
  },
  plugins: [],
}