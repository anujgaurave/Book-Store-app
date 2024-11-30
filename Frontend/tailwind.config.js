/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // darkMode:"class",
  theme: {
    extend: {
      keyframes: {
        upDown: {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        upDown: "upDown 2s ease-in-out infinite",
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}
