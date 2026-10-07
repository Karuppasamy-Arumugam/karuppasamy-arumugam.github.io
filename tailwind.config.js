/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          light: '#f5f9ff',
          dark: '#050b14',
          cardLight: '#ffffff',
          cardDark: '#0b1727',
          borderLight: '#dce8f5',
          borderDark: '#1d334b',
        },
        charcoal: {
          50: '#f3f8fc',
          100: '#e3edf6',
          200: '#c5d7e8',
          300: '#9db9d2',
          400: '#7195b5',
          500: '#527696',
          600: '#3f5e79',
          700: '#30495f',
          800: '#1b3044',
          900: '#0b1b2b',
          950: '#04101d',
        },
        brand: {
          50: '#eef9ff',
          100: '#d9f1ff',
          200: '#bce8ff',
          300: '#8edaff',
          400: '#59c3ff',
          500: '#2e9fff',
          600: '#167de8',
          700: '#1464bb',
          800: '#185598',
          900: '#19477b',
        },
        warm: {
          100: '#f7eadb',
          300: '#e3bd8f',
          500: '#c98b55',
          700: '#8b5935',
        },
        accent: {
          green: '#22c55e',
          blue: '#2e9fff',
          cyan: '#67e8f9',
          purple: '#7c3aed',
          amber: '#d9a86c',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.35', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.08)' },
        }
      }
    },
  },
  plugins: [],
}
