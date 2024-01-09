/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      "WorkSans": ["Work Sans", "serif"],
      "SourceSerif": ["Source Serif 4", "sans-serif"],
    },
    extend: {
      screens: {},
    },
  },
  plugins: [require("daisyui")],
};
