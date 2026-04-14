/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: { top: '#2a3d3d', bottom: '#b8a97a' },
        surface: { DEFAULT: '#1c1f1f', 2: '#2a2d2d', 3: '#3a3d3d' },
        accent: { green: '#2ecc71', greenDark: '#1a5f3f', sand: '#c9a86a' },
        divider: 'rgba(255,255,255,0.08)'
      },
      fontFamily: {
        ui: ['-apple-system', 'BlinkMacSystemFont', 'Inter', 'SF Pro Display', 'system-ui', 'sans-serif'],
        ar: ['"Scheherazade New"', 'serif']
      },
      borderRadius: { card: '20px', sheet: '24px' },
      backdropBlur: { xs: '4px', glass: '40px' }
    }
  },
  plugins: []
}
