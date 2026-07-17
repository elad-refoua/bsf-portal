/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Hebrew-first stacks; English falls through to the serif/sans below.
        heading: ["'Frank Ruhl Libre'", "'Fraunces'", "Georgia", "serif"],
        body: ["'Heebo'", "'Inter'", "system-ui", "sans-serif"],
      },
      colors: {
        // Warm-clinical base (refined in P2). ink = text, sand = surfaces.
        ink: {
          900: "#1b2a2e",
          700: "#33474d",
          500: "#5b7178",
          300: "#93a7ac",
        },
        sand: {
          50: "#faf7f2",
          100: "#f3ede3",
          200: "#e7dccb",
        },
        brand: {
          50: "#eef7f6",
          100: "#d6ece9",
          300: "#8fc7c1",
          500: "#3f9a91",
          600: "#2f7f77",
          700: "#265f59",
        },
        // Per-need accent hues (one per module). Kept semantic; refined in P2.
        need: {
          predictability: "#5b8fb0",
          belonging: "#c97b84",
          competence: "#d9a441",
          selfworth: "#a97fb8",
          control: "#4f9d78",
          play: "#e0813f",
        },
      },
      boxShadow: {
        soft: "0 1px 2px rgba(27,42,46,.06), 0 8px 24px rgba(27,42,46,.06)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  // Per-need colors are applied via dynamic class names in loops; safelist them.
  safelist: [
    { pattern: /(bg|text|border|from|to|ring)-need-(predictability|belonging|competence|selfworth|control|play)/ },
    { pattern: /(bg|text|border)-need-(predictability|belonging|competence|selfworth|control|play)\/\d+/ },
  ],
  plugins: [],
};
