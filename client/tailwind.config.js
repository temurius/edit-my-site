/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          600: '#2563eb',
          700: '#1d4ed8'
        }
      },
      boxShadow: {
        soft: '0 8px 30px rgba(0, 0, 0, 0.12)'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}

