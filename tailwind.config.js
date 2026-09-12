/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    "./auth/**/*.{js,jsx}",
    "./federation/**/*.{js,jsx}",
    "./society/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand navy, matches the auth screens (#141B33). Components
        // currently reference this as an arbitrary value (bg-[#141B33]);
        // these tokens are here so new/updated code can use bg-brand-900 etc.
        brand: {
          50: "#EEF0F6",
          100: "#DCE0EC",
          200: "#BCC4DC",
          300: "#96A3C4",
          400: "#6D7EA8",
          500: "#4C5E8C",
          600: "#37456F",
          700: "#2A3A63",
          800: "#1C2647",
          900: "#141B33",
          950: "#0E1327",
        },
      },
    },
  },
  plugins: [],
};
