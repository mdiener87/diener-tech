/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5", // Nuxt UI defaults to indigo
        secondary: "#14B8A6", // Nice teal for accents
        background: "#F9FAFB", // Light mode background
        "background-dark": "#1E1E1E", // Dark mode background
        "text-light": "#111827", // Darker text for readability
        "text-dark": "#E5E7EB", // Lighter text for dark mode
      },
      spacing: {
        container: "2rem", // Standardized padding for layouts
      },
      borderRadius: {
        DEFAULT: "8px",
      },
    },
  },
  plugins: [],
};
