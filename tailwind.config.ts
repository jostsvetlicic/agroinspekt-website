import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        offwhite: "#F6F8F7",
        // Deep navy-charcoal — headlines, footer, dark contrast bands.
        ink: "#1A2332",
        "ink-2": "#223043",
        // Cool grey — body copy.
        grey: "#6B7785",
        "grey-light": "#97A1AD",
        // Primary brand green — sampled from the Agroinspekt logo (#139E3E).
        green: "#139E3E",
        "green-deep": "#0C7A31",
        "green-soft": "#E7F3EB",
        // Hairlines.
        line: "#E4E9E7",
        "line-dark": "rgba(255,255,255,0.12)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        eyebrow: "0.2em",
      },
      maxWidth: {
        container: "1200px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,24,40,0.04), 0 14px 34px -18px rgba(16,24,40,0.20)",
        raised: "0 24px 64px -28px rgba(16,24,40,0.30)",
      },
      backgroundImage: {
        "hero-fade":
          "linear-gradient(180deg, rgba(16,24,40,0.20) 0%, rgba(16,24,40,0.45) 55%, rgba(16,24,40,0.82) 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
