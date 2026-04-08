import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      colors: {
        brand: "#00b3e5",
        "brand-accessible": "#157fd7",
        neutral: {
          "00": "#ffffff",
          "10": "#f6f5f4",
          "20": "#edeceb",
          "30": "#e0dfdf",
          "40": "#cccbca",
          "45": "#767676",
          "50": "#424242",
          "60": "#363535",
          "70": "#262626",
          "80": "#1b1b1b",
          "90": "#000000",
        },
        tan: {
          "05": "#f9f7f1",
          "10": "#efe8db",
          "20": "#d7cab0",
          "30": "#bbaa88",
          "40": "#a3916e",
          "50": "#816f4d",
        },
        "cyan-surface": "#e4f2f5",
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "24px",
        full: "9999px",
      },
      boxShadow: {
        sm: "0px 2px 2px 0px rgba(88,70,80,0.01), 0px 1px 2px 0px rgba(88,70,80,0.05), 0px 1px 1px 0px rgba(88,70,80,0.09), 0px 0px 1px 0px rgba(88,70,80,0.1)",
        md: "0px 14px 5px 0px rgba(88,70,80,0.01), 0px 8px 5px 0px rgba(88,70,80,0.04), 0px 3px 3px 0px rgba(88,70,80,0.07), 0px 0px 2px 0px rgba(88,70,80,0.08)",
        lg: "0px 39px 16px 0px rgba(88,70,80,0.01), 0px 22px 13px 0px rgba(88,70,80,0.04), 0px 10px 10px 0px rgba(88,70,80,0.07), 0px 1px 5px 0px rgba(88,70,80,0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
