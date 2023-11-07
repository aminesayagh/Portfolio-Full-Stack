/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    'html.has-scroll-smooth',
    'html.has-scroll-dragging',
    '[data-scroll-direction="horizontal"]',
    '.c-scrollbar',
    '.c-scrollbar_thumb',
    '.c-scrollbar_thumb:hover',
    '[data-scroll-container]'
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
    },
    fontSize: {
      mxs: ".6875rem",
      xxs: ".75rem",
      xs: ".84rem",
      sm: ".89rem",
      tiny: "0.94rem",
      base: "1rem",
      lg: "1.09rem",
      "2lg": "1.125rem",
      xl: "1.25rem",
      "2xl": "1.4rem",
      "3xl": "1.5rem",
      "4xl": "1.6rem",
      "5xl": "1.8rem",
      "6xl": "2rem",
      "7xl": "2.45rem",
      "8xl": "2.6rem",
      "9xl": "3rem",
      "10xl": "3.2rem",
      "11xl": "3.4rem",
      "12xl": "3.6rem",
      "13xl": "3.8rem",
      "14xl": "4rem",
      "15xl": "4.2rem",
      "16xl": "5rem",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      'primary': {
        DEFAULT: 'oklch(var(--primary-500) / <alpha-value>)',
        '100': 'oklch(var(--primary-100) / <alpha-value>)',
        '200': 'oklch(var(--primary-200) / <alpha-value>)',
        '300': 'oklch(var(--primary-300) / <alpha-value>)',
        '400': 'oklch(var(--primary-400) / <alpha-value>)',
        '500': 'oklch(var(--primary-500) / <alpha-value>)',
        '600': 'oklch(var(--primary-600) / <alpha-value>)',
        '700': 'oklch(var(--primary-700) / <alpha-value>)',
        '800': 'oklch(var(--primary-800) / <alpha-value>)',
        '900': 'oklch(var(--primary-900) / <alpha-value>)',
      },
      'secondary': {
        DEFAULT: 'oklch(var(--secondary-500) / <alpha-value>)',
        '100': 'oklch(var(--secondary-100) / <alpha-value>)',
        '200': 'oklch(var(--secondary-200) / <alpha-value>)',
        '300': 'oklch(var(--secondary-300) / <alpha-value>)',
        '400': 'oklch(var(--secondary-400) / <alpha-value>)',
        '500': 'oklch(var(--secondary-500) / <alpha-value>)',
        '600': 'oklch(var(--secondary-600) / <alpha-value>)',
        '700': 'oklch(var(--secondary-700) / <alpha-value>)',
        '800': 'oklch(var(--secondary-800) / <alpha-value>)',
        '900': 'oklch(var(--secondary-900) / <alpha-value>)',
      },
      'white': {
        DEFAULT: 'oklch(var(--white-100) / <alpha-value>)',
        '100': 'oklch(var(--white-100) / <alpha-value>)',
        '200': 'oklch(var(--white-200) / <alpha-value>)',
        '300': 'oklch(var(--white-300) / <alpha-value>)',
        '400': 'oklch(var(--white-400) / <alpha-value>)',
        '500': 'oklch(var(--white-500) / <alpha-value>)',
        '600': 'oklch(var(--white-600) / <alpha-value>)',
        '700': 'oklch(var(--white-700) / <alpha-value>)',
        '800': 'oklch(var(--white-800) / <alpha-value>)',
        '900': 'oklch(var(--white-900) / <alpha-value>)'
      },
      'gray': {
        DEFAULT: 'oklch(var(--gray-500) / <alpha-value>)',
        '100': 'oklch(var(--gray-100) / <alpha-value>)',
        '200': 'oklch(var(--gray-200) / <alpha-value>)',
        '300': 'oklch(var(--gray-300) / <alpha-value>)',
        '400': 'oklch(var(--gray-400) / <alpha-value>)',
        '500': 'oklch(var(--gray-500) / <alpha-value>)',
        '600': 'oklch(var(--gray-600) / <alpha-value>)',
        '700': 'oklch(var(--gray-700) / <alpha-value>)',
        '800': 'oklch(var(--gray-800) / <alpha-value>)',
        '900': 'oklch(var(--gray-900) / <alpha-value>)'
      },
      'black': {
        DEFAULT: 'oklch(var(--black-100) / <alpha-value>)',
        '100': 'oklch(var(--black-100) / <alpha-value>)',
        '200': 'oklch(var(--black-200) / <alpha-value>)',
        '300': 'oklch(var(--black-300) / <alpha-value>)',
        '400': 'oklch(var(--black-400) / <alpha-value>)',
        '500': 'oklch(var(--black-500) / <alpha-value>)',
        '600': 'oklch(var(--black-600) / <alpha-value>)',
        '700': 'oklch(var(--black-700) / <alpha-value>)',
        '800': 'oklch(var(--black-800) / <alpha-value>)',
        '900': 'oklch(var(--black-900) / <alpha-value>)'
      },
      'red': {
        DEFAULT: 'oklch(var(--red-500) / <alpha-value>)',
        '100': 'oklch(var(--red-100) / <alpha-value>)',
        '200': 'oklch(var(--red-200) / <alpha-value>)',
        '300': 'oklch(var(--red-300) / <alpha-value>)',
        '400': 'oklch(var(--red-400) / <alpha-value>)',
        '500': 'oklch(var(--red-500) / <alpha-value>)',
        '600': 'oklch(var(--red-600) / <alpha-value>)',
        '700': 'oklch(var(--red-700) / <alpha-value>)',
        '800': 'oklch(var(--red-800) / <alpha-value>)',
        '900': 'oklch(var(--red-900) / <alpha-value>)'
      }
    },
    screens: {
      "xxs": "390px",
      "xs": "475px",
      "sm": "640px",
      "md": "768px",
      "mdl": "900px",
      "lg": "1024px",
      "xl": "1280px",
      "2xl": "1536px",
      "3xl": "1600px",
      "4xl": "2100px",
    },
    zIndex: {
      bg: "-1",
      "0": "0",
      "10": "10",
      "20": "20",
      "30": "30",
      "40": "40",
      "50": "50",
      "container": "100",
      "auto": "auto",
      "dropdown": "2000",
      "sticky": "3000",
      "overlay": "4000",
      "modal": "4010",
      "header": "5000",
      "loading": "7000",
      "toast": "6500",
      "tooltip": "6300",
      "cursor": "9000",
      "preload_bg": "9998",
      "preload": "9999"
    },
    extend: {
      fontFamily: {
        'sans': ['var(--font-montserrat)', 'Inter', ...defaultTheme.fontFamily.sans], 
      }
    },
  },
  plugins: [],
};
