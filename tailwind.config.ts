import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#152744',
          dark: '#0e1c2e',
          light: '#1e3a5f',
        },
        crimson: {
          DEFAULT: '#7c1d2a',
          light: '#fce8ec',
        },
        gold: {
          DEFAULT: '#c9a44a',
          dark: '#a88035',
        },
        cream: '#f5f0e8',
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
