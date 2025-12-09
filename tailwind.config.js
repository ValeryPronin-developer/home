/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#2e3a3a",
        mist: "#f0f4f3",
        paper: "#ffffff",
        sage: "#d7e2df",
      },
    },
  },
  plugins: [],
};

