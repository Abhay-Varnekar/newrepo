/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gb: {
          50: '#fdf8ef',
          100: '#f9edd3',
          200: '#f2d8a5',
          300: '#e9be6e',
          400: '#e0a53e',
          500: '#d4942a',
          600: '#b87a1a',
          700: '#995f17',
          800: '#7d4c1a',
          900: '#684019',
        },
        warm: {
          50: '#fefcf9',
          100: '#fdf8f0',
          200: '#faf0e0',
          300: '#f5e4c8',
          400: '#eed3a5',
          500: '#e4be82',
        },
        razorpay: {
          50: '#e0f2fe',
          100: '#bae6fd',
          200: '#7dd3fc',
          300: '#38bdf8',
          400: '#0ea5e9',
          500: '#1d4ed8',
          600: '#1e40af',
          700: '#1e3a8a',
          800: '#172554',
          900: '#0f172a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}