// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    theme: {
      extend: {
        colors: {
          'primary': '#f8bbd0', // Baby pink
          'secondary': '#ec407a', // Darker rose
          'accent': '#fce4ec', // Very light rose
          'text': '#333',
          'light': '#fff',
        },
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
      }
    },
  }