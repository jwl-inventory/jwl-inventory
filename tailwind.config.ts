import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  '#fdf9ee',
          100: '#f9efcc',
          200: '#f2da93',
          300: '#e9c05a',
          400: '#e0a832',
          500: '#c8891a',
          600: '#a86a13',
          700: '#854f11',
          800: '#6d3f14',
          900: '#5c3514',
        },
        obsidian: {
          50:  '#f5f5f5',
          100: '#e9e9e9',
          200: '#d3d3d3',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5a5a5a',
          700: '#4a4a4a',
          800: '#2a2a2a',
          900: '#121212',
          950: '#080808',
        },
        cream: '#f8f5ef',
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'widest-2': '0.25em',
        'widest-3': '0.35em',
      },
    },
  },
  plugins: [],
}
export default config
