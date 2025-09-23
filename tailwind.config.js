/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  theme: {
    extend: {
      colors: {
        // Custom AstraOne color palette
        'astra-gray-600': '#667085',
        'astra-gray-800': '#2B2C2C', 
        'astra-slate-300': '#E2E8F0',
        'astra-gray-50': '#F9FAFB',
        'astra-white': '#FFFFFF',
        'astra-blue': '#465FFF',
        'astra-gray-700': '#374151',
        'astra-blue-50': '#E3EDFF',
        'astra-gray-100': '#F3F4F6',
        'astra-gray-750': '#3F4654',
        'astra-gray-600-80': '#66708580', // 80% opacity
        'astra-gray-600-33': '#66708533', // 33% opacity
        'astra-gray-400': '#B3B8C2',
        'astra-gray-25': '#F8F9FA'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
}
