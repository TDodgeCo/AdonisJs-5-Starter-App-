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
        'primary': {
            DEFAULT: '#0A0A0A',
            100: '#494949',
            200: '#434343',
            300: '#393939',
            400: '#343434',
            500: '#292929',
            600: '#191919',
            700: '#151515',
            800: '#121212',
            900: '#0F0F0F'
        },
        'secondary': {
            DEFAULT: '#fffbfe',
            100: '#F8F2F6',
            200: '#F1E4ED',
            300: '#EDE0EA',
            400: '#E9D8E5',
            500: '#E2CBDC',
            600: '#FFD6F5',
            700: '#FFC2F0',
            800: '#FF99E5',
            900: '#FF5CD6'
        },
        'tertiary': {
            DEFAULT: '#76dae5',
            100: '#e4f8fa',
            200: '#c8f0f5',
            300: '#ade9ef',
            400: '#91e1ea',
            500: '#76dae5',
            600: '#3ccada',
            700: '#21a1af',
            800: '#166b75',
            900: '#0b363a'
        },
        'quadrary': {
            DEFAULT: '#8d1cd9',
            100: '#1c062b',
            200: '#380b57',
            300: '#551182',
            400: '#7117ad',
            500: '#8d1cd9',
            600: '#a543e7',
            700: '#bc72ed',
            800: '#d2a1f3',
            900: '#e9d0f9'
        },
        'quintary': {
            DEFAULT: '#b6b7cd',
            100: '#1f202e',
            200: '#3f405c',
            300: '#5e608a',
            400: '#888aae',
            500: '#b6b7cd',
            600: '#c5c6d7',
            700: '#d3d4e1',
            800: '#e2e2eb',
            900: '#f0f1f5'
        },
        'orange': {
            50: '#fff7ed',
            100: '#ffedd5',
            200: '#fed7aa',
            300: '#fdba74',
            400: '#fb923c',
            500: '#f97316',
            600: '#ea580c',
            700: '#c2410c',
            800: '#9a3412',
            900: '#7c2d12',
            950: '#431407'
        }
        
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
