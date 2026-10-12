/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        verde: {
          50: '#f2f8f4',
          100: '#e1efe6',
          200: '#c5dfd0',
          300: '#9ec7b0',
          400: '#71aa8d',
          500: '#4c8d6e',
          600: '#397056',
          700: '#2f5a46',
          800: '#284839',
          900: '#223c31',
          950: '#11221c',
        },
        earth: {
          50: '#fbf8f4',
          100: '#f4ede4',
          200: '#ebd9c6',
          300: '#dec0a3',
          400: '#cca17d',
          500: '#bf8660',
          600: '#b07052',
          700: '#925744',
          800: '#77473b',
          900: '#633c33',
        },
        sand: '#F7F5F0',
        cream: '#FFFDF9',
        charcoal: '#1A1D1A',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulseSubtle 2.5s infinite ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
}
