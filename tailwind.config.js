/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // adjust this to your project
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: "Roboto Mono, monospace",
      },
    },
  },
  plugins: [],
};
