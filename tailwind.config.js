/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '0 7px 18px rgba(2, 118, 179, 0.13)', 
      },
    },
  },
  plugins: [],
}

