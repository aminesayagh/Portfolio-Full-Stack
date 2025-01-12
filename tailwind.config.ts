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
    colors: {
      transparent: "transparent",
      current: "currentColor",
      background: "oklch(17.3% 0.01 281.25 / <alpha-value>)",
      foreground: "#fff",
      primary: {
        DEFAULT: "oklch(53.26% 0.21 281.25 / <alpha-value>)",
        100: "oklch(69.06% 0.15 281.25 / <alpha-value>)",
        200: "oklch(62.88% 0.165 281.25 / <alpha-value>)",
        300: "oklch(60.61% 0.19 281.25 / <alpha-value>)",
        400: "oklch(56.82% 0.21 281.25 / <alpha-value>)",
        500: "oklch(53.26% 0.21 281.26 / <alpha-value>)",
        600: "oklch(46.41% 0.207 281.25 / <alpha-value>)",
        700: "oklch(42.29% 0.202 281.25 / <alpha-value>)",
        800: "oklch(38.47% 0.209 281.25 / <alpha-value>)",
        900: "oklch(35.24% 0.185 281.25 / <alpha-value>)"
      },
      secondary: {
        DEFAULT: "oklch(53.26% 0.21 234.51 / <alpha-value>)",
        100: "oklch(69.06% 0.15 234.51 / <alpha-value>)",
        200: "oklch(62.88% 0.165 234.51 / <alpha-value>)",
        300: "oklch(60.61% 0.19 234.51 / <alpha-value>)",
        400: "oklch(56.82% 0.21 234.51 / <alpha-value>)",
        500: "oklch(53.26% 0.21 234.51 / <alpha-value>)",
        600: "oklch(46.41% 0.207 234.51 / <alpha-value>)",
        700: "oklch(42.29% 0.202 234.51 / <alpha-value>)",
        800: "oklch(38.47% 0.209 234.51 / <alpha-value>)",
        900: "oklch(35.24% 0.185 234.51 / <alpha-value>)"
      },
      white: {
        DEFAULT: "oklch(98.18% 0.004 281.25 / <alpha-value>)",
        100: "oklch(98.18% 0.004 281.25 / <alpha-value>)",
        200: "oklch(96.47% 0.004 281.25 / <alpha-value>)",
        300: "oklch(94.12% 0.004 281.25 / <alpha-value>)",
        400: "oklch(90.59% 0.004 281.25 / <alpha-value>)",
        500: "oklch(87.06% 0.004 281.25 / <alpha-value>)",
        600: "oklch(80.78% 0.004 281.25 / <alpha-value>)",
        700: "oklch(74.12% 0.004 281.25 / <alpha-value>)",
        800: "oklch(67.06% 0.004 281.25 / <alpha-value>)",
        900: "oklch(60.39% 0.004 281.25 / <alpha-value>)"
      },
      gray: {
        DEFAULT: "oklch(63.92% 0.0321 281.25 / <alpha-value>)",
        100: "oklch(85.98% 0.0321 281.25 / <alpha-value>)",
        200: "oklch(81.18% 0.0321 281.25 / <alpha-value>)",
        300: "oklch(75.69% 0.0321 281.25 / <alpha-value>)",
        400: "oklch(69.8% 0.0321 281.25 / <alpha-value>)",
        500: "oklch(63.92% 0.0321 281.25 / <alpha-value>)",
        600: "oklch(55.69% 0.0321 281.25 / <alpha-value>)",
        700: "oklch(48.24% 0.0321 281.25 / <alpha-value>)",
        800: "oklch(40.39% 0.0321 281.25 / <alpha-value>)",
        900: "oklch(33.33% 0.0321 281.25 / <alpha-value>)"
      },
      black: {
        DEFAULT: "oklch(17.3% 0.01 281.25 / <alpha-value>)",
        100: "oklch(17.3% 0.01 281.25 / <alpha-value>)",
        200: "oklch(18.6% 0.019 281.25 / <alpha-value>)",
        300: "oklch(20.39% 0.019 281.25 / <alpha-value>)",
        400: "oklch(22.35% 0.019 281.25 / <alpha-value>)",
        500: "oklch(24.31% 0.019 281.25 / <alpha-value>)",
        600: "oklch(26.27% 0.019 281.25 / <alpha-value>)",
        700: "oklch(28.24% 0.019 281.25 / <alpha-value>)",
        800: "oklch(30.2% 0.019 281.25 / <alpha-value>)",
        900: "oklch(32.16% 0.019 281.25 / <alpha-value>)"
      },
      red: {
        DEFAULT: "oklch(70.39% 0.191 37.127 / <alpha-value>)",
        100: "oklch(85.88% 0.102 37.127 / <alpha-value>)",
        200: "oklch(76.95% 0.128 37.127 / <alpha-value>)",
        300: "oklch(72.83% 0.141 37.127 / <alpha-value>)",
        400: "oklch(70.48% 0.168 37.127 / <alpha-value>)",
        500: "oklch(70.39% 0.191 37.127 / <alpha-value>)",
        600: "oklch(66.36% 0.192 37.127 / <alpha-value>)",
        700: "oklch(60.48% 0.173 37.127 / <alpha-value>)",
        800: "oklch(53.13% 0.168 37.127 / <alpha-value>)",
        900: "oklch(47.83% 0.153 37.127 / <alpha-value>)"
      }
    }, 
    extend: {
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
        "display-xl": [
          "clamp(2.8rem, 2.5vw + 1rem, 3.5rem)",
          {
            lineHeight: "1.2",
            letterSpacing: "0.05em"
          }
        ],
        "display-lg": [
          "clamp(2.25rem, 2.5vw + 1rem, 2.75rem)",
          {
            lineHeight: "1.2",
            letterSpacing: "0.05em"
          }
        ],
        "display-md": [
          "clamp(2rem, 2.5vw + 1rem, 2.75rem)",
          {
            lineHeight: "1.2",
            letterSpacing: "0.05em"
          }
        ],
        "body-xl": [
          "clamp(1.5rem, 2.5vw + 1rem, 2rem)",
          {
            lineHeight: "1.7",
            letterSpacing: "0.05em"
          }
        ],
        "body-lg": [
          "clamp(1.1rem, 2.5vw + 1rem, 1.5rem)",
          {
            lineHeight: "1.7",
            letterSpacing: "0.05em"
          }
        ],
        "body-md": [
          "clamp(0.9rem, 2.5vw + 1rem, 1rem)",
          {
            lineHeight: "1.7",
            letterSpacing: "0.05em"
          }
        ],
        "body-sm": [
          "clamp(0.72rem, 2.5vw + 1rem, 0.8rem)",
          {
            lineHeight: "1.7",
            letterSpacing: "0.05em"
          }
        ],
        "body-xs": [
          "clamp(0.7rem, 2.5vw + 1rem, 0.76rem)",
          {
            lineHeight: "1.7",
            letterSpacing: "0.05em"
          }
        ],
        "body-xxs": [
          "clamp(0.625rem, 2.5vw + 1rem, 0.75rem)",
          {
            lineHeight: "1.7",
            letterSpacing: "0.05em"
          }
        ],
        "body-auto": [
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
