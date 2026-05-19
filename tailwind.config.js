/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#020810',
          900: '#050d1a',
          800: '#0a1628',
          700: '#0f1f3d',
          600: '#152a52',
          500: '#1a3a6b',
          400: '#1e4d8c',
        },
        gold: {
          950: '#4a3000',
          900: '#6b4400',
          800: '#8c5e00',
          700: '#a07830',
          600: '#b8922a',
          500: '#c8a951',
          400: '#d4ba6a',
          300: '#e0cb85',
          200: '#ecdc9e',
          100: '#f5ecc4',
          50:  '#faf7eb',
        },
        royal: '#1a3a6b',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Bebas Neue', 'Impact', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #020810 0%, #0a1628 40%, #152a52 70%, #020810 100%)',
        'gold-gradient': 'linear-gradient(135deg, #8c5e00 0%, #c8a951 50%, #8c5e00 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(10,22,40,0.95) 0%, rgba(21,42,82,0.9) 100%)',
        'glass': 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
      },
      boxShadow: {
        'gold': '0 0 20px rgba(200,169,81,0.3)',
        'gold-lg': '0 0 40px rgba(200,169,81,0.4)',
        'navy': '0 0 30px rgba(2,8,16,0.8)',
        'glass': '0 8px 32px rgba(2,8,16,0.6)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'slide-up': 'slideUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(200,169,81,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(200,169,81,0.7)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
