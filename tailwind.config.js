const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode: 'class',
  theme: {
    colors:{
      'base1': '#353F60',
      'accent1': '#0F74E7',
      'accent2': '#FF6756',
      'variation1': '#84E1F3',
      'variation2': '#FFA399',
      'text1': '#1A2036',
      'text2': '#353F60',
      'text3': '#636B87', 

      'base1-dark': '#353F60',
      'accent1-dark': '#0F74E7',
      'accent2-dark': '#FF6756',
      'variation1-dark': '#84E1F3',
      'variation2-dark': '#FFA399',
      'text1-dark': '#DDE1EF',
      'text2-dark': '#AEB5CD',
      'text3-dark': '#666F8C', 
    },
    gridTemplateColumns: {
      'card-grid': 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))'
    },
    backgroundImage: {
      'bg-gradient': 'radial-gradient(circle at 20% -10%, #FFE3DD 0%, transparent 40%), radial-gradient(circle at 90% 150%, #B5F0FF 0%, transparent 50%)',
      'bg-gradient-dark': 'radial-gradient(circle at 20% -20%, #341C40 0%, transparent 40%), radial-gradient(circle at 90% 150%, #17325A 0%, #171D32 50%)',
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
