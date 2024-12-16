/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      headerShadow: {
        "3xl": "0 0 0 -15px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};
