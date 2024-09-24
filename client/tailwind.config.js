/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-gray": "#252525",
        "light-gray": "#313131",
        "main-green": "#258c60",
      },
    },
  },
  plugins: [],
};

