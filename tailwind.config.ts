import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "bg-image": "url('/bg.jpg')", // Ensure the path is correct
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        blackOverlay: "rgba(0, 0, 0, 0.5)", // Add this line
      },
    },
  },
  plugins: [],
};
export default config;
