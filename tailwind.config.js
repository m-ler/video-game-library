const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode: 'class',
  theme: {
    colors:{
      'accent1': '#0F74E7',
      'accent2': '#00CDDB',
      'accent3': '#FF74AD',

      'neu1-1': '#F5F7FA',
      'neu1-2': '#E4E7EB',
      'neu1-3': '#CBD2D9',
      'neu1-4': '#9AA5B1',
      'neu1-5': '#7B8794',
      'neu1-6': '#616E7C',
      'neu1-7': '#52606D',
      'neu1-8': '#3E4C59',
      'neu1-9': '#323F4B',
      'neu1-10': '#1F2933',

      'neu2-1': '#FAF9F7',
      'neu2-2': '#E8E6E1',
      'neu2-3': '#D3CEC4',
      'neu2-4': '#B8B2A7',
      'neu2-5': '#A39E93',
      'neu2-6': '#857F72',
      'neu2-7': '#625D52',
      'neu2-8': '#504A40',
      'neu2-9': '#423D33',
      'neu2-10': '#27241D',
    },
    gridTemplateColumns: {
      'card-grid': 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))'
    },
    backgroundImage: {
      'bg-gradient': 'radial-gradient(circle at 20% -10%, #DDECFF 0%, transparent 40%), radial-gradient(circle at 90% 150%, #DDECFF 0%, #E4E7EB 50%)',
      'bg-gradient-dark': 'radial-gradient(circle at 20% -20%, #111F33 0%, transparent 40%), radial-gradient(circle at 100% 150%, #111F33 0%, #1F2933 50%)',
    }, 
    extend: {
      colors,
      fontFamily:{
        Roboto: ['Roboto'],
        Poppins: ['Poppins'],
        OpenSans: ["'Open Sans'"],
        Montserrat: ['Montserrat'],
        Lato: ['Lato'],
      }, 
      keyframes: {
        wiggle: {
          '0%': { transform: 'scale(1)' },
          '90%': { transform: 'scale(1.3)' },
          '100%': { transform: 'scale(1)' },
        }
      }
    },
  },
  plugins: [],
}
