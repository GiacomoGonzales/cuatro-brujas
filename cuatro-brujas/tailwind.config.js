/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0D001D',
        secondary: '#A259FF',
        accent: '#FFB700',
        light: '#FFFFFF',
        dark: '#1A002D',
        // Mantengo los colores místicos para compatibilidad transitoria
        'mystic-dark': '#0D001D',
        'mystic-purple': '#A259FF',
        'mystic-light': '#FFFFFF',
        'mystic-accent': '#FFB700',
      },
      fontFamily: {
        title: ['"Playfair Display"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
        // Mantengo nombres anteriores para compatibilidad
        'playfair': ['"Playfair Display"', 'serif'],
        'sans': ['"Inter"', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #A259FF' },
          '100%': { boxShadow: '0 0 20px #A259FF, 0 0 30px #A259FF' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
} 