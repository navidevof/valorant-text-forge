/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-red-1': '#FD4556',
        'custom-red-2': "#BD3944",
        'custom-red-3': "#53212B",
        "custom-white": "#FFFBF5",
        "custom-black": "#000000",
      },
    },
  },
  plugins: [],
}

