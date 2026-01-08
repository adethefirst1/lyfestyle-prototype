/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f2f6',
          100: '#b3d9e6',
          200: '#80c0d6',
          300: '#4da7c6',
          400: '#1a8eb6',
          500: '#005B84',
          600: '#004d6f',
          700: '#003f5a',
          800: '#003145',
          900: '#002330',
        },
        brand: {
          blue: '#005BEC',
          dark: '#005B84',
          orange: '#FF6700',
        },
        accent: {
          orange: '#FF6700',
          blue: '#005BEC',
          dark: '#005B84',
          silver: '#cbd5e1',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'Crimson Text', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'futuristic': 'linear-gradient(135deg, #005BEC 0%, #005B84 100%)',
        'brand-gradient': 'linear-gradient(135deg, #005BEC 0%, #005B84 50%, #FF6700 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 91, 236, 0.5), 0 0 10px rgba(0, 91, 236, 0.3)' },
          '100%': { boxShadow: '0 0 10px rgba(0, 91, 236, 0.8), 0 0 20px rgba(0, 91, 236, 0.5)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      spacing: {
        '25': '100px',
      },
    },
  },
  plugins: [],
}

