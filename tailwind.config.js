/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin'
module.exports = {
  content: [
    './index.html',
    './src/**/*.{html,js}',
    './dist/**/*.{html,js}'
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: ".7rem",
        sm: "1rem"
      },
    },
    extend: {
      fontFamily: {
        sans: ['"Arial"', "sans-serif"],
      },
      fontSize: {
        'sm': '0.8rem',
      },
      colors: {
        red: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#DB2524',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
        },
        navy: {
          50: '#F2F3F7',
          100: '#E5E7EF',
          200: '#CBCFE0',
          300: '#B1B7D0',
          400: '#979FC1',
          DEFAULT: '#232A45',
          500: '#232A45',
          600: '#1C2237',
          700: '#151A2A',
          800: '#0E111C',
          900: '#07080E',
        },
      },
      keyframes: {
        fadeIn: {
          '0%': {opacity: 0},
          '100%': {opacity: 1}
        },
        slideIn: {
          "0%": {
            opacity: 0,
            translate: "-20px 0"
          },
          "100%": {
            opacity: 1,
            translate: "0 0"
          }
        }
      },
      animation: {
        fadeIn: 'fadeIn .4s ease-in-out forwards',
        slideIn: 'slideIn .4s ease-in-out forwards'
      }
    },
  },
  plugins: [plugin(({addUtilities}) => {
    function animationDelay(){
      const delays = {};
      for (let i = 0; i < 12; i++) {
        delays[`.animate-${i}`] = {
          "animation-delay": `${i * 100}ms`,
        }
      }
      return delays;
    }
    addUtilities(animationDelay)
  })],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './index.html',
      './src/**/*.{html,js}',
      './dist/**/*.{html,js}'
    ],
  },
}
