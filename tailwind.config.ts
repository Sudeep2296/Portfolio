import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#03040f",
        foreground: "#f8fafc",
        space: {
          950: "#03040f",
          900: "#05061a",
          850: "#090a20",
          800: "#0b0d26",
          700: "#13163e",
        },
        cyber: {
          cyan: "#38bdf8",
          magenta: "#f43f5e",
          purple: "#a855f7",
          violet: "#8b5cf6",
          emerald: "#34d399",
          amber: "#fbbf24",
        },
      },
      fontFamily: {
        mono: ["var(--font-mono)", "JetBrains Mono", "ui-monospace", "monospace"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 25px rgba(168, 85, 247, 0.35)",
        "glow-cyan": "0 0 25px rgba(56, 189, 248, 0.35)",
        "glow-magenta": "0 0 25px rgba(244, 63, 94, 0.35)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
