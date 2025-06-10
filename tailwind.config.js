/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js" // Add this line
  ],
  theme: {
    extend: {
      colors: {
        primary: "#141414",
        yellowprimary: "#E9DF07",
        yellowlight: "#E9DF07",
        borderGray: "#707070",
        page: "#F2F2F2",
        blueLight: "#bfe0f6",
        customBlue: "#2697E0",
      },
      boxShadow: {
        card: "0px 3px 6px #00000029",
      },
      borderRadius: {
        card: "18px",
      },
    },
  },
  plugins: [],
};
