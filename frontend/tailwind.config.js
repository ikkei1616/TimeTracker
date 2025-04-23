/** @type {import('tailwindcss').Config} */
export default  {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        mainBlue:"#338ef7",
        mainRed: "#f54180",
      },
      width: {
        "111": "28rem",
      }
    },
  },
  plugins: [],
};