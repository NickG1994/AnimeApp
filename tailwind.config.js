/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      colors: {
        primary: '#1e81b0', // Eastern Blue
        secondary: '#e28743', // Burnt Sienna
        background: '#eeeee4', // Green White
        dark: '#161616', // Onyx Black (updated)
        accent1: '#eab676', // Tacao
        accent2: '#76b5c5', // Glacier
        border: '#063970', // Catalina Blue
        hover: '#154c79', // Chathams Blue
      },
    },
  },
  plugins: [require('daisyui')],
};

