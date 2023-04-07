/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "ping-short": "ping 1s ease-in-out 1 reverse",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
