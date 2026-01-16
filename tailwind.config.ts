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
        primary: {
          DEFAULT: '#FF4D00',
          dark: '#CC3D00',
          light: '#FF7033',
        },
        secondary: {
          DEFAULT: '#1A1A2E',
          dark: '#0F0F1A',
          light: '#2D2D44',
        },
        accent: {
          DEFAULT: '#FFB800',
          dark: '#CC9300',
          light: '#FFCC33',
        },
        flame: '#FF6B35',
        ember: '#F72C25',
        smoke: '#2C2C2C',
        charcoal: '#1C1C1C',
        cream: '#FFF8F0',
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'flame': 'flame 0.5s ease-in-out infinite alternate',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        flame: {
          '0%': { transform: 'scale(1) rotate(-2deg)' },
          '100%': { transform: 'scale(1.1) rotate(2deg)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'fire-gradient': 'linear-gradient(135deg, #FF4D00 0%, #FF6B35 50%, #FFB800 100%)',
      },
    },
  },
  plugins: [],
}
export default config
