# Code Documentation

Generated on: 2024-12-22T12:12:36.383Z
Total files: 7

## Project Structure

```
└── portfolio_full_stack
    ├── knip.ts
    ├── package.json
    ├── postcss.config.js
    ├── public
    │   └── locales
    │       ├── en
    │       │   └── common.json
    │       └── fr
    │           └── common.json
    ├── tailwind.config.js
    └── tsconfig.json
```

## File: knip.ts

- Path: `/root/git/portfolio_full_stack/knip.ts`
- Size: 419.00 B
- Extension: .ts
- Lines of code: 20

```ts
const config = {
  entry: ["pages/**/*.tsx", "pages/**/*.ts"],
  project: [
    "components/**/*.tsx",
    "components/**/*.ts",
    "context/**/*.tsx",
    "context/**/*.ts",
    "hooks/**/*.tsx",
    "hooks/**/*.ts",
    "lib/**/*.tsx",
    "lib/**/*.ts",
    "pages/**/*.tsx",
    "pages/**/*.ts",
    "styles/**/*.tsx",
    "styles/**/*.ts",
    "types/**/*.tsx",
    "types/**/*.ts"
  ]
};
export default config;
```

---

## File: package.json

- Path: `/root/git/portfolio_full_stack/package.json`
- Size: 2.58 KB
- Extension: .json
- Lines of code: 84

```json
{
  "name": "portfolio",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --port 3006",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "debug": "NODE_OPTIONS='--inspect' next dev",
    "knip": "knip",
    "format": "prettier --write \"**/*.{ts,tsx}\""
  },
  "dependencies": {
    "@hookform/resolvers": "^3.3.4",
    "@notionhq/client": "^2.2.14",
    "@react-aria/toast": "^3.0.0-beta.10",
    "@react-stately/toast": "^3.0.0-beta.2",
    "@studio-freight/lenis": "^1.0.42",
    "@tabler/icons-react": "^3.1.0",
    "@types/lodash": "^4.17.0",
    "@types/node": "20.11.30",
    "@types/react": "18.2.73",
    "@types/react-dom": "18.2.23",
    "autoprefixer": "10.4.19",
    "class-variance-authority": "^0.7.0",
    "cssnano": "^6.1.2",
    "eslint-config-next": "14.1.4",
    "framer-motion": "^11.0.24",
    "gsap": "^3.12.5",
    "i18next": "^23.10.1",
    "i18next-browser-languagedetector": "^7.2.0",
    "i18next-http-backend": "^2.5.0",
    "i18next-resources-to-backend": "^1.2.0",
    "lenis": "^0.0.2",
    "locomotive-scroll": "^4.1.4",
    "lodash": "^4.17.21",
    "moment": "^2.30.1",
    "moment-timezone": "^0.5.45",
    "next": "^14.1.4",
    "next-i18next": "^15.2.0",
    "next-seo": "^6.5.0",
    "next-transpile-modules": "^10.0.1",
    "notion-client": "^6.16.0",
    "postcss": "^8.4.38",
    "postcss-import": "^16.1.0",
    "react": "18.2.0",
    "react-aria": "^3.32.1",
    "react-aria-components": "^1.1.1",
    "react-dom": "18.2.0",
    "react-gtm-module": "^2.0.11",
    "react-hook-ambient-light": "^1.1.3",
    "react-hook-form": "^7.51.2",
    "react-i18next": "^14.1.0",
    "react-use": "^17.5.0",
    "sass": "^1.72.0",
    "tailwind-styled-components": "^2.2.0",
    "tailwindcss": "3.4.3",
    "typescript": "5.4.3",
    "use-resize-observer": "^9.1.0",
    "zod": "^3.22.4",
    "zustand": "^4.5.2"
  },
  "devDependencies": {
    "@csstools/postcss-oklab-function": "^3.0.12",
    "@studio-freight/hamo": "^0.6.28",
    "@types/imagemin": "^8.0.5",
    "@types/imagemin-jpegtran": "^5.0.4",
    "@types/locomotive-scroll": "^4.1.3",
    "@typescript-eslint/eslint-plugin": "^7.16.1",
    "@typescript-eslint/parser": "^7.16.1",
    "eslint": "^8.57.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-import": "^2.29.1",
    "eslint-plugin-jsx-a11y": "^6.9.0",
    "eslint-plugin-prettier": "^5.2.1",
    "eslint-plugin-react": "^7.34.4",
    "eslint-plugin-react-hooks": "^4.6.2",
    "eslint-plugin-react-refresh": "^0.4.8",
    "eslint-plugin-tailwindcss": "^3.17.4",
    "knip": "^5.22.2",
    "prettier": "^3.3.3"
  }
}
```

---

## File: postcss.config.js

- Path: `/root/git/portfolio_full_stack/postcss.config.js`
- Size: 272.00 B
- Extension: .js
- Lines of code: 10

```js
module.exports = {
  plugins: {
    "postcss-import": {},
    "tailwindcss/nesting": {},
    tailwindcss: {},
    "@csstools/postcss-oklab-function": { preserve: true },
    autoprefixer: {},
    ...(process.env.NODE_ENV === "production" ? { cssnano: {} } : {})
  }
};
```

---

## File: tailwind.config.js

- Path: `/root/git/portfolio_full_stack/tailwind.config.js`
- Size: 5.62 KB
- Extension: .js
- Lines of code: 166

```js
/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
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
      center: true
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
      "16xl": "5rem"
    },
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
    extend: {
      fontFamily: {
        sans: [
          "var(--font-montserrat)",
          "Montserrat",
          ...defaultTheme.fontFamily.sans
        ]
      }
    }
  },
  plugins: []
};
```

---

## File: tsconfig.json

- Path: `/root/git/portfolio_full_stack/tsconfig.json`
- Size: 1.98 KB
- Extension: .json
- Lines of code: 40

```json
{
  "compilerOptions": {
    "pretty": true,
    "sourceMap": true /* Create source map files for emitted JavaScript files. */,
    "target": "esnext",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "baseUrl": ".",
    "alwaysStrict": true,
    "noUnusedLocals": true /* Enable error reporting when local variables aren't read. */,
    "noUnusedParameters": true /* Raise an error when a function parameter isn't read. */,
    "noFallthroughCasesInSwitch": true /* Enable error reporting for fallthrough cases in switch statements. */,
    "noImplicitReturns": true /* Enable error reporting for code paths that do not explicitly return in a function. */,
    "noUncheckedIndexedAccess": true /* Include 'undefined' in index signature results */,
    "noImplicitThis": true /* Raise error on 'this' expressions with an implied 'any' type. */,
    "noImplicitAny": true /* Enable error reporting for expressions and declarations with an implied 'any' type. */,
    "strictNullChecks": true /* Enable strict null checks. */,
    "strictFunctionTypes": true /* Enable strict checking of function types. */,
    "strictPropertyInitialization": true /* Enable strict checking of property initialization in classes. */,
    "strictBindCallApply": true /* Enable strict 'bind', 'call', and 'apply' methods on functions. */,
    "noImplicitOverride": true /* Ensure overriding members in derived classes are marked with an 'override' modifier. */,
    "noPropertyAccessFromIndexSignature": true /* Enforces using indexed accessors for keys declared using an indexed type */,
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

---

## File: common.json

- Path: `/root/git/portfolio_full_stack/public/locales/en/common.json`
- Size: 13.39 KB
- Extension: .json
- Lines of code: 315

```json
{
  "head": {
    "home": {
      "title": "Mohamed Amine SAYAGH - Full Stack Web Developer",
      "description": "Mohamed Amine SAYAGH - Full Stack Web Developer",
      "keywords": "Mohamed Amine SAYAGH - Full Stack Web Developer",
      "author": "Mohamed Amine SAYAGH",
      "url": "https://ma-sayagh.vercel.app/"
    },
    "contact": {
      "title": "Mohamed Amine SAYAGH - Contact",
      "description": "Mohamed Amine SAYAGH - Contact",
      "keywords": "Mohamed Amine SAYAGH - Contact",
      "author": "Mohamed Amine SAYAGH",
      "url": "https://ma-sayagh.vercel.app/contact"
    }
  },
  "loading": {
    "intro": "Web Portfolio",
    "message_1": "Hi, I'm",
    "message_2": "mohamed",
    "message_3": "amine",
    "message_4": "sayagh",
    "message_5": "nice to meet you...",
    "percent": "%"
  },
  "socialNetwork": {
    "instagram": {
      "key": "IN",
      "name": "Instagram"
    },
    "linkedin": {
      "key": "LI",
      "name": "Linkedin"
    },
    "github": {
      "key": "GH",
      "name": "Github"
    },
    "dribbble": {
      "key": "DR",
      "name": "Dribbble"
    },
    "medium": {
      "key": "MD",
      "name": "Medium"
    }
  },
  "header": {
    "email": "AMINESAYAGH1997@GMAIL.COM",
    "locale": "fr",
    "logo": "Mohamed Amine SAYAGH",
    "close": "Close",
    "langs": {
      "fr": {
        "label": "EN"
      },
      "en": {
        "label": "FR"
      }
    },
    "key_menu": "Menu",
    "menu": {
      "manifesto": { "attribute": "Manifesto", "more": "null" },
      "experience": { "attribute": "Experience", "more": "(40+)" },
      "cases": { "attribute": "Cases", "more": "(☺ 90+)" },
      "contact": { "attribute": "Contact", "more": "null" }
    },
    "socialNetwork": {
      "instagram": "IN",
      "linkedin": "LI",
      "github": "GH"
    },
    "description": {
      "title": "Who's Behind the Screen?",
      "content": "Mohamed Amine Sayagh, Drived by a passion for full stack web development, I dedicate my work to creating web solutions, specifically designed for branding identities. I thrive in kick starting and steering projects from concept to completion."
    },
    "copyright": "© 2023 MOHAMED AMINE SAYAGH.",
    "action": "LET'S TALK",
    "home": "GO HOME",
    "project": "MY PROJECTS"
  },
  "intro": {
    "title": {
      "1": "interface",
      "2_1": "full",
      "2_2": "stack",
      "3": "Developer"
    },
    "descriptions": {
      "1": "Mohamed Amine SAYAGH, An independent web developer, with experience in UI/UX design.",
      "2": "I am Creating agreeable web experience for next generation of customers facing companies."
    },
    "menu": {
      "Manifesto": "Manifesto",
      "Experience": "Experience",
      "Cases": "Cases",
      "Contact": "Contact"
    },
    "copy": "© 2023"
  },
  "manifesto": {
    "subtitle_1": "Manifesto",
    "subtitle_2": "How I Approach Problem Solving Process",
    "slogan": "Being correct is not enough",
    "description": "it's merely the inception. An exceptional engineer devotes a substantial amount of time to deep, unbiased listening. They consider real-world experimentation as their source of truth, adamantly differentiating between judgments drawn from perspectives and concrete facts.",
    "who_i_am": "My name is Mohamed Amine SAYAGH, A Passionate and independent web developer, deeply versed in science and of Web Design Interface, With a keen eye for detail and a growth understanding of user-centric design principles, I constantly push the boundaries of what's possible in the digital realm.",
    "what_i_do": "I love transforming everything by unique, problem solving and usable designs, whether it's about digital products, brands, website. I ensure that every digital interaction is not just functional, but also delightful and memorable.",
    "goal": "Want to know more about me?,",
    "action": "Download Resume"
  },
  "manifesto_old": {
    "title_1": "Perspective",
    "title_1_2": "thinking",
    "title_2": "Manifesto",
    "image_alt": "Mohamed Amine SAYAGH",
    "slogan": "We provide more than solutions, we deliver understanding.",
    "subtitle_1": "HOW I DO",
    "subtitle_2": "PROBLEM SOLVING",
    "content": "Being correct is not enough, it's merely the inception. An exceptional engineer devotes a substantial amount of time to deep, unbiased listening. They consider real-world experimentation as their source of truth, adamantly differentiating between judgments drawn from perspectives and concrete facts."
  },
  "experience": {
    "title": "Evolution through expertise",
    "description": "Life hides in places we never look, the things we desire lie on the streets we haven't yet walked, it's these untraveled roads that call to me, igniting an endless quest in my heart.",
    "stages": {
      "1": {
        "title": "Innovative Exploration",
        "count": "01",
        "description": "I activate the narrative of your digital brand. Through bespoke digital design, I collaborate with you to craft experiences that resonate authentically with your users, establishing a robust user-product relationship that is enduring and fruitful."
      },
      "2": {
        "title": "User-Centered Design",
        "count": "02",
        "description": "You speak, I translate - into design. My process is deeply rooted in understanding your vision, ensuring that every pixel and code reflects your needs. I don't just create; I tailor an experience, making sure that your brand's voice is heard loud and clear in every interaction."
      },
      "3": {
        "title": "Technical Precision",
        "count": "03",
        "description": "Precision is my guiding principle. I meticulously construct every line of code and design element with accuracy and intent. My goal is to deliver a product that not only meets but exceeds expectations, ensuring a flawless user journey from start to finish."
      },
      "4": {
        "title": "Dynamic Collaboration",
        "count": "04",
        "description": "I adapt, I adjust, I evolve. Collaboration is key to our mutual success. As your brand grows and shifts, I'm right there with you, making real-time changes that are as dynamic as the market. I'm your partner in progress, evolving solutions that thrive."
      }
    }
  },
  "motivation": {
    "action": "START A PROJECT",
    "content": {
      "1": "Open, bold, and engaging, without the trappings of entrenched or outdated opinions. My work thrives in the freedom and room to grow, driven by responsibility and inner drive. I work within diverse teams, powered by remarkable personalities.",
      "2": "My work aspires to be special, to spring from the creativity of diverse minds - irrespective of gender, age, or any other factors."
    }
  },
  "cases": {
    "title": "Selected Projects",
    "description": "Creativity requires Aim, Orientation, Responsibility, and discipline. the willingness to make sacrifices which is the hallmark of maturity in the service of a higher goal."
  },
  "contactCall": {
    "title": "GOT A PROJECT?",
    "action": "LET'S TALK",
    "description": "Face your being with the necessity of transformation"
  },
  "footer": {
    "state": "I usually work on several projects, but I'll be happy to discuss new opportunities.",
    "action": "BACK TOP",
    "name": "Mohamed Amine SAYAGH",
    "copy": "© 2023",
    "socialNetwork": "FOLLOW ME"
  },
  "contact": {
    "title": "Get in touch",
    "subtitle": "Tell me more",
    "localTime": "MY LOCAL TIME IS",
    "gmtTime": "GMT ",
    "reppedBy": "Repped by"
  },
  "form": {
    "field": {
      "firstName": {
        "placeholder": "Your first name",
        "label": "First Name"
      },
      "lastName": {
        "placeholder": "Your last name",
        "label": "Last Name"
      },
      "email": {
        "placeholder": "Your email",
        "label": "Email"
      },
      "message": {
        "placeholder": "Your message",
        "label": "Message"
      },
      "phoneNumber": {
        "placeholder": "Your phone number",
        "label": "Phone Number"
      },
      "objective": {
        "placeholder": "Your objective",
        "label": "Objective",
        "options": {
          "1": "Project Inquiry",
          "2": "Job Opportunity",
          "3": "Portfolio Feedback",
          "4": "Getting to know Each Other",
          "5": "Say Hello",
          "6": "Other"
        }
      },
      "submit": {
        "label": "Send"
      }
    },
    "error": {
      "required": "This field is required.",
      "email": "Please enter a valid email address.",
      "minLength": "Please enter at least {{min}} characters.",
      "maxLength": "Please enter no more than {{max}} characters.",
      "pattern": "Please match the requested format."
    },
    "notification": {
      "success": "😎 Awesome, I got your message! I'll get back to you soon",
      "error": "😱 Oops! Something went wrong. Please try again"
    }
  },
  "tasks": {
    "Web Designer": "Web Designer",
    "Web Developer": "Web Developer",
    "Mobile Developer": "Mobile Developer",
    "Crypto Developer": "Crypto Developer",
    "Graphic Designer": "GRAPHIC DESIGNER",
    "Marketer": "Marketer",
    "Database Consultant": "Database Consultant",
    "Scrape Developer": "Scrape Developer",
    "Backend Developer": "Backend Developer",
    "Frontend Developer": "Frontend Developer",
    "Infrastructure Developer": "Infrastructure Developer",
    "Technical Advisor": "Technical Advisor",
    "Full Stack Developer": "Full Stack Developer",
    "Fullstack Developer": "Fullstack Developer"
  },
  "jobTItle": {
    "CTO": "CTO",
    "CEO": "CEO",
    "CO-FOUNDER": "CO-FOUNDER",
    "FOUNDER": "FOUNDER",
    "TECHNICAL ADVISOR": "TECHNICAL ADVISOR",
    "RECHERCHE AND DEVELOPMENT": "RECHERCHE AND DEVELOPMENT",
    "FREELANCER": "FREELANCER",
    "AUTOMATION SPECIALIST": "AUTOMATION SPECIALIST",
    "ACADEMIC PROJECT PLATFORM ARCHITECT": "ACADEMIC PROJECT PLATFORM ARCHITECT"
  },
  "country": {
    "Morocco": "Morocco",
    "France": "France",
    "United States": "United States",
    "Singapore": "Singapore",
    "Lithuania": "Lithuania",
    "London": "London"
  },
  "projects": {
    "1": {
      "title": "Happy Water",
      "alt": "Happy Water",
      "description": "Contributed as a key designer and developer for an ecologically-focused NFT platform website."
    },
    "2": {
      "title": "Sofiane Pamart's Musical NFT",
      "alt": "Sofiane Pamart's Musical NFT",
      "description": "Collaborated within a 140-member team, including 40 international developers, under the leadership of entrepreneur Oussama Ommar. Spearheaded the creation of visual music NFTs capturing the unique identity of artist Sofiane Pamart, paving the way for a significant fundraising campaign."
    },
    "3": {
      "title": "Cyber Cohesion",
      "alt": "Cyber Cohesion",
      "description": "Singapore-based security firm offering technical consultation for appropriate development solutions."
    },
    "4": {
      "title": "Shinobi Boy",
      "alt": "Shinobi boy",
      "description": ""
    },
    "5": {
      "title": "Web Application for managing university Projects",
      "alt": "Web Application for managing university Projects",
      "description": ""
    },
    "6": {
      "title": "Sodiadd",
      "alt": "Sodiadd",
      "description": "Real estate investment agency; developed a monolithic web application for individual investors."
    },
    "7": {
      "title": "Jonas Agency",
      "alt": "Jonas Agency",
      "description": "Digital marketing agency; crafted websites tailored for strategic online promotion."
    },
    "8": {
      "title": "Lavish Trading",
      "alt": "Lavish Trading",
      "description": "Spearheaded the design and development of a web identity for an individual-focused trading agency, offering online investment plans and expert consulting services."
    },
    "9": {
      "title": "Maschool",
      "alt": "Maschool",
      "description": ""
    },
    "10": {
      "title": "FreeLance Projects",
      "alt": "FreeLance Projects",
      "description": ""
    }
  }
}
```

---

## File: common.json

- Path: `/root/git/portfolio_full_stack/public/locales/fr/common.json`
- Size: 14.13 KB
- Extension: .json
- Lines of code: 305

```json
{
  "head": {
    "home": {
      "title": "Mohamed Amine SAYAGH - Développeur Web Full Stack",
      "description": "Mohamed Amine SAYAGH - Développeur Web Full Stack",
      "keywords": "Mohamed Amine SAYAGH - Développeur Web Full Stack",
      "author": "Mohamed Amine SAYAGH",
      "url": "https://ma-sayagh.vercel.app/"
    },
    "contact": {
      "title": "Mohamed Amine SAYAGH - Contact",
      "description": "Mohamed Amine SAYAGH - Contact",
      "keywords": "Mohamed Amine SAYAGH - Contact",
      "author": "Mohamed Amine SAYAGH",
      "url": "https://ma-sayagh.vercel.app/contact"
    }
  },
  "loading": {
    "intro": "Portfolio Web",
    "message_1": "Salut, je suis",
    "message_2": "mohamed",
    "message_3": "amine",
    "message_4": "sayagh",
    "message_5": "ravi de vous revoir...",
    "percent": "%"
  },
  "socialNetwork": {
    "instagram": {
      "key": "IN",
      "name": "Instagram"
    },
    "linkedin": {
      "key": "LI",
      "name": "Linkedin"
    },
    "github": {
      "key": "GH",
      "name": "Github"
    },
    "dribbble": {
      "key": "DR",
      "name": "Dribbble"
    },
    "medium": {
      "key": "MD",
      "name": "Medium"
    }
  },
  "header": {
    "email": "AMINESAYAGH1997@GMAIL.COM",
    "locale": "fr",
    "logo": "Mohamed Amine SAYAGH",
    "close": "Fermer",
    "key_menu": "Menu",
    "langs": {
      "fr": {
        "label": "EN"
      },
      "en": {
        "label": "FR"
      }
    },
    "menu": {
      "manifesto": { "attribute": "Manifeste", "more": "null" },
      "experience": { "attribute": "Expérience", "more": "(40+)" },
      "cases": { "attribute": "Projets", "more": "(☺ 90+)" },
      "contact": { "attribute": "Contact", "more": "null" }
    },
    "socialNetwork": {
      "instagram": "IN",
      "linkedin": "LI",
      "github": "GH",
      "dribbble": "DR",
      "medium": "MD"
    },
    "description": {
      "title": "Qui est derrière l'écran?",
      "content": "Mohamed Amine Sayagh, un développeur full-stack indépendant spécialisé en design UI/UX. Il crée des expériences web fluides pour la nouvelle génération d'entreprises orientées client."
    },
    "copyright": "© 2023 MOHAMED AMINE SAYAGH.",
    "action": "PARLONS-EN",
    "home": "PAGE D'ACCUEIL",
    "project": "MY PROJECTS"
  },
  "intro": {
    "title": {
      "1": "interface",
      "2_1": "full",
      "2_2": "stack",
      "3": "Développeur"
    },
    "descriptions": {
      "1": "Mohamed Amine SAYAGH, un développeur web indépendant, avec expérience en design UI/UX.",
      "2": "Je crée des expériences web agréables pour la prochaine génération d'entreprises orientées client."
    },
    "menu": {
      "Manifesto": "Manifeste",
      "Experience": "Expérience",
      "Cases": "Projets",
      "Contact": "Contact"
    },
    "copy": "© 2023"
  },
  "manifesto": {
    "subtitle_1": "Manifeste",
    "subtitle_2": "Ma méthode d'approche de la résolution de problèmes",
    "slogan": "Avoir raison ne suffit pas,",
    "description": "cela ne représente même qu'un début. Un ingénieur exceptionnel consacre un temps considérable à une écoute profonde et impartiale. Il considère l'expérimentation concrète comme une source de vérité, tout en différenciant clairement les jugements basés sur des opinions de ceux appuyés par des faits concrets.",
    "who_i_am": "Je m'appelle Mohamed Amine SAYAGH, développeur web indépendant et passionné, avec une profonde inclination pour la science et le design d'interfaces web. Doté d'un sens aigu du détail et d'une solide compréhension des principes centrés sur l'utilisateur, je repousse sans cesse les frontières du possible dans l'univers numérique.",
    "what_i_do": "Ma passion est de métamorphoser les idées en designs distinctifs, fonctionnels et résolvant des problèmes, qu'il s'agisse de produits numériques, de marques ou de sites web. Mon objectif est que chaque interaction numérique soit non seulement fonctionnelle, mais également agréable et marquante.",
    "goal": "Vous voulez en savoir plus sur moi?,",
    "action": "Découvrez mon Résumé"
  },
  "experience": {
    "title": "Évolution à travers l'expertise",
    "description": "La vie se cache dans des endroits que nous ne regardons jamais, les choses que nous désirons se trouvent dans les rues que nous n'avons pas encore parcourues. Ce sont ces routes inexplorées qui m'appellent, enflammant une quête sans fin dans mon cœur.",
    "stages": {
      "1": {
        "title": "WEB DESIGNER",
        "count": "01",
        "description": "Mon voyage a commencé dans le domaine du Web Design, où le canvas de la créativité a rencontré la rigueur structurelle de la programmation. Ici, j'ai appris à harmoniser l'esthétique avec la fonctionnalité, en créant des interfaces utilisateur convaincantes qui non seulement avaient une belle apparence, mais fonctionnaient également de manière fluide."
      },
      "2": {
        "title": "DÉVELOPPEMENT FRONT-END",
        "count": "02",
        "description": "En m'immergeant davantage dans le métier, je suis passé au domaine passionnant du développement Front-End. Ici, je suis devenu le pont entre le design et la technologie, donnant vie aux designs statiques avec des langages de codage robustes. J'ai commencé à voir les sites web comme bien plus que de simples interfaces visuelles."
      },
      "3": {
        "title": "DÉVELOPPEMENT BACK-END",
        "count": "03",
        "description": "Ensuite, je me suis aventuré dans les profondeurs mystérieuses du développement Back-End. Si le front-end concernait la création d'une façade parfaite, le back-end consistait à s'assurer que la machinerie derrière était irréprochable. Bases de données, serveurs, j'ai appris à construire des systèmes évolutifs et efficaces et j'ai commencé à apprécier la complexité sous-jacente qui rend possible le fonctionnement fluide d'un site web."
      },
      "4": {
        "title": "ARCHITECTURE SYSTÈME",
        "count": "04",
        "description": "Avec une richesse de connaissances accumulées, mon voyage m'a conduit à l'étude de l'architecture système. J'ai commencé à voir la perspective plus large, comprenant comment chaque décision, chaque composant, chaque ligne de code pouvait impacter tout le système. C'est ici que j'ai affiné ma capacité à concevoir des architectures résilientes, efficaces et évolutives."
      }
    }
  },
  "motivation": {
    "action": "LANCEZ LE PROJET",
    "content": {
      "1": "Ouvert, audacieux et engageant, sans être prisonnier des opinions enracinées ou obsolètes. Mon travail s'épanouit dans la liberté et l'espace pour grandir, animé par la responsabilité et la motivation intérieure. Je travaille au sein d'équipes diverses, portées par des personnalités remarquables.",
      "2": "Mon travail aspire à être unique, à émaner de la créativité d'esprits diversifiés - indépendamment du genre, de l'âge ou de tout autre critère."
    }
  },
  "cases": {
    "title": "Projets Sélectionnés",
    "description": "La créativité requiert un But, une Orientation, une Responsabilité et de la discipline. La volonté de faire des sacrifices, qui est le signe distinctif de la maturité au service d'un objectif plus élevé."
  },
  "contactCall": {
    "title": "VOUS AVEZ UN PROJET ?",
    "action": "PARLONS-EN",
    "description": "Confrontez votre être à la nécessité de transformation"
  },
  "footer": {
    "state": "Je travaille généralement sur plusieurs projets, mais je serais heureux de discuter de nouvelles opportunités.",
    "action": "RETOUR EN HAUT",
    "name": "Mohamed Amine SAYAGH",
    "copy": "© 2023",
    "socialNetwork": "SUIVEZ-MOI"
  },
  "contact": {
    "title": "Entrez en contact",
    "subtitle": "Parlez-moi davantage",
    "localTime": "MON HEURE LOCALE EST",
    "gmtTime": "GMT ",
    "reppedBy": "Représenté par"
  },
  "form": {
    "field": {
      "firstName": {
        "placeholder": "Votre prénom",
        "label": "Prénom"
      },
      "lastName": {
        "placeholder": "Votre nom de famille",
        "label": "Nom"
      },
      "email": {
        "placeholder": "Votre email",
        "label": "Email"
      },
      "message": {
        "placeholder": "Votre message",
        "label": "Message"
      },
      "phoneNumber": {
        "placeholder": "Votre numéro de téléphone",
        "label": "Numéro de Téléphone"
      },
      "objective": {
        "placeholder": "Votre objectif",
        "label": "Objectif",
        "options": {
          "1": "Demande de Projet",
          "2": "Opportunité d'Emploi",
          "3": "Retour sur Mon Portfolio",
          "4": "Faire connaissance",
          "5": "Dire Bonjour",
          "6": "Autre"
        }
      },
      "submit": {
        "label": "Envoyer"
      }
    },
    "error": {
      "required": "Ce champ est obligatoire.",
      "email": "Veuillez entrer une adresse email valide.",
      "minLength": "Veuillez entrer au moins {{min}} caractères.",
      "maxLength": "Veuillez ne pas entrer plus de {{max}} caractères.",
      "pattern": "Veuillez respecter le format demandé."
    },
    "notification": {
      "success": "Génial, j'ai reçu votre message ! Je reviendrai vers vous bientôt.",
      "error": "Oups ! Une erreur s'est produite. Veuillez réessayer."
    }
  },
  "tasks": {
    "Web Designer": "Concepteur Web",
    "Web Developer": "Développeur Web",
    "Mobile Developer": "Développeur Mobile",
    "Crypto Developer": "Développeur Crypto",
    "Graphic Designer": "Graphiste",
    "Marketer": "Marketeur",
    "Database Consultant": "Consultant Base de Données",
    "Scrape Developer": "Développeur de Scraping",
    "Backend Developer": "Développeur Backend",
    "Frontend Developer": "Développeur Frontend",
    "Infrastructure Developer": "Développeur Infrastructure",
    "Technical Advisor": "Conseiller Technique",
    "Full Stack Developer": "Développeur Full Stack",
    "Fullstack Developer": "Développeur Fullstack"
  },
  "jobTItle": {
    "CTO": "CTO (Directeur Technique)",
    "CEO": "CEO (Directeur Général)",
    "CO-FOUNDER": "CO-FONDATEUR",
    "FOUNDER": "FONDATEUR",
    "TECHNICAL ADVISOR": "CONSEILLER TECHNIQUE",
    "RECHERCHE AND DEVELOPMENT": "RECHERCHE ET DÉVELOPPEMENT",
    "FREELANCER": "TRAVAILLEUR INDÉPENDANT",
    "AUTOMATION SPECIALIST": "SPÉCIALISTE DE L'AUTOMATISATION",
    "ACADEMIC PROJECT PLATFORM ARCHITECT": "ARCHITECTE DE PLATEFORME DE PROJET ACADEMIQUE"
  },
  "country": {
    "Morocco": "Maroc",
    "France": "France",
    "United States": "États-Unis",
    "Singapore": "Singapour",
    "London": "London"
  },
  "projects": {
    "1": {
      "title": "Happy Water",
      "alt": "Happy Water",
      "description": "Contribué en tant que concepteur et développeur principal pour un site web de plateforme NFT axé sur l'écologie."
    },
    "2": {
      "title": "NFT Musical de Sofiane Pamart",
      "alt": "NFT Musical de Sofiane Pamart",
      "description": "Collaboration au sein d'une équipe de 140 membres, dont 40 développeurs internationaux, sous la direction de l'entrepreneur Oussama Ommar. Piloté la création de NFTs musicaux visuels capturant l'identité unique de l'artiste Sofiane Pamart, ouvrant la voie à une importante campagne de collecte de fonds."
    },
    "3": {
      "title": "Cohésion Cyber",
      "alt": "Cohésion Cyber",
      "description": "Entreprise de sécurité basée à Singapour offrant des consultations techniques pour des solutions de développement appropriées."
    },
    "4": {
      "title": "Shinobi Boy",
      "alt": "Shinobi Boy",
      "description": ""
    },
    "5": {
      "title": "Application Web pour la gestion des projets universitaires",
      "alt": "Application Web pour la gestion des projets universitaires",
      "description": ""
    },
    "6": {
      "title": "Sodiadd",
      "alt": "Sodiadd",
      "description": "Agence d'investissement immobilier ; développé une application web monolithique pour les investisseurs individuels."
    },
    "7": {
      "title": "Agence Jonas",
      "alt": "Agence Jonas",
      "description": "Agence de marketing digital ; réalisé des sites web sur mesure pour une promotion en ligne stratégique."
    },
    "8": {
      "title": "Lavish Trading",
      "alt": "Lavish Trading",
      "description": "Dirigé la conception et le développement d'une identité web pour une agence de trading axée sur les individus, proposant des plans d'investissement en ligne et des services de conseil d'experts."
    },
    "9": {
      "title": "Maschool",
      "alt": "Maschool",
      "description": ""
    },
    "10": {
      "title": "Projets FreeLance",
      "alt": "Projets FreeLance",
      "description": ""
    }
  }
}
```

---
