/** @type {import('tailwindcss').Config} */

// COOLORS THEME https://coolors.co/070707-fffbfe-b6b7cd-8d1cd9-76dae5

module.exports = {
  content: [
    "./resources/**/*.{edge,html,js,ts,jsx,tsx,vue,svelte}",
    "./node_modules/flowbite/**/*.js"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary': { DEFAULT: '#070707', 100: '#020202', 200: '#030303', 300: '#050505', 400: '#060606', 500: '#070707', 600: '#393939', 700: '#6b6b6b', 800: '#9c9c9c', 900: '#cecece' },
        'secondary': { DEFAULT: '#fffbfe', 100: '#65004c', 200: '#ca0097', 300: '#ff30cb', 400: '#ff95e4', 500: '#fffbfe', 600: '#fffbfe', 700: '#fffcfe', 800: '#fffdfe', 900: '#fffeff' },
        'tertiary': { DEFAULT: '#b6b7cd', 100: '#1f202e', 200: '#3f405c', 300: '#5e608a', 400: '#888aae', 500: '#b6b7cd', 600: '#c5c6d7', 700: '#d3d4e1', 800: '#e2e2eb', 900: '#f0f1f5' },
        'quadrary': { DEFAULT: '#8d1cd9', 100: '#1c062b', 200: '#380b57', 300: '#551182', 400: '#7117ad', 500: '#8d1cd9', 600: '#a543e7', 700: '#bc72ed', 800: '#d2a1f3', 900: '#e9d0f9' },
        'quintary': { DEFAULT: '#76dae5', 100: '#0b363a', 200: '#166b75', 300: '#21a1af', 400: '#3ccada', 500: '#76dae5', 600: '#91e1ea', 700: '#ade9ef', 800: '#c8f0f5', 900: '#e4f8fa' },
        "orange": { "50": "#fff7ed", "100": "#ffedd5", "200": "#fed7aa", "300": "#fdba74", "400": "#fb923c", "500": "#f97316", "600": "#ea580c", "700": "#c2410c", "800": "#9a3412", "900": "#7c2d12", "950": "#431407" },
        
      },
    },
    fontFamily: {
      'body': [
        'system-ui',
        'Roboto',
        'Inter',
        'ui-sans-serif',
        '-apple-system',
        'system-ui',
        'Segoe UI',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji'
      ],
      'sans': [
        'system-ui',
        'Roboto',
        'Inter',
        'ui-sans-serif',
        '-apple-system',
        'system-ui',
        'Segoe UI',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji'
      ]
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('flowbite/plugin')({
      charts: true,
      forms: true,
      tooltips: true,
    }),
  ],
}
