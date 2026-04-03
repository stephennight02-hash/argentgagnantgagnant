/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#6366f1', // Indigo 500
          DEFAULT: '#4f46e5', // Indigo 600
          dark: '#4338ca', // Indigo 700
          premium: '#1e1b4b', // Deep indigo
        },
        conversion: {
          light: '#34d399', // Emerald 400
          DEFAULT: '#10b981', // Emerald 500
          dark: '#059669', // Emerald 600
        }
      }
    },
  },
  plugins: [],
}

