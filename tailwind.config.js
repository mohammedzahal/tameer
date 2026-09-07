/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        carbon: {
          950: '#000000',
          900: '#0a0a0a',
          850: '#121212',
          800: '#18181b',
          750: '#27272a',
          700: '#3f3f46',
          600: '#52525b',
          500: '#71717a',
        },
        titanium: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
        },
        silver: {
          DEFAULT: '#E4E4E7',
          light: '#FFFFFF',
          dark: '#A1A1AA',
          chrome: '#F4F4F5',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'Alexandria', 'sans-serif'],
        display: ['Poppins', 'Alexandria', 'sans-serif'],
        arabic: ['Alexandria', 'Poppins', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'silver-glow': '0 0 30px -5px rgba(255, 255, 255, 0.15)',
        'silver-glow-lg': '0 0 50px -10px rgba(255, 255, 255, 0.22)',
        'dark-card': '0 20px 40px -15px rgba(0, 0, 0, 0.95)',
      },
    },
  },
  plugins: [],
}
