/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'principal': '#3F3AE6',
        'highlight': '#E1E63A',
        'dprincipal': '#04031B',
        'lprincipal': '#110E71',
        'midprincipal': '#F2F1FD'
      },
      fontFamily: {
        sans: ['Tomorrow', 'sans-serif'],
      },
    },
  },
  plugins: [],

  darkMode: 'selector' // Pone el modo oscuro por defecto
}

