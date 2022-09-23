const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode: "class",
  theme: {
    colors: {
      accent1: "#0F74E7",
      accent2: "#00CDDB",
      accent3: "#FF74AD",

      "neu1-1": "#F5F7FA",
      "neu1-2": "#E4E7EB",
      "neu1-3": "#CBD2D9",
      "neu1-4": "#9AA5B1",
      "neu1-5": "#7B8794",
      "neu1-6": "#616E7C",
      "neu1-7": "#52606D",
      "neu1-8": "#3E4C59",
      "neu1-9": "#323F4B",
      "neu1-10": "#1F2933",

      "neu2-1": "#FAF9F7",
      "neu2-2": "#E8E6E1",
      "neu2-3": "#D3CEC4",
      "neu2-4": "#B8B2A7",
      "neu2-5": "#A39E93",
      "neu2-6": "#857F72",
      "neu2-7": "#625D52",
      "neu2-8": "#504A40",
      "neu2-9": "#423D33",
      "neu2-10": "#27241D",

      "metascore-high": "#12a623",
      "metascore-mid": "#f5b520",
      "metascore-low": "#d4311c",
    },
    backgroundImage: {
      "bg-gradient":
        "radial-gradient(circle at 20% -10%, #DDECFF 0%, transparent 40%), radial-gradient(circle at 90% 150%, #DDECFF 0%, #E4E7EB 50%)",
      "bg-gradient-dark":
        "radial-gradient(circle at 20% -20%, #111F33 0%, transparent 40%), radial-gradient(circle at 100% 150%, #111F33 0%, #1F2933 50%)",
      "gradient-to-t": "linear-gradient(to top, var(--tw-gradient-stops))",
      "gradient-to-tr": "linear-gradient(to top right, var(--tw-gradient-stops))",
      "gradient-to-r": "linear-gradient(to right, var(--tw-gradient-stops))",
      "gradient-to-br": "linear-gradient(to bottom right, var(--tw-gradient-stops))",
      "gradient-to-b": "linear-gradient(to bottom, var(--tw-gradient-stops))",
      "gradient-to-bl": "linear-gradient(to bottom left, var(--tw-gradient-stops))",
      "gradient-to-l": "linear-gradient(to left, var(--tw-gradient-stops))",
      "gradient-to-tl": "linear-gradient(to top left, var(--tw-gradient-stops))",
    },
    extend: {
      colors,
      fontFamily: {
        Roboto: ["Roboto"],
        Poppins: ["Poppins"],
        OpenSans: ["'Open Sans'"],
        Montserrat: ["Montserrat"],
        Lato: ["Lato"],
        Raleway: ["Raleway"],
        System: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Oxygen-Sans",
          "Ubuntu",
          "Cantarell",
          "Helvetica Neue",
          "sans-serif",
        ],
      },
      keyframes: {
        wiggle: {
          "0%": { transform: "scale(1)" },
          "90%": { transform: "scale(1.3)" },
          "100%": { transform: "scale(1)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        appear1: {
          from: { opacity: "0", transform: "scale(.5)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
      },
      transitionTimingFunction: {
        inSine: "cubic-bezier(0.12, 0, 0.39, 0)",
        outSine: "cubic-bezier(0.61, 1, 0.88, 1)",
        inOutSine: "cubic-bezier(0.37, 0, 0.63, 1)",
        inQuad: "cubic-bezier(0.11, 0, 0.5, 0)",
        outQuad: "cubic-bezier(0.5, 1, 0.89, 1)",
        inOutQuad: "cubic-bezier(0.45, 0, 0.55, 1)",
        inCubic: "cubic-bezier(0.32, 0, 0.67, 0)",
        outCubic: "cubic-bezier(0.33, 1, 0.68, 1)",
        inOutCubic: "cubic-bezier(0.65, 0, 0.35, 1)",
        outCubic: "cubic-bezier(0.33, 1, 0.68, 1)",
        inQuart: "cubic-bezier(0.5, 0, 0.75, 0)",
        outQuart: "cubic-bezier(0.25, 1, 0.5, 1)",
        inOutQuart: "cubic-bezier(0.76, 0, 0.24, 1)",
        inQuint: "cubic-bezier(0.64, 0, 0.78, 0)",
        outQuint: "cubic-bezier(0.22, 1, 0.36, 1)",
        inOutQuint: "cubic-bezier(0.83, 0, 0.17, 1)",
        inExpo: "cubic-bezier(0.7, 0, 0.84, 0)",
        outExpo: "cubic-bezier(0.16, 1, 0.3, 1)",
        inOutExpo: "cubic-bezier(0.87, 0, 0.13, 1)",
        inCirc: "cubic-bezier(0.55, 0, 1, 0.45)",
        outCirc: "cubic-bezier(0, 0.55, 0.45, 1)",
        inOutCirc: "cubic-bezier(0.85, 0, 0.15, 1)",
        inBack: "cubic-bezier(0.36, 0, 0.66, -0.56)",
        outBack: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        inOutBack: "cubic-bezier(0.68, -0.6, 0.32, 1.6)",
      },
    },
    screens: {
      sm: "640px", // => @media (min-width: 640px) { ... }
      md: "768px", // => @media (min-width: 768px) { ... }
      lg: "1024px", // => @media (min-width: 1024px) { ... }
      xl: "1280px", // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [],
};
