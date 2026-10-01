import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

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
          dark: '#0b1628',
          light: '#1e3a5f',
        },
        crimson: {
          DEFAULT: '#7c1d2a',
          light: '#fce8ec',
        },
        gold: {
          DEFAULT: '#c9a44a',
          dark: '#a88035',
          light: '#f3ead2',
        },
        cream: '#f7f3ec',
        ink: '#1c1917',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'Cambria', '"Times New Roman"', 'serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(21,39,68,0.04), 0 4px 16px -4px rgba(21,39,68,0.08)',
        lift: '0 2px 4px rgba(21,39,68,0.06), 0 12px 32px -8px rgba(21,39,68,0.18)',
      },
    },
  },
  plugins: [typography],
};

export default config;
