module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class', 
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], 
      },
      scale: {
        '102': '1.02', 
      },
      colors: {
    
        darkBg: '#0f0f0f',
        darkCard: '#1a1a1a',
        accent: '#6366f1', 
      },
    },
  },
  plugins: [],
};