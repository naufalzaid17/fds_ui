/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors : {
        primary : "#005752",
        secondary : "#03655F",
        third : "#0F7D76",
        fourd : "#16DFD3",
        gray : '#E6EFEE',
        midnight : 'rgba(0, 0, 0, 0.5)',
        silver : '#F7F7F7',
        back : '#F7F7F7',
      },
      fontFamily : {
        poppins: ["Poppins" , "sans-serif"],

      }
    },
  },
  plugins: [],
}