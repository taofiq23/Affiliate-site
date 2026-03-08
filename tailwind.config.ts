import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        base: "#F7F5F2",
        "base-2": "#F6F5F2",
        secondary: "#1F1F1F",
        accent: "#C8A96B",
        soft: "#EDE9E3"
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"]
      },
      boxShadow: {
        luxe: "0 20px 50px rgba(0,0,0,0.08)"
      }
    }
  },
  plugins: []
};

export default config;
