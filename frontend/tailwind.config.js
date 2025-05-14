/** @type {import('tailwindcss').Config} */
export default  {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        mainBlue:"#338ef7",
        mainRed: "#f54180",
        mainBlack: "#0D141C",
        mainGray:"#9CA3AF",
        lightGray:"#F0F0F0",
      },
      width: {
        "111": "28rem",
      }
    },
  },
  plugins: [],
};