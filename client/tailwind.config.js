/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "ping-short": "ping 1s ease-in-out 1 reverse",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
