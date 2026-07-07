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
        border: "rgba(255,255,255,0.12)"
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