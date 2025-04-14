/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6366F1", // Indigo color
        secondary: "#F59E0B", // Amber color
        background: "#F9FAFB", // Light gray background
        error: "#EF4444", // Red for errors
        success: "#10B981", // Green for success
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};
