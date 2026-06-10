/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './sections/**/*.{ts,tsx}',
    './hooks/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Onest', 'sans-serif'],
        body: ['Onest', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Onest', 'sans-serif'],
      },
      colors: {
        bg: { DEFAULT: '#0A0A0A', light: '#f8fafc' },
        surface: { DEFAULT: '#111111', light: '#ffffff' },
        card: { DEFAULT: '#161616', light: '#f1f5f9' },
        violet: {
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'ping-slow': 'ping 3s cubic-bezier(0,0,0.2,1) infinite',
        'scroll-left': 'scroll-left 25s linear infinite',
        'scroll-right': 'scroll-right 30s linear infinite',
        shimmer: 'shimmer 2s linear infinite',
        'fade-up': 'fadeUp 0.6s ease forwards',
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-14px)' } },
        'scroll-left': { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        'scroll-right': { '0%': { transform: 'translateX(-50%)' }, '100%': { transform: 'translateX(0)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        fadeUp: { '0%': { opacity: '0', transform: 'translateY(24px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
      backdropBlur: { xs: '2px' },
    },
  },
  plugins: [],
};
