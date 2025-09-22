import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Inter var'", "sans-serif"],
        sans: ["'Inter var'", "sans-serif"]
      },
      colors: {
        midnight: "#0b1724",
        aqua: "#31c6ff",
        lagoon: "#0f2e40",
        mist: "#d9f1ff"
      },
      boxShadow: {
        float: "0 12px 40px -12px rgba(49, 198, 255, 0.45)",
        glow: "0 0 0 4px rgba(49, 198, 255, 0.25)"
      }
    }
  },
  plugins: []
};

export default config;
