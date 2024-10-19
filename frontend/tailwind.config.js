import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],

  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        "purple-dark": {
          extend: "dark", // <- inherit default values from dark theme
          colors: {
            background: "#0D001A",
            foreground: "#ffffff",
            primary: {
              50: "#3B096C",
              100: "#520F83",
              200: "#7318A2",
              300: "#9823C2",
              400: "#c031e2",
              500: "#DD62ED",
              600: "#F182F6",
              700: "#FCADF9",
              800: "#FDD5F9",
              900: "#FEECFE",
              DEFAULT: "#DD62ED",
              foreground: "#ffffff",
            },
            success: {
              100: "#F5FCD0",
              200: "#E9F9A2",
              300: "#D3EE72",
              400: "#BADE4D",
              500: "#99c81a",
              600: "#7EAC13",
              700: "#65900D",
              800: "#4D7408",
              900: "#3D6004",
              DEFAULT: "#99c81a",
              foreground: "#000",
            },
            info: {
              100: "#DAF5FE",
              200: "#B6E8FE",
              300: "#92D7FD",
              400: "#76C5FB",
              500: "#4AA8F9",
              600: "#3683D6",
              700: "#2562B3",
              800: "#174590",
              900: "#0E3077",
              DEFAULT: "#4AA8F9",
              foreground: "#000",
            },
            warning: {
              100: "#FFF6D7",
              200: "#FFEBB0",
              300: "#FFDC88",
              400: "#FFCE6B",
              500: "#FFB73A",
              600: "#DB942A",
              700: "#B7731D",
              800: "#935612",
              900: "#7A410B",
              DEFAULT: "#FFB73A",
              foreground: "#000",
            },
            danger: {
              100: "#FBDCCB",
              200: "#F8B299",
              300: "#EA7B64",
              400: "#D54A3D",
              500: "#b90909",
              600: "#9F0613",
              700: "#85041A",
              800: "#6B021E",
              900: "#58011F",
              DEFAULT: "#b90909",
              foreground: "#fff",
            },
            focus: "#F182F6",
          },
          layout: {
            disabledOpacity: "0.3",
            radius: {
              small: "4px",
              medium: "6px",
              large: "8px",
            },
            borderWidth: {
              small: "1px",
              medium: "2px",
              large: "3px",
            },
          },
        },
      },
    }),
  ],
};
