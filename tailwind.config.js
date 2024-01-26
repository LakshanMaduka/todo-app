/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
       'dark-brown':  '#C67804',
       'light-brown':  '#F1AD45',
       'dark-light-brown' : '#E59720',
       'bg-ash' : '#D7CEB9'
      }
    },
  },
  plugins: [],
}

