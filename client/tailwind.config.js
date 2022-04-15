module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        "2xl": "3rem",
      },
    },
    extend: {
      colors: {
        primary: "#1682FD",
        secondary: "#F48023",
        "secondary-hover": "#c26419",
        "light-gray": "#EAEAEA",
        "light-gray-2": "#FAFAFA",
        "light-gray-hover": "#bababa",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
