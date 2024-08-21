/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './lib/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
    },
  },
  plugins: [
    require('daisyui'),
    require('tailwind-scrollbar-daisyui'),
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['light'],
        },
      },
      {
        dark: {
          ...require('daisyui/src/theming/themes')['dark'],
        },
      },
    ],
  },
};
