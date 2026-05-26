import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        family: {
          primary: "#5A3A1E",
          gold: "#B88A44",
          bg: "#F7F1E8",
          card: "#FFFDF8",
          border: "#E5D8C8",
          text: "#333333",
          muted: "#8A7A68",
          success: "#8DAA78",
          warning: "#D9A441",
          danger: "#A35A4F",
          deceased: "#A0A0A0",
        },
      },
      borderRadius: {
        card: "8px",
      },
      fontFamily: {
        sans: ["Microsoft YaHei", "PingFang SC", "HarmonyOS Sans", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px rgba(90, 58, 30, 0.08)",
      },
    },
  },
  plugins: [],
} satisfies Config;
