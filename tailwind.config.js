/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
   extend: {
  colors: {
    background: "var(--background)",
    foreground: "var(--foreground)",
    card: "var(--card)",
    primary: "var(--primary)",
    primaryLight: "var(--primary-light)",
    border: "var(--border)",
    borderStrong: "var(--border-strong)",
    grid: "var(--grid)",
    tooltip: "var(--tooltip-bg)",
    sidebar: "var(--sidebar)",
  },
  borderRadius: {
    "4xl": "32px",
  }
}
  },
  plugins: [],
};