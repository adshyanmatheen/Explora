/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/GetStarted/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Poppins", "sans-serif"],
      },
      colors: {
        getstarted: {
          light: "#f1f5f9",
          dark: "#0f172a",
          input: "#f1f5f9",
          placeholderlight: "#111827",
          placeholderdark: "#fafafa",
          inputdark: "#343434",
          customBlue: "#1A2E35",
        },
      },
      screens: {
        mobile: "300px",
      },
      keyframes: {
        "button-animation": {
          "0%": {
            transform: "translateX(-650%)",
            opacity: "1",
            visibility: "hidden",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
            visibility: "visible",
          },
        },
      },
      animation: {
        button: "button-animation 4.5s ease-in-out",
      },
    },
  },
  plugins: [],
};
