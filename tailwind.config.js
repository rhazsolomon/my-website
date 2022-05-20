const plugin = require('tailwindcss/plugin')

const backfaceVisibility = plugin(function ({ addUtilities }) {
  addUtilities({
    '.backface-visible': {
      'backface-visibility': 'visible',
    },
    '.backface-hidden': {
      'backface-visibility': 'hidden',
    }
  })
});

module.exports = {
  content: [],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'bounce-slow-1': 'bounce 3s infinite',
        'bounce-slow-2': 'bounce 4s infinite',
        'bounce-slow-3': 'bounce 3.5s infinite'
      }
    },
    fontFamily: {
      'display': ['Oswald'],
      'body': ['"Open Sans"'],
    }
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
