/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#F59521', // Cam năng động
        secondary: '#0D0D0D', // Đen đậm
        'base-light': '#F9FAFB', // Nền sáng
        'text-muted': '#6B7280', // Xám nhạt
        accent: '#2563EB', // Xanh lam
        'cta-hover': '#DC2626', // Đỏ đậm
      }
    },
  },
  plugins: [],
}
