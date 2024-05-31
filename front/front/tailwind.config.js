/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      darkgreen: "#1b3a30",
      lightgreen: "#22c55e",
      alertred: "#ef4444",
      zinc500: "#71717a",
      zinc700: "#3f3f46",
      white: "#fff",
    },
    extend: {},
  },
  plugins: [],
}

