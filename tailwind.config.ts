/** @type {import('tailwindcss').Config} */
import fluid, { extract, fontSize } from "fluid-tailwind";
import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: {
    files: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    extract
  },
  safelist: [
    "html.has-scroll-smooth",
    "html.has-scroll-dragging",
    '[data-scroll-direction="horizontal"]',
    ".c-scrollbar",
    ".c-scrollbar_thumb",
    ".c-scrollbar_thumb:hover",
    "[data-scroll-container]"
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        md: "2rem",
        mdl: "2rem",
        lg: "2rem",
        xl: "2rem",
        "2xl": "2rem",
        "3xl": "2rem",
        "4xl": "2rem"
      },
      screens: {
        sm: "640px",
        md: "768px",
        mdl: "900px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        "3xl": "1600px",
        "4xl": "2100px"
      }
    },
    fontSize,
    fontFamily: {
      sans: [
        "var(--font-montserrat)",
        "Montserrat",
        ...defaultTheme.fontFamily.sans
      ]
    },
    extends: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        primary: {
          DEFAULT: "oklch(var(--primary-500) / <alpha-value>)",
          100: "oklch(var(--primary-100) / <alpha-value>)",
          200: "oklch(var(--primary-200) / <alpha-value>)",
          300: "oklch(var(--primary-300) / <alpha-value>)",
          400: "oklch(var(--primary-400) / <alpha-value>)",
          500: "oklch(var(--primary-500) / <alpha-value>)",
          600: "oklch(var(--primary-600) / <alpha-value>)",
          700: "oklch(var(--primary-700) / <alpha-value>)",
          800: "oklch(var(--primary-800) / <alpha-value>)",
          900: "oklch(var(--primary-900) / <alpha-value>)"
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary-500) / <alpha-value>)",
          100: "oklch(var(--secondary-100) / <alpha-value>)",
          200: "oklch(var(--secondary-200) / <alpha-value>)",
          300: "oklch(var(--secondary-300) / <alpha-value>)",
          400: "oklch(var(--secondary-400) / <alpha-value>)",
          500: "oklch(var(--secondary-500) / <alpha-value>)",
          600: "oklch(var(--secondary-600) / <alpha-value>)",
          700: "oklch(var(--secondary-700) / <alpha-value>)",
          800: "oklch(var(--secondary-800) / <alpha-value>)",
          900: "oklch(var(--secondary-900) / <alpha-value>)"
        },
        white: {
          DEFAULT: "oklch(var(--white-100) / <alpha-value>)",
          100: "oklch(var(--white-100) / <alpha-value>)",
          200: "oklch(var(--white-200) / <alpha-value>)",
          300: "oklch(var(--white-300) / <alpha-value>)",
          400: "oklch(var(--white-400) / <alpha-value>)",
          500: "oklch(var(--white-500) / <alpha-value>)",
          600: "oklch(var(--white-600) / <alpha-value>)",
          700: "oklch(var(--white-700) / <alpha-value>)",
          800: "oklch(var(--white-800) / <alpha-value>)",
          900: "oklch(var(--white-900) / <alpha-value>)"
        },
        gray: {
          DEFAULT: "oklch(var(--gray-500) / <alpha-value>)",
          100: "oklch(var(--gray-100) / <alpha-value>)",
          200: "oklch(var(--gray-200) / <alpha-value>)",
          300: "oklch(var(--gray-300) / <alpha-value>)",
          400: "oklch(var(--gray-400) / <alpha-value>)",
          500: "oklch(var(--gray-500) / <alpha-value>)",
          600: "oklch(var(--gray-600) / <alpha-value>)",
          700: "oklch(var(--gray-700) / <alpha-value>)",
          800: "oklch(var(--gray-800) / <alpha-value>)",
          900: "oklch(var(--gray-900) / <alpha-value>)"
        },
        black: {
          DEFAULT: "oklch(var(--black-100) / <alpha-value>)",
          100: "oklch(var(--black-100) / <alpha-value>)",
          200: "oklch(var(--black-200) / <alpha-value>)",
          300: "oklch(var(--black-300) / <alpha-value>)",
          400: "oklch(var(--black-400) / <alpha-value>)",
          500: "oklch(var(--black-500) / <alpha-value>)",
          600: "oklch(var(--black-600) / <alpha-value>)",
          700: "oklch(var(--black-700) / <alpha-value>)",
          800: "oklch(var(--black-800) / <alpha-value>)",
          900: "oklch(var(--black-900) / <alpha-value>)"
        },
        red: {
          DEFAULT: "oklch(var(--red-500) / <alpha-value>)",
          100: "oklch(var(--red-100) / <alpha-value>)",
          200: "oklch(var(--red-200) / <alpha-value>)",
          300: "oklch(var(--red-300) / <alpha-value>)",
          400: "oklch(var(--red-400) / <alpha-value>)",
          500: "oklch(var(--red-500) / <alpha-value>)",
          600: "oklch(var(--red-600) / <alpha-value>)",
          700: "oklch(var(--red-700) / <alpha-value>)",
          800: "oklch(var(--red-800) / <alpha-value>)",
          900: "oklch(var(--red-900) / <alpha-value>)"
        }
      },
      animation: {
        underline: "underline 0.3s forwards",
        underlineExit: "underlineExit 0.3s forwards"
      },
      keyframes: {
        underline: {
          "0%": { width: "100%" },
          "100%": { width: "45%" }
        },
        underlineExit: {
          "0%": { width: "45%" },
          "100%": { width: "100%" }
        }
      },
      fontSize: {
        "text-xl": [
          "clamp(1.5rem, 2.5vw + 1rem, 2rem)",
          {
            lineHeight: "1.7",
            letterSpacing: "0.05em"
          }
        ],
        "text-lg": [
          "clamp(1.25rem, 2.5vw + 1rem, 1.5rem)",
          {
            lineHeight: "1.7",
            letterSpacing: "0.05em"
          }
        ],
        "text-md": [
          "clamp(1rem, 2.5vw + 1rem, 1.25rem)",
          {
            lineHeight: "1.7",
            letterSpacing: "0.05em"
          }
        ],
        "text-sm": [
          "clamp(0.875rem, 2.5vw + 1rem, 1rem)",
          {
            lineHeight: "1.7",
            letterSpacing: "0.05em"
          }
        ],
        "text-xs": [
          "clamp(0.75rem, 2.5vw + 1rem, 0.875rem)",
          {
            lineHeight: "1.7",
            letterSpacing: "0.05em"
          }
        ],
        "text-xxs": [
          "clamp(0.625rem, 2.5vw + 1rem, 0.75rem)",
          {
            lineHeight: "1.7",
            letterSpacing: "0.05em"
          }
        ],
        "text-auto": [
          "clamp(0.625rem, 2.5vw + 1rem, 0.75rem)",
          {
            lineHeight: "1.7",
            letterSpacing: "0.05em"
          }
        ],
        "title-h1": [
          "clamp(2.5rem, 2.5vw + 1rem, 3rem)",
          {
            lineHeight: "1.7",
            letterSpacing: "0.05em"
          }
        ],
        "title-h2": [
          "clamp(2rem, 2.5vw + 1rem, 2.5rem)",
          {
            lineHeight: "1.7",
            letterSpacing: "0.05em"
          }
        ],
        "title-h3": [
          "clamp(1.75rem, 2.5vw + 1rem, 2rem)",
          {
            lineHeight: "1.7",
            letterSpacing: "0.05em"
          }
        ],
        "title-h4": [
          "clamp(1.5rem, 2.5vw + 1rem, 1.75rem)",
          {
            lineHeight: "1.7",
            letterSpacing: "0.05em"
          }
        ],
        "title-h5": [
          "clamp(1.25rem, 2.5vw + 1rem, 1.5rem)",
          {
            lineHeight: "1.7",
            letterSpacing: "0.05em"
          }
        ],
        "title-h6": [
          "clamp(1rem, 2.5vw + 1rem, 1.25rem)",
          {
            lineHeight: "1.7",
            letterSpacing: "0.05em"
          }
        ]
      }
    },
    screens: {
      xxs: "390px",
      xs: "475px",
      sm: "640px",
      md: "768px",
      mdl: "900px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1600px",
      "4xl": "2100px"
    },
    zIndex: {
      bg: "-1",
      0: "0",
      10: "10",
      20: "20",
      30: "30",
      40: "40",
      50: "50",
      container: "100",
      auto: "auto",
      scrollbar: "1000",
      dropdown: "2000",
      sticky: "3000",
      overlay: "4000",
      modal: "4010",
      header: "5000",
      loading: "7000",
      toast: "6500",
      tooltip: "6300",
      cursor: "9000",
      preload_bg: "9998",
      preload: "9999"
    },
    fluid: () => ({
      defaultScreens: ["22rem", "100rem"],
      defaultMinFont: "0.6rem",
      defaultMaxFont: "4.2rem"
    })
  },
  plugins: [fluid]
} satisfies Config;
