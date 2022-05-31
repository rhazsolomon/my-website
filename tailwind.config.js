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
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {

    extend: {
      animation: {
        'bounce-slow-1': 'bounce 3s infinite',
        'bounce-slow-2': 'bounce 4s infinite',
        'bounce-slow-3': 'bounce 3.5s infinite'
      },
      colors: {
        'rhaz-minor-grey': '#F4F4F4',
        'rhaz-major-grey': '#AFAFAF',
        'rhaz-primary': '#46BBFE',
        'white': 'white',
        'black': 'black',
        'debug': '#AF9393',
        'transparent': 'transparent',
      },
      fontFamily: {
        'display': ['Oswald'],
        'body': ['"Open Sans"'],
      }
    },
    fontFamily: {
      'display': ['Oswald'],
      'body': ['Open Sans'],
      'rhaz': ['Avenir']
    }
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
