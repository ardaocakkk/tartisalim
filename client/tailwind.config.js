/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        post: '#242526',
        main: '#18191A',
        light_main: '##F0F2F5',
        light_post: '##FFFFFF'
      }
    },
  },
  plugins: [],
}

