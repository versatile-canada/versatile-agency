/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: '#06060A',
          2: '#0B0B14',
          3: '#111220'
        },
        ink: {
          DEFAULT: '#F5F5F7',
          dim: '#9AA0AC',
          faint: '#5C6270'
        },
        blob: {
          blue: '#4C6FFF',
          violet: '#A855F7',
          pink: '#FF4FA3',
          cyan: '#22D3EE'
        }
      },
      fontFamily: {
        display: ['"Unbounded"', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      boxShadow: {
        glass: '0 8px 40px -12px rgba(0,0,0,0.6)',
        glow: '0 0 60px -10px rgba(76,111,255,0.35)'
      }
    }
  },
  plugins: []
}
