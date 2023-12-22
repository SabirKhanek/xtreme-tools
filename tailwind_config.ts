import defaultTheme from "tailwindcss/defaultTheme";
import daisyui from "daisyui";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ...defaultTheme.colors,
        // blue: "#039BE5",
        // black: "#0D131D",
        // grey: "#8A9099",
        // "light-grey": "#E2E6ED",
        "bluer-white": "#F2F3F7",
        primary: "#58126A",
        highlight: "#35837F",
      },
      fontFamily: {
        sans: ["Montserrat", ...defaultTheme.fontFamily.sans],
      },
      screens: {
        xs: "475px",
        lm: "500px",
        "3xl": "1920px",
        "4xl": "2560px",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["winter", "night"],
  },
  darkMode: ["class", '[data-theme="night"]'],
};
