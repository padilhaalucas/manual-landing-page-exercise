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
        "banner": "url('/assets/bg-banner.jpg')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'sage-green-manual': '#f4f5f0',
        "dark-green-manual": "#0B3B3C",
        "dark-red-manual": "#7E0707",
        "light-blue-manual": "#A7D1D6",
      },
      fontFamily: {
        sans: ['TT Norms', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
