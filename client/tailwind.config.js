/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      WorkSans: ["Work Sans", "serif"],
      SourceSerif: ["Source Serif 4", "sans-serif"],
    },
    daisyui: {
      themes: false,
   },
    extend: {
      screens: {},
    },
  },
  plugins: [require("daisyui")],
};
