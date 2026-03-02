import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cyan: {
          500: '#22d3ee'
        },
        teal: {
          600: '#0f766e'
        }
      }
    }
  },
  plugins: []
};

export default config;
