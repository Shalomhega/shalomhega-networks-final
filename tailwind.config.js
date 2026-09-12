/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Base surfaces, darkest to lightest
        background: "#0A0B14",
        surface: "#12141F",
        "surface-alt": "#181B2A",
        border: "#262A3D",

        // Brand accents
        purple: {
          DEFAULT: "#6C3BFF",
          dim: "#4B2AB0",
        },
        blue: {
          DEFAULT: "#3B6BFF",
          dim: "#2A4BB0",
        },
        cyan: {
          DEFAULT: "#22D3EE",
          dim: "#189AAF",
        },

        // Text
        ink: "#E7E9F5",
        "ink-muted": "#9098B3",
      },
      fontFamily: {
        heading: ["Sora", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "brand-glow":
          "radial-gradient(circle at 20% 20%, rgba(108, 59, 255, 0.16), transparent 45%), radial-gradient(circle at 80% 0%, rgba(59, 107, 255, 0.14), transparent 40%), radial-gradient(circle at 50% 100%, rgba(34, 211, 238, 0.10), transparent 45%)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
      },
    },
  },
  plugins: [],
};
