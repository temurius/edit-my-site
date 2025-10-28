/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        brand: {
          indigo: '#6366f1',
          'indigo-dark': '#4338ca',
          emerald: '#10b981',
          'emerald-dark': '#047857',
          slate: '#0f172a',
          'slate-light': '#1e293b'
        }
      },
      boxShadow: {
        glow: '0 0 30px rgba(99, 102, 241, 0.35)',
        'inner-glow': 'inset 0 0 25px rgba(16, 185, 129, 0.25)'
      },
      backgroundImage: {
        'mesh-gradient': 'radial-gradient(circle at 20% 20%, rgba(99,102,241,0.35), transparent 55%), radial-gradient(circle at 80% 10%, rgba(16,185,129,0.45), transparent 45%)'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
};
