/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#6C5DD3',  // Main purple color
          light: '#F3F2FF',   // Light purple background
          dark: '#4A47A3',    // Darker purple for accents
        },
        secondary: {
          DEFAULT: '#FFAB00', // Accent color (orange)
          light: '#FFF8E1',   // Light orange background
        },
        gray: {
          light: '#F4F4F6',   // Light gray background
          DEFAULT: '#A0AEC0', // Neutral gray
          dark: '#4A5568',    // Dark gray
        },
      },
    },
  },
  plugins: [],
}
