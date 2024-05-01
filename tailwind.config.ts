import defaultTheme from "tailwindcss/defaultTheme";
import daisyui from "daisyui";
import theme from "daisyui/src/theming/themes";
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
        960: "960px",
        "3xl": "1920px",
        900: "900px",
        lm: "525px",
        "4xl": "2560px",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      "winter",
      "night",
      {
        mytheme: {
          primary: "#58126A",
          secondary: "#f6d860",
          accent: "#37cdbe",
          neutral: "#3d4451",
          "base-100": "#ffffff",
        },
      },
    ],
  },
  darkMode: ["class", '[data-theme="night"]'],
};
