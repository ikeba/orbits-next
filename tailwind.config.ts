import type { Config } from "tailwindcss";
import tailwindPresetMantine from "tailwind-preset-mantine";

export default {
  prefix: "tw-",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        "o-dark": "#242424",
        "o-darker": "#1d1d1d",
      },
    },
  },
  plugins: [],
  presets: [tailwindPresetMantine],
} satisfies Config;
