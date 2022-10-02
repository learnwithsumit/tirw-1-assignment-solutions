/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '0rem 1rem',
    },
    extend: {
      fontFamily: {
        raleway: "'Raleway',sans-serif",
        openSans: "'Open Sans', sans-serif;",
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
