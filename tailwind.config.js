/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
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
        DEFAULT: '#6A5EEF',
        '100': '#BFB9F8',
        '200': '#A9A2F6',
        '300': '#948BF4',
        '400': '#7E74F1',
        '500': '#6A5EEF',
        '600': '#4131EB',
        '700': '#2515D7',
        '800': '#1E11AC',
        '900': '#160D81',
      },
      'secondary': {
        DEFAULT: '#49BCF6',
        '100': '#DAFBFE',
        '200': '#B6F3FE',
        '300': '#91E6FC',
        '400': '#75D5F9',
        '500': '#49BCF6',
        '600': '#3594D3',
        '700': '#2470B1',
        '800': '#174F8E',
        '900': '#0E3876',
      },
      'white': {
        DEFAULT: '#FEFEFE',
        '100': '#FEFEFE',
        '200': '#FAFAFA',
        '300': '#F6F6F6',
        '400': '#F1F1F1',
        '500': '#EDEDED',
        '600': '#E9E9E9',
        '700': '#E5E5E5',
        '800': '#E1E1E1',
        '900': '#DCDCDC'
      },
      'gray': {
        DEFAULT: '#',
        '100': '#F1F1F1',
        '200': '#E5E5E5',
        '300': '#D7D7D7',
        '400': '#C9C9C9',
        '500': '#BABABA',
        '600': '#ACACAC',
        '700': '#9D9D9D',
        '800': '#8F8F8F',
        '900': '#808080'
      },
      'black': {
        DEFAULT: '#111517',
        '100': '#111517',
        '200': '#1F2224',
        '300': '#2D3031',
        '400': '#3B3D3E',
        '500': '#494B4C',
        '600': '#565859',
        '700': '#646566',
        '800': '#727373',
        '900': '#808080'
      },
      'red': {
        DEFAULT: '#FF6A3D',
        '100': '#FFECD8',
        '200': '#FFD4B1',
        '300': '#FFB68A',
        '400': '#FF996D',
        '500': '#FF6A3D',
        '600': '#DB482C',
        '700': '#B72C1E',
        '800': '#931513',
        '900': '#7A0B11'
      }
    },
    extend: {
      fontFamily: {
        'sans': ['montserrat', ...defaultTheme.fontFamily.sans], 
      }
    },
  },
  plugins: [],
};
