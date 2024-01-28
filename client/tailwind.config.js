import daisyui from "daisyui";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#244d4d",
        secondary: "#ffe0b0",
        error: "#e3342f",
        success: "#38c172",
      },
    },
  },
  plugins: [daisyui],
};
