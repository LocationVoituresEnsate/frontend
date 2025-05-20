// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#fadde1',     // Babypink
        secondary: '#C1C1C1',    // Gris
        fuchsia: '#D4006D',      // Rose fuchsia
        lightpink: '#FAD2E1',    // Rose clair
        text: '#333333',         // Noir foncé
      },
    },
  },
  important: '#root',
  corePlugins: {
    preflight: false,
  },  
  plugins: [],
};