/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0E1F2B",
        base: "#F6F8F7",
        surface: "#FFFFFF",
        line: "#DEE6E2",
        teal: {
          50: "#EAF4F2",
          100: "#CFE6E1",
          300: "#5FA79D",
          500: "#0F6E68",
          600: "#0C5854",
          700: "#0A4A46",
          900: "#062F2C",
        },
        signal: {
          500: "#3E7CFF",
          600: "#2F63D6",
        },
        clay: "#E8674B",
      },
      fontFamily: {
        display: ["Newsreader", "serif"],
        body: ["Inter", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(14,31,43,0.04), 0 8px 24px rgba(14,31,43,0.06)",
        lift: "0 20px 60px rgba(15,110,104,0.18)",
      },
      backgroundImage: {
        grain: "radial-gradient(circle at 1px 1px, rgba(14,31,43,0.06) 1px, transparent 0)",
      },
      keyframes: {
        blink: { "0%,49%": { opacity: 1 }, "50%,100%": { opacity: 0 } },
        floatSlow: { "0%,100%": { transform: "translateY(0px)" }, "50%": { transform: "translateY(-14px)" } },
        pulseRing: { "0%": { transform: "scale(0.9)", opacity: 0.7 }, "100%": { transform: "scale(1.8)", opacity: 0 } },
      },
      animation: {
        blink: "blink 1s step-start infinite",
        floatSlow: "floatSlow 6s ease-in-out infinite",
        pulseRing: "pulseRing 2.2s cubic-bezier(0,0,0.2,1) infinite",
      },
    },
  },
  plugins: [],
};
