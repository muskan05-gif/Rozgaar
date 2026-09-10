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
          950: "#0E1327",
          900: "#141B33",
          800: "#1C2647",
        },
      },
    },
  },
  plugins: [],
};
