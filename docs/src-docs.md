# Code Documentation

Generated on: 2024-12-22T12:12:36.613Z
Total files: 101

## Project Structure

```
└── portfolio_full_stack
    ├── components
    │   ├── Lenis.tsx
    │   ├── common
    │   │   ├── Footer.tsx
    │   │   ├── HamburgerMenu.tsx
    │   │   ├── Head.tsx
    │   │   ├── Header.tsx
    │   │   ├── Layer.tsx
    │   │   ├── Script.tsx
    │   │   ├── SwitchLang.tsx
    │   │   └── toast
    │   │       ├── ToastRegion.tsx
    │   │       ├── addToast.ts
    │   │       └── index.ts
    │   ├── pages
    │   │   ├── Contact
    │   │   │   ├── AgencyList.tsx
    │   │   │   ├── ContactForm.tsx
    │   │   │   └── Index.tsx
    │   │   └── home
    │   │       ├── Action.tsx
    │   │       ├── ActionContact.tsx
    │   │       ├── Cases.tsx
    │   │       ├── Expertise.tsx
    │   │       ├── Index.tsx
    │   │       ├── Intro.tsx
    │   │       ├── Manifesto.tsx
    │   │       └── Video.tsx
    │   ├── style.ts
    │   └── ui
    │       ├── animation
    │       │   └── Item.tsx
    │       ├── animation.ts
    │       ├── button
    │       │   ├── Button.tsx
    │       │   ├── Button.type.ts
    │       │   └── index.tsx
    │       ├── collection
    │       │   ├── index.tsx
    │       │   └── menu
    │       │       ├── Menu.tsx
    │       │       └── index.tsx
    │       ├── conf.ts
    │       ├── container
    │       │   ├── Container.style.ts
    │       │   ├── Container.tsx
    │       │   ├── Container.type.ts
    │       │   └── index.tsx
    │       ├── cursor
    │       │   ├── Cursor.context.ts
    │       │   ├── Cursor.tsx
    │       │   ├── CursorContainer.tsx
    │       │   ├── CursorType.ts
    │       │   ├── Cursors.tsx
    │       │   └── index.tsx
    │       ├── deco
    │       │   ├── circleText
    │       │   │   ├── CircleText.tsx
    │       │   │   └── index.tsx
    │       │   └── index.tsx
    │       ├── form
    │       │   ├── CheckBox.tsx
    │       │   ├── Field.tsx
    │       │   ├── Form.tsx
    │       │   ├── Item.tsx
    │       │   ├── Radio.tsx
    │       │   ├── Select.tsx
    │       │   └── index.tsx
    │       ├── icon
    │       │   ├── Icon.tsx
    │       │   ├── IconsList.tsx
    │       │   └── index.tsx
    │       ├── image
    │       │   ├── Image.tsx
    │       │   └── index.tsx
    │       ├── logo
    │       │   ├── Logo.tsx
    │       │   └── index.tsx
    │       ├── navbar
    │       │   ├── Navbar.tsx
    │       │   ├── Navbar.type.ts
    │       │   └── index.tsx
    │       ├── noise
    │       │   ├── Noise.tsx
    │       │   └── index.tsx
    │       ├── overlay
    │       │   ├── index.tsx
    │       │   ├── modal
    │       │   │   ├── Modal.tsx
    │       │   │   └── index.tsx
    │       │   └── popover
    │       │       ├── Popover.tsx
    │       │       └── index.tsx
    │       ├── preloader
    │       │   ├── Preloader.context.tsx
    │       │   ├── Preloader.hook.tsx
    │       │   └── index.ts
    │       ├── resizablePanel
    │       │   ├── ResizablePanel.tsx
    │       │   └── index.tsx
    │       └── typography
    │           ├── Link.tsx
    │           ├── Typography.ts
    │           └── index.ts
    ├── conf
    │   ├── projects.ts
    │   └── router.ts
    ├── helpers
    │   └── className.ts
    ├── hook
    │   ├── SafePush.tsx
    │   ├── Time.tsx
    │   ├── index.tsx
    │   ├── useDebounce.tsx
    │   ├── useEventListener.tsx
    │   └── useGsap.tsx
    ├── lib
    │   └── Lenis
    │       ├── Lenis.context.tsx
    │       ├── Lenis.hook.tsx
    │       ├── index.ts
    │       └── lenis.ts
    ├── pages
    │   ├── _app.tsx
    │   ├── _document.tsx
    │   ├── api
    │   │   ├── contact.ts
    │   │   └── robots.ts
    │   ├── contact.tsx
    │   ├── index.tsx
    │   ├── references.tsx
    │   └── resume.tsx
    └── utils
        ├── env.ts
        ├── gsap.tsx
        └── i18n.ts
```

## File: Lenis.tsx

- Path: `/root/git/portfolio_full_stack/components/Lenis.tsx`
- Size: 921.00 B
- Extension: .tsx
- Lines of code: 34

```tsx
import { useFrame } from "@studio-freight/hamo";
import React, { useRef } from "react";
import { LenisProvider, useLenis } from "@/lib/Lenis";
import { LenisInstance } from "@/lib/Lenis/lenis";
function Lenis({ children }: { children: React.ReactElement }) {
  const lenisRef = useRef<LenisInstance>();
  useFrame((time: number) => {
    lenisRef.current?.raf(time);
  });
  useLenis(() => {
    ScrollTrigger.refresh();
  });
  return (
    <LenisProvider
      autoRaf={true}
      ref={lenisRef}
      options={{
        smoothTouch: true,
        isSmooth: true,
        duration: 1.2,
        wheelMultiplier: 1.15,
        touchMultiplier: 1.9,
        infinite: false,
        autoResize: false,
        direction: "vertical",
        gestureDirection: "vertical",
        easing: t => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))
      }}
    >
      {children}
    </LenisProvider>
  );
}
export default Lenis;
```

---

## File: style.ts

- Path: `/root/git/portfolio_full_stack/components/style.ts`
- Size: 249.00 B
- Extension: .ts
- Lines of code: 13

```ts
import { cva } from "class-variance-authority";
export const rounded = cva("", {
  variants: {
    size: {
      xl: "rounded-xl xl:rounded-3xl",
      lg: "rounded-xl",
      sm: "rounded-lg"
    }
  },
  defaultVariants: {
    size: "lg"
  }
});
```

---

## File: projects.ts

- Path: `/root/git/portfolio_full_stack/conf/projects.ts`
- Size: 4.33 KB
- Extension: .ts
- Lines of code: 161

```ts
const TASK_PROJECTS = {
  WEB_DESIGNER: "Web Designer",
  WEB_DEVELOPER: "Web Developer",
  MOBILE_DEVELOPER: "Mobile Developer",
  CRYPTO_DEVELOPER: "Crypto Developer",
  GRAPHIC_DESIGNER: "Graphic Designer",
  MARKETER: "Marketer",
  DATABASE_CONSULTANT: "Database Consultant",
  SCRAPE_DEVELOPER: "Scrape Developer",
  BACKEND_DEVELOPER: "Backend Developer",
  FRONTEND_DEVELOPER: "Frontend Developer",
  INFRASTRUCTURE_DEVELOPER: "Infrastructure Developer",
  TECHNICAL_ADVISOR: "Technical Advisor",
  FULLSTACK_DEVELOPER: "Fullstack Developer"
} as const;
const TITLE = {
  CTO: "CTO",
  CEO: "CEO",
  CO_FOUNDER: "CO-FOUNDER",
  FOUNDER: "FOUNDER",
  TECHNICAL_ADVISOR: "TECHNICAL ADVISOR",
  RECHERCHE_AND_DEVELOPMENT: "RECHERCHE AND DEVELOPMENT",
  FREELANCER: "FREELANCER",
  AUTOMATION_SPECIALIST: "AUTOMATION SPECIALIST",
  ACADEMIC_PROJECT_PLATFORM_ARCHITECT: "ACADEMIC PROJECT PLATFORM ARCHITECT"
} as const;
export type TaskProject = (typeof TASK_PROJECTS)[keyof typeof TASK_PROJECTS];
export type TitleProject = (typeof TITLE)[keyof typeof TITLE];
const {
  WEB_DESIGNER,
  WEB_DEVELOPER,
  CRYPTO_DEVELOPER,
  GRAPHIC_DESIGNER,
  DATABASE_CONSULTANT,
  SCRAPE_DEVELOPER,
  FRONTEND_DEVELOPER,
  FULLSTACK_DEVELOPER,
  INFRASTRUCTURE_DEVELOPER
} = TASK_PROJECTS;
const {
  CTO,
  CO_FOUNDER,
  FOUNDER,
  TECHNICAL_ADVISOR,
  RECHERCHE_AND_DEVELOPMENT,
  FREELANCER,
  ACADEMIC_PROJECT_PLATFORM_ARCHITECT,
  AUTOMATION_SPECIALIST
} = TITLE;
export type ProjectTitle =
  | "Happy Water"
  | "Sofiane Pamart's Musical NFT"
  | "Cyber Cohesion"
  | "Shinobi Boy"
  | "Web Application for managing university Projects"
  | "SODIADD"
  | "Jonas Agency"
  | "Lavish Trading"
  | "Maschool"
  | "FreeLance Projects";
const COUNTRY_NAMES = {
  FRANCE: "France",
  MOROCCO: "Morocco",
  UNITED_STATES: "United States",
  SINGAPORE: "Singapore",
  LONDON: "London"
} as const;
export type CountryNames = (typeof COUNTRY_NAMES)[keyof typeof COUNTRY_NAMES];
export interface Project {
  id: `${number}`;
  title: ProjectTitle;
  tasks: TaskProject[];
  category: ("best" | "ongoing" | "completed")[];
  jobTitle: TitleProject[];
  picture?: [string];
  country?: CountryNames;
}
const PROJECTS: Project[] = [
  {
    id: "1",
    title: "Happy Water",
    category: ["best", "completed"],
    tasks: [WEB_DESIGNER, WEB_DEVELOPER, CRYPTO_DEVELOPER],
    jobTitle: [CTO, CO_FOUNDER],
    picture: ["/images/project/happy_water_mockup_main.webp"]
  },
  {
    id: "2",
    title: "Sofiane Pamart's Musical NFT",
    category: ["completed"],
    tasks: [FRONTEND_DEVELOPER],
    jobTitle: [AUTOMATION_SPECIALIST]
  },
  {
    id: "3",
    title: "Cyber Cohesion",
    tasks: [WEB_DEVELOPER, DATABASE_CONSULTANT],
    category: ["ongoing"],
    jobTitle: [TECHNICAL_ADVISOR, RECHERCHE_AND_DEVELOPMENT],
    country: "Singapore"
  },
  {
    id: "4",
    title: "Shinobi Boy",
    category: ["completed"],
    tasks: [FULLSTACK_DEVELOPER, SCRAPE_DEVELOPER, INFRASTRUCTURE_DEVELOPER],
    jobTitle: [FOUNDER]
  },
  {
    id: "5",
    title: "Web Application for managing university Projects",
    tasks: [FULLSTACK_DEVELOPER],
    category: ["completed"],
    jobTitle: [ACADEMIC_PROJECT_PLATFORM_ARCHITECT]
  },
  {
    id: "6",
    title: "SODIADD",
    category: ["best", "ongoing"],
    tasks: [WEB_DESIGNER, FULLSTACK_DEVELOPER],
    jobTitle: [CTO, CO_FOUNDER],
    picture: ["/images/project/sodiadd_mockup_main.webp"],
    country: "France"
  },
  {
    id: "7",
    title: "Jonas Agency",
    category: ["ongoing"],
    tasks: [FULLSTACK_DEVELOPER],
    jobTitle: [TECHNICAL_ADVISOR],
    country: "London"
  },
  {
    id: "8",
    category: ["best", "completed"],
    title: "Lavish Trading",
    tasks: [WEB_DESIGNER, FULLSTACK_DEVELOPER],
    jobTitle: [FREELANCER],
    picture: ["/images/project/lavish_mockup_main.webp"]
  },
  {
    id: "9",
    category: ["completed"],
    title: "Maschool",
    tasks: [WEB_DESIGNER, FRONTEND_DEVELOPER],
    jobTitle: [CO_FOUNDER]
  },
  {
    id: "10",
    category: ["completed"],
    title: "FreeLance Projects",
    tasks: [WEB_DESIGNER, GRAPHIC_DESIGNER, WEB_DEVELOPER],
    jobTitle: [FREELANCER]
  }
];
export const getProject = (id: string) =>
  PROJECTS.find(project => project.id === id);
export const getProjectsByCategory = (
  category: "best" | "ongoing" | "completed"
) => PROJECTS.filter(project => project.category.includes(category));
export default PROJECTS;
```

---

## File: router.ts

- Path: `/root/git/portfolio_full_stack/conf/router.ts`
- Size: 1.83 KB
- Extension: .ts
- Lines of code: 86

```ts
import _ from "lodash";
const menuType = {
  secondary: "secondary",
  hamburger: "hamburger",
  socialNetworks: "socialNetworks"
} as const;
export const menuValues = Object.values(menuType);
type MenuType = (typeof menuType)[keyof typeof menuType];
interface MenuItem {
  id: string;
  link: string;
  menu: MenuType[];
}
type MenuItemNames =
  | "intro"
  | "manifesto"
  | "experience"
  | "cases"
  | "contact"
  | "instagram"
  | "linkedin"
  | "github"
  | "dribbble"
  | "medium";
type MenuItems = {
  [key in MenuItemNames]: MenuItem;
};
const MENU_ITEMS: MenuItems = {
  intro: {
    id: "intro",
    link: "/#intro",
    menu: []
  },
  manifesto: {
    id: "manifesto",
    link: "/",
    menu: ["secondary", "hamburger"]
  },
  experience: {
    id: "experience",
    link: "/",
    menu: ["secondary", "hamburger"]
  },
  cases: {
    id: "cases",
    link: "/",
    menu: ["secondary", "hamburger"]
  },
  contact: {
    id: "contact",
    link: "/contact",
    menu: ["secondary", "hamburger"]
  },
  instagram: {
    link: "https://www.instagram.com/mohammedsayagh/",
    menu: ["socialNetworks"],
    id: "instagram"
  },
  linkedin: {
    link: "https://www.linkedin.com/in/mohamedamine-sayagh/",
    menu: ["socialNetworks"],
    id: "linkedin"
  },
  github: {
    link: "https://github.com/aminesayagh",
    menu: ["socialNetworks"],
    id: "github"
  },
  dribbble: {
    link: "https://dribbble.com/mohammed-sayagh",
    menu: ["socialNetworks"],
    id: "dribbble"
  },
  medium: {
    link: "https://medium.com/@masayagh",
    menu: ["socialNetworks"],
    id: "medium"
  }
};
export const getMenuItems = (menuType: MenuType): MenuItem[] => {
  return _.values(MENU_ITEMS).filter((menuItem: MenuItem) =>
    menuItem.menu.includes(menuType)
  );
};
export { MENU_ITEMS };
export type { MenuType, MenuItem, MenuItemNames, MenuItems };
```

---

## File: className.ts

- Path: `/root/git/portfolio_full_stack/helpers/className.ts`
- Size: 311.00 B
- Extension: .ts
- Lines of code: 9

```ts
import { twMerge } from "tailwind-merge";
export const mergeClassName = <T>(
  defaultClassName: string,
  className?: string | ((state: T) => string)
) => {
  return typeof className === "function"
    ? (state: T) => twMerge(className(state), defaultClassName)
    : twMerge(className, defaultClassName);
};
```

---

## File: SafePush.tsx

- Path: `/root/git/portfolio_full_stack/hook/SafePush.tsx`
- Size: 824.00 B
- Extension: .tsx
- Lines of code: 25

```tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const useSafePush = () => {
  const [onChanging, setOnChanging] = useState(false);
  const handleRouteChange = () => {
    setOnChanging(false);
  };
  const router = useRouter();
  const safePush = (path: string) => {
    if (onChanging) {
      return;
    }
    setOnChanging(true);
    router.push(path);
  };
  useEffect(() => {
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router, setOnChanging]);
  return { safePush };
};
export default useSafePush;
```

---

## File: Time.tsx

- Path: `/root/git/portfolio_full_stack/hook/Time.tsx`
- Size: 856.00 B
- Extension: .tsx
- Lines of code: 36

```tsx
import moment from "moment";
import { useEffect, useState, useMemo } from "react";
import "moment-timezone";
type TimeMoment = moment.Moment;
const Time = ({
  city,
  country,
  format = "HH:mm"
}: {
  city: string;
  country: string;
  format: string;
}) => {
  const [time, setTime] = useState<TimeMoment>(moment());
  const timeZone = useMemo(() => `${country}/${city}`, [city, country]);
  useEffect(() => {
    if (moment.tz.zone(timeZone)) {
      const interval = setInterval(() => {
        setTime(moment());
      }, 1000);
      return () => clearInterval(interval);
    } else {
      return () => {};
    }
  }, [timeZone]);
  if (!moment.tz.zone(timeZone)) {
    return null;
  }
  const formattedTime = time.format(format);
  const gmtOffset = time.format("Z");
  return {
    formattedTime,
    gmtOffset
  };
};
export default Time;
```

---

## File: index.tsx

- Path: `/root/git/portfolio_full_stack/hook/index.tsx`
- Size: 45.00 B
- Extension: .tsx
- Lines of code: 1

```tsx
export { default as useTime } from "./Time";
```

---

## File: useDebounce.tsx

- Path: `/root/git/portfolio_full_stack/hook/useDebounce.tsx`
- Size: 375.00 B
- Extension: .tsx
- Lines of code: 11

```tsx
import { useEffect, useState } from "react";
export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return debouncedValue;
}
```

---

## File: useEventListener.tsx

- Path: `/root/git/portfolio_full_stack/hook/useEventListener.tsx`
- Size: 2.40 KB
- Extension: .tsx
- Lines of code: 69

```tsx
import { RefObject, useEffect, useRef } from "react";
import { useIsomorphicLayoutEffect } from "react-use";
function useEventListener<K extends keyof MediaQueryListEventMap>(
  eventName: K,
  handler: (event: MediaQueryListEventMap[K]) => void,
  element: RefObject<MediaQueryList>,
  options?: boolean | AddEventListenerOptions
): void;
function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element?: undefined,
  options?: boolean | AddEventListenerOptions
): void;
function useEventListener<
  K extends keyof HTMLElementEventMap,
  T extends HTMLElement = HTMLDivElement
>(
  eventName: K,
  handler: (event: HTMLElementEventMap[K]) => void,
  element: RefObject<T>,
  options?: boolean | AddEventListenerOptions
): void;
function useEventListener<K extends keyof DocumentEventMap>(
  eventName: K,
  handler: (event: DocumentEventMap[K]) => void,
  element: RefObject<Document>,
  options?: boolean | AddEventListenerOptions
): void;
function useEventListener<
  KW extends keyof WindowEventMap,
  KH extends keyof HTMLElementEventMap,
  KM extends keyof MediaQueryListEventMap,
  T extends HTMLElement | MediaQueryList | void = void
>(
  eventName: KW | KH | KM,
  handler: (
    event:
      | WindowEventMap[KW]
      | HTMLElementEventMap[KH]
      | MediaQueryListEventMap[KM]
      | Event
  ) => void,
  element?: RefObject<T>,
  options?: boolean | AddEventListenerOptions
) {
  const savedHandler = useRef(handler);
  useIsomorphicLayoutEffect(() => {
    savedHandler.current = handler;
  }, [handler]);
  useEffect(() => {
    const targetElement: T | Window = element?.current ?? window;
    if (!(targetElement && targetElement.addEventListener)) return;
    const listener: typeof handler = event => savedHandler.current(event);
    targetElement.addEventListener(eventName, listener, options);
    return () => {
      targetElement.removeEventListener(eventName, listener, options);
    };
  }, [eventName, element, options]);
}
export { useEventListener };
```

---

## File: useGsap.tsx

- Path: `/root/git/portfolio_full_stack/hook/useGsap.tsx`
- Size: 612.00 B
- Extension: .tsx
- Lines of code: 18

```tsx
import { RefObject } from "react";
import { useTranslations } from "next-intl";
import { useIsomorphicLayoutEffect } from "react-use";
import { gsap } from "@/utils/gsap";
const useGsap = (
  gsapCallback: gsap.ContextFunc,
  ref: RefObject<HTMLDivElement> | RefObject<HTMLCanvasElement> | undefined,
  rendered: unknown[] = []
) => {
  const { i18n } = useTranslations();
  useIsomorphicLayoutEffect(() => {
    const ctx: gsap.Context = gsap.context(gsapCallback, ref || undefined);
    return () => {
      ctx && ctx.revert();
    };
  }, [ref, i18n.language, ...rendered]);
};
export default useGsap;
```

---

## File: \_app.tsx

- Path: `/root/git/portfolio_full_stack/pages/_app.tsx`
- Size: 1.52 KB
- Extension: .tsx
- Lines of code: 46

```tsx
import type { AppProps } from "next/app";
import { Montserrat } from "next/font/google";
import { appWithTranslation } from "next-i18next";
import React, { useMemo, useEffect, useState } from "react";
import Scripts from "@/components/common/Script";
import { LoadingProvider } from "@/components/ui/preloader";
import nextI18NextConfig from "../next-i18next.config.js";
import "../styles/globals.scss";
import "../utils/i18n";
const montserrat = Montserrat({
  subsets: ["cyrillic"],
  variable: "--font-montserrat",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});
const appTranslated = appWithTranslation(
  ({ Component, pageProps }: AppProps) => {
    const font = useMemo(() => montserrat.variable, []);
    const [isReadyFont, setIsReadyFont] = useState(false);
    useEffect(() => {
      document.documentElement.style.setProperty("--font-montserrat", font);
      document.body.classList.add(font);
      const time = setTimeout(() => {
        setIsReadyFont(true);
      }, 1000);
      return () => {
        setIsReadyFont(false);
        clearTimeout(time);
      };
    }, [font]);
    if (!font) return null;
    return (
      <>
        <Scripts />
        <main className="app-container">
          <LoadingProvider fontReady={isReadyFont}>
            <Component {...pageProps} />
          </LoadingProvider>
        </main>
      </>
    );
  },
  nextI18NextConfig
);
export default appTranslated;
```

---

## File: \_document.tsx

- Path: `/root/git/portfolio_full_stack/pages/_document.tsx`
- Size: 250.00 B
- Extension: .tsx
- Lines of code: 13

```tsx
import { Html, Head, Main, NextScript } from "next/document";
import React from "react";
export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

---

## File: contact.tsx

- Path: `/root/git/portfolio_full_stack/pages/contact.tsx`
- Size: 1.32 KB
- Extension: .tsx
- Lines of code: 45

```tsx
import dynamic from "next/dynamic.js";
import { useTranslations } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import Head from "@/components/common/Head";
import Layer from "@/components/common/Layer";
import { ToastRegion } from "@/components/common/toast";
import Lenis from "@/components/Lenis";
import Noise from "components/ui/noise";
import nextI18NextConfig from "../next-i18next.config.js";
import "@/utils/gsap";
const ContactPageDynamic = dynamic(
  () => import("@/components/pages/Contact/Index"),
  {}
);
const Contact = () => {
  const { t } = useTranslations("common");
  return (
    <>
      <Head
        title={t("head.contact.title")}
        description={t("head.contact.description")}
        keywords={t("head.contact.keywords")}
        author={t("head.contact.author")}
        logo="/favicon.svg"
      />
      <Lenis>
        <Layer>
          <ContactPageDynamic />
          <Noise />
          <ToastRegion />
        </Layer>
      </Lenis>
    </>
  );
};
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], nextI18NextConfig))
    }
  };
}
export default Contact;
```

---

## File: index.tsx

- Path: `/root/git/portfolio_full_stack/pages/index.tsx`
- Size: 1.13 KB
- Extension: .tsx
- Lines of code: 38

```tsx
import { useTranslations } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import "@/utils/gsap";
import Head from "@/components/common/Head";
import Layer from "@/components/common/Layer";
import Lenis from "@/components/Lenis";
import LandingPage from "@/components/pages/home/Index";
import Noise from "@/components/ui/noise";
import nextI18NextConfig from "../next-i18next.config.js";
export default function Home() {
  const { t } = useTranslations("common");
  return (
    <>
      <Head
        title={t("head.home.title")}
        description={t("head.home.description")}
        keywords={t("head.home.keywords")}
        author={t("head.home.author")}
        logo="/favicon.svg"
      />
      <Lenis>
        <Layer>
          <LandingPage />
          <Noise />
        </Layer>
      </Lenis>
    </>
  );
}
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], nextI18NextConfig))
    }
  };
}
```

---

## File: references.tsx

- Path: `/root/git/portfolio_full_stack/pages/references.tsx`
- Size: 718.00 B
- Extension: .tsx
- Lines of code: 23

```tsx
import React, { useEffect } from "react";
import useSafePush from "@/hook/SafePush";
function References() {
  const push = useSafePush();
  useEffect(() => {
    const downloadFile = async () => {
      const response = await fetch("/references.pdf");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "references.pdf";
      a.click();
      a.remove();
    };
    downloadFile().then(() => {
      push.safePush("/");
    });
  }, [push]);
  return <div className="h-screen"></div>;
}
export default References;
```

---

## File: resume.tsx

- Path: `/root/git/portfolio_full_stack/pages/resume.tsx`
- Size: 813.00 B
- Extension: .tsx
- Lines of code: 25

```tsx
import React, { useEffect } from "react";
import useSafePush from "@/hook/SafePush";
function References() {
  const push = useSafePush();
  useEffect(() => {
    const downloadFile = async () => {
      const response = await fetch(
        "/Mohamed Amine SAYAGH - Sotware developer - Resume.pdf"
      );
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "/Mohamed Amine SAYAGH - Sotware developer - Resume.pdf";
      a.click();
      a.remove();
    };
    downloadFile().then(() => {
      push.safePush("/");
    });
  }, [push]);
  return <div className="h-screen"></div>;
}
export default References;
```

---

## File: env.ts

- Path: `/root/git/portfolio_full_stack/utils/env.ts`
- Size: 227.00 B
- Extension: .ts
- Lines of code: 4

```ts
export const NOTION_API_KEY = process.env["NOTION_API_KEY"];
export const NOTION_DATABASE_ID = process.env["NOTION_DATABASE_ID"];
export const NEXT_PUBLIC_GOOGLE_ANALYTICS_ID =
  process.env["NEXT_PUBLIC_GOOGLE_ANALYTICS_ID"];
```

---

## File: gsap.tsx

- Path: `/root/git/portfolio_full_stack/utils/gsap.tsx`
- Size: 399.00 B
- Extension: .tsx
- Lines of code: 13

```tsx
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { MotionPathPlugin } from "gsap/dist/MotionPathPlugin";
export { TimelineMax } from "gsap";
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(MotionPathPlugin);
gsap.defaults({
  ease: "none",
  duration: 1
});
export * from "gsap";
export * from "gsap/dist/ScrollTrigger";
```

---

## File: i18n.ts

- Path: `/root/git/portfolio_full_stack/utils/i18n.ts`
- Size: 948.00 B
- Extension: .ts
- Lines of code: 34

```ts
import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";
i18n
  .use(Backend) // lazy loads translations from /public/locales
  .use(LanguageDetector) // detect user language
  .use(
    resourcesToBackend((language, namespace, callback) => {
      import(`../public/locales/${language}/${namespace}.json`)
        .then(resources => {
          callback(null, resources);
        })
        .catch(error => {
          callback(error, null);
        });
    })
  )
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    ns: ["common"],
    debug: false,
    supportedLngs: ["fr", "en"],
    detection: {
      order: ["queryString", "cookie"]
    },
    interpolation: {
      escapeValue: false
    }
  });
export default i18n;
```

---

## File: Footer.tsx

- Path: `/root/git/portfolio_full_stack/components/common/Footer.tsx`
- Size: 10.58 KB
- Extension: .tsx
- Lines of code: 424

```tsx
import _ from "lodash";
import { useTranslations } from "next-i18next";
import React, {
  ElementRef,
  useRef,
  useEffect,
  useCallback,
  memo,
  useState,
  Fragment
} from "react";
import { useIsomorphicLayoutEffect } from "react-use";
import { twMerge } from "tailwind-merge";
import Button from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Link, text, TextPropsExtended } from "@/components/ui/typography";
import { getMenuItems } from "@/conf/router";
import { useEventListener } from "@/hook/useEventListener";
import { useLenis } from "@/lib/Lenis";
import { gsap } from "utils/gsap";
const menuSocialNetworks = getMenuItems("socialNetworks");
const BASE_LOCALE_SOCIAL = "socialNetwork";
const ICON_SIZE_CLASS_NAME = "w-5 h-5 lg:w-6 lg:h-6";
const FollowUs = () => {
  const ref = useRef<ElementRef<"div">>(null);
  const ctx = useRef<gsap.Context | null>(null);
  useIsomorphicLayoutEffect(() => {
    if (!menuSocialNetworks.length) return;
    ctx.current = gsap.context(self => {
      const tl = gsap
        .timeline({
          paused: true
        })
        .fromTo(
          ".fallow-button-gsap",
          {
            xPercent: 0
          },
          {
            xPercent: 100,
            duration: 0.2,
            ease: "Power4.out"
          }
        )
        .to(".fallow-button-gsap", {
          width: 0,
          duration: 0.01
        })
        .fromTo(
          ".social-button-gsap",
          {
            xPercent: -100,
            opacity: 0
          },
          {
            opacity: 1,
            xPercent: 0,
            stagger: -0.07,
            duration: 0.3
          }
        );
      self.add("followButtonShow", () => {
        tl.play();
      });
      self.add("followButtonHide", () => {
        tl.reverse();
      });
      gsap.set(".social-button-gsap", {
        xPercent: -100,
        opacity: 0
      });
      gsap.set(".fallow-button-gsap", {
        xPercent: 0
      });
      return () => {
        tl.kill();
      };
    }, ref);
    return () => {
      ctx.current?.revert();
    };
  }, [ref, menuSocialNetworks.length]);
  const handler = useCallback(() => {
    if (!ctx.current) return;
    ctx.current["followButtonShow"]();
  }, [ctx]);
  const handlerLeave = useCallback(() => {
    if (!ctx.current) return;
    ctx.current["followButtonHide"]();
  }, [ctx]);
  useEventListener("mouseenter", handler, ref);
  useEventListener("mouseleave", handlerLeave, ref);
  const { t } = useTranslations();
  return (
    <div ref={ref} className="flex flex-row items-center justify-end gap-4">
      <ul className="flex flex-row items-center gap-8">
        {menuSocialNetworks.map((item, index) => (
          <li key={index} className="overflow-hidden list-none">
            <Link
              size="sm"
              href={item.link}
              degree="4"
              weight="semibold"
              className="social-button-gsap"
            >
              {t(`${BASE_LOCALE_SOCIAL}.${item.id}.key`)}
            </Link>
          </li>
        ))}
      </ul>
      <span className="flex overflow-hidden">
        <p
          className={text(
            {
              size: "sm",
              degree: "3",
              weight: "semibold"
            },
            "fallow-button-gsap whitespace-nowrap-important"
          )}
        >
          {t("footer.socialNetwork")}
        </p>
      </span>
      <Icon
        name="IconShare"
        size="24"
        className={twMerge("stroke-gray-400", ICON_SIZE_CLASS_NAME)}
      />
    </div>
  );
};
const TextAnimated = ({
  lang,
  phrase,
  className,
  ...props
}: {
  lang: string;
  phrase: string;
  className?: string;
} & TextPropsExtended) => {
  const container = useRef<ElementRef<"div">>(null);
  const refs = useRef<ElementRef<"div">[]>([]);
  const [body, setBody] = useState<React.JSX.Element[] | null>(null);
  useIsomorphicLayoutEffect(() => {
    if (!body) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".word-gsap",
        {
          y: "100%"
        },
        {
          y: "0%",
          stagger: 0.04,
          duration: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top bottom-=80px",
            toggleActions: "play none reverse reverse"
          }
        }
      );
    }, container);
    return () => {
      ctx.revert();
    };
  }, [body, lang]);
  useEffect(() => {
    setBody(null);
    const splitWords = _.map(phrase.split(" "), (word, index) => {
      return (
        <div key={index} className="py-px overflow-y-animate">
          <div
            ref={ref => {
              if (!ref) return;
              refs.current[index] = ref;
            }}
            className="word-gsap will-change-transform-animation"
          >
            {word}
          </div>
        </div>
      );
    });
    setBody(splitWords);
  }, [phrase, lang]);
  return (
    <span ref={container}>
      {/* <Text
div
className={twMerge("flex flex-row flex-wrap", className)}
{...props}
>
{body
? body.map((word, index) => (
<Fragment key={index}>{word} </Fragment>
))
: null}
</Text> */}
      <div
        className={text(
          {
            size: props.size,
            degree: props.degree,
            weight: props.weight
          },
          "flex flex-row flex-wrap",
          className
        )}
      >
        {body
          ? body.map((word, index) => <Fragment key={index}>{word} </Fragment>)
          : null}
      </div>
    </span>
  );
};
const GoToTop = ({ handler, name }: { handler: () => void; name: string }) => {
  const ref = useRef<HTMLButtonElement | null>(null);
  const ctx = useRef<gsap.Context | null>(null);
  useIsomorphicLayoutEffect(() => {
    ctx.current = gsap.context(self => {
      const tlIcon = gsap
        .timeline({
          paused: true
        })
        .fromTo(
          ".icon_gsap",
          {
            opacity: 1,
            yPercent: 0,
            xPercent: 0
          },
          {
            opacity: 0,
            yPercent: -100,
            xPercent: 100,
            duration: 0.3
          }
        )
        .fromTo(
          ".icon_gsap",
          {
            opacity: 0,
            yPercent: 100,
            xPercent: -100
          },
          {
            opacity: 1,
            yPercent: 0,
            duration: 0.3,
            xPercent: 0
          }
        );
      const tlText = gsap
        .timeline({
          paused: true
        })
        .fromTo(
          ".text_gsap",
          {
            opacity: 1,
            yPercent: 0
          },
          {
            opacity: 0,
            yPercent: -100,
            duration: 0.3
          }
        )
        .fromTo(
          ".text_gsap",
          {
            opacity: 0,
            yPercent: 100
          },
          {
            opacity: 1,
            yPercent: 0,
            duration: 0.3
          }
        );
      tlIcon.play();
      tlText.play();
      self.add("handlerGoToTop", () => {
        tlIcon.progress(0);
        tlText.progress(0);
        tlIcon.play();
        tlText.play();
      });
      self.add("handlerGoToTopLeave", () => {
        tlIcon.reverse();
        tlText.reverse();
      });
      return () => {
        tlIcon.kill();
        tlText.kill();
      };
    }, ref);
    return () => {
      ctx.current?.revert();
    };
  }, [ref]);
  const handlerMouse = useCallback(() => {
    if (!ctx.current) return;
    ctx.current["handlerGoToTop"]();
  }, [ctx]);
  const handlerMouseLeave = useCallback(() => {
    if (!ctx.current) return;
    ctx.current["handlerGoToTopLeave"]();
  }, [ctx]);
  useEventListener("mouseenter", handlerMouse, ref);
  useEventListener("mouseleave", handlerMouseLeave, ref);
  return (
    <Button
      ref={ref}
      onPress={() => handler()}
      className={twMerge(
        "flex flex-row justify-start items-center",
        "gap-6 md:gap-8",
        "uppercase"
      )}
    >
      <Icon
        name="IconArrowUpRight"
        size="24"
        className={twMerge("stroke-gray-400 icon_gsap", ICON_SIZE_CLASS_NAME)}
      />
      <p
        className={text(
          {
            size: "sm",
            weight: "semibold",
            degree: "3"
          },
          "text_gsap"
        )}
      >
        {name}
      </p>
    </Button>
  );
};
const GoToTopMemo = memo(GoToTop);
const Footer = () => {
  const {
    t,
    i18n: { language }
  } = useTranslations();
  const lenis = useLenis();
  const goToTop = useCallback(() => {
    lenis && lenis.scrollTo(0);
  }, [lenis]);
  return (
    <>
      <div
        className={twMerge(
          language == "en"
            ? "max-w-[16rem] xxs:w-8/12 xs:max-w-[46vw] sm:max-w-[40vw] md:max-w-[32vw] mdl:max-w-[30vw] xl:max-w-[20vw] 2xl:max-w-[28vw] 3xl:max-w-[22rem]"
            : "max-w-[16rem] xxs:w-9/12 xs:max-w-[46vw] sm:max-w-[40vw] md:max-w-[32vw] mdl:max-w-[30vw] xl:max-w-[20vw] 2xl:max-w-[28vw] 3xl:max-w-[22rem]"
        )}
      >
        <TextAnimated
          lang={language}
          degree="3"
          weight="medium"
          size="md"
          className="justify-start max-w-xs uppercase gap-x-2"
          phrase={t("footer.state")}
        />
      </div>
      <div
        className={twMerge(
          "flex flex-row flex-wrap sm:flex-nowrap justify-between",
          "gap-y-4",
          "pb-10 pt-6"
        )}
      >
        <div className={twMerge("flex flex-row flex-1", "order-2 sm:order-1")}>
          <GoToTopMemo handler={goToTop} name={t("footer.action")} />
        </div>
        <div className="flex flex-row items-center justify-start flex-none order-1 grow-0 sm:justify-center sm:order-2">
          {/* <Text p degree="3" weight="semibold" size="sm" className="uppercase">
{t("footer.name")}
</Text> */}
          <p
            className={text(
              {
                size: "sm",
                degree: "3",
                weight: "semibold"
              },
              "uppercase"
            )}
          >
            {t("footer.name")}
          </p>
          <p
            className={text(
              {
                size: "sm",
                degree: "3",
                weight: "semibold"
              },
              "ml-2"
            )}
          >
            {t("footer.copy")}
          </p>
        </div>
        <div className="flex-1 order-3">
          <FollowUs />
        </div>
      </div>
    </>
  );
};
const FooterMemo = memo(Footer);
export default FooterMemo;
```

---

## File: HamburgerMenu.tsx

- Path: `/root/git/portfolio_full_stack/components/common/HamburgerMenu.tsx`
- Size: 2.94 KB
- Extension: .tsx
- Lines of code: 97

```tsx
import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from "react";
import { useKeyboard } from "react-aria";
import { useMedia } from "react-use";
import Button from "@/components/ui/button";
const SIZE = 26;
const Y_PATH_01_CLOSED = "8";
const Y_PATH_02_CLOSED = "18";
const DURATION = 0.2;
const STROKE_WIDTH = 1.6;
const path01Variants = {
  open: { d: "M3.06061 2.99999L21.0606 21" },
  closed: { d: `M0 ${Y_PATH_01_CLOSED}L24 ${Y_PATH_01_CLOSED}` }
};
const path02Variants = {
  open: { d: "M3.00006 21.0607L21 3.06064" },
  moving: { d: `M0 ${Y_PATH_02_CLOSED}L24 ${Y_PATH_02_CLOSED}` },
  closed: { d: `M8 ${Y_PATH_02_CLOSED}L24 ${Y_PATH_02_CLOSED}` }
};
const HamburgerMenu = ({
  isOpen,
  setOpen
}: {
  isOpen: boolean;
  setOpen: () => void;
}) => {
  const path01Controls = useAnimation();
  const path02Controls = useAnimation();
  const isXxs = useMedia("(min-width: 390px)", false);
  useEffect(() => {
    if (typeof isOpen !== "boolean") return;
    async function handlerHamburgerClick() {
      if (!path02Controls || !path01Controls) return;
      if (isOpen) {
        await path02Controls.start(path02Variants.moving);
        path01Controls.start(path01Variants.open);
        path02Controls.start(path02Variants.open);
      } else {
        path01Controls.start(path01Variants.closed);
        await path02Controls.start(path02Variants.moving);
        path02Controls.start(path02Variants.closed);
      }
    }
    if (typeof isOpen === "boolean") {
      handlerHamburgerClick()
        .then()
        .catch(err => console.error(err));
    }
  }, [isOpen, path02Controls, path01Controls]);
  const { keyboardProps } = useKeyboard({
    onKeyDown: e => {
      if (["Escape", "Esc"].includes(e.key)) {
      }
    },
    onKeyUp: e => {
      if (["Escape", "Esc"].includes(e.key)) {
        isOpen && setOpen();
      }
    }
  });
  if (typeof setOpen !== "function" || typeof isOpen !== "boolean")
    throw new Error("HamburgerMenu: setOpen is undefined");
  return (
    <>
      <span {...keyboardProps}>
        <Button
          onPress={() => setOpen()}
          name="Hamberger menu button"
          title="Hamberger menu button"
          aria-label="Hamberger menu button"
          aria-haspopup="true"
        >
          <svg
            width={`${isXxs ? SIZE : 22}`}
            height={`${isXxs ? SIZE : 22}`}
            viewBox="0 0 24 24"
            strokeWidth={STROKE_WIDTH}
          >
            <motion.path
              {...path01Variants.closed}
              animate={path01Controls}
              transition={{ duration: DURATION }}
              stroke="var(--color-white-100)"
            />
            <motion.path
              {...path02Variants.closed}
              animate={path02Controls}
              transition={{ duration: DURATION }}
              stroke="var(--color-white-100)"
            />
          </svg>
        </Button>
      </span>
    </>
  );
};
export default HamburgerMenu;
```

---

## File: Head.tsx

- Path: `/root/git/portfolio_full_stack/components/common/Head.tsx`
- Size: 2.32 KB
- Extension: .tsx
- Lines of code: 99

```tsx
import { NextSeo } from "next-seo";
import React from "react";
const Head = ({
  title,
  description,
  keywords,
  author,
  logo
}: {
  title: string;
  description: string;
  keywords: string;
  author: string;
  logo: string;
}) => {
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        additionalMetaTags={[
          {
            property: "dc:creator",
            content: "Mohamed Amine SAYAGH",
            keyOverride: "creator1"
          },
          {
            name: "application-name",
            content: "Mohamed Amine SAYAGH",
            keyOverride: "application-name"
          },
          {
            name: "msapplication-TileColor",
            content: "#0e0e0e",
            keyOverride: "msapplication-TileColor"
          },
          {
            name: "keywords",
            content: keywords,
            keyOverride: "keywords"
          },
          {
            name: "author",
            content: author,
            keyOverride: "author"
          },
          {
            name: "robots",
            content: "index, follow",
            keyOverride: "robots"
          },
          {
            name: "googlebot",
            content: "index, follow",
            keyOverride: "googlebot"
          },
          {
            name: "viewport",
            content: "width=device-width, initial-scale=1",
            keyOverride: "viewport"
          }
        ]}
        additionalLinkTags={[
          {
            rel: "icon",
            href: logo
          },
          {
            rel: "apple-touch-icon",
            href: logo,
            sizes: "180x180"
          }
        ]}
        openGraph={{
          type: "website",
          url: "https://www.masayagh.com",
          title: title,
          description: description,
          site_name: "Mohamed Amine SAYAGH",
          profile: {
            firstName: "Mohamed Amine",
            lastName: "SAYAGH",
            username: "masayagh",
            gender: "man"
          },
          images: [
            {
              url: "https://res.cloudinary.com/dvxn9nvjs/image/upload/v1668256745/team/mohamed_amine_sayagh.jpg",
              width: 800,
              height: 600,
              alt: "Mohamed Amine SAYAGH"
            }
          ]
        }}
      />
    </>
  );
};
export default Head;
```

---

## File: Header.tsx

- Path: `/root/git/portfolio_full_stack/components/common/Header.tsx`
- Size: 17.08 KB
- Extension: .tsx
- Lines of code: 497

```tsx
import { useRouter } from "next/router";
import { useTranslations } from "next-i18next";
import React, {
  useState,
  useCallback,
  memo,
  useEffect,
  useRef,
  useMemo
} from "react";
import { useIsomorphicLayoutEffect } from "react-use";
import { twMerge } from "tailwind-merge";
import HamburgerMenu from "@/components/common/HamburgerMenu";
import Button from "@/components/ui/button";
import { containerStyle } from "@/components/ui/container";
import Logo from "@/components/ui/logo";
import Navbar from "@/components/ui/navbar";
import Modal from "@/components/ui/overlay/modal";
import { usePreloader } from "@/components/ui/preloader";
import { text, title, Link } from "@/components/ui/typography";
import { getMenuItems } from "@/conf/router";
import useRouterChange from "@/hook/SafePush";
import { useLenis } from "@/lib/Lenis";
import StyleAnimation from "@/styles/animation.module.scss";
import { gsap, Power3, ScrollTrigger } from "@/utils/gsap";
import SwitchLang from "./SwitchLang";
const GAP_SIZE_LG = "gap-4 sm:gap-6 lg:gap-7 xl:gap-8";
const GAP_SIZE_XL = "gap-8 mdl:gap-12";
const BASE_LOCALE_MENU = "header.menu";
const BASE_LOCALE_SOCIAL = "socialNetwork";
const DURATION = 0.4;
const TRANSLATE_Y = -110;
const menuHamburgerItems = getMenuItems("hamburger");
const menuSocialNetworks = getMenuItems("socialNetworks");
const Header = () => {
  const { t } = useTranslations();
  const router = useRouter();
  const { safePush } = useRouterChange();
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const { endLoading } = usePreloader();
  const lenis = useLenis();
  const tl = useRef<gsap.core.Timeline>(gsap.timeline({ paused: true }));
  const ctx = useRef<gsap.Context>();
  useIsomorphicLayoutEffect(() => {
    ctx.current = gsap.context(self => {
      self.add("open", () => {
        tl.current
          .fromTo(
            [".modal-overlay", ".modal-content"],
            {
              opacity: 1,
              yPercent: TRANSLATE_Y,
              transformOrigin: "right top",
              skewY: 2,
              onStartParams: []
            },
            {
              duration: DURATION,
              ease: Power3.easeInOut,
              yPercent: 0,
              skewY: 0,
              stagger: {
                amount: 0.2
              }
            }
          )
          .to(
            [".subElement-item"],
            {
              duration: DURATION / 2,
              yPercent: 100,
              ease: Power3.easeInOut
            },
            "<"
          )
          .from(".modal-item", {
            duration: DURATION / 2,
            yPercent: 100,
            opacity: 0,
            ease: Power3.easeInOut,
            stagger: {
              amount: 0.2
            }
          })
          .fromTo(
            ".modal-close",
            {
              display: "none",
              opacity: 0
            },
            {
              opacity: 1,
              ease: Power3.easeInOut,
              duration: DURATION / 2,
              display: "block"
            }
          )
          .from(
            ".modal-description",
            {
              duration: DURATION,
              yPercent: 100,
              opacity: 0,
              ease: Power3.easeInOut
            },
            "<"
          )
          .from(
            ".modal-footer",
            {
              duration: DURATION / 2,
              yPercent: 100,
              opacity: 0,
              transformOrigin: "center bottom",
              ease: Power3.easeInOut
            },
            "<50%"
          )
          .from(
            ".modal-item-info",
            {
              xPercent: -100,
              transformOrigin: "left center",
              ease: Power3.easeInOut,
              duration: DURATION / 2
            },
            "<25%"
          );
        tl.current.play();
      });
      self.add("close", () => {
        tl.current.reverse().then(() => {
          const current = ctx.current;
          if (!current) return;
          setOpenMenu(false);
          current.revert(); // revert timeline to the beginning
        });
      });
    });
    return () => {
      const currentCtx = ctx.current;
      const currentTl = tl.current;
      if (currentCtx) currentCtx.revert();
      if (currentTl) currentTl.kill;
    };
  }, []);
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap
        .timeline({
          paused: true
        })
        .from(".navbar_gsap", {
          delay: 0.3,
          yPercent: 160,
          duration: 0.5
        });
      const scrollTrigger = ScrollTrigger.create({
        trigger: ".navbar_gsap",
        markers: false,
        toggleActions: "play pause none pause",
        animation: tl
      });
      scrollTrigger.disable();
      if (endLoading) {
        scrollTrigger.enable();
        tl.play();
        return () => {
          tl.kill();
        };
      }
      return null;
    });
    return () => ctx.revert();
  }, [endLoading]);
  const menuHandler = useCallback(() => {
    if (!openMenu) {
      setOpenMenu(true);
    } else {
      const current = ctx.current;
      if (current) {
        current["close"]();
      }
    }
  }, [openMenu, ctx]);
  useEffect(() => {
    if (openMenu) {
      const current = ctx.current;
      if (current) current["open"]();
    }
  }, [openMenu]);
  const idTimeout = useRef<NodeJS.Timeout>();
  const scrollToId = useCallback(
    (path: string, id: string | null = null) => {
      safePush(path);
      if (id) {
        lenis?.scrollTo && lenis?.scrollTo(`#${id}`);
      }
    },
    [lenis, safePush]
  );
  const onButtonClick = useCallback(
    (path: string, id?: string) => {
      if (!openMenu) {
        safePush(path);
      } else {
        tl.current.reverse().then(() => {
          setOpenMenu(false);
          idTimeout.current = setTimeout(() => {
            scrollToId(path, id);
          }, 20);
        });
      }
    },
    [openMenu, safePush, scrollToId, idTimeout]
  );
  useEffect(() => {
    return () => {
      if (!!idTimeout.current) clearTimeout(idTimeout.current);
    };
  }, []);
  const pageName = useMemo(() => router.pathname.split("/")[1], [router]);
  return (
    <Modal isOpenExternal={openMenu} menuHandler={menuHandler}>
      <Navbar size="lg" inTopOfScroll={openMenu} className="overflow-hidden">
        <span className="flex flex-row items-center justify-between w-full navbar_gsap">
          <Navbar.Brand>
            <span>
              <Logo href="/" size={64} alt={t("header.logo")} mode="dark" />
            </span>
          </Navbar.Brand>
          <Navbar.Content
            className={twMerge(
              "flex-1 justify-end overflow-hidden",
              GAP_SIZE_LG
            )}
          >
            {!openMenu && <SwitchLang />}
            <span
              className={twMerge(
                "w-[1.4px] bg-gray-200 h-[13px] rotate-[25deg] hidden mdl:block",
                openMenu ? "hidden w-0" : ""
              )}
            />
            <Button
              onPress={() =>
                onButtonClick(pageName !== "contact" ? "/contact" : "/")
              }
              size="sm"
              degree="1"
              className={twMerge(
                "py-2 border-none overflow-hidden",
                "subElement-item hidden sm:block",
                openMenu ? "hidden w-0" : ""
              )}
            >
              {pageName !== "contact" ? t("header.action") : t("header.home")}
            </Button>
            <Button
              onPress={() => scrollToId("/#cases")}
              size="sm"
              degree="1"
              className={twMerge(
                "py-2 border-none overflow-hidden",
                "subElement-item hidden sm:block",
                openMenu ? "hidden w-0" : "",
                StyleAnimation["underline-animation"]
              )}
            >
              {t("header.project")}
            </Button>
            <Modal.Button>
              {({ handler, isOpen }) => {
                return (
                  <>
                    <div
                      className={twMerge(
                        "flex flex-row items-center gap-6 justify-end"
                      )}
                    >
                      <button
                        className="hidden overflow-hidden cursor-pointer xxs:block"
                        onClick={() => handler()}
                        aria-label="menu"
                        aria-haspopup="true"
                      >
                        <p
                          className={text(
                            {
                              size: "xs",
                              degree: "3",
                              weight: "semibold"
                            },
                            "mr-2 hidden",
                            "modal-close"
                          )}
                        >
                          Menu
                        </p>
                      </button>
                      <HamburgerMenu isOpen={isOpen} setOpen={handler} />
                    </div>
                  </>
                );
              }}
            </Modal.Button>
            <Modal.Overlay
              className={twMerge(
                "opacity-0 fixed left-0 top-0 w-full min-h-full bg-primary-500 modal-overlay"
              )}
            >
              {/* <Cursor > */}
              <Modal.Content
                isDismissable
                className={twMerge("body-background modal-content")}
              >
                {({}) => (
                  <div
                    className={twMerge(
                      "flex flex-col justify-between",
                      "min-h-screen w-screen",
                      "py-8 sm:py-12",
                      containerStyle({ size: "lg" })
                    )}
                  >
                    <div className="h-5 xxs:h-0"></div>
                    <div
                      className={twMerge(
                        "flex flex-col sm:flex-row sm:justify-between",
                        "gap-10 sm:gap-0",
                        "items-start sm:items-end md:items-center"
                      )}
                    >
                      <ul
                        className={twMerge(
                          "flex flex-col gap-6 lg:gap-4",
                          "w-full sm:w-8/12"
                        )}
                      >
                        {menuHamburgerItems.map((item, index) => {
                          return (
                            <li
                              key={index}
                              className={twMerge(
                                "flex flex-col items-start",
                                "overflow-hidden"
                              )}
                            >
                              <div
                                className={twMerge(
                                  "flex flex-row justify-start items-start relative cursor-pointer",
                                  "modal-item"
                                )}
                              >
                                <Button
                                  size="auto"
                                  onPress={() => {
                                    onButtonClick(item.link, item.id);
                                  }}
                                  degree="1"
                                  name="menuItem"
                                  className={twMerge(
                                    "capitalize relative text-white-600 bg-black-100 z-10 hover:text-primary-500",
                                    "text-7xl sm:text-8xl mdl:text-9xl lg:text-15xl xl:text-[5rem] font-bold leading-tight tracking-wide transition-colors duration-150"
                                  )}
                                >
                                  {t(
                                    `${BASE_LOCALE_MENU}.${item.id}.attribute`
                                  )}
                                </Button>
                                <span className="overflow-hidden">
                                  {t(`${BASE_LOCALE_MENU}.${item.id}.more`) !==
                                  "null" ? (
                                    <p
                                      className={text(
                                        {
                                          size: "xs",
                                          degree: "4",
                                          weight: "semibold"
                                        },
                                        "absolute overflow-hidden left-[calc(100%_+_4px)] w-full top-[19%] modal-item-info"
                                      )}
                                    >
                                      {t(`${BASE_LOCALE_MENU}.${item.id}.more`)}
                                    </p>
                                  ) : null}
                                </span>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                      <div
                        className={twMerge(
                          "flex flex-col gap-2 xxs:gap-4",
                          "w-full xxs:max-w-[75%] sm:max-w-[32%] mdl:w-min"
                        )}
                      >
                        <span className="overflow-hidden mdl:w-max">
                          <h6
                            className={title(
                              {
                                size: "h6",
                                degree: "2",
                                weight: "bold"
                              },
                              "overflow-hidden tracking-widest uppercase modal-description"
                            )}
                          >
                            {t("header.description.title")}
                          </h6>
                        </span>
                        <span className="mr-1 overflow-hidden w-fit mdl:mr-6">
                          {/* <Text
p
degree="4"
size="xs"
className="overflow-hidden modal-description"
>
{t("header.description.content")}
</Text> */}
                          <p
                            className={text(
                              {
                                size: "xs",
                                degree: "4",
                                weight: "semibold"
                              },
                              "overflow-hidden modal-description"
                            )}
                          >
                            {t("header.description.content")}
                          </p>
                        </span>
                      </div>
                    </div>
                    <div
                      className={twMerge(
                        "flex flex-col xxs:flex-row justify-between items-start xxs:items-end",
                        "gap-2 xxs:gap-0"
                      )}
                    >
                      <div
                        className={twMerge(
                          "flex flex-row justify-start items-center",
                          "order-2 xxs:order-1",
                          "overflow-hidden"
                        )}
                      >
                        <p
                          className={text(
                            {
                              size: "sm",
                              degree: "4",
                              weight: "semibold"
                            },
                            "modal-footer"
                          )}
                        >
                          {t("header.copyright")}
                        </p>
                      </div>
                      <ul
                        className={twMerge(
                          "flex flex-row items-center justify-end order-1 xxs:order-2",
                          GAP_SIZE_XL
                        )}
                      >
                        {menuSocialNetworks.map((item, index) => (
                          <li key={index} className="overflow-hidden">
                            <Link
                              size="sm"
                              href={item.link}
                              degree="4"
                              weight="semibold"
                              className="modal-footer"
                            >
                              {t(`${BASE_LOCALE_SOCIAL}.${item.id}.key`)}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </Modal.Content>
            </Modal.Overlay>
          </Navbar.Content>
        </span>
      </Navbar>
    </Modal>
  );
};
const HeaderMemo = memo(Header);
export default HeaderMemo;
```

---

## File: Layer.tsx

- Path: `/root/git/portfolio_full_stack/components/common/Layer.tsx`
- Size: 1.42 KB
- Extension: .tsx
- Lines of code: 48

```tsx
import dynamic from "next/dynamic";
import { useTranslations } from "next-i18next";
import React, { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import Container from "@/components/ui/container";
import { Cursors as Cursor } from "@/components/ui/cursor";
import { usePreloader } from "@/components/ui/preloader";
const HeaderDynamic = dynamic(() => import("@/components/common/Header"), {});
const FooterDynamic = dynamic(() => import("@/components/common/Footer"), {});
const Layer = ({
  children
}: {
  children: React.ReactElement | React.ReactElement[];
}) => {
  const { endLoading } = usePreloader();
  const { i18n } = useTranslations();
  useEffect(() => {
    if (endLoading) {
      if (!document.body.classList.contains("is-loaded")) {
        document.body.classList.add("is-loaded");
      }
      const timer = setTimeout(() => {
        if (document.body.classList.contains("is-loaded"))
          document.body.classList.remove("is-loaded");
      }, 2000);
      return () => {
        clearTimeout(timer);
      };
    }
    return () => null;
  }, [i18n.language, endLoading]);
  return (
    <Cursor>
      <HeaderDynamic />
      <>{children}</>
      <Container
        data-scroll-section
        as="footer"
        size="lg"
        id="footer"
        className={twMerge("flex flex-col gap-8 xl:gap-12")}
      >
        <FooterDynamic />
      </Container>
    </Cursor>
  );
};
export default Layer;
```

---

## File: Script.tsx

- Path: `/root/git/portfolio_full_stack/components/common/Script.tsx`
- Size: 783.00 B
- Extension: .tsx
- Lines of code: 26

```tsx
import Script from "next/script";
import React from "react";
import { NEXT_PUBLIC_GOOGLE_ANALYTICS_ID } from "utils/env";
const Scripts = () => (
  <>
    <Script
      strategy="afterInteractive"
      src={`https://www.googletagmanager.com/gtag/js?id=${NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
    />
    <Script
      id="gtag"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}', {
page_path: window.location.pathname,
});
`
      }}
    />
  </>
);
export default Scripts;
```

---

## File: SwitchLang.tsx

- Path: `/root/git/portfolio_full_stack/components/common/SwitchLang.tsx`
- Size: 1023.00 B
- Extension: .tsx
- Lines of code: 33

```tsx
import { useRouter } from "next/router";
import React from "react";
import Item from "@/components/ui/animation/Item";
import Button from "@/components/ui/button";
import i18n from "@/utils/i18n";
const langs = ["fr", "en"];
const SwitchLang = () => {
  const router = useRouter();
  const changeLanguage = (lng: React.Key) => {
    router.push(router.pathname, router.asPath, { locale: lng as string });
    i18n.changeLanguage(lng as string);
  };
  return (
    <div className="flex flex-row items-center justify-start gap-12 xxs:gap-8 mdl:gap-6 lg:gap-8">
      {langs.map(l => (
        <span key={l} className="overflow-hidden ">
          <Button
            degree="2"
            size="xs"
            className="uppercase"
            onPress={() => changeLanguage(l)}
            style={{
              color: "inherit"
            }}
          >
            <Item defaultColor="var(--color-white-600)">{l}</Item>
          </Button>
        </span>
      ))}
    </div>
  );
};
export default SwitchLang;
```

---

## File: animation.ts

- Path: `/root/git/portfolio_full_stack/components/ui/animation.ts`
- Size: 416.00 B
- Extension: .ts
- Lines of code: 27

```ts
const duration = {
  medium: 0.3
};
export const variationResizablePanel = {
  initial: {
    opacity: 0,
    y: -20,
    height: 0
  },
  animate: {
    opacity: 1,
    y: 0,
    height: "auto",
    transition: {
      duration: duration.medium / 2,
      delay: duration.medium / 2
    }
  },
  exit: {
    y: -20,
    opacity: 0,
    height: 0,
    transition: {
      duration: duration.medium / 2
    }
  }
};
```

---

## File: conf.ts

- Path: `/root/git/portfolio_full_stack/components/ui/conf.ts`
- Size: 220.00 B
- Extension: .ts
- Lines of code: 11

```ts
export const zIndex = {
  layout_1: `z-0`,
  layout_2: `z-10`,
  layout_3: `z-20`,
  navbar: `z-50`, // to use
  modal: `z-[100]`,
  dropdown: `z-[150]`,
  tooltip: `z-[200]`,
  toast: `z-[250]`,
  popover: `z-[300]`
};
```

---

## File: Lenis.context.tsx

- Path: `/root/git/portfolio_full_stack/lib/Lenis/Lenis.context.tsx`
- Size: 7.33 KB
- Extension: .tsx
- Lines of code: 217

```tsx
import { useFrame } from "@studio-freight/hamo";
import Lenis from "@studio-freight/lenis";
import { useTranslations } from "next-i18next";
import React, {
  ReactElement,
  createContext,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
  ElementRef,
  useCallback
} from "react";
import { twMerge } from "tailwind-merge";
import useResizeObserver from "use-resize-observer";
import { useDebounce } from "@/hook/useDebounce";
import { gsap, ScrollTrigger } from "@/utils/gsap";
import { LenisInstance, CallbackFunction, useRoot } from "./lenis";
interface LenisContextValue {
  lenis: LenisInstance | undefined;
  addCallback: (callback: CallbackFunction, priority: number) => void;
  removeCallback: (callback: CallbackFunction) => void;
}
interface ReactLenisOptions {
  wrapper?: Window | HTMLElement;
  content?: HTMLElement;
  wheelEventsTarget?: Window | HTMLElement;
  eventsTarget?: Window | HTMLElement;
  smoothWheel?: boolean;
  smoothTouch?: boolean;
  syncTouch?: boolean;
  syncTouchLerp?: number;
  __iosNoInertiaSyncTouchLerp?: number;
  touchInertiaMultiplier?: number;
  duration?: number;
  easing?: (t: number) => number;
  lerp?: number;
  infinite?: boolean;
  orientation?: "vertical" | "horizontal";
  gestureOrientation?: "vertical" | "horizontal" | "both";
  touchMultiplier?: number;
  wheelMultiplier?: number;
  normalizeWheel?: boolean;
  autoResize?: boolean;
  isSmooth?: boolean;
  smoothResize?: boolean;
  direction?: "vertical" | "horizontal";
  gestureDirection?: "vertical" | "horizontal" | "both";
}
interface LenisProviderProps {
  root?: boolean;
  options?: ReactLenisOptions;
  autoRaf?: boolean;
  rafPriority?: number;
  className?: string;
  children?: ReactElement;
}
export const LenisContext = createContext<LenisContextValue | undefined>(
  undefined
);
/**
 * Provides the Lenis context for managing Lenis instances and callbacks.
 *
 * @remarks
 * This component is responsible for creating and managing the Lenis instance, as well as handling callbacks and resizing.
 *
 * @param children - The child components to be rendered within the Lenis context.
 * @param root - Specifies whether this is the root Lenis provider.
 * @param options - Additional options for configuring the Lenis instance.
 * @param autoRaf - Specifies whether to automatically call the `raf` method on each frame.
 * @param rafPriority - The priority of the RAF callback.
 * @param className - The CSS class name to be applied to the wrapper element.
 * @param props - Additional props to be spread onto the wrapper element.
 * @param ref - A ref to the Lenis instance.
 * @returns The Lenis context provider component.
 */
const LenisProvider = forwardRef<LenisInstance | undefined, LenisProviderProps>(
  (
    {
      children,
      root = false,
      options = {},
      autoRaf = true,
      rafPriority = 0,
      className,
      ...props
    },
    ref
  ) => {
    const wrapper = useRef<ElementRef<"div">>(null);
    const content = useRef<ElementRef<"div">>(null);
    const { i18n } = useTranslations();
    const [lenis, setLenis] = useState<Lenis>();
    const { width: widthContainer, height: heightContainer } =
      useResizeObserver<HTMLDivElement>({ ref: content });
    const width = useDebounce(widthContainer, 30);
    const height = useDebounce(heightContainer, 30);
    const refresh = useCallback(() => {
      lenis?.resize();
      ScrollTrigger.clearScrollMemory();
      window.history.scrollRestoration = "manual"; // Disable scroll restoration to prevent scroll jumps.
      ScrollTrigger.refresh(); // Refresh the ScrollTrigger plugin.
    }, [lenis]); // Refresh the Lenis instance.
    useEffect(() => {
      if (lenis) {
        refresh();
      }
    }, [lenis, width, height, i18n.language, refresh]); // Refresh the Lenis instance when the width, height, or language changes.
    const callbacks = useRef<
      { callback: CallbackFunction; priority: number }[]
    >([]); // Create a ref for the callbacks.
    const addCallback = useCallback(
      (callback: CallbackFunction, priority: number) => {
        callbacks.current.push({ callback, priority }); // Add the callback to the list of callbacks.
        callbacks.current.sort((a, b) => a.priority - b.priority); // Sort the callbacks by priority.
      },
      []
    );
    const removeCallback = useCallback((callback: CallbackFunction) => {
      callbacks.current = callbacks.current.filter(
        cb => cb.callback !== callback
      ); // Remove the callback from the list of callbacks.
    }, []);
    useImperativeHandle(ref, () => lenis, [lenis]); // Expose the Lenis instance via the ref.
    useResizeObserver<HTMLDivElement>({ ref: content });
    useEffect(() => {
      const lenisInstance = new Lenis({
        ...options,
        ...(!root && {
          wrapper: wrapper.current || undefined,
          content: content.current || undefined
        })
      });
      setLenis(lenisInstance);
      gsap.ticker.add(time => {
        lenisInstance.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
      ScrollTrigger.defaults({
        scroller: wrapper.current
      });
      return () => {
        lenisInstance.destroy();
        setLenis(undefined);
      };
    }, [root, options]);
    useFrame((time: number) => {
      if (autoRaf) {
        lenis?.raf(time);
      }
    }, rafPriority);
    useEffect(() => {
      if (root && lenis) {
        useRoot.setState({
          lenis,
          addCallback,
          removeCallback
        });
      }
    }, [root, lenis, addCallback, removeCallback]);
    const onScroll = useCallback((e: LenisInstance) => {
      const current = callbacks.current;
      if (!current.length) return;
      for (let i = 0; i < callbacks.current.length; i++) {
        const c = current[i];
        c && c.callback(e);
      }
    }, []);
    useEffect(() => {
      lenis?.on("scroll", onScroll);
      return () => {
        lenis?.off("scroll", onScroll);
      };
    }, [lenis, onScroll]);
    const onClassNameChange = useCallback(() => {
      if (wrapper.current) {
        wrapper.current.className = twMerge(lenis?.className, className);
      }
    }, [lenis, className]);
    useEffect(() => {
      onClassNameChange();
      lenis?.on("className change", onClassNameChange);
      return () => {
        lenis?.off("className change", onClassNameChange);
      };
    }, [lenis, onClassNameChange]);
    return (
      <LenisContext.Provider value={{ lenis, addCallback, removeCallback }}>
        {root ? (
          children
        ) : (
          <div
            ref={wrapper}
            className={twMerge(lenis?.className, className)}
            {...props}
          >
            <div ref={content}>
              {children}
              {/* <Scrollbar container={content} /> */}
            </div>
          </div>
        )}
      </LenisContext.Provider>
    );
  }
);
LenisProvider.displayName = "LenisProvider";
export { LenisProvider };
```

---

## File: Lenis.hook.tsx

- Path: `/root/git/portfolio_full_stack/lib/Lenis/Lenis.hook.tsx`
- Size: 828.00 B
- Extension: .tsx
- Lines of code: 26

```tsx
import { useContext, useEffect } from "react";
import { LenisInstance, useRoot } from "./lenis";
import { LenisContext } from "./Lenis.context";
function useCurrentLenis() {
  const local = useContext(LenisContext);
  const root = useRoot();
  return local ?? root;
}
export function useLenis(
  callback?: (lenis: LenisInstance) => void,
  deps = [],
  priority = 0
) {
  const { lenis, addCallback, removeCallback } = useCurrentLenis();
  useEffect(() => {
    if (!callback || !addCallback || !removeCallback || !lenis) return;
    addCallback(callback, priority);
    callback(lenis);
    return () => {
      removeCallback(callback);
    };
  }, [lenis, addCallback, removeCallback, priority, callback, deps]);
  return lenis;
}
useCurrentLenis.displayName = "useCurrentLenis";
useLenis.displayName = "useLenis";
```

---

## File: index.ts

- Path: `/root/git/portfolio_full_stack/lib/Lenis/index.ts`
- Size: 90.00 B
- Extension: .ts
- Lines of code: 2

```ts
export { useLenis } from "./Lenis.hook";
export { LenisProvider } from "./Lenis.context";
```

---

## File: lenis.ts

- Path: `/root/git/portfolio_full_stack/lib/Lenis/lenis.ts`
- Size: 636.00 B
- Extension: .ts
- Lines of code: 15

```ts
import Lenis from "@studio-freight/lenis";
import { create } from "zustand";
export type LenisInstance = Lenis; // This is a placeholder for the actual Lenis instance type.
export type CallbackFunction = (instance: LenisInstance) => void;
interface LenisContextValue {
  lenis: LenisInstance | undefined;
  addCallback: (callback: CallbackFunction, priority: number) => void;
  removeCallback: (callback: CallbackFunction) => void;
}
export const useRoot = create<LenisContextValue>(() => ({
  lenis: undefined,
  addCallback: () => {},
  removeCallback: () => {}
}));
```

---

## File: contact.ts

- Path: `/root/git/portfolio_full_stack/pages/api/contact.ts`
- Size: 2.06 KB
- Extension: .ts
- Lines of code: 90

```ts
import { Client } from "@notionhq/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { NOTION_API_KEY, NOTION_DATABASE_ID } from "utils/env";
const notion = new Client({ auth: NOTION_API_KEY });
type Data =
  | {
      status: "success";
    }
  | {
      status: "error";
      message: string;
    };
const databaseId = NOTION_DATABASE_ID || "";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { firstName, lastName, email, objective, message, locale } = req.body;
  async function addItem() {
    const response = await notion.pages
      .create({
        parent: {
          database_id: databaseId
        },
        properties: {
          Name: {
            title: [
              {
                text: {
                  content: `${firstName} ${lastName}`
                }
              }
            ]
          },
          firstName: {
            rich_text: [
              {
                text: {
                  content: firstName
                }
              }
            ]
          },
          lastName: {
            rich_text: [
              {
                text: {
                  content: lastName
                }
              }
            ]
          },
          email: {
            email: email
          },
          objective: {
            select: {
              name: objective
            }
          },
          message: {
            rich_text: [
              {
                text: {
                  content: message
                }
              }
            ]
          },
          locale: {
            select: {
              name: locale
            }
          }
        }
      })
      .catch(err => {
        throw new Error(err.body);
      });
    return response;
  }
  try {
    await addItem();
    res.status(200).json({ status: "success" });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error back end" });
  }
}
```

---

## File: robots.ts

- Path: `/root/git/portfolio_full_stack/pages/api/robots.ts`
- Size: 346.00 B
- Extension: .ts
- Lines of code: 11

```ts
import { NextApiRequest, NextApiResponse } from "next";
const HandlerRobots = (_: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("Content-Type", "text/plain");
  res.write(`User-agent: *
Disallow: /api/
Allow: /
Sitemap: https://masayagh.com/sitemap.xml
`);
  res.end();
};
export default HandlerRobots;
```

---

## File: ToastRegion.tsx

- Path: `/root/git/portfolio_full_stack/components/common/toast/ToastRegion.tsx`
- Size: 2.32 KB
- Extension: .tsx
- Lines of code: 76

```tsx
import {
  AriaToastProps,
  AriaToastRegionProps,
  useToast,
  useToastRegion
} from "@react-aria/toast";
import { useToastQueue, ToastState } from "@react-stately/toast";
import { motion, AnimatePresence } from "framer-motion";
import React, { useRef } from "react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";
import { ToastItem, toastQueue } from "./addToast";
interface ToastProps extends AriaToastProps<ToastItem> {
  state: ToastState<ToastItem>;
}
interface ToastRegionProps extends AriaToastRegionProps {
  state: ToastState<ToastItem>;
}
const Toast = ({ state, ...props }: ToastProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { toastProps, descriptionProps } = useToast(props, state, ref);
  return (
    <div
      className={twMerge(
        `relative flex flex-row gap-4 items-center p-6 rounded-md bg-black-200 text-gray-300`,
        `border border-gray-900/60`,
        "shadow-md shadow-white-200/5"
      )}
      {...toastProps}
      ref={ref}
    >
      <p
        className="text-sm font-semibold leading-6 tracking-wider capitalize"
        {...descriptionProps}
      >
        {props.toast.content.description}
      </p>
    </div>
  );
};
const ToastRegion = ({ state, ...props }: ToastRegionProps) => {
  const ref = useRef<HTMLUListElement>(null);
  const { regionProps } = useToastRegion(props, state, ref);
  return (
    <ul
      {...regionProps}
      ref={ref}
      className={`fixed bottom-10 right-10 flex flex-col gap-4 z-toast`}
    >
      <AnimatePresence mode="sync">
        {state.visibleToasts.map(toast => (
          <motion.li
            key={toast.key}
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { duration: 0.2 }
            }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className="relative"
          >
            <Toast toast={toast} state={state} />
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
};
export default function GlobalToastRegion(props: AriaToastRegionProps) {
  const state = useToastQueue(toastQueue);
  return state.visibleToasts.length > 0
    ? createPortal(<ToastRegion state={state} {...props} />, document.body)
    : null;
}
```

---

## File: addToast.ts

- Path: `/root/git/portfolio_full_stack/components/common/toast/addToast.ts`
- Size: 760.00 B
- Extension: .ts
- Lines of code: 31

```ts
import { ToastQueue, ToastOptions } from "@react-stately/toast";
type Variant = "neutral" | "informative" | "positive" | "negative";
export interface ToastItem {
  variant: Variant;
  description: string;
  action?: {
    onClick: () => void;
    label: string;
    closeToastAfterAction?: boolean;
  };
}
export const toastQueue = new ToastQueue<ToastItem>({
  maxVisibleToasts: 5
});
export const addToast = (
  toast: ToastItem,
  options?: ToastOptions | undefined
) => {
  if (
    !!toastQueue.visibleToasts.find(
      t => t.content.description === toast.description
    )
  )
    return;
  const key = toastQueue.add(toast, options);
  if (!options?.timeout) {
    setTimeout(() => {
      toastQueue.remove(key);
    }, options?.timeout);
  }
};
```

---

## File: index.ts

- Path: `/root/git/portfolio_full_stack/components/common/toast/index.ts`
- Size: 95.00 B
- Extension: .ts
- Lines of code: 2

```ts
export { default as ToastRegion } from "./ToastRegion";
export { addToast } from "./addToast";
```

---

## File: AgencyList.tsx

- Path: `/root/git/portfolio_full_stack/components/pages/Contact/AgencyList.tsx`
- Size: 2.80 KB
- Extension: .tsx
- Lines of code: 98

```tsx
import React, { memo, useMemo } from "react";
import { useTranslations } from "react-i18next";
import { twMerge } from "tailwind-merge";
import { text, title } from "@/components/ui/typography";
import { getProjectsByCategory } from "@/conf/projects";
const AgencyList = () => {
  const { t } = useTranslations();
  const projects = useMemo(() => getProjectsByCategory("ongoing"), []);
  return (
    <ul
      className={twMerge("flex flex-col gap-0", "border-b border-gray-800/60")}
    >
      {projects.map((project, index) => (
        <li
          key={index}
          className={twMerge(
            "flex flex-col md:flex-row gap-8 md:gap-4 py-10",
            "items-start",
            "border-t border-gray-800/60"
          )}
        >
          <div
            className={twMerge(
              "flex flex-row gap-12 items-start justify-between w-full md:w-5/12 2xl:w-1/2"
            )}
          >
            <h6
              className={title(
                {
                  weight: "semibold",
                  degree: "1"
                },
                "tracking-wider uppercase opacity-80"
              )}
            >
              {t(`projects.${project.id}.title`)}
            </h6>
          </div>
          <div
            className={twMerge(
              "w-full xxs:w-10/12 md:w-7/12 2xl:w-1/2",
              "flex flex-col gap-5"
            )}
          >
            <p
              className={text(
                {
                  size: "sm",
                  weight: "bold",
                  degree: "1"
                },
                "hidden tracking-wider md:block opacity-80"
              )}
            >
              {t(`country.${project.country}`)}
            </p>
            <p
              className={text({
                size: "sm",
                weight: "medium",
                degree: "2"
              })}
            >
              {t(`projects.${project.id}.description`)}
            </p>
            <div
              className="inline"
              style={{
                display: "-webkit-box"
              }}
            >
              {project.jobTitle.map((jobTitle, index) => {
                return (
                  <p
                    key={index}
                    className={text(
                      {
                        size: "sm",
                        weight: "medium",
                        degree: "2"
                      },
                      "pr-2"
                    )}
                  >
                    {t(`jobTItle.${jobTitle}`)}
                    {index < project.jobTitle.length - 1 ? "," : ""}
                  </p>
                );
              })}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
const AgencyListMemo = memo(AgencyList);
export default AgencyListMemo;
```

---

## File: ContactForm.tsx

- Path: `/root/git/portfolio_full_stack/components/pages/Contact/ContactForm.tsx`
- Size: 5.34 KB
- Extension: .tsx
- Lines of code: 179

```tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-i18next";
import React, { useCallback, useMemo } from "react";
import { Input, Button } from "react-aria-components";
import { SubmitHandler, useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { addToast } from "@/components/common/toast";
import { Form, Field, Item, Select } from "@/components/ui/form";
const CONTACT_SUBJECTS = {
  "1": "Project Inquiry",
  "2": "Job Opportunity",
  "3": "Portfolio Feedback",
  "4": "Getting to know Each Other",
  "5": "Say Hello",
  "6": "Other"
} as const;
const ERROR_TRANSLATION_PATH = "form.error";
type ContactSubject = (typeof CONTACT_SUBJECTS)[keyof typeof CONTACT_SUBJECTS];
const contactSubjectValues = Object.values(CONTACT_SUBJECTS);
const contactSubjectItems: {
  key: string;
  text: ContactSubject;
}[] = [
  {
    key: "1",
    text: contactSubjectValues[0] as ContactSubject
  },
  {
    key: "2",
    text: contactSubjectValues[1] as ContactSubject
  },
  {
    key: "3",
    text: contactSubjectValues[2] as ContactSubject
  },
  {
    key: "4",
    text: contactSubjectValues[3] as ContactSubject
  },
  {
    key: "5",
    text: contactSubjectValues[4] as ContactSubject
  },
  {
    key: "6",
    text: contactSubjectValues[5] as ContactSubject
  }
];
const ContactForm = () => {
  const { t, i18n } = useTranslations();
  const required = useCallback(
    () =>
      z
        .string({ required_error: t(`${ERROR_TRANSLATION_PATH}.required`) })
        .nonempty(t(`${ERROR_TRANSLATION_PATH}.required`)),
    [t]
  );
  const createZodString = useCallback(
    (min: number, max: number) =>
      z
        .string({ required_error: t(`${ERROR_TRANSLATION_PATH}.required`) })
        .nonempty(t(`${ERROR_TRANSLATION_PATH}.required`))
        .min(min, t(`${ERROR_TRANSLATION_PATH}.minLength`, { min }))
        .max(max, t(`${ERROR_TRANSLATION_PATH}.maxLength`, { max }))
        .regex(/^[a-zA-Z\s]+$/, t(`${ERROR_TRANSLATION_PATH}.pattern`)),
    [t]
  );
  const contactFormDataSchema = useMemo(
    () =>
      z.object({
        firstName: createZodString(2, 50),
        lastName: createZodString(2, 50),
        email: required().email(t(`${ERROR_TRANSLATION_PATH}.email`)),
        objective: z.string().nonempty(t(`${ERROR_TRANSLATION_PATH}.required`)),
        message: required()
          .min(10, {
            message: t(`${ERROR_TRANSLATION_PATH}.minLength`, { min: 10 })
          })
          .max(500, {
            message: t(`${ERROR_TRANSLATION_PATH}.maxLength`, { max: 500 })
          })
          .nonempty()
      }),
    [required, t, createZodString]
  );
  type FormContact = z.infer<typeof contactFormDataSchema>;
  const successMessage = useMemo(() => t("form.notification.success"), [t]);
  const errorMessage = useMemo(() => t("form.notification.error"), [t]);
  const methods = useForm<FormContact>({
    resolver: zodResolver(contactFormDataSchema)
  });
  const onSubmitForm: SubmitHandler<FormContact> = async data => {
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...data, locale: i18n.language })
      });
      addToast(
        {
          variant: "positive",
          description: successMessage
        },
        {
          timeout: 10000
        }
      );
    } catch (err) {
      addToast(
        {
          variant: "negative",
          description: errorMessage
        },
        {
          timeout: 10000
        }
      );
    }
  };
  return (
    <Form<FormContact>
      className="grid grid-cols-12 gap-4"
      methods={methods}
      onSubmit={methods.handleSubmit(onSubmitForm)}
    >
      <Field
        width="col-span-12 mdl:col-span-6"
        name="firstName"
        label={t("form.field.firstName.label")}
      >
        <Input placeholder={t("form.field.firstName.placeholder")} />
      </Field>
      <Field
        width="col-span-12 mdl:col-span-6"
        name="lastName"
        label={t("form.field.lastName.label")}
      >
        <Input placeholder={t("form.field.lastName.placeholder")} />
      </Field>
      <Field name="email" inputMode="email" label={t("form.field.email.label")}>
        <Input placeholder={t("form.field.email.placeholder")} />
      </Field>
      <Select
        name="objective"
        label={t("form.field.objective.label")}
        placeholder={t("form.field.objective.placeholder")}
        items={contactSubjectItems}
        defaultSelectedKey={"1"}
      >
        {(item: { key: string; text: string }) => {
          return (
            <Item key={item.key} id={item.text}>
              {t(`form.field.objective.options.${item.key}`)}
            </Item>
          );
        }}
      </Select>
      <Field name="message" label={t("form.field.message.label")}>
        <textarea placeholder={t("form.field.message.placeholder")} />
      </Field>
      <Button
        className={twMerge(
          "text-xs md:text-sm",
          "px-10 py-4 w=full bg-white-100 font-semibold",
          "rounded-sm",
          "col-span-12 w-1/2 xxs:w-5/12 sm:w-4/12 md:w-3/12 place-self-end"
        )}
        isDisabled={methods.formState.isSubmitting ? true : false}
        type="submit"
      >
        {t("form.field.submit.label")}
      </Button>
    </Form>
  );
};
export default ContactForm;
```

---

## File: Index.tsx

- Path: `/root/git/portfolio_full_stack/components/pages/Contact/Index.tsx`
- Size: 7.11 KB
- Extension: .tsx
- Lines of code: 220

```tsx
import { useTranslations } from "next-i18next";
import React, { useMemo, ElementRef, useRef } from "react";
import { useIsomorphicLayoutEffect } from "react-use";
import { twMerge } from "tailwind-merge";
import Container from "@/components/ui/container";
import { text, Link, display } from "@/components/ui/typography";
import { getMenuItems } from "@/conf/router";
import { useTime } from "@/hook";
import { gsap } from "@/utils/gsap";
import AgencyList from "./AgencyList";
import ContactForm from "./ContactForm";
const ContactPage = () => {
  const { t } = useTranslations();
  const contactRef = useRef<ElementRef<"div">>(null);
  const socialNetworkItems = useMemo(() => getMenuItems("socialNetworks"), []);
  const timer = useTime({
    city: "Casablanca",
    country: "Africa",
    format: "HH:mm"
  });
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: "#contact",
            start: "top 60%",
            toggleActions: "play play restart play",
            markers: false
          }
        })
        .from(".splitText_gsap", {
          yPercent: 220,
          skewY: 7,
          duration: 1.2,
          ease: "Power4.easeOut",
          delay: 0.2
        });
      return () => tl.kill();
    });
    return () => ctx.revert();
  }, []);
  return (
    <div ref={contactRef}>
      <Container
        as="section"
        size="lg"
        data-scroll-section
        id="contact"
        className={twMerge("flex flex-col gap-12", "items-stretch")}
      >
        <section className={twMerge("flex flex-col gap-14 xl:gap-20 py-40")}>
          {/* title */}
          <div className="grid grid-cols-12 gap-4 overflow-hidden">
            <h1
              className={display(
                {
                  size: "xl",
                  weight: "bold"
                },
                "col-start-1 col-span-12",
                "mdl:col-start-4 mdl:col-span-9",
                "lg:col-start-3 lg:col-span-10",
                "splitText_gsap"
              )}
            >
              {t("contact.title")}
            </h1>
          </div>
          {/* form */}
          <div
            className={twMerge(
              "grid grid-cols-12 gap-y-10 gap-x-0 xxs:gap-8 sm:gap-3 md:gap-8 mdl:gap-4 xl:gap-8",
              "grid-rows-[repeat(3,_minmax(0,_auto))] xxs:grid-rows-[repeat(2,_minmax(0,_auto))] sm:grid-rows-2"
            )}
          >
            <div
              className={twMerge(
                "flex flex-col gap-3",
                "col-start-1 col-span-12",
                "xxs:col-start-1 xxs:col-span-4",
                "sm:col-start-10 sm:col-span-3",
                "mdl:col-start-1 mdl:col-span-2",
                "row-start-1 row-span-1"
              )}
            >
              <p
                className={text(
                  {
                    size: "sm",
                    weight: "medium",
                    degree: "2"
                  },
                  "uppercase text-start"
                )}
              >
                {t("contact.subtitle")}
              </p>
              <hr className="relative h-[2px] w-4 bg-gray-200" />
            </div>
            <div
              className={twMerge(
                "col-start-1 col-span-12",
                "xxs:col-start-1 xxs:col-span-12",
                "xs:col-start-1 xs:col-span-11",
                "sm:col-start-1 sm:col-span-9",
                "mdl:col-start-4 mdl:col-span-9",
                "lg:col-start-3 lg:col-span-9",
                "xl:col-start-3 xl:col-span-8",
                "row-start-3 row-span-1",
                "xxs:row-start-2 xxs:row-span-1",
                "sm:row-start-1 sm:row-span-2"
              )}
            >
              <ContactForm />
            </div>
            <div
              className={twMerge(
                "flex flex-col sm:justify-end items-start xl:items-end",
                "col-start-1 col-span-12",
                "xxs:col-start-8 xxs:col-span-4",
                "sm:col-start-10 sm:col-span-3",
                "mdl:col-start-1 mdl:col-span-3",
                "lg:col-start-1 lg:col-span-2",
                "xl:col-start-11 xl:col-span-2",
                "row-start-2 row-span-1",
                "xxs:row-start-1 xxs:row-span-1",
                "sm:row-start-2 sm:row-span-1"
              )}
            >
              <div className="flex flex-col gap-1">
                <p
                  className={text({
                    size: "sm",
                    degree: "2",
                    weight: "medium"
                  })}
                  suppressHydrationWarning
                >
                  {t("contact.localTime")} {timer?.formattedTime}
                </p>
                <p
                  className={text({
                    size: "sm",
                    degree: "2",
                    weight: "medium"
                  })}
                  suppressHydrationWarning
                >
                  {t("contact.gmtTime")}({timer?.gmtOffset})
                </p>
              </div>
            </div>
          </div>
          <span className="h-6 md:h-10"></span>
          {/* repped */}
          <div
            className={twMerge("grid grid-cols-12 gap-x-0 gap-y-8 xs:gap-8")}
          >
            <div
              className={twMerge(
                "flex flex-col",
                "gap-3",
                "col-start-1 col-span-12",
                "sm:col-start-1 sm:col-span-2"
              )}
            >
              <p
                className={text(
                  {
                    size: "sm",
                    degree: "2",
                    weight: "medium"
                  },
                  "uppercase text-start"
                )}
              >
                {t("contact.reppedBy")}
              </p>
              <hr className="relative h-[2px] w-4 bg-gray-200" />
            </div>
            <div
              className={twMerge(
                "col-start-1 col-span-12",
                "xs:col-start-1 xs:col-span-11",
                "sn:col-start-1 sm:col-span-9",
                "mdl:col-start-3 mdl:col-span-8",
                "lg:col-start-3 lg:col-span-7",
                "xl:col-start-3 xl:col-span-6"
              )}
            >
              <AgencyList />
            </div>
            <div
              className={twMerge(
                "flex flex-row flex-wrap sm:flex-col gap-x-10 xs:gap-x-12 gap-y-4 sm:gap-4 justify-start xs:justify-end items-end",
                "col-start-1 col-span-12",
                "xs:col-start-1 xs:col-span-11",
                "sm:col-start-11 sm:col-span-2"
              )}
            >
              {socialNetworkItems.map((item, index) => (
                <Link
                  key={index}
                  weight="medium"
                  href={item.link}
                  size="sm"
                  degree="2"
                >
                  {t(`socialNetwork.${item.id}.name`)}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
};
export default ContactPage;
```

---

## File: Action.tsx

- Path: `/root/git/portfolio_full_stack/components/pages/home/Action.tsx`
- Size: 2.25 KB
- Extension: .tsx
- Lines of code: 80

```tsx
import { useTranslations } from "next-i18next";
import React from "react";
import { twMerge } from "tailwind-merge";
import Button from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { text } from "@/components/ui/typography";
import useRouterChange from "@/hook/SafePush";
const Action = () => {
  const { safePush } = useRouterChange();
  const { t } = useTranslations();
  const goToContact = () => {
    safePush("/contact");
  };
  return (
    <>
      <div
        data-scroll
        className={twMerge(
          "flex flex-col md:flex-row justify-between items-start md:items-end",
          "gap-8 md:gap-0",
          "py-12"
        )}
      >
        <div
          className={twMerge(
            "w-auto flex flex-row items-center justify-start",
            "order-2 md:order-1"
          )}
        >
          <Button
            size="sm"
            className="px-6 py-4 border rounded-full"
            degree="2"
            onPress={goToContact}
          >
            {t("motivation.action")}
          </Button>
          <Button
            className="p-4 border rounded-full"
            title={t("motivation.action")}
            name="button action icon"
            onPress={goToContact}
            aria-label="button action icon"
          >
            <Icon
              name="IconArrowUpRight"
              size="22"
              className="stroke-white-100 stroke-[1.2px] lg:stroke-[2px]"
            />
          </Button>
        </div>
        <div
          className={twMerge(
            "flex flex-col sm:flex-row md:flex-col gap-4 sm:gap-16 md:gap-4",
            "w-full xxs:w-11/12 xs:w-10/12 sm:w-full md:w-6/12 lg:w-5/12 xl:w-4/12",
            "order-1 md:order-2"
          )}
        >
          <p
            className={text(
              { size: "md", degree: "3", weight: "semibold" },
              "w-full sm:w-1/2 md:w-full"
            )}
          >
            {t("motivation.content.1")}
          </p>
          <p
            className={text(
              { size: "md", degree: "3", weight: "semibold" },
              "w-full sm:w-1/2 md:w-full"
            )}
          >
            {t("motivation.content.2")}
          </p>
        </div>
      </div>
    </>
  );
};
export default Action;
```

---

## File: ActionContact.tsx

- Path: `/root/git/portfolio_full_stack/components/pages/home/ActionContact.tsx`
- Size: 4.46 KB
- Extension: .tsx
- Lines of code: 162

```tsx
import { useTranslations } from "next-i18next";
import React, { useRef } from "react";
import { useIsomorphicLayoutEffect } from "react-use";
import { twMerge } from "tailwind-merge";
import { CursorContent } from "@/components/ui/cursor";
import { Icon } from "@/components/ui/icon";
import { display, Link, text } from "@/components/ui/typography";
import { useLenis } from "@/lib/Lenis";
import { gsap } from "@/utils/gsap";
const CLASS_GSAP = {
  title: "contact-title-gsap",
  quota: "contact_quota_gsap",
  arrow: "contact-arrow-gsap"
};
const Action = () => {
  const { t, i18n } = useTranslations();
  const refContainer = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap
        .timeline({
          paused: true,
          scrollTrigger: {
            trigger: refContainer.current,
            scrub: true,
            start: "top center",
            end: "top top",
            toggleActions: "play pause reverse reverse",
            invalidateOnRefresh: true
          }
        })
        .fromTo(
          CLASS_GSAP.title,
          {
            yPercent: -100
          },
          {
            yPercent: 0,
            duration: 1,
            stagger: 0.4,
            ease: "Power3.easeOut"
          }
        )
        .fromTo(
          ".contact_quota_gsap",
          {
            opacity: 0,
            left: "-100%"
          },
          {
            opacity: 1,
            left: "0%"
          },
          "-=0.7"
        )
        .fromTo(
          ".contact-arrow-gsap",
          {
            opacity: 0,
            xPercent: -50
          },
          {
            xPercent: 0,
            duration: 0.5,
            opacity: 1,
            ease: "elastic.out(1, 0.6)"
          },
          "-=0.2"
        );
      return () => {
        tl.kill();
      };
    }, refContainer);
    return () => {
      ctx.revert();
    };
  }, [refContainer.current, lenis]);
  return (
    <div
      ref={refContainer}
      className={twMerge(
        "h-[64vh] flex flex-col gap-1 xs:gap-2 sm:gap-6",
        "justify-center items-start xs:items-center place-content-start"
      )}
    >
      <span className="overflow-hidden">
        <h1
          className={display(
            {
              size: "lg",
              weight: "bold"
            },
            "uppercase text-start xs:text-center",
            "contact-title-gsap will-change-transform-animation"
          )}
        >
          {t("contactCall.title")}
        </h1>
      </span>
      <div className="relative flex flex-row items-start justify-start xs:justify-center">
        <div
          className={twMerge(
            "absolute hidden xxs:block",
            "left-[103%] xs:right-[103%] rotate-180	xs:rotate-0",
            "right-auto xs:left-auto xs:top-1 will-change-transform-animation contact-arrow-gsap"
          )}
        >
          <Icon
            name="IconArrowBigRightFilled"
            className="w-[2.8rem] xs:w-12 md:w-14 lg:w-16 xl:w-20 [&>*]:fill-primary-400"
          />
        </div>
        <CursorContent
          name="CursorActionIconContactAction"
          component="CursorActionIcon"
          props={{
            degree: -45,
            iconName: "IconArrowUpRight"
          }}
          className="overflow-hidden"
        >
          <Link href="/contact">
            <h1
              className={display(
                {
                  size: "lg",
                  weight: "bold"
                },
                "whitespace-nowrap-important uppercase text-primary-400",
                "contact-title-gsap will-change-transform-animation"
              )}
            >
              {t("contactCall.action")}
            </h1>
          </Link>
        </CursorContent>
        <p
          className={text(
            {
              size: i18n.language == "en" ? "xxs" : "xs",
              degree: "3",
              weight: "medium"
            },
            "absolute left-[-1.5%] xs:left-auto sm:left-[103%]",
            "top-[100%] sm:top-[-6px]",
            "xs:right-[-1%] md:right-auto", // right
            "mt-3 xl:mt-4", // margin top
            "ml-2",
            i18n.language == "en"
              ? "w-32 xl:w-40 4xl:w-52"
              : "w-36 xl:w-46 4xl:w-52", // width
            "text-start xs:text-end sm:text-start"
          )}
        >
          {t("contactCall.description")}
        </p>
      </div>
    </div>
  );
};
export default Action;
```

---

## File: Cases.tsx

- Path: `/root/git/portfolio_full_stack/components/pages/home/Cases.tsx`
- Size: 7.34 KB
- Extension: .tsx
- Lines of code: 271

```tsx
import { useTranslations } from "next-i18next";
import React, { ElementRef, useMemo, useRef, memo } from "react";
import { useIsomorphicLayoutEffect } from "react-use";
import { twMerge } from "tailwind-merge";
import Image from "@/components/ui/image";
import { text, title } from "@/components/ui/typography";
import { getProjectsByCategory } from "@/conf/projects";
import { useLenis } from "@/lib/Lenis";
import { gsap, Power4, ScrollTrigger } from "@/utils/gsap";
const Case = ({
  picture,
  index,
  id
}: {
  picture?: [string];
  index: number;
  id: string;
}) => {
  const container = useRef<ElementRef<"div">>(null);
  const { t } = useTranslations();
  const lenis = useLenis();
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl2: gsap.core.Timeline = gsap
        .timeline({
          paused: true
        })
        .to(".fixed-gsap", {
          ease: "none"
        });
      const isTouchDevice =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;
      ScrollTrigger.create({
        animation: tl2,
        pin: true,
        pinnedContainer: container.current,
        trigger: container.current,
        scrub: true,
        pinType: isTouchDevice ? undefined : "fixed",
        start: "top top",
        end: index < 2 ? "bottom top" : "bottom bottom",
        toggleActions: "play pause reverse pause",
        invalidateOnRefresh: true
      });
      const tl = gsap.timeline({
        paused: true
      });
      tl.fromTo(
        ".image-gsap",
        {
          scale: 1
        },
        {
          scale: 1.3,
          transformOrigin: "center 10%",
          ease: "Power3.easeIn"
        }
      )
        .fromTo(
          ".image-gsap",
          {
            backgroundPosition: "center 20%"
          },
          {
            backgroundPosition: "center 80%",
            ease: "Power3.easeOut"
          },
          0
        )
        .fromTo(
          ".image-gsap",
          {
            filter: "blur(0px)"
          },
          {
            filter: "blur(10px)",
            ease: "Power4.easeIn"
          },
          "<"
        );
      ScrollTrigger.create({
        animation: tl,
        trigger: container.current,
        scrub: true,
        start: "top top",
        end: "bottom top",
        invalidateOnRefresh: true
      });
      const tlCase = gsap
        .timeline({
          paused: true,
          scrollTrigger: {
            trigger: container.current,
            start: "top bottom-=35%",
            end: "bottom center",
            markers: false,
            toggleActions: "play none play none",
            invalidateOnRefresh: true
          }
        })
        .fromTo(
          ".case-text-gsap",
          {
            xPercent: -100,
            opacity: 0
          },
          {
            xPercent: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: Power4.easeInOut
          }
        );
      return () => {
        tl.kill();
        tl2?.kill();
        tlCase.kill();
      };
    }, container);
    return () => {
      ctx.revert();
    };
  }, [container, lenis, picture, index, id]);
  const zIndexContainer = useMemo(() => 10 + (index + 10), [index]);
  const zIndexImage = useMemo(() => 10 + (index + 11), [index]);
  const zIndexContent = useMemo(() => 10 + (index + 14), [index]);
  const zIndexGradient = useMemo(() => 10 + (index + 13), [index]);
  const name = useMemo(() => t(`projects.${id}.title`), [t, id]);
  const description = useMemo(() => t(`projects.${id}.description`), [t, id]);
  const pic = useMemo<string>(() => (picture ? picture[0] : ""), [picture]);
  return (
    <div
      data-scroll
      className={twMerge(
        "relative h-[110vh] xxs:h-[120vh] sm:h-[140vh] overflow-hidden will-change-transform-animation"
      )}
      ref={container}
      style={{
        zIndex: zIndexContainer
      }}
    >
      <div className="absolute inset-x-0 top-0 w-full h-screen fixed-gsap">
        <Image
          src={pic}
          alt={description}
          className="object-cover h-screen image-gsap"
          priority={false}
          loading="lazy"
          sizes="100vw"
          width="6000"
          height="4500"
          style={{
            zIndex: zIndexImage
          }}
        />
      </div>
      <div className="absolute inset-x-0 top-0 w-full h-screen min-h-screen bg-no-repeat bg-cover fixed-gsap">
        <div
          data-scroll
          data-scroll-speed="3"
          className={twMerge(
            "relative w-fit flex flex-col justify-end h-full",
            "px-5 xs:px-10 lg:px-24 py-32 xs:py-24 mdl:py-32",
            "gap-2 xs:gap-4 content-gsap will-change-transform-animation"
          )}
          style={{
            zIndex: zIndexContent
          }}
        >
          <div className="w-full overflow-hidden">
            {/* <Title h1 degree='1' className='case-text-gsap will-change-transform-animation' >
{name}
</Title> */}
            <h1
              className={title(
                {
                  size: "h1",
                  degree: "1"
                },
                "case-text-gsap will-change-transform-animation"
              )}
            >
              {name}
            </h1>
          </div>
          <div className="hidden w-full overflow-hidden xs:w-8/12 md:w-1/2 sm:block">
            <p
              className={text(
                {
                  size: "md",
                  degree: "2"
                },
                "case-text-gsap will-change-transform-animation"
              )}
            >
              {description}
            </p>
          </div>
        </div>
        <div
          className={twMerge(
            "absolute inset-x-0 w-full h-80 -bottom-2 xs:h-72",
            "bg-gradient-to-t from-black-100/80 to-black-100/0"
          )}
          style={{
            zIndex: zIndexGradient
          }}
        ></div>
      </div>
    </div>
  );
};
const CaseHead = () => {
  const { t } = useTranslations();
  return (
    <>
      <h2
        className={title(
          {
            size: "h2",
            weight: "bold",
            degree: "2"
          },
          "sm:w-min"
        )}
      >
        {t("cases.title")}
      </h2>
      <div className="w-full xs:w-9/12 sm:w-7/12 md:w-6/12 lg:w-5/12 xl:w-4/12">
        <p
          className={text(
            {
              size: "md",
              degree: "3",
              weight: "semibold"
            },
            "w-auto max-w-[38rem] sm:max-w-xl my-2 md:my-4"
          )}
        >
          {t("cases.description")}
        </p>
      </div>
    </>
  );
};
const CaseHeadMemo = memo(CaseHead);
const Cases = () => {
  const projectsImported = useMemo(() => getProjectsByCategory("best"), []);
  return (
    <div className="flex flex-col w-full gap-14 sm:gap-12 h-fit">
      <div
        data-scroll
        className="flex flex-col items-start justify-between w-full gap-2 sm:flex-row sm:items-end sm:gap-12"
      >
        <CaseHeadMemo />
      </div>
      <div className="flex flex-col w-full gap-0 overflow-hidden h-fit rounded-2xl">
        {projectsImported.map((project, index) => (
          <Case
            key={project.id}
            picture={project?.picture}
            index={index}
            id={project.id}
          />
        ))}
      </div>
    </div>
  );
};
export default Cases;
```

---

## File: Expertise.tsx

- Path: `/root/git/portfolio_full_stack/components/pages/home/Expertise.tsx`
- Size: 13.31 KB
- Extension: .tsx
- Lines of code: 299

```tsx
import { useTranslations } from "next-i18next";
import React, { memo, useRef } from "react";
import { useHover } from "react-aria";
import { useMedia } from "react-use";
import { twMerge } from "tailwind-merge";
import { rounded } from "@/components/style";
import Noise from "@/components/ui/noise/Noise";
import { title, text } from "@/components/ui/typography/Typography";
import useGsap from "@/hook/useGsap";
import { useLenis } from "@/lib/Lenis";
import { gsap } from "@/utils/gsap";
const Icon = () => (
  <svg
    width="60"
    height="60"
    viewBox="0 0 60 60"
    fill="none"
    className="pr-px size-12 lg:size-16 stroke-gray-400 xs:pr-1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M60 23.8709C60 10.9849 49.5198 0.5 36.6401 0.5C35.7469 0.5 34.8553 0.551619 33.9668 0.654857C33.0768 0.756531 32.1977 0.909823 31.3265 1.11317C30.4552 1.31808 29.5996 1.57148 28.758 1.87338C27.9165 2.17527 27.0937 2.52565 26.2928 2.92296C25.4904 3.31871 24.7145 3.76138 23.9637 4.24785C23.2129 4.73275 22.4918 5.26146 21.802 5.83083C21.1122 6.39864 20.4567 7.00555 19.8358 7.65157C19.2148 8.29603 18.6344 8.97333 18.0917 9.68505C15.4982 11.2289 13.2848 13.1983 11.4516 15.5946C10.5835 16.1108 9.75129 16.6786 8.95667 17.3012C8.16205 17.9237 7.41123 18.5964 6.70421 19.3159C5.99718 20.0354 5.33865 20.7988 4.73017 21.6043C4.1217 22.4099 3.5664 23.2499 3.06742 24.1274C2.56687 25.0049 2.12576 25.9106 1.7441 26.8444C1.36086 27.7798 1.0402 28.734 0.782105 29.7101C0.522446 30.6861 0.328484 31.6747 0.197091 32.6758C0.067261 33.6769 0.00156451 34.6827 0 35.6932C0 48.5792 10.4802 59.0625 23.3599 59.0625C24.2547 59.0625 25.1447 59.0109 26.0347 58.9092C26.9232 58.806 27.8023 58.6527 28.6735 58.4493C29.5448 58.246 30.4004 57.9926 31.242 57.6891C32.0835 57.3872 32.9063 57.0384 33.7072 56.6411C34.5096 56.2438 35.2855 55.8027 36.0363 55.3162C36.7871 54.8297 37.5082 54.3026 38.198 53.7332C38.8878 53.1639 39.5433 52.5569 40.1642 51.9125C40.7852 51.268 41.3656 50.5892 41.9083 49.8774C44.5002 48.3336 46.7136 46.3642 48.5484 43.9679C49.4165 43.4532 50.2487 42.8839 51.0433 42.2613C51.8379 41.6387 52.5888 40.9677 53.2958 40.2466C54.0028 39.5271 54.6614 38.7637 55.2698 37.9597C55.8783 37.1542 56.4336 36.3126 56.9326 35.4351C57.4331 34.5576 57.8742 33.6519 58.2559 32.7181C58.6391 31.7842 58.9598 30.8285 59.2179 29.8524C59.4776 28.8764 59.6715 27.8878 59.8029 26.8867C59.9327 25.8856 59.9984 24.8798 60 23.8709ZM17.2063 10.9192C16.626 11.7889 16.1067 12.693 15.6468 13.6331C14.6645 13.9788 13.7087 14.3871 12.7796 14.861C14.0842 13.3547 15.5608 12.0407 17.2063 10.9192ZM36.6338 46.6708C24.0669 46.6708 13.8417 36.4409 13.8417 23.8677C13.8417 22.1768 14.0278 20.5063 14.4017 18.856C14.774 17.2058 15.3246 15.6181 16.0535 14.0914C18.4233 13.2874 20.8588 12.887 23.3599 12.8901C35.9252 12.8901 46.152 23.1185 46.152 35.6932C46.1536 37.3841 45.9675 39.0562 45.5952 40.7065C45.2229 42.3567 44.6739 43.946 43.9449 45.4726C41.5767 46.2766 39.1412 46.6755 36.6401 46.6739L36.6338 46.6708ZM43.582 46.1812C42.9861 47.3278 42.2978 48.4149 41.5173 49.4442C39.7716 50.4734 37.9212 51.254 35.9643 51.7873C34.0091 52.3192 32.0178 52.5851 29.9922 52.582C17.4237 52.582 7.20006 42.3536 7.20006 29.7789C7.1985 28.5463 7.29704 27.32 7.4957 26.103C7.69435 24.886 7.98999 23.6926 8.38417 22.5225C8.77679 21.3541 9.26169 20.2247 9.83889 19.1344C10.4176 18.0442 11.0793 17.0087 11.8254 16.0264C12.9345 15.3725 14.092 14.8172 15.2964 14.3605C13.9449 17.3857 13.2708 20.5532 13.2723 23.8662C13.2723 36.7522 23.7525 47.2371 36.6323 47.2371C39.0052 47.2402 41.3249 46.8882 43.5899 46.1828L43.582 46.1812ZM46.7105 35.6901C46.7105 22.8041 36.2303 12.3192 23.3505 12.3192C20.9808 12.3176 18.6657 12.6696 16.4023 13.375C16.9998 12.23 17.6881 11.1413 18.4671 10.1121C20.2127 9.08283 22.0648 8.30228 24.02 7.77045C25.9753 7.23706 27.9665 6.9727 29.9922 6.97583C42.559 6.97583 52.7843 17.2042 52.7843 29.7773C52.7859 31.0099 52.6873 32.2363 52.4887 33.4532C52.29 34.6718 51.9944 35.8652 51.6018 37.0337C51.2076 38.2037 50.7227 39.3331 50.1455 40.4234C49.5683 41.5136 48.9051 42.5491 48.1589 43.5314C47.0499 44.1853 45.8924 44.739 44.6879 45.1958C46.041 42.1737 46.7183 39.0062 46.7183 35.6932L46.7105 35.6901ZM23.3599 58.4947C10.7915 58.4947 0.567809 48.2647 0.567809 35.6932C0.567809 34.7656 0.62412 33.8427 0.736743 32.9214C0.849366 32.0016 1.0183 31.0928 1.24198 30.1934C1.46567 29.2924 1.74409 28.4102 2.07414 27.5452C2.40576 26.6786 2.78899 25.8371 3.22384 25.0174C3.65712 24.1994 4.1389 23.4094 4.66917 22.6492C5.19944 21.889 5.77507 21.1648 6.39293 20.475C7.01236 19.7852 7.67089 19.1344 8.36853 18.526C9.06617 17.9159 9.79978 17.3512 10.5662 16.8304C9.28359 18.7465 8.30909 20.8066 7.63961 23.0137C6.97169 25.2192 6.63851 27.4748 6.64164 29.7805C6.64164 42.6664 17.1203 53.1513 30 53.1513C31.8395 53.1529 33.6524 52.9402 35.4419 52.51C37.2298 52.0814 38.9426 51.4495 40.5819 50.6126C40.0485 51.2289 39.4854 51.8155 38.8894 52.3724C38.295 52.9277 37.6709 53.4501 37.0202 53.9397C36.3679 54.4293 35.6922 54.8814 34.993 55.2974C34.2922 55.7151 33.5727 56.0921 32.8312 56.4315C32.0898 56.7709 31.3343 57.0681 30.56 57.3262C29.7873 57.5843 29.0036 57.8002 28.2074 57.9738C27.4112 58.1474 26.6072 58.2773 25.797 58.3649C24.9867 58.4525 24.1749 58.4947 23.3599 58.4947ZM42.7859 48.6417C43.3677 47.7736 43.8871 46.8679 44.3454 45.9278C45.3324 45.5837 46.2897 45.1754 47.2204 44.7015C45.9158 46.2078 44.4392 47.5202 42.7937 48.6417H42.7859ZM49.4275 42.7321C50.7086 40.816 51.6847 38.7543 52.3526 36.5488C53.0205 34.3417 53.3537 32.0861 53.3521 29.7805C53.3521 16.8945 42.8735 6.41272 29.9922 6.41272C28.1542 6.40959 26.3397 6.62232 24.5519 7.05248C22.7624 7.48107 21.0496 8.11301 19.4119 8.94987C19.9437 8.33357 20.5084 7.74699 21.1043 7.19013C21.7003 6.63327 22.3244 6.11082 22.9751 5.62123C23.6274 5.13163 24.3047 4.67957 25.0039 4.26193C25.7047 3.84585 26.4258 3.46887 27.1672 3.12944C27.9087 2.79 28.6657 2.49124 29.4384 2.23471C30.2112 1.97662 30.9964 1.76075 31.7926 1.58713C32.5888 1.41506 33.3928 1.28367 34.203 1.19764C35.0133 1.11004 35.8251 1.06781 36.6401 1.06781C49.2054 1.06781 59.4322 11.2962 59.4322 23.8709C59.4322 24.7969 59.3759 25.7213 59.2633 26.6411C59.1506 27.5609 58.9817 28.4712 58.758 29.3706C58.5343 30.2701 58.2559 31.1523 57.9259 32.0189C57.5942 32.8839 57.211 33.7254 56.7777 34.5451C56.3429 35.3631 55.8611 36.1531 55.3308 36.9133C54.8006 37.6735 54.2249 38.3977 53.6071 39.0891C52.9876 39.7789 52.3291 40.4281 51.6315 41.0381C50.9338 41.6466 50.2002 42.2113 49.4338 42.7321H49.4275Z"
      fill="var(--color-gray-100)"
    />
  </svg>
);
const IconMemo = memo(Icon);
const ExpertiseHead = () => {
  const { t } = useTranslations();
  return (
    <div
      className={twMerge(
        "flex flex-col sm:flex-row gap-5 sm:gap-0 items-start sm:items-end justify-between",
        "w-full"
      )}
    >
      <div className="block sm:hidden">
        <IconMemo />
      </div>
      <div className={twMerge("w-full xs:w-9/12 sm:w-1/2 xl:w-5/12")}>
        <h2
          className={title(
            {
              weight: "bold",
              degree: "1",
              size: "h2",
              mode: "exchanged"
            },
            "capitalize"
          )}
        >
          {t("experience.title")}
        </h2>
      </div>
      <div
        className={twMerge(
          "w-11/12 xs:w-10/12 sm:w-1/2 xl:w-5/12",
          "flex flex-col gap-4 mdl:gap-5",
          "sm:items-end"
        )}
      >
        <div className="hidden sm:block">
          <IconMemo />
        </div>
        <p
          className={text(
            {
              weight: "medium",
              degree: "4",
              size: "md",
              mode: "exchanged"
            },
            "text-start sm:text-end"
          )}
        >
          {t("experience.description")}
        </p>
      </div>
    </div>
  );
};
const ExpertiseHeadMemo = memo(ExpertiseHead);
const BORDER_CARD_CLASS_NAME =
  "rounded-xl border border-dashed border-black-500";
const Card = ({
  name,
  description,
  number
}: {
  name: string;
  description: string;
  number: string;
}) => {
  const { hoverProps, isHovered } = useHover({
    onHoverStart: e => {
      gsap.to(e.target, {
        scale: 1.05,
        yPercent: -10,
        rotate: 1.6,
        duration: 0.3,
        ease: "power4.out",
        transformOrigin: "bottom right"
      });
    },
    onHoverEnd: e => {
      gsap.to(e.target, {
        scale: 1,
        yPercent: 0,
        rotate: 0,
        duration: 0.3,
        ease: "power4.out"
      });
    }
  });
  return (
    <>
      <div
        className={twMerge(
          "flex flex-col gap-8 sm:gap-12 lg:gap-6 xl:gap-16 justify-between items-baseline",
          "p-5 sm:p-7 lg:p-5 xl:p-6 will-change-transform-animation",
          "transition-colors duration-300 ease-in-out relative",
          isHovered ? "bg-black-200" : "bg-transparent",
          BORDER_CARD_CLASS_NAME,
          "w-full h-full"
        )}
        {...hoverProps}
      >
        <div
          className={twMerge(
            "flex flex-row lg:flex-col xl:flex-row justify-between items-start",
            "gap-4 lg:gap-2 xl:gap-4",
            "w-full"
          )}
        >
          {/* <Title h5 weight='bold' degree='2' className="order-1 transition-all duration-100 delay-100 max-w-48 lg:order-2 xl:order-1" exchange={!isHovered} >{name}</Title> */}
          <h3
            className={title({
              weight: "bold",
              degree: "2",
              size: "h5",
              mode: isHovered ? "normal" : "exchanged"
            })}
          >
            {name}
          </h3>
          {/* <Text p weight='bold' degree='3' size="lg" exchange={!isHovered} className='order-2 duration-100 delay-100 opacity-60 lg:order-1 xl:order-2'>{number}</Text> */}
          <p
            className={text(
              {
                weight: "bold",
                degree: "3",
                size: "lg",
                mode: isHovered ? "normal" : "exchanged"
              },
              "opacity-60"
            )}
          >
            {number}
          </p>
        </div>
        <div className="max-w-72">
          <p
            className={text(
              {
                weight: "medium",
                degree: "3",
                size: "sm",
                mode: isHovered ? "normal" : "exchanged"
              },
              ""
            )}
          >
            {description}
          </p>
        </div>
      </div>
    </>
  );
};
const CardMemo = memo(Card);
const EmptyCard = () => {
  return (
    <>
      <div
        className={twMerge(
          "h-full w-full col-span-1 row-span-1",
          "opacity-60 relative",
          BORDER_CARD_CLASS_NAME
        )}
      >
        <span></span>
      </div>
    </>
  );
};
const EmptyCardMemo = memo(EmptyCard);
const CardElement = ({ i }: { i: number }) => {
  const { t } = useTranslations();
  const ref = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const isLg = useMedia("(min-width: 1024px)", true);
  const isXs = useMedia("(min-width: 475px)", true);
  useGsap(
    () => {
      let space = 40;
      let y = i % 2 === 0 ? 1 : -1;
      if (isLg) {
      } else if (isXs) {
        space = 35;
      } else {
        space = 30;
        y = 1;
      }
      gsap.fromTo(
        ref.current,
        {
          y: space * y
        },
        {
          y: -1 * space * y,
          ease: "Power4.easeOut",
          scrollTrigger: {
            trigger: ".container-expertise-gsap",
            start: "top bottom-=20%",
            end: "bottom top-=20%",
            scrub: true
          }
        }
      );
    },
    undefined,
    [isLg, isXs, lenis]
  );
  return (
    <div
      className={`expertise-card-gsap relative will-change-transform-animation`}
      key={i}
      ref={ref}
    >
      {i >= 4 ? (
        <EmptyCardMemo />
      ) : (
        <CardMemo
          name={t(`experience.stages.${i + 1}.title`)}
          description={t(`experience.stages.${i + 1}.description`)}
          number={t(`experience.stages.${i + 1}.count`)}
        />
      )}
    </div>
  );
};
const CardElementMemo = memo(CardElement);
const ExpertiseStages = () => {
  const array = useRef(Array.apply("", Array(8)).map((_, i) => i));
  return (
    <div
      className={twMerge(
        "grid",
        "grid-cols-1 xs:grid-cols-2 lg:grid-cols-4",
        "grid-rows-5 xs:grid-rows-3 lg:grid-rows-2",
        "gap-4 xs:gap-3 sm:gap-5 lg:gap-3 xl:gap-4 2xl:gap-5 4xl:gap-6",
        "relative -mb-[32vh] sm:-mb-[34vh] lg:-mb-[40vh] xl:-mb-[36vh] 3xl:-mb-[32vh]",
        "w-full relative z-[60]"
      )}
    >
      {array.current.map(i => {
        return <CardElementMemo key={i} i={i} />;
      })}
    </div>
  );
};
const ExpertiseStagesMemo = memo(ExpertiseStages);
const Expertise = () => {
  return (
    <div
      data-scroll
      data-scroll-speed="0.5"
      className={twMerge(
        "flex flex-col",
        "gap-20 xs:gap-32 sm:gap-16 mdl:gap-32 lg:gap-28 2xl:gap-44",
        "justify-center items-center h-full",
        rounded({ size: "xl" }),
        "overflow-hidden container-expertise-gsap will-change-transform-animation",
        "relative z-[60]"
      )}
    >
      <ExpertiseHeadMemo />
      <ExpertiseStagesMemo />
      <Noise position="absolute" className="opacity-60 md:opacity-90" />
      <div
        className={twMerge(
          "absolute w-full h-[26vh] bottom-0 left-0",
          "bg-gradient-to-t from-black-100/25 via-black-100/10 to-black-100/0"
        )}
      ></div>
    </div>
  );
};
export default Expertise;
```

---

## File: Index.tsx

- Path: `/root/git/portfolio_full_stack/components/pages/home/Index.tsx`
- Size: 1.71 KB
- Extension: .tsx
- Lines of code: 63

```tsx
import dynamic from "next/dynamic";
import React, { Suspense } from "react";
import Container from "@/components/ui/container";
const Intro = dynamic(() => import("./Intro"));
const Manifesto = dynamic(() => import("./Manifesto"));
const Video = dynamic(() => import("./Video"));
const Expertise = dynamic(() => import("./Expertise"));
const CallToAction = dynamic(() => import("./Action"));
const Cases = dynamic(() => import("./Cases"));
const Action = dynamic(() => import("./ActionContact"));
const LandingPage = () => (
  <>
    <Container data-scroll-section as="section" size="lg" id="intro">
      <Intro />
    </Container>
    <Suspense>
      <Container
        data-scroll-section
        id="video"
        as="section"
        className="py-24"
        size="lg"
      >
        <Video />
      </Container>
    </Suspense>
    <Container
      data-scroll-section
      id="manifesto"
      as="section"
      size="lg"
      className="pb-24"
    >
      <Manifesto />
    </Container>
    <section data-scroll-section id="experience">
      <Container
        size="full"
        as="div"
        className="relative overflow-hidden [&>*]:py-20 [&>*]:bg-white-200"
      >
        <Expertise />
      </Container>
    </section>
    <Container data-scroll-section as="section" size="lg" id="action-1">
      <CallToAction />
    </Container>
    <Container
      data-scroll-section
      as="section"
      size="lg"
      id="cases"
      className="py-10 h-fit"
    >
      <Cases />
    </Container>
    <Container data-scroll-section as="section" size="lg" id="action-contact">
      <Action />
    </Container>
    <div data-scroll-section className="block w-full h-6 xs:h-12"></div>
  </>
);
export default LandingPage;
```

---

## File: Intro.tsx

- Path: `/root/git/portfolio_full_stack/components/pages/home/Intro.tsx`
- Size: 18.25 KB
- Extension: .tsx
- Lines of code: 617

```tsx
import { useTranslations } from "next-i18next";
import React, {
  useRef,
  memo,
  useCallback,
  useMemo,
  ElementRef,
  useState,
  useEffect
} from "react";
import { PressEvent } from "react-aria";
import { useIsomorphicLayoutEffect } from "react-use";
import { twMerge } from "tailwind-merge";
import Item from "@/components/ui/animation/Item";
import Button from "@/components/ui/button";
import { CursorContent } from "@/components/ui/cursor";
import { Icon } from "@/components/ui/icon";
import { usePreloader } from "@/components/ui/preloader";
import { text, display } from "@/components/ui/typography";
import { MENU_ITEMS } from "@/conf/router";
import useRouterChange from "@/hook/SafePush";
import { useEventListener } from "@/hook/useEventListener";
import useGsap from "@/hook/useGsap";
import { useLenis } from "@/lib/Lenis";
import { ScrollTrigger, gsap } from "@/utils/gsap";
const GsapMagic = ({ children }: { children: React.ReactElement }) => {
  const ref = useRef<ElementRef<"div">>(null);
  const ctx = useRef<gsap.Context | null>(null);
  useIsomorphicLayoutEffect(() => {
    if (!!ref.current) {
      ctx.current = gsap.context(self => {
        const xTo =
          ref.current &&
          gsap.quickTo(ref.current, "x", {
            duration: 1,
            ease: "elastic.out(1, 0.3)"
          });
        const yTo =
          ref.current &&
          gsap.quickTo(ref.current, "y", {
            duration: 1,
            ease: "elastic.out(1, 0.3)"
          });
        self.add("mouseMove", (e: { clientX: number; clientY: number }) => {
          const c = ref.current;
          if (!c) return;
          const { clientX, clientY } = e;
          const { left, top, width, height } = c.getBoundingClientRect();
          const x = clientX - (left + width / 2);
          const y = clientY - (top + height / 2);
          xTo && xTo(x);
          yTo && yTo(y);
        });
        self.add("mouseLeave", () => {
          xTo && xTo(0);
          yTo && yTo(0);
        });
      });
      return () => ctx.current?.revert();
    }
    return () => {};
  }, [ref]);
  const handleMouseEnter = useCallback(
    (e: MouseEvent) => {
      ctx.current && ctx.current["mouseMove"](e);
    },
    [ctx]
  );
  const handleMouseLeave = useCallback(
    (e: MouseEvent) => {
      ctx.current && ctx.current["mouseLeave"](e);
    },
    [ctx]
  );
  useEventListener("mousemove", handleMouseEnter, ref);
  useEventListener("mouseleave", handleMouseLeave, ref);
  return <div ref={ref}>{children}</div>;
};
type GoTOCases = ((e: PressEvent) => void) | undefined;
const ButtonNext = ({ goToCases }: { goToCases: GoTOCases }) => {
  return (
    <GsapMagic>
      <Button
        onPress={goToCases}
        data-scroll
        className={twMerge(
          "relative bg-white-100",
          "rounded-full overflow-hidden will-change-transform-animation next_button_gsap"
        )}
        aria-label="Go to cases"
        aria-haspopup="true"
      >
        <div className=" [&>*]:stroke-black-200 transition-colors duration-300 p-3 xxs:p-3 xs:p-4 md:p-5 xl:p-6">
          <Icon
            name="IconCornerLeftDown"
            className="stroke-1 size-8 xxs:size-7 sm:size-8 xl:size-10"
          />
        </div>
      </Button>
    </GsapMagic>
  );
};
const DISPLAY_1_CLASS_NAME = "capitalize";
const DISPLAY_2_CLASS_NAME = "uppercase italic text-primary-500";
const FullStack = ({ className }: { className: string }) => {
  const { t } = useTranslations();
  return (
    <>
      <div
        className={twMerge(
          className,
          "flex flex-col items-start xs:items-end justify-center",
          "space-y-0 xs:-space-y-1 md:space-y-0 mdl:-space-y-1 lg:-space-y-[3%] xl:-space-y-[3%] 2xl:-space-y-[4%] 3xl:-space-y-1 4xl:space-y-0"
        )}
      >
        <span className="overflow-y-animate">
          <h1
            className={display(
              {
                size: "md",
                weight: "semibold"
              },
              DISPLAY_2_CLASS_NAME,
              "tracking-[-0.05rem] sm:tracking-wider",
              "will-change-transform-animation splitText_fullStack_gsap"
            )}
          >
            {t("intro.title.2_1")}
          </h1>
        </span>
        <span className="overflow-y-animate">
          <h1
            className={display(
              {
                size: "md",
                weight: "semibold"
              },
              DISPLAY_2_CLASS_NAME,
              "tracking-[-0.05rem] sm:tracking-wider",
              "will-change-transform-animation splitText_fullStack_gsap"
            )}
          >
            {t("intro.title.2_2")}
          </h1>
        </span>
      </div>
    </>
  );
};
function useFitText(options?: { factor?: number; maxFontSize?: number }) {
  const [fontSize, setFontSize] = useState("initial");
  const ref = useRef<ElementRef<"div">>(null);
  const optionsString = JSON.stringify(options);
  const adjustFontSize = useCallback(() => {
    if (!ref.current) return;
    const containerWidth = ref.current.getBoundingClientRect().width;
    const factor = options?.factor || 1;
    const newSize = containerWidth / factor;
    setFontSize(() => `${newSize}px`);
  }, [ref, setFontSize, options?.factor]);
  useEffect(() => {
    adjustFontSize();
  }, [optionsString, adjustFontSize]);
  useEventListener("resize", adjustFontSize);
  useEventListener("resize", adjustFontSize, ref);
  useIsomorphicLayoutEffect(adjustFontSize, [ref]);
  return { fontSize, ref };
}
const Title = ({ goToCases }: { goToCases: GoTOCases }) => {
  const { t, i18n } = useTranslations();
  const { fontSize: fontSizeInterface, ref: widthInterfaceRef } = useFitText({
    factor: 4.94
  });
  const { fontSize: fontSizeDev, ref: widthDevRef } = useFitText({
    factor: i18n.language == "en" ? 5.55 : 7
  });
  const interfaceText = useMemo(() => {
    const title = t("intro.title.1");
    const splits = title.split("r");
    let inter = splits[0];
    const face = splits[1];
    inter += "r";
    return { inter, face };
  }, [t]);
  return (
    <>
      {/* title 1  */}
      <div
        ref={widthInterfaceRef}
        className={twMerge(
          i18n.language == "en"
            ? "col-start-1 col-span-12"
            : "col-start-1 col-span-11",
          "xs:col-start-1 xs:col-span-9",
          "mdl:col-start-1 mdl:col-span-6",
          "xl:col-start-1 xl:col-span-6",
          "4xl:col-start-1 4xl:col-span-6",
          "row-start-1 row-span-1",
          "overflow-y-animate"
        )}
      >
        <div
          style={{
            fontSize: fontSizeInterface,
            lineHeight: "96%"
          }}
          className={display(
            {
              weight: "bold"
            },
            DISPLAY_1_CLASS_NAME,
            "splitText_gsap will-change-transform-animation flex flex-row gap-2 intro_scroll_gsap"
          )}
        >
          <span>{interfaceText.inter}</span>
          <span className="lowercase">{interfaceText.face}</span>
        </div>
      </div>
      {/* description */}
      <div
        className={twMerge(
          "flex flex-row xxs:flex-col justify-between items-start xs:hidden",
          "col-start-1 col-span-12 xxs:col-span-4 row-start-3 row-span-1 xxs:row-start-2 xxs:row-span-1"
        )}
      >
        <div className="flex order-2 justify-items-start xxs:order-1">
          <ButtonNext goToCases={goToCases} />
        </div>
        <FullStack className="flex order-1 xxs:order-3" />
      </div>
      <div
        className={twMerge(
          "flex flex-col xs:flex-row justify-between mdl:justify-end",
          "gap-6 xxs:gap-8 xs:gap-4 mdl:gap-2 lg:gap-4 2xl:gap-8 4xl:gap-28", // gap
          "pl-0 lg:pl-4 xl:pl-0", // pl
          "pt-0 xs:pt-2 xl:pt-3", // pt
          "max-w-[20rem] xxs:max-w-full",
          "col-start-1 col-span-12",
          "xxs:col-start-5 xxs:col-span-8", // none
          "xs:col-start-1 xs:col-span-12", // xxs
          "sm:col-start-2 sm:col-span-11", // sm
          i18n.language == "en"
            ? "md:col-start-4 md:col-span-9"
            : "md:col-start-3 md:col-span-10", // md
          "mdl:col-start-7 mdl:col-span-6", // mdl
          i18n.language == "en"
            ? "xl:col-start-8 xl:col-span-5"
            : "xl:col-start-7 xl:col-span-6", // xl
          "4xl:col-span-6 4xl:col-start-7", // 4xl
          "row-start-2 row-span-1", // none
          "mdl:row-start-1 mdl:row-span-1", //mdl
          i18n.language == "en"
            ? "[&>*]:w-full [&>*]:xxs:w-11/12 [&>*]:xs:w-5/12 [&>*]:sm:w-5/12 [&>*]:mdl:w-1/2 [&>*]:xl:w-full [&>*]:4xl:w-4/12"
            : "[&>*]:w-10/12 [&>*]:xxs:w-11/12 [&>*]:xs:w-5/12 [&>*]:sm:w-1/2 [&>*]:xl:w-full [&>*]:4xl:w-5/12",
          i18n.language == "en"
            ? "[&>*>span]:max-w-[14rem]"
            : "[&>*>span]:xxs:max-w-[12rem] [&>*>span]:sm:max-w-[17rem] [&>*>span]:mdl:max-w-[12rem] [&>*>span]:lg:max-w-[17rem]",
          "[&>*]:flex [&>*]:flex-row [&>*]:justify-start [&>*]:sm:justify-end",
          "[&>*]:mdl:ml-2 [&>*]:lg:ml-0"
        )}
      >
        <div>
          <span data-scroll className="overflow-hidden h-fit">
            <p
              data-scroll
              className={text(
                {
                  degree: "2",
                  weight: "semibold",
                  size: "sm"
                },
                "text-start sm:text-end w-full will-change-transform-animation splitText_description_gsap"
              )}
            >
              {t("intro.descriptions.1")}
            </p>
          </span>
        </div>
        <div>
          <span data-scroll className="overflow-hidden h-fit">
            <p
              data-scroll
              className={text(
                {
                  degree: "2",
                  weight: "semibold",
                  size: "sm"
                },
                "text-start sm:text-end w-full will-change-transform-animation splitText_description_gsap"
              )}
            >
              {t("intro.descriptions.2")}
            </p>
          </span>
        </div>
      </div>
      {/* button next */}
      <div
        className={twMerge(
          "mdl:w-2/12",
          "hidden xs:flex flex-col items-end mdl:items-start justify-end w-fit mdl:w-fit",
          "mt-1 lg:mt-4",
          i18n.language == "en"
            ? "mb-0 xxs:mb-3 mdl:mb-0 lg:mb-4"
            : "mb-0 xxs:mb-3 mdl:mb-2 lg:mb-4",
          "col-start-11 col-span-2",
          "mdl:col-span-2 mdl:col-start-1",
          "row-start-1 row-span-1",
          "mdl:row-start-2 mdl:row-span-1",
          "justify-self-end mdl:justify-self-start"
        )}
      >
        <ButtonNext goToCases={goToCases} />
      </div>
      <div
        className={twMerge(
          "hidden xs:flex",
          "row-start-3 row-span-1",
          "mdl:row-start-2 mdl:row-span-1",
          "col-start-1 col-span-3",
          i18n.language == "en"
            ? "mdl:col-start-5 mdl:col-span-2"
            : "mdl:col-start-4 mdl:col-span-2",
          i18n.language == "en"
            ? "xl:col-start-5 xl:col-span-2"
            : "xl:col-start-4 xl:col-span-2",
          "justify-self-end"
        )}
      >
        <FullStack className="hidden xxs:flex w-min" />
      </div>
      {/* DEVELOPER */}
      <div
        ref={widthDevRef}
        className={twMerge(
          "flex flex-col xxs:flex-row justify-start xs:justify-end",
          "row-start-4 row-span-1",
          "xxs:row-start-3 xxs:row-span-1",
          "mdl:row-start-2 mdl:row-span-1",
          "col-start-1 col-span-12",
          "xs:col-start-4 xs:col-span-9",
          i18n.language == "en"
            ? "mdl:col-start-7 mdl:col-span-6"
            : "mdl:col-start-6 mdl:col-span-7", // xs
          i18n.language == "en"
            ? "xl:col-start-7 xl:col-span-6"
            : "xl:col-start-6 xl:col-span-7", // xl
          "gap-2 sm:gap-1 md:gap-5 mdl:gap-8", // gap
          "justify-end mdl:justify-center items-end mdl:items-center",
          "overflow-y-animate"
        )}
      >
        <h1
          style={{
            fontSize: fontSizeDev,
            lineHeight: "100%"
          }}
          className={display(
            {
              weight: "bold"
            },
            DISPLAY_1_CLASS_NAME,
            "splitText_gsap will-change-transform-animation"
          )}
        >
          {t("intro.title.3")}
        </h1>
      </div>
    </>
  );
};
const menuItems = {
  "1": MENU_ITEMS.manifesto.id,
  "2": MENU_ITEMS.experience.id,
  "3": MENU_ITEMS.cases.id,
  "4": MENU_ITEMS.contact.id
} as const;
const menuKeys = ["manifesto", "experience", "cases", "contact"];
const Menu = () => {
  const { t } = useTranslations();
  const { safePush } = useRouterChange();
  const lenis = useLenis();
  const goToSection = useCallback(
    (section: string) => {
      if (section == "contact") {
        safePush("/contact");
      } else {
        lenis?.scrollTo(`#${section}`);
      }
    },
    [safePush, lenis]
  );
  const menuItemsData = useMemo(
    () =>
      [...Array(4)].map((_, i) => {
        return {
          key: i,
          number: `0${i + 1}`,
          title: t(`header.menu.${menuKeys[i]}.attribute`)
        };
      }),
    [t]
  );
  return (
    <>
      <div
        className={twMerge(
          "flex flex-row flex-wrap justify-between items-start w-full gap-y-6"
        )}
      >
        {menuItemsData.map(({ key, number, title }) => {
          return (
            <div
              key={key}
              className={twMerge(
                "flex flex-col justify-start items-start gap-1 w-1/2 sm:w-auto md:w-1/4"
              )}
            >
              <p
                className={text(
                  { size: "sm", degree: "3", weight: "medium" },
                  "number_menu_gsap will-change-transform-animation"
                )}
              >
                {number}
              </p>
              <CursorContent
                name={`cursorPointer_intro_menu_${number}`}
                component="CursorEvent"
                props={{
                  event: "pointer"
                }}
                className="overflow-y-animate"
              >
                <Button
                  degree="1"
                  size="sm"
                  weight="semibold"
                  onPress={() =>
                    goToSection(
                      menuItems[
                        `${key + 1}` as keyof typeof menuItems
                      ] as string
                    )
                  }
                  className="uppercase item_menu_gsap will-change-transform-animation"
                  style={{
                    color: "inherit"
                  }}
                >
                  <Item>{title}</Item>
                </Button>
              </CursorContent>
            </div>
          );
        })}
      </div>
      <span className="overflow-hidden">
        <p
          className={text(
            {
              degree: "3",
              weight: "medium",
              size: "sm"
            },
            "w-max whitespace-nowrap-important",
            "pr-1 hidden xxs:flex sm:hidden md:flex",
            "item_menu_gsap will-change-transform-animation"
          )}
        >
          {t("intro.copy")}
        </p>
      </span>
    </>
  );
};
const MenuMemo = memo(Menu);
const Intro = () => {
  const introRef = useRef<ElementRef<"div">>(null);
  const { endLoading } = usePreloader();
  const lenis = useLenis();
  const goToCases = useCallback(() => {
    lenis?.scrollTo && lenis?.scrollTo("#cases");
  }, [lenis]);
  useGsap(
    () => {
      const tl = gsap
        .timeline({
          paused: true
        })
        .from(".splitText_gsap", {
          yPercent: 200,
          skewY: 16,
          duration: 1,
          ease: "power4.out",
          delay: 0.4,
          stagger: {
            amount: 0.4
          },
          onComplete: function () {
            this["targets"]().forEach(
              (el: HTMLElement) => (el.style.willChange = "")
            );
          }
        })
        .from(
          ".splitText_fullStack_gsap",
          {
            yPercent: 120,
            duration: 0.9,
            ease: "power4.out"
          },
          "<90%"
        )
        .from(
          ".splitText_description_gsap",
          {
            yPercent: 105,
            duration: 0.9,
            ease: "power4.out",
            stagger: {
              amount: 0.1
            }
          },
          "<"
        )
        .from(
          ".next_button_gsap",
          {
            opacity: 0,
            autoAlpha: 0,
            duration: 0.4,
            ease: "power4.out"
          },
          "<"
        )
        .from(
          ".number_menu_gsap",
          {
            opacity: 0,
            autoAlpha: 0,
            duration: 0.3
          },
          "<"
        )
        .fromTo(
          ".item_menu_gsap",
          {
            yPercent: 105
          },
          {
            yPercent: 0,
            duration: 0.4,
            ease: "power4.out"
          },
          "<60%"
        )
        .play();
      const scrollTrigger = ScrollTrigger.create({
        trigger: introRef.current,
        start: "top top",
        toggleActions: "play play restart play",
        animation: tl
      });
      scrollTrigger.disable();
      if (endLoading) {
        scrollTrigger.enable();
        tl.play();
        return () => {
          tl?.kill();
        };
      }
      return () => {
        tl?.pause();
        tl?.progress(0);
      };
    },
    introRef,
    [endLoading]
  );
  return (
    <>
      <div
        className={twMerge(
          "pt-28 sm:pt-36 mdl:pt-40",
          "flex flex-col gap-20 xs:gap-32 xl:gap-40"
        )}
        ref={introRef}
      >
        <div
          className={twMerge(
            "flex flex-row flex-wrap",
            "grid grid-cols-12 grid-row-4 xxs:grid-row-3 mdl:grid-row-2",
            "gap-x-3 md:gap-x-4 gap-y-6 xxs:gap-y-8 xs:gap-y-6 sm:gap-y-8 mdl:gap-y-8 lg:gap-y-10",
            "justify-items-stretch"
          )}
        >
          <Title goToCases={goToCases} />
        </div>
        <div
          className={twMerge(
            "flex flex-row justify-between items-end",
            "gap-0 xl:gap-6 4xl:gap-20"
          )}
        >
          <MenuMemo />
        </div>
      </div>
    </>
  );
};
export default Intro;
```

---

## File: Manifesto.tsx

- Path: `/root/git/portfolio_full_stack/components/pages/home/Manifesto.tsx`
- Size: 8.27 KB
- Extension: .tsx
- Lines of code: 286

```tsx
import _ from "lodash";
import { useTranslations } from "next-i18next";
import React, {
  useRef,
  useEffect,
  useState,
  ElementRef,
  RefObject
} from "react";
import { twMerge } from "tailwind-merge";
import { text, title, Link } from "@/components/ui/typography";
import useGsap from "@/hook/useGsap";
import { gsap } from "@/utils/gsap";
const Phrase = ({
  text,
  lang,
  refDescription
}: {
  text: string;
  lang: string;
  refDescription: RefObject<HTMLDivElement>;
}) => {
  const refs = useRef<ElementRef<"span">[]>([]);
  const [body, setBody] = useState<React.JSX.Element[] | null>(null);
  useEffect(() => {
    setBody(null);
    const splitLetters = (word: string) => {
      return _.map(word.split(""), (letter, index) => (
        <span
          ref={el => {
            refs.current.push(el as HTMLSpanElement);
          }}
          key={`letter_${index}`}
        >
          {letter}
        </span>
      ));
    };
    const elements = _.map(text.split(" "), (word, index) => {
      const letters = splitLetters(word);
      return (
        <p
          key={`word_${index}`}
          className="flex flex-row gap-[0.09rem] letter_gsap will-change-transform-animation"
        >
          {letters}
        </p>
      );
    });
    setBody(() => elements);
  }, [text, lang]);
  useGsap(
    () => {
      if (refs.current.length > 0) {
        const descriptions = gsap.utils.toArray(
          ".manifesto_description_gsap"
        ) as HTMLDivElement[];
        const desc_1 = descriptions[0] as HTMLDivElement;
        const desc_2 = descriptions[1] as HTMLDivElement;
        if (!desc_1 || !desc_2) return;
        const letters = gsap.utils.toArray(".letter_gsap");
        const tl = gsap
          .timeline({
            scrollTrigger: {
              trigger: ".manifesto_quote_gsap",
              scrub: true,
              start: "top bottom-=100px",
              end: "center top+=100px",
              markers: false,
              invalidateOnRefresh: true,
              toggleActions: "play pause reverse pause"
            }
          })
          .fromTo(
            letters,
            {
              opacity: 0.1
            },
            {
              opacity: 0.9,
              ease: "power4",
              stagger: 0.2,
              skewX: 0.3,
              duration: 0.5
            }
          )
          .fromTo(
            desc_1,
            {
              opacity: 0,
              y: 30
            },
            {
              opacity: 1,
              ease: "power1",
              y: 0
            },
            "-=50%"
          )
          .fromTo(
            desc_2,
            {
              opacity: 0,
              y: 30
            },
            {
              opacity: 1,
              ease: "power1",
              y: 0
            }
          )
          .fromTo(
            ".manifesto_description_action_gsap",
            {
              opacity: 0
            },
            {
              opacity: 1
            }
          );
        return () => {
          tl.kill();
        };
      }
      return () => null;
    },
    refDescription,
    [body?.length, text, lang]
  );
  return body
    ? body.map((word, index) => (
        <span key={index} className="mr-[0.3rem]">
          {word}
        </span>
      ))
    : null;
};
const Manifesto = () => {
  const { t, i18n } = useTranslations();
  const refDescription = useRef<ElementRef<"div">>(null);
  const [phrase, setPhrase] = useState(t("manifesto.description"));
  useEffect(() => {
    setPhrase(t("manifesto.description"));
  }, [i18n.language, phrase, t]);
  return (
    <div
      data-scroll
      data-scroll-sticky
      data-scroll-target="#manifesto"
      data-scroll-speed="4"
      className="relative py-20 h-fit xxs:py-28"
      ref={refDescription}
    >
      <div
        className={twMerge(
          `grid grid-cols-12 gap-y-8 xxs:gap-y-12 xs:gap-y-8 mdl:gap-y-12`,
          "h-fit strick"
        )}
      >
        <div
          className={twMerge(
            "flex flex-col gap-6 xs:gap-7 items-start justify-start manifesto_quote_gsap will-change-transform-animation",
            "col-start-1 col-span-12 xs:col-start-2 xs:col-span-11 md:col-start-2 md:col-span-10 mdl:col-start-2 mdl:col-span-10 xl:col-start-2 xl:col-span-9"
          )}
        >
          <div className="flex flex-row items-center justify-center gap-5">
            <h2
              className={title({
                degree: "4",
                weight: "medium",
                size: "h6"
              })}
            >
              {t(`manifesto.subtitle_1`)}
            </h2>
            <div className="size-[0.3rem] rounded-full bg-gray-500 items-center justify-start"></div>
            <h3
              className={title({
                degree: "4",
                weight: "medium",
                size: "h6"
              })}
            >
              {t(`manifesto.subtitle_2`)}
            </h3>
          </div>
          <div
            className={title(
              {
                degree: "1",
                weight: "semibold",
                size: "h4"
              },
              "flex flex-row flex-wrap",
              i18n.language == "en"
                ? "gap-y-[0.01rem] xxs:gap-y-[0.04rem] gap-x-[0.06rem] sm:gap-y-[0.07rem] sm:gap-x-[0.1rem] mdl:gap-y-[0.08rem] mdl:gap-x-[0.16rem] lg:gap-y-[0.15rem] lg:gap-x-[0.23rem]"
                : "gap-y-[0rem] xxs:gap-y-[0.03rem] gap-x-[0.06rem] sm:gap-y-[0.06rem] sm:gap-x-[0.1rem] mdl:gap-y-[0.07rem] mdl:gap-x-[0.16rem] lg:gap-y-[0.13rem] lg:gap-x-[0.23rem]"
            )}
          >
            <strong className="pr-2 text-white-200">
              {t(`manifesto.slogan`)}
            </strong>
            <Phrase
              text={phrase}
              lang={i18n.language}
              refDescription={refDescription}
            />
          </div>
        </div>
        <div
          className={twMerge(
            "flex flex-row gap-12 items-start justify-between",
            "mr-7 xl:mr-6 2xl:mr-0",
            "col-start-1 col-span-12 xxs:col-start-2 xxs:col-span-11 xs:col-start-2 xs:col-span-10 sm:col-start-4 sm:col-span-9 md:col-start-5 md:col-span-7 lg:col-start-6 lg:col-span-6 xl:col-start-6 xl:col-span-5"
          )}
        >
          <div
            className={twMerge(
              "flex flex-col gap-4 xxs:gap-5",
              "manifesto_description_container_gsap will-change-transform-animation"
            )}
          >
            <p
              className={text(
                {
                  degree: "3",
                  weight: "medium",
                  size: "lg"
                },
                "manifesto_description_gsap will-change-transform-animation"
              )}
            >
              {t(`manifesto.who_i_am`)}
            </p>
            <p
              className={text(
                {
                  degree: "3",
                  weight: "medium",
                  size: "lg"
                },
                "manifesto_description_gsap will-change-transform-animation"
              )}
            >
              {t(`manifesto.what_i_do`)}
            </p>
            <span
              data-scroll
              data-scroll-position="start"
              data-scroll-speed="0.4"
              className="mt-[1.6%] 3xl:mt-[3%]"
            >
              <p
                className={text(
                  {
                    degree: "3",
                    weight: "semibold",
                    size: "xl"
                  },
                  "inline w-full whitespace-inherit-important manifesto_description_action_gsap will-change-transform-animation"
                )}
                style={{
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textWrap: "inherit"
                }}
              >
                {t(`manifesto.goal`)}
                <Link
                  degree="2"
                  weight="bold"
                  className="ml-1 transition-all duration-300 text-primary-500 hover:text-primary-400/70 hover:underline"
                  href="/resume"
                >
                  {t(`manifesto.action`)}
                </Link>
              </p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Manifesto;
```

---

## File: Video.tsx

- Path: `/root/git/portfolio_full_stack/components/pages/home/Video.tsx`
- Size: 4.05 KB
- Extension: .tsx
- Lines of code: 129

```tsx
import React, { useRef, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { rounded } from "@/components/style";
import { CursorContent } from "@/components/ui/cursor";
import { usePreloader } from "@/components/ui/preloader";
import { gsap } from "@/utils/gsap";
const ORIGINAL_WIDTH = 1488; // Original image width
const ORIGINAL_HEIGHT = 835; // Original image height
const FRAME_COUNT = 164;
const LOADING_KEY = "Video";
const Video = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  const refContainer = useRef<HTMLDivElement>(null);
  const imagesRef = useRef([] as Array<HTMLImageElement>);
  const { addLoadingComponent, removeLoadingComponent } = usePreloader();
  const getScreenSize = (): number => {
    const width = window.innerWidth;
    if (width < 480) return 320;
    if (width < 768) return 480;
    if (width < 1024) return 768;
    if (width < 1280) return 1024;
    if (width < 1600) return 1280;
    return 1600; // for larger screens
  };
  useEffect(() => {
    addLoadingComponent(LOADING_KEY);
    const screenSize = getScreenSize();
    const currentFrame = (index: number) =>
      `/framer-image/dim/ezgif-frame-${index
        .toString()
        .padStart(3, "0")}_${screenSize}.webp`;
    Promise.all<HTMLImageElement>(
      Array(FRAME_COUNT)
        .fill(0)
        .map((_, index) => {
          const img = new Image();
          img.src = currentFrame(index + 1);
          img.width = screenSize;
          img.height = (screenSize * ORIGINAL_HEIGHT) / ORIGINAL_WIDTH;
          img.alt = "video" + "_" + index.toString().padStart(3, "0");
          img.style.objectFit = "cover";
          img.style.objectPosition = "center";
          return new Promise(resolve => {
            img.onload = () => resolve(img);
          });
        })
    ).then(images => {
      imagesRef.current = images;
      removeLoadingComponent(LOADING_KEY);
    });
    return () => {
      if (imagesRef.current) {
        imagesRef.current.forEach(image => {
          image.src = "";
        });
      }
    };
  }, [removeLoadingComponent, addLoadingComponent]);
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!imagesRef.current.length) return;
      const hands = { frame: 0 };
      const canvas = ref.current;
      if (!canvas) return;
      const context = canvas.getContext("2d");
      const screenSize = getScreenSize();
      canvas.width = screenSize;
      canvas.height = (screenSize * ORIGINAL_HEIGHT) / ORIGINAL_WIDTH;
      gsap.to(hands, {
        frame: FRAME_COUNT - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
          scrub: 0.5,
          trigger: canvas
        },
        onUpdate: render
      });
      const current = imagesRef.current;
      if (!current) return;
      current[0] && (current[0]["onload"] = render);
      function render() {
        if (!imagesRef.current.length) return;
        if (!context) return;
        if (!ref.current) return;
        context?.clearRect(0, 0, ref.current.width, ref.current.height);
        const frame = hands.frame;
        const image = imagesRef.current[frame];
        if (!image) return;
        context?.drawImage(image, 0, 0);
      }
    }, refContainer);
    return () => {
      ctx.revert();
    };
  }, [imagesRef.current.length, refContainer]);
  return (
    <>
      <div
        data-scroll
        ref={refContainer}
        className={twMerge(
          "block relative w-full rounded-3xl video_gsap overflow-hidden",
          rounded({ size: "xl" })
        )}
        style={{
          height: "100%"
        }}
      >
        <CursorContent
          name="CursorScrollVideo"
          component="CursorScroll"
          props={{ title: "scroll" }}
        >
          <canvas
            data-scroll
            ref={ref}
            className={twMerge(
              "h-full w-full will-change-transform-animation",
              rounded({ size: "xl" })
            )}
            style={{ width: "100%", objectFit: "cover" }}
          />
        </CursorContent>
      </div>
    </>
  );
};
export default Video;
```

---

## File: Item.tsx

- Path: `/root/git/portfolio_full_stack/components/ui/animation/Item.tsx`
- Size: 2.64 KB
- Extension: .tsx
- Lines of code: 100

```tsx
import React, { ElementRef, useRef, useState } from "react";
import { useIsomorphicLayoutEffect } from "react-use";
import { CursorContent } from "@/components/ui/cursor";
import { gsap } from "@/utils/gsap";
const Item = ({
  children,
  defaultColor = "var(--color-white-100)"
}: {
  children: string;
  defaultColor?: `var(--color-${string})`;
}) => {
  const ref = useRef<ElementRef<"div">>(null);
  const [onHoverStart, setOnHoverStart] = useState(false);
  const [onHoverEnd, setOnHoverEnd] = useState(false);
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        paused: true,
        defaults: {
          duration: 0.15
        }
      });
      timeline
        .fromTo(
          ".item-child-grap",
          {
            yPercent: 0,
            skewY: 0,
            color: defaultColor
          },
          {
            yPercent: -100,
            skewY: 5,
            color: defaultColor,
            ease: "power4.easeIn"
          }
        )
        .fromTo(
          ".item-child-grap",
          {
            yPercent: 100,
            skewY: 5,
            color: "var(--color-primary-500)"
          },
          {
            yPercent: 0,
            skewY: 0,
            ease: "power4.easeOut",
            color: "var(--color-primary-500)"
          }
        )
        .progress(0);
      gsap.set(".item-child-grap", {
        yPercent: 0,
        skewY: 0,
        color: "var(--color-white-100)"
      });
      ref.current?.addEventListener("pointerenter", () => {
        if (onHoverStart) return;
        if (onHoverEnd) return;
        setOnHoverStart(true);
        timeline?.play().then(() => setOnHoverStart(false));
      });
      ref.current?.addEventListener("pointerleave", () => {
        if (onHoverEnd) return;
        if (onHoverStart) return;
        setOnHoverEnd(true);
        timeline?.reverse().then(() => setOnHoverEnd(false));
      });
      return () => {
        ref.current?.removeEventListener("mouseenter", () => {
          timeline?.play();
        });
        ref.current?.removeEventListener("mouseleave", () => {
          timeline?.reverse();
        });
        timeline?.kill();
      };
    }, ref);
    return () => {
      ctx.revert();
    };
  }, [ref, defaultColor]);
  return (
    <CursorContent
      name={`cursorPointer_header_email`}
      component="CursorEvent"
      props={{
        event: "pointer"
      }}
    >
      <div className="relative overflow-hidden" ref={ref}>
        <div className="flex w-auto cursor-pointer item-child-grap">
          {children}
        </div>
      </div>
    </CursorContent>
  );
};
export default Item;
```

---

## File: Button.tsx

- Path: `/root/git/portfolio_full_stack/components/ui/button/Button.tsx`
- Size: 1.56 KB
- Extension: .tsx
- Lines of code: 54

```tsx
import React, { forwardRef, useMemo, memo } from "react";
import { FocusRing } from "react-aria";
import { Button } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { CursorContent } from "@/components/ui/cursor";
import { text } from "@/components/ui/typography";
import { ButtonProps } from "./Button.type";
const ButtonUi = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      size = "auto",
      full,
      weight,
      name,
      degree = "1",
      mode,
      className,
      ...props
    },
    ref
  ) => {
    const buttonClasses = useMemo(
      () =>
        twMerge(
          "touch-none select-none focus:outline-none",
          "gap-2 flex flex-row flex-nowrap self-center items-center justify-center",
          "font-sans font-bold",
          "text-clip whitespace-nowrap overflow-hidden",
          "align-middle",
          full ? "w-full" : "",
          text({ weight, size, degree, mode }),
          typeof className == "string" ? className : ""
        ),
      [size, full, weight, degree, mode, className]
    );
    return (
      <FocusRing>
        <CursorContent
          name="cursorPointer_header_email"
          component="CursorEvent"
          props={{ event: "pointer" }}
        >
          <Button name={name} ref={ref} className={buttonClasses} {...props}>
            {children}
          </Button>
        </CursorContent>
      </FocusRing>
    );
  }
);
ButtonUi.displayName = "ButtonUi"; // Add display name
const MemoizedButtonUi = memo(ButtonUi);
export default MemoizedButtonUi;
```

---

## File: Button.type.ts

- Path: `/root/git/portfolio_full_stack/components/ui/button/Button.type.ts`
- Size: 376.00 B
- Extension: .ts
- Lines of code: 14

```ts
import { ReactNode } from "react";
import { ButtonProps as AriaButtonProps } from "react-aria-components";
import { TextPropsExtended } from "@/components/ui/typography";
interface PropsIcon {
  icon?: ReactNode;
  iconRight?: ReactNode;
}
export interface ButtonProps
  extends PropsIcon,
    AriaButtonProps,
    TextPropsExtended {
  title?: string;
  full?: boolean;
}
```

---

## File: index.tsx

- Path: `/root/git/portfolio_full_stack/components/ui/button/index.tsx`
- Size: 106.00 B
- Extension: .tsx
- Lines of code: 3

```tsx
import Button from "./Button";
export default Button;
export type { ButtonProps } from "./Button.type";
```

---

## File: index.tsx

- Path: `/root/git/portfolio_full_stack/components/ui/collection/index.tsx`
- Size: 42.00 B
- Extension: .tsx
- Lines of code: 1

```tsx
export { default as Menu } from "./menu";
```

---

## File: Container.style.ts

- Path: `/root/git/portfolio_full_stack/components/ui/container/Container.style.ts`
- Size: 376.00 B
- Extension: .ts
- Lines of code: 14

```ts
import { cva } from "class-variance-authority";
export const containerStyle = cva(
  [
    "mx-auto w-full max-w-full z-container h-fit 2xl:max-w-[1400px] 3xl:max-w-[1500px] 4xl:max-w-screen-3xl"
  ],
  {
    variants: {
      size: {
        lg: "px-4 xs:px-5 sm:px-8 xl:px-10",
        full: "px-2 [&>*]:px-2 [&>*]:xs:px-3 [&>*]:sm:px-6 [&>*]:lg:px-8"
      }
    }
  }
);
```

---

## File: Container.tsx

- Path: `/root/git/portfolio_full_stack/components/ui/container/Container.tsx`
- Size: 622.00 B
- Extension: .tsx
- Lines of code: 28

```tsx
import React, { createElement, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { containerStyle } from "./Container.style";
import { ContainerProps } from "./Container.type";
const Container = ({
  as = "div",
  children,
  className,
  ...props
}: ContainerProps) => {
  const classNames = useMemo(
    () => twMerge(containerStyle({ size: props.size }), className),
    [props.size, className]
  );
  return (
    <>
      {createElement(
        as,
        {
          className: classNames,
          ...props
        },
        children
      )}
    </>
  );
};
export default Container;
```

---

## File: Container.type.ts

- Path: `/root/git/portfolio_full_stack/components/ui/container/Container.type.ts`
- Size: 233.00 B
- Extension: .ts
- Lines of code: 8

```ts
export interface ContainerProps {
  children: React.ReactNode | React.ReactNode[];
  id?: string;
  size: "lg" | "full";
  className?: string;
  style?: React.CSSProperties;
  as?: "span" | "div" | "section" | "footer" | "header";
}
```

---

## File: index.tsx

- Path: `/root/git/portfolio_full_stack/components/ui/container/index.tsx`
- Size: 91.00 B
- Extension: .tsx
- Lines of code: 2

```tsx
export { default } from "./Container";
export { containerStyle } from "./Container.style";
```

---

## File: Cursor.context.ts

- Path: `/root/git/portfolio_full_stack/components/ui/cursor/Cursor.context.ts`
- Size: 220.00 B
- Extension: .ts
- Lines of code: 6

```ts
import { createContext } from "react";
import { ItemCursor } from "./CursorType";
export const cursorContext = createContext<{
  addCursor?: (item: ItemCursor) => void;
  setKey?: (key: string | null) => void;
}>({});
```

---

## File: Cursor.tsx

- Path: `/root/git/portfolio_full_stack/components/ui/cursor/Cursor.tsx`
- Size: 9.72 KB
- Extension: .tsx
- Lines of code: 368

```tsx
import React, {
  useRef,
  useState,
  ElementRef,
  useMemo,
  useCallback
} from "react";
import { useIsomorphicLayoutEffect } from "react-use";
import { twMerge } from "tailwind-merge";
import { useEventListener } from "@/hook/useEventListener";
import { gsap } from "@/utils/gsap";
import { cursorContext } from "./Cursor.context";
import Cursors, { CursorsArray } from "./Cursors";
import { ItemCursor } from "./CursorType";
const DEFAULT_BALL_CLASS_NAME = [
  "fixed rounded-full pointer-events-none cursor-none will-change-transform-animation",
  "top-0 left-0 z-cursor"
];
const Cursor = ({
  children
}: {
  children: React.ReactElement | React.ReactElement[];
}) => {
  const ref = useRef<ElementRef<"div">>(null);
  const list = useRef<ItemCursor[]>([]);
  const addCursor = useCallback(({ ...props }: ItemCursor) => {
    list.current.push({
      ...props
    });
  }, []);
  const [key, setKey] = useState<string | null>(null);
  const ctx = useRef<gsap.Context>();
  useIsomorphicLayoutEffect(() => {
    ctx.current = gsap.context(context => {
      const timeline = () => {
        const tl = gsap.timeline({
          paused: true
        });
        return tl
          .to(
            ".ball_main_gsap",
            {
              duration: 0.3,
              scale: 0,
              ease: "Power4.easeOut"
            },
            0
          )
          .fromTo(
            ".ball_secondary_gsap",
            {
              scale: 1
            },
            {
              duration: 0.2,
              scale: 0,
              ease: "Power4.easeOut"
            }
          )
          .to(
            ".ball_inner_top",
            {
              duration: 0.1,
              scale: 1,
              ease: "Power4.easeOut"
            },
            0.2
          );
      };
      const cursorScrollTimeline = timeline()
        .fromTo(
          ".cursor_scroll_gsap",
          {
            display: "flex",
            scale: 0,
            opacity: 0
          },
          {
            duration: 0.5,
            scale: 1,
            opacity: 1,
            ease: "Power4.easeOut"
          },
          ">"
        )
        .fromTo(
          ".cursor_scroll_gsap .cursor_text_gsap",
          {
            rotate: -45,
            opacity: 0
          },
          {
            opacity: 1,
            duration: 0.3,
            ease: "Expo.easeOut",
            rotate: 0
          }
        );
      const cursorActionIconTimeline = timeline()
        .to(".cursor_action_icon_gsap", {
          duration: 0.1,
          display: "flex"
        })
        .fromTo(
          ".cursor_action_icon_gsap",
          {
            scale: 0,
            opacity: 0
          },
          {
            duration: 0.4,
            scale: 1,
            opacity: 1,
            ease: "Power4.easeOut"
          },
          ">"
        )
        .fromTo(
          ".cursor_action_icon_gsap .cursorIconGsap",
          {
            rotate: 45,
            opacity: 0
          },
          {
            duration: 0.5,
            opacity: 1,
            ease: "Expo.easeOut",
            rotate: 0
          }
        );
      context.add("cursorScroll", (isActive: boolean) => {
        if (isActive) {
          cursorScrollTimeline.play();
        } else {
          cursorScrollTimeline.reverse();
        }
      });
      context.add("cursorActionIcon", (isActive: boolean) => {
        if (isActive) {
          cursorActionIconTimeline.play();
        } else {
          cursorActionIconTimeline.reverse();
        }
      });
      const timelineBallEventPointer = gsap
        .timeline({
          paused: true
        })
        .fromTo(
          ".ball_secondary_gsap",
          {
            scale: 1
          },
          {
            duration: 0.4,
            scale: 0,
            ease: "Power4.easeOut"
          }
        )
        .fromTo(
          ".ball_main_gsap",
          {
            scale: 1,
            opacity: 1
          },
          {
            duration: 0.4,
            scale: 1.2,
            opacity: 0.8,
            ease: "Power4.easeOut"
          },
          "<"
        );
      context.add("CursorEvent", (isActive: boolean) => {
        if (isActive) {
          timelineBallEventPointer.play();
        } else {
          timelineBallEventPointer.reverse();
        }
      });
      return () => {
        cursorScrollTimeline.kill();
        cursorActionIconTimeline.kill();
        timelineBallEventPointer.kill();
      };
    });
    return () => ctx.current?.revert();
  }, []);
  const ctxMouseMove = useRef<gsap.Context>();
  useIsomorphicLayoutEffect(() => {
    ctxMouseMove.current = gsap.context(context => {
      gsap.set([".ball_main_gsap", ".ball_secondary_gsap", ".ball_inner_top"], {
        xPercent: -50,
        yPercent: -50
      });
      context.add("xTo", (x: number) => {
        gsap.to(".ball_main_gsap", {
          duration: 0.6,
          ease: "Elastic.easeOut",
          x
        });
      });
      context.add("yTo", (y: number) => {
        gsap.to(".ball_main_gsap", {
          duration: 0.6,
          ease: "Elastic.easeOut",
          y
        });
      });
      context.add("xToSecondary", (x: number) => {
        gsap.to([".ball_secondary_gsap", ".ball_inner_top"], {
          duration: 0.3,
          ease: "Power4.easeOut",
          x
        });
      });
      context.add("yToSecondary", (y: number) => {
        gsap.to([".ball_secondary_gsap", ".ball_inner_top"], {
          duration: 0.3,
          ease: "Power4.easeOut",
          y
        });
      });
      context.add("opacityTo", (opacity: number) => {
        gsap.to([".ball_main_gsap", ".ball_secondary_gsap"], {
          duration: 0.3,
          ease: "Power4.easeOut",
          opacity,
          scale: 1
        });
      });
    }, ref);
    return () => ctxMouseMove.current?.revert();
  }, [ref]);
  const mouseEnterHandler = useCallback(() => {
    const current = ctxMouseMove.current;
    if (!current) return;
    current["opacityTo"](1);
  }, [ctxMouseMove]);
  const mouseLeaveHandler = useCallback(() => {
    const current = ctxMouseMove.current;
    if (!current) return;
    current["opacityTo"](0);
  }, [ctxMouseMove]);
  const mouseMoveHandler = useCallback(
    (e: MouseEvent) => {
      const current = ctxMouseMove.current;
      if (!current) return;
      current["xTo"](e.clientX);
      current["yTo"](e.clientY);
      current["xToSecondary"](e.clientX);
      current["yToSecondary"](e.clientY);
    },
    [ctxMouseMove]
  );
  useEventListener("mouseenter", mouseEnterHandler, ref);
  useEventListener("mouseleave", mouseLeaveHandler, ref);
  useEventListener("mousemove", mouseMoveHandler, ref);
  const blend = useMemo(
    () => (typeof key == "string" ? "" : "mix-blend-difference"),
    [key]
  );
  const currentCursor = useMemo(
    () => list.current.find(item => item.name == key),
    [key]
  );
  return (
    <>
      <div className="cursor-container" ref={ref}>
        <cursorContext.Provider
          value={{
            addCursor,
            setKey
          }}
        >
          <div className="relative cursor_container">{children}</div>
          <div
            className={twMerge(
              DEFAULT_BALL_CLASS_NAME,
              blend,
              "ball_gsap ball_secondary_gsap pointer-events-none",
              "h-4 sm:h-5 w-4 sm:w-5",
              "bg-primary-600/80"
            )}
          ></div>
          <div
            className={twMerge(
              DEFAULT_BALL_CLASS_NAME,
              blend,
              "ball_gsap ball_main_gsap",
              "w-10 sm:w-12 h-10 sm:h-12",
              "border border-primary-500 bg-white-300/5 backdrop-blur-xs"
            )}
          ></div>
          <div
            className={twMerge(
              DEFAULT_BALL_CLASS_NAME,
              blend,
              "ball_gsap ball_inner_top",
              "w-full",
              "flex justify-center items-center uppercase"
            )}
          >
            {CursorsArray.map(item => {
              const isActive = item == currentCursor?.component;
              let otherProps = {};
              if (isActive) {
                otherProps = currentCursor?.props;
              }
              return (
                <span key={item}>
                  {/*  */}
                  {Cursors[item]({
                    ctx,
                    isActive,
                    ...otherProps
                  })}
                </span>
              );
            })}
          </div>
        </cursorContext.Provider>
      </div>
      <style>
        {`
.cursor_container {
cursor: default;
}
.ball_gsap {
display: none;
}
@media (hover: hover) {
.cursor_container {
cursor: none;
}
.ball_gsap{
display: black;
}
}
@media (prefers-reduced-motion) {
.ball_gsap {
display: none;
}
}
@media (hover: hover) {
.ball_gsap {
display: flex;
}
}
.ball_main_gsap {
z-index: 99999999999;
}
.ball_secondary_gsap {
z-index: 999999999999;
}
.ball_inner_top {
z-index: 9999999999999;
}
`}
      </style>
    </>
  );
};
export default Cursor;
```

---

## File: CursorContainer.tsx

- Path: `/root/git/portfolio_full_stack/components/ui/cursor/CursorContainer.tsx`
- Size: 1.11 KB
- Extension: .tsx
- Lines of code: 45

```tsx
import React, { useContext, useEffect, createContext } from "react";
import { useHover } from "react-aria";
import { cursorContext } from "./Cursor.context";
import { ItemCursor } from "./CursorType";
const cursorParentContext = createContext<{
  hasParent: boolean;
}>({
  hasParent: false
});
const CursorContainer = ({
  children,
  className = "",
  name,
  ...props
}: {
  children: React.ReactElement;
  className?: string;
} & ItemCursor) => {
  const { addCursor, setKey } = useContext(cursorContext);
  const { hasParent } = useContext(cursorParentContext);
  const { hoverProps } = useHover({
    onHoverStart: () => {
      setKey && setKey(name);
    },
    onHoverEnd: () => {
      setKey && setKey(null);
    }
  });
  useEffect(() => {
    addCursor &&
      addCursor({
        name,
        ...props
      });
  }, [props, name, addCursor]);
  if (hasParent) return children;
  return (
    <cursorParentContext.Provider value={{ hasParent: true }}>
      <span className={className} {...hoverProps}>
        {children}
      </span>
    </cursorParentContext.Provider>
  );
};
export default CursorContainer;
```

---

## File: CursorType.ts

- Path: `/root/git/portfolio_full_stack/components/ui/cursor/CursorType.ts`
- Size: 902.00 B
- Extension: .ts
- Lines of code: 34

```ts
import { IconNames } from "@/components/ui/icon";
export const COMPONENT_NAMES = {
  CursorScroll: "CursorScroll",
  CursorActionIcon: "CursorActionIcon",
  CursorEvent: "CursorEvent"
} as const;
export interface ItemCursorPropsByComponent {
  [COMPONENT_NAMES.CursorScroll]: {
    title?: string;
  };
  [COMPONENT_NAMES.CursorActionIcon]: {
    iconName: IconNames;
    degree: number;
  };
  [COMPONENT_NAMES.CursorEvent]: {
    event: "pointer";
  };
}
export type ItemCursor = {
  name: string;
} & (
  | {
      component: (typeof COMPONENT_NAMES)["CursorScroll"];
      props: ItemCursorPropsByComponent["CursorScroll"];
    }
  | {
      component: (typeof COMPONENT_NAMES)["CursorActionIcon"];
      props: ItemCursorPropsByComponent["CursorActionIcon"];
    }
  | {
      component: (typeof COMPONENT_NAMES)["CursorEvent"];
      props: ItemCursorPropsByComponent["CursorEvent"];
    }
);
```

---

## File: Cursors.tsx

- Path: `/root/git/portfolio_full_stack/components/ui/cursor/Cursors.tsx`
- Size: 3.64 KB
- Extension: .tsx
- Lines of code: 136

```tsx
import React, { useEffect, useRef, MutableRefObject, useState } from "react";
import { useIsomorphicLayoutEffect } from "react-use";
import { twMerge } from "tailwind-merge";
import { Icon, IconNames } from "@/components/ui/icon";
import { text } from "@/components/ui/typography";
import { gsap } from "@/utils/gsap";
import { ItemCursorPropsByComponent } from "./CursorType";
const CursorScroll = ({
  isActive,
  ctx,
  title
}: {
  ctx: MutableRefObject<gsap.Context | undefined>;
  isActive: boolean;
} & ItemCursorPropsByComponent["CursorScroll"]) => {
  const ref = useRef<HTMLDivElement>(null);
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".cursor_scroll_gsap", {
        scale: 0,
        display: "none"
      });
      gsap.set(".cursor_text_gsap", {
        rotate: -45,
        opacity: 0
      });
    }, ref);
    return () => ctx.revert();
  }, [ctx, ref]);
  useIsomorphicLayoutEffect(() => {
    if (!ctx.current) return;
    ctx.current["cursorScroll"](isActive);
  }, [isActive]);
  return (
    <span ref={ref}>
      <div
        className={twMerge(
          "w-32 h-32 bg-white-100 cursor_scroll_gsap",
          "rounded-full",
          "flex-col justify-center items-center will-change-transform-animation"
        )}
      >
        <p
          className={text(
            {
              size: "sm",
              mode: "exchanged"
            },
            "cursor_text_grap"
          )}
        >
          {title ? title : "scroll"}
        </p>
      </div>
    </span>
  );
};
const CursorActionIcon = ({
  isActive,
  ctx,
  iconName,
  degree = 45
}: {
  isActive: boolean;
  ctx: MutableRefObject<gsap.Context | undefined>;
} & Partial<ItemCursorPropsByComponent["CursorActionIcon"]>) => {
  const ref = useRef<HTMLDivElement>(null);
  const [icon, setIcon] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (!!iconName) {
      setIcon(iconName);
    }
  }, [iconName]);
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".cursor_action_icon_gsap", {
        scale: 0,
        display: "none"
      });
      gsap.set(".cursorIconGsap", {
        rotate: 45,
        opacity: 0
      });
    }, ref);
    return () => ctx.revert();
  }, [ctx, ref]);
  useIsomorphicLayoutEffect(() => {
    const current = ctx.current;
    if (!current) return;
    current["cursorActionIcon"](isActive, degree);
    if (isActive) return () => {};
    const idTimeout = setTimeout(() => {
      setIcon(undefined);
    }, 1000);
    return () => clearTimeout(idTimeout);
  }, [isActive, ctx, degree]);
  return (
    <span ref={ref}>
      <div
        className={twMerge(
          "w-28 h-28",
          "rounded-full",
          "flex-col justify-center items-center cursor_action_icon_gsap will-change-transform-animation bg-white-100"
        )}
      >
        <span className="cursorIconGsap">
          {icon ? (
            <Icon
              name={icon as IconNames}
              size="30"
              color="var(--color-black-100)"
            />
          ) : null}
        </span>
      </div>
    </span>
  );
};
const CursorEvent = ({
  isActive,
  ctx,
  event
}: {
  isActive: boolean;
  ctx: MutableRefObject<gsap.Context | undefined>;
} & Partial<ItemCursorPropsByComponent["CursorEvent"]>) => {
  useIsomorphicLayoutEffect(() => {
    const current = ctx.current;
    if (!current) return;
    current["CursorEvent"](isActive, event);
  }, [ctx, isActive, event]);
  return <span></span>;
};
const Cursors = { CursorScroll, CursorActionIcon, CursorEvent } as const;
export default Cursors;
export const CursorsArray = Object.keys(Cursors) as (keyof typeof Cursors)[];
```

---

## File: index.tsx

- Path: `/root/git/portfolio_full_stack/components/ui/cursor/index.tsx`
- Size: 109.00 B
- Extension: .tsx
- Lines of code: 2

```tsx
export { default as Cursors } from "./Cursor";
export { default as CursorContent } from "./CursorContainer";
```

---

## File: index.tsx

- Path: `/root/git/portfolio_full_stack/components/ui/deco/index.tsx`
- Size: 54.00 B
- Extension: .tsx
- Lines of code: 1

```tsx
export { default as CircleText } from "./circleText";
```

---

## File: CheckBox.tsx

- Path: `/root/git/portfolio_full_stack/components/ui/form/CheckBox.tsx`
- Size: 630.00 B
- Extension: .tsx
- Lines of code: 21

```tsx
import React from "react";
import { Checkbox, CheckboxGroup, Label } from "react-aria-components";
import type { CheckboxGroupProps } from "react-aria-components";
const CheckboxUi = Checkbox;
interface CheckboxGroupUiProps extends CheckboxGroupProps {
  label?: string;
  name: string;
  field: {
    value: string[];
    onChange: (e: string[]) => void;
  };
}
const CheckboxGroupUi = ({ label, field, ...props }: CheckboxGroupUiProps) => {
  return (
    <>
      <Label>{label}</Label>
      <CheckboxGroup value={field.value} onChange={field.onChange} {...props} />
    </>
  );
};
export { CheckboxUi, CheckboxGroupUi };
```

---

## File: Field.tsx

- Path: `/root/git/portfolio_full_stack/components/ui/form/Field.tsx`
- Size: 1.46 KB
- Extension: .tsx
- Lines of code: 59

```tsx
import React, { isValidElement, cloneElement } from "react";
import { TextField, Label } from "react-aria-components";
import type { TextFieldProps, InputProps } from "react-aria-components";
import { twJoin, twMerge } from "tailwind-merge";
import type { IconNames } from "@/components/ui/icon";
import Style from "./Form.module.scss";
const LayoutField = ({
  label,
  className,
  name,
  children,
  width,
  ...props
}: {
  width?: string;
  label: string;
  className?: string;
  icon?: IconNames;
  name: string;
  children: React.ReactElement<InputProps>;
} & TextFieldProps) => {
  const childrenWithProps = isValidElement(children)
    ? cloneElement(children, {
        label,
        ...children.props,
        className: twMerge(children.props.className, "w-full", Style["input"])
      })
    : children;
  return (
    <>
      <TextField
        className={twJoin(
          Style["text-field"],
          "flex flex-col",
          width ? width : "col-span-12",
          className ? className : "w-full"
        )}
        {...props}
      >
        <div className="flex flex-col w-full gap-2">
          <Label
            className={twJoin(Style["label"])}
            htmlFor={name}
            suppressHydrationWarning
          >
            {label}
          </Label>
          {childrenWithProps}
        </div>
      </TextField>
    </>
  );
};
export default LayoutField;
```

---

## File: Form.tsx

- Path: `/root/git/portfolio_full_stack/components/ui/form/Form.tsx`
- Size: 886.00 B
- Extension: .tsx
- Lines of code: 42

```tsx
import React, { FormHTMLAttributes, DetailedHTMLProps } from "react";
import {
  FieldValues,
  FormProvider,
  FormProviderProps,
  UseFormReturn
} from "react-hook-form";
type TFormProps = DetailedHTMLProps<
  FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;
export type TFormComponent<T extends FieldValues> = React.FC<
  TFormProps & {
    methods?: FormProviderProps<T>;
  }
>;
const Form = <T extends FieldValues>({
  methods,
  children,
  className,
  ...props
}: {
  methods?: UseFormReturn<T>;
  children: React.ReactNode;
  className?: string;
} & TFormProps) => {
  if (!!methods) {
    return (
      <FormProvider {...methods}>
        <form className={className} {...props}>
          {children}
        </form>
      </FormProvider>
    );
  }
  return (
    <form className={className} {...props}>
      {children}
    </form>
  );
};
export default Form;
```

---

## File: Item.tsx

- Path: `/root/git/portfolio_full_stack/components/ui/form/Item.tsx`
- Size: 423.00 B
- Extension: .tsx
- Lines of code: 16

```tsx
import React from "react";
import {
  ListBoxItem as Item,
  ListBoxItemProps as ItemProps
} from "react-aria-components";
import { mergeClassName } from "@/helpers/className";
import Style from "./Form.module.scss";
const ItemUi = ({ className, ...props }: ItemProps) => {
  return (
    <Item
      className={mergeClassName(Style["item"] as string, className)}
      {...props}
    />
  );
};
export default ItemUi;
```

---

## File: Radio.tsx

- Path: `/root/git/portfolio_full_stack/components/ui/form/Radio.tsx`
- Size: 591.00 B
- Extension: .tsx
- Lines of code: 21

```tsx
import React from "react";
import { Radio, Label, RadioGroup } from "react-aria-components";
import type { RadioGroupProps } from "react-aria-components";
interface RadioGroupUiProps extends RadioGroupProps {
  label?: string;
  name: string;
  field: {
    value: string;
    onChange: (e: string) => void;
  };
}
const RadioUi = Radio;
const RadioGroupUi = ({ label, field, ...props }: RadioGroupUiProps) => {
  return (
    <>
      <Label>{label}</Label>
      <RadioGroup {...props} onChange={field.onChange} value={field.value} />
    </>
  );
};
export { RadioUi, RadioGroupUi };
```

---

## File: Select.tsx

- Path: `/root/git/portfolio_full_stack/components/ui/form/Select.tsx`
- Size: 1.33 KB
- Extension: .tsx
- Lines of code: 57

```tsx
import React from "react";
import {
  Label,
  Select,
  SelectValue,
  Button,
  Popover,
  ListBox
} from "react-aria-components";
import type { SelectProps, ListBoxProps } from "react-aria-components";
import { twMerge, twJoin } from "tailwind-merge";
import Style from "./Form.module.scss";
const SelectUi = <
  T extends {
    [x: string]: string;
  }
>({
  label,
  name,
  children,
  items,
  invalid,
  ...props
}: {
  items: Iterable<T>;
  label: string;
  name: string;
  invalid?: boolean;
  children: ListBoxProps<T>["children"];
} & Omit<SelectProps<T>, "children">) => {
  return (
    <Select {...props} className={"flex flex-col gap-2 w-full col-span-12"}>
      <Label className={twJoin(Style["label"])} htmlFor={name}>
        {label}
      </Label>
      <Button
        className={twMerge(Style["input"], invalid ? Style["invalid"] : null)}
      >
        <SelectValue />
        <span aria-hidden="true" className="text-[10px] my-auto mx-3">
          ▼
        </span>
      </Button>
      <Popover
        className={twMerge(
          "flex flex-col gap-2 p-2 w-72 rounded-sm",
          "bg-black-200/70 backdrop-blur-md z-dropdown remove_outline"
        )}
      >
        <ListBox items={items} className="remove_outline">
          {children}
        </ListBox>
      </Popover>
    </Select>
  );
};
export default SelectUi;
```

---

## File: index.tsx

- Path: `/root/git/portfolio_full_stack/components/ui/form/index.tsx`
- Size: 337.00 B
- Extension: .tsx
- Lines of code: 9

```tsx
export { default as Form } from "./Form";
export { default as Field } from "./Field";
export { default as Select } from "./Select";
export { default as Item } from "./Item";
export {
  CheckboxUi as CheckBox,
  CheckboxGroupUi as CheckboxGroup
} from "./CheckBox";
export { RadioUi as Radio, RadioGroupUi as RadioGroup } from "./Radio";
```

---

## File: Icon.tsx

- Path: `/root/git/portfolio_full_stack/components/ui/icon/Icon.tsx`
- Size: 691.00 B
- Extension: .tsx
- Lines of code: 27

```tsx
import React, { SVGAttributes, memo } from "react";
import Icons, { IconNames, IconProps as DefaultIconProps } from "./IconsList";
interface IconProps extends SVGAttributes<SVGElement>, DefaultIconProps {
  name: IconNames;
  className?: string;
}
const Icon: React.FC<IconProps> = ({
  size,
  name,
  className,
  ...props
}: IconProps) => {
  const IconComponent = Icons[name];
  if (!IconComponent) {
    console.warn(`Icon with name ${name} does not exist.`);
    return null;
  }
  const iconProps = {
    width: size,
    height: size,
    className,
    ...props
  };
  return <IconComponent {...iconProps} />;
};
const MemoizedIcon = memo(Icon);
export default MemoizedIcon;
```

---

## File: IconsList.tsx

- Path: `/root/git/portfolio_full_stack/components/ui/icon/IconsList.tsx`
- Size: 1.15 KB
- Extension: .tsx
- Lines of code: 32

```tsx
import {
  IconChevronRight,
  IconChevronDown,
  IconExclamationCircle,
  IconCornerLeftDown,
  IconArrowUpRight,
  IconShare,
  IconArrowBigRightFilled
} from "@tabler/icons-react";
import React, { SVGAttributes } from "react";
export interface IconProps extends SVGAttributes<SVGElement> {
  color?: string;
  size?: number | string;
}
export const ListIconComponents = {
  IconChevronDown: (props: IconProps) => <IconChevronDown {...props} />,
  IconChevronRight: (props: IconProps) => <IconChevronRight {...props} />,
  IconExclamationCircle: (props: IconProps) => (
    <IconExclamationCircle {...props} />
  ),
  IconCornerLeftDown: (props: IconProps) => <IconCornerLeftDown {...props} />,
  IconArrowUpRight: (props: IconProps) => <IconArrowUpRight {...props} />,
  IconShare: (props: IconProps) => <IconShare {...props} />,
  IconArrowBigRightFilled: (props: IconProps) => (
    <IconArrowBigRightFilled {...props} />
  )
} as const;
export type IconNames = keyof typeof ListIconComponents;
export default ListIconComponents as {
  [key in IconNames]: (props: IconProps) => JSX.Element;
};
```

---

## File: index.tsx

- Path: `/root/git/portfolio_full_stack/components/ui/icon/index.tsx`
- Size: 88.00 B
- Extension: .tsx
- Lines of code: 2

```tsx
export { default as Icon } from "./Icon";
export { type IconNames } from "./IconsList";
```

---

## File: Image.tsx

- Path: `/root/git/portfolio_full_stack/components/ui/image/Image.tsx`
- Size: 742.00 B
- Extension: .tsx
- Lines of code: 31

```tsx
import Image, { ImageProps } from "next/image";
import React from "react";
const images: {
  [key: string]: { src: string; width: number; height: number };
} = {
  test: {
    src: "/images/test.png",
    width: 100,
    height: 100
  }
} as const;
type ImageName = keyof typeof images;
interface Props extends Omit<ImageProps, "src"> {
  src: ImageName | ImageProps["src"];
}
const ImageUi = ({ alt, src, ...props }: Props) => {
  const imageProps =
    typeof src == "string" && Object.keys(images).includes(src)
      ? images[src]
      : { src };
  if (!imageProps) return null;
  return (
    <Image
      alt={alt}
      {...imageProps}
      src={imageProps.src as string}
      {...props}
    />
  );
};
export default ImageUi;
```

---

## File: index.tsx

- Path: `/root/git/portfolio_full_stack/components/ui/image/index.tsx`
- Size: 35.00 B
- Extension: .tsx
- Lines of code: 1

```tsx
export { default } from "./Image";
```

---

## File: Logo.tsx

- Path: `/root/git/portfolio_full_stack/components/ui/logo/Logo.tsx`
- Size: 646.00 B
- Extension: .tsx
- Lines of code: 27

```tsx
import Link, { LinkProps } from "next/link";
import React from "react";
import Image from "@/components/ui/image";
interface LogoProps extends Omit<LinkProps, "size" | "degree" | "children"> {
  alt: string;
  size: number;
  mode: "dark" | "white";
}
const Logo = ({ alt, size, ...props }: LogoProps) => {
  return (
    <>
      <Link
        className="flex flex-row items-center justify-center gap-2"
        {...props}
      >
        <Image
          className="w-12 xxs:w-14"
          src="/logo/logo.svg"
          alt={alt}
          width={size}
          height={size}
        />
      </Link>
    </>
  );
};
export default Logo;
```

---

## File: index.tsx

- Path: `/root/git/portfolio_full_stack/components/ui/logo/index.tsx`
- Size: 34.00 B
- Extension: .tsx
- Lines of code: 1

```tsx
export { default } from "./Logo";
```

---

## File: Navbar.tsx

- Path: `/root/git/portfolio_full_stack/components/ui/navbar/Navbar.tsx`
- Size: 5.30 KB
- Extension: .tsx
- Lines of code: 192

```tsx
import { useRouter } from "next/router";
import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useRef,
  useMemo
} from "react";
import { useHover } from "react-aria";
import { useIsomorphicLayoutEffect } from "react-use";
import { twMerge } from "tailwind-merge";
import { containerStyle } from "@/components/ui/container";
import { Link as LinkUi } from "@/components/ui/typography";
import { useLenis } from "@/lib/Lenis";
import { gsap } from "@/utils/gsap";
import {
  NavbarProps,
  NavbarType,
  BrandProps,
  ContentProps,
  ItemProps,
  LinkProps
} from "./Navbar.type";
import { zIndex } from "../conf";
const Navbar: NavbarType = ({
  children,
  size,
  className,
  inTopOfScroll,
  ...props
}: NavbarProps) => {
  const delta = useRef<number>(0);
  const lastScrollY = useRef<number>(0);
  const [active, setActive] = useState<boolean>(false);
  const [positionScroll, setPositionScroll] = useState<number>(0);
  useLenis(({ scroll }) => {
    if (typeof scroll == "undefined" || scroll < 0) return;
    setPositionScroll(scroll);
  });
  useIsomorphicLayoutEffect(() => {
    if (positionScroll < 140) {
      setActive(false);
    } else {
      setActive(true);
    }
    const diff = Math.abs(positionScroll - lastScrollY.current);
    if (positionScroll >= lastScrollY.current) {
      delta.current = delta.current >= 10 ? 10 : delta.current + diff;
    } else {
      delta.current = delta.current <= -10 ? -10 : delta.current - diff;
    }
    if (delta.current >= 10 && positionScroll > 200) {
      gsap.to(".header-gsap", {
        duration: 0.3,
        y: -100,
        opacity: 0,
        ease: "power2.inOut"
      });
    } else if (delta.current <= -10 || positionScroll < 200) {
      gsap.to(".header-gsap", {
        duration: 0.3,
        y: 0,
        opacity: 1,
        ease: "power2.inOut"
      });
    }
    lastScrollY.current = positionScroll;
  }, [positionScroll]);
  const padding = useMemo(
    () => (active && !inTopOfScroll ? "0.8rem" : "1rem"),
    [active, inTopOfScroll]
  );
  const backdropFilter = useMemo(
    () => (active && !inTopOfScroll ? "blur(40px)" : "blur(0px)"),
    [active, inTopOfScroll]
  );
  const backgroundColor = useMemo(
    () => (active && !inTopOfScroll ? "#1f1f1f90" : "transparent"),
    [active, inTopOfScroll]
  );
  return (
    <header
      className={twMerge(
        "fixed top-0 left-0 w-full max-w-[100vw] py-4 z-header",
        className,
        zIndex.navbar,
        "header-gsap will-change-transform-animation"
      )}
      style={{
        paddingTop: padding,
        paddingBottom: padding,
        backdropFilter: backdropFilter,
        backgroundColor: backgroundColor
      }}
      {...props}
    >
      <div
        className={twMerge(
          "flex flex-row items-center justify-between w-full",
          containerStyle({ size })
        )}
      >
        {children}
      </div>
    </header>
  );
};
const Brand = ({ children, className }: BrandProps) => {
  return (
    <>
      <div className={twMerge(className)}>{children}</div>
    </>
  );
};
const ContentActiveItem = createContext<{
  activeItem: string;
  handleItemClick: (item: string) => void;
} | null>(null);
const Content = ({ children, className, ...props }: ContentProps) => {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState<string>("");
  useEffect(() => {
    const activeItem = router.pathname.split("/")[1];
    if (!activeItem) return;
    if (activeItem === "") {
      setActiveItem("home");
    }
    setActiveItem(activeItem);
  }, [router.pathname]);
  const handleItemClick = (item: string) => {
    setActiveItem(item);
  };
  return (
    <>
      <ContentActiveItem.Provider value={{ activeItem, handleItemClick }}>
        <div
          className={twMerge("flex flex-row items-center", className)}
          {...props}
        >
          {children}
        </div>
      </ContentActiveItem.Provider>
    </>
  );
};
const useActiveItem = (href: string) => {
  const activeItem = useContext(ContentActiveItem);
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    if (activeItem) {
      setIsActive(activeItem.activeItem === href);
    }
  }, [activeItem, href]);
  return { isActive, handlerActiveItem: activeItem?.handleItemClick } as const;
};
const Item = ({ children, href }: ItemProps) => {
  const { isActive, handlerActiveItem } = useActiveItem(href.toString());
  if (!handlerActiveItem) return <></>;
  return <>{children({ isActive, handlerActiveItem })}</>;
};
const Link = ({ children, href, className, ...props }: LinkProps) => {
  const { isActive, handlerActiveItem } = useActiveItem(href.toString());
  const [data, setData] = useState<object>();
  const { hoverProps } = useHover({
    onHoverStart: () => {
      setData({ "data-entering": true, "data-exiting": false });
    },
    onHoverEnd: () => {
      setData({ "data-entering": false, "data-exiting": true });
    }
  });
  if (!handlerActiveItem) return null;
  return (
    <LinkUi
      href={href}
      {...hoverProps}
      {...data}
      className={twMerge(className, "whitespace-nowrap")}
      {...props}
    >
      {typeof children === "function"
        ? children(isActive, handlerActiveItem)
        : children}
    </LinkUi>
  );
};
Navbar.Brand = Brand;
Navbar.Content = Content;
Navbar.Item = Item;
Navbar.Link = Link;
export default Navbar;
```

---

## File: Navbar.type.ts

- Path: `/root/git/portfolio_full_stack/components/ui/navbar/Navbar.type.ts`
- Size: 1.16 KB
- Extension: .ts
- Lines of code: 40

```ts
import { VariantProps } from "class-variance-authority";
import React from "react";
import { containerStyle } from "@/components/ui/container";
import { LinkPropsExtended } from "@/components/ui/typography/Link";
export type NavbarProps = {
  children: React.ReactNode;
  className?: string;
  inTopOfScroll?: boolean;
} & VariantProps<typeof containerStyle>;
export type BrandProps = {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
};
export type ContentProps = {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
};
export type ItemProps = {
  children: (p: {
    isActive?: boolean;
    handlerActiveItem?: (item: string) => void;
  }) => React.ReactNode | React.ReactNode[];
  href: string;
};
export type LinkProps = {
  children:
    | ((
        active: boolean,
        handleItemClick: (item: string) => void
      ) => React.ReactNode | React.ReactNode[] | string)
    | React.ReactNode
    | React.ReactNode[]
    | string;
} & LinkPropsExtended;
export type NavbarType = React.FC<NavbarProps> & {
  Brand: React.FC<BrandProps>;
  Content: React.FC<ContentProps>;
  Item: React.FC<ItemProps>;
  Link: React.FC<LinkProps>;
};
```

---

## File: index.tsx

- Path: `/root/git/portfolio_full_stack/components/ui/navbar/index.tsx`
- Size: 36.00 B
- Extension: .tsx
- Lines of code: 1

```tsx
export { default } from "./Navbar";
```

---

## File: Noise.tsx

- Path: `/root/git/portfolio_full_stack/components/ui/noise/Noise.tsx`
- Size: 1.02 KB
- Extension: .tsx
- Lines of code: 36

```tsx
import { motion } from "framer-motion";
import React from "react";
import { twMerge } from "tailwind-merge";
const Noise = ({
  position = "fixed",
  className = "opacity-70"
}: {
  position?: "fixed" | "absolute";
  className?: string;
}) => {
  const noiseAnimation = {
    x: ["0%", "5%", "10%", "5%", "0%", "-5%", "-10%", "-5%", "0%", "5%", "0%"],
    y: ["0%", "-5%", "0%", "5%", "10%", "5%", "0%", "-5%", "-10%", "-5%", "0%"],
    transition: {
      duration: 1,
      ease: "linear",
      repeat: Infinity
    }
  };
  return (
    <motion.div
      animate={noiseAnimation}
      className={twMerge(
        "bg-noise",
        className || "opacity-70",
        "-top-1/2 -left-1/2 -bottom-1/2 -right-1/2 bg-repeat",
        "will-change-transform-animation",
        'bg-[url("/images/noise-transparent.png")] bg-center bg-repeat',
        position == "fixed"
          ? "fixed w-[300vw] h-[300vh] visible z-bg"
          : "absolute w-[200%] h-[200%] overflow-none z-50"
      )}
    ></motion.div>
  );
};
export default Noise;
```

---

## File: index.tsx

- Path: `/root/git/portfolio_full_stack/components/ui/noise/index.tsx`
- Size: 35.00 B
- Extension: .tsx
- Lines of code: 1

```tsx
export { default } from "./Noise";
```

---

## File: index.tsx

- Path: `/root/git/portfolio_full_stack/components/ui/overlay/index.tsx`
- Size: 92.00 B
- Extension: .tsx
- Lines of code: 2

```tsx
export { default as Modal } from "./modal";
export { default as Popover } from "./popover";
```

---

## File: Preloader.context.tsx

- Path: `/root/git/portfolio_full_stack/components/ui/preloader/Preloader.context.tsx`
- Size: 10.04 KB
- Extension: .tsx
- Lines of code: 373

```tsx
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useRouter } from "next/router";
import { useTranslations } from "next-i18next";
import React, {
  createContext,
  useState,
  useEffect,
  useRef,
  ElementRef,
  Suspense,
  useCallback,
  ReactNode
} from "react";
import { useIsomorphicLayoutEffect } from "react-use";
import { twMerge } from "tailwind-merge";
import Container from "@/components/ui/container";
import Noise from "@/components/ui/noise";
import { text, title } from "@/components/ui/typography";
import { gsap } from "@/utils/gsap";
const END_LOADING_IN = 99;
const INITIAL_PERCENT = 1;
const LOADING_KEY = "loadingProvider";
export const LoadingContext = createContext<{
  addLoadingComponent: (key: string) => void;
  removeLoadingComponent: (key: string) => void;
  isLoading: boolean;
  endLoading: boolean;
}>({
  addLoadingComponent: () => {},
  removeLoadingComponent: () => {},
  isLoading: true,
  endLoading: false
});
type LoadingElement = {
  [key: string]: boolean;
};
export function LoadingProvider({
  fontReady,
  children
}: {
  children: ReactNode;
  fontReady: boolean;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [endLoading, setEndLoading] = useState(false);
  const [loadingComponentList, setLoadingComponentList] =
    useState<LoadingElement>({});
  const { asPath } = useRouter();
  const loadingState = useCallback(() => {
    const loadingValues = Object.values(loadingComponentList);
    const inLoadingState = loadingValues.filter(item => item === true);
    setIsLoading(inLoadingState.length > 0);
  }, [loadingComponentList]);
  useEffect(() => {
    const html = document.querySelector("html");
    if (html) {
      html.dataset["is_loading"] = (!endLoading).toString();
    }
  }, [endLoading, loadingComponentList]);
  const addLoadingComponent = useCallback(
    (key: string) => {
      setLoadingComponentList(prev => {
        if (prev.hasOwnProperty(key)) return prev;
        const updated = { ...prev, [key]: true };
        loadingState();
        return updated;
      });
    },
    [loadingState]
  );
  const removeLoadingComponent = useCallback(
    (key: string) => {
      setLoadingComponentList(prev => {
        if (!prev[key]) return prev;
        const updated = { ...prev, [key]: false };
        loadingState();
        return updated;
      });
    },
    [loadingState]
  );
  useEffect(() => {
    const timer = setTimeout(() => {
      const values = Object.values(loadingComponentList);
      if (values.length == 1 && loadingComponentList[LOADING_KEY]) {
        setIsLoading(false);
      }
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [loadingComponentList]);
  useEffect(() => {
    addLoadingComponent(LOADING_KEY);
    return () => {
      removeLoadingComponent(LOADING_KEY);
    };
  }, [asPath, addLoadingComponent, removeLoadingComponent]);
  return (
    <LoadingContext.Provider
      value={{
        addLoadingComponent,
        removeLoadingComponent,
        isLoading,
        endLoading
      }}
    >
      <Preloader
        isLoading={isLoading}
        setEndLoading={setEndLoading}
        fontReady={fontReady}
      />
      <Suspense>{children}</Suspense>
    </LoadingContext.Provider>
  );
}
const Preloader = ({
  isLoading,
  setEndLoading,
  fontReady
}: {
  isLoading: boolean;
  fontReady: boolean;
  setEndLoading: (value: boolean) => void;
}) => {
  const { t } = useTranslations();
  const ref = useRef<ElementRef<"span">>(null);
  const [endLoadingProgress, setEndLoadingProgress] = useState(false);
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        repeat: -1,
        paused: true,
        repeatDelay: 0.5
      });
      const DELAY = 1;
      const OFFSET = 0.3;
      const FRAME_DURATION = 0.2;
      tl.to(".item-gsap", {
        keyframes: [
          { top: "100%", duration: FRAME_DURATION },
          { top: "0%" },
          { top: "-100%", delay: DELAY, duration: FRAME_DURATION }
        ],
        ease: "power2.out",
        stagger: DELAY + OFFSET
      });
      if (fontReady) {
        tl.play();
      }
      return () => {
        tl.kill();
      };
    }, ref);
    return () => ctx.revert();
  }, [ref, fontReady]);
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(self => {
      const skew = 2;
      const tl = gsap
        .timeline({
          paused: true
        })
        .fromTo(
          [".element-content-gsap", ".element-counter-gsap"],
          {
            yPercent: 0,
            opacity: 1
          },
          {
            yPercent: -10,
            duration: 0.4,
            opacity: 0
          }
        )
        .fromTo(
          ".element-container",
          {
            yPercent: 0,
            skewY: 0
          },
          {
            duration: 0.5,
            yPercent: -120,
            ease: "power2.out",
            skewY: skew,
            onComplete: () => {
              setEndLoading(true);
            }
          }
        )
        .fromTo(
          ".element-bg",
          {
            yPercent: 0,
            skewY: 0
          },
          {
            skewY: skew,
            duration: 0.5,
            yPercent: -120,
            ease: "power2.out"
          }
        );
      self.add("endPreload", () => {
        tl.play();
      });
      return () => {
        tl.kill();
      };
    }, ref);
    if (endLoadingProgress) {
      ctx["endPreload"]();
    }
    return () => ctx.revert();
  }, [ref, isLoading, setEndLoading, endLoadingProgress]);
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap
        .timeline({
          paused: true
        })
        .fromTo(
          ".text-loader-gsap",
          {
            autoAlpha: 0
          },
          {
            autoAlpha: 1,
            duration: 0.5,
            ease: "power2.out"
          }
        );
      if (fontReady) {
        tl.play();
      }
      return () => {
        tl.kill();
      };
    });
    return () => ctx.revert();
  }, [fontReady]);
  return (
    <span ref={ref} className="contents">
      <div
        className={twMerge(
          "w-screen cursor-none  h-screen overflow-hidden",
          "z-preload bg-white-400",
          " fixed",
          "element-container"
        )}
      >
        <Container
          as="div"
          size="lg"
          className={twMerge(
            "h-screen pt-4 sm:pt-8",
            "flex flex-col justify-between"
          )}
        >
          <div className="flex flex-col gap-0 sm:gap-1">
            <span className="invisible py-1 element-content-gsap text-loader-gsap">
              {
                <h6
                  className={title({
                    weight: "bold",
                    mode: "exchanged",
                    size: "h6",
                    degree: "4"
                  })}
                  suppressHydrationWarning
                >
                  {t("loading.intro")}
                </h6>
              }
            </span>
            <ul className="relative h-6 overflow-hidden element-content-gsap">
              {Array.from({ length: 5 }).map((_, index) => (
                <li
                  suppressHydrationWarning
                  key={index}
                  className={text(
                    {
                      size: "md",
                      weight: "bold"
                    },
                    "item-gsap capitalize will-change-transform-animation absolute left-0 right-0 top-[100%]",
                    index == 4 ? "text-primary-500" : "text-black-300/80"
                  )}
                >
                  {t(`loading.message_${index + 1}`)}
                </li>
              ))}
            </ul>
          </div>
          <div
            className={twMerge(
              "w-full",
              "text-loader-gsap invisible",
              "flex flex-row justify-end",
              "relative"
            )}
          >
            <div
              className={twMerge(
                "flex flex-row gap-2 flex-nowrap",
                "uppercase element-counter-gsap",
                "font-sans font-black text-black-500 will-change-transform-animation",
                "text-[4.1rem] xxs:text-[6rem] md:text-[7.4rem] lg:text-[8.4rem] xl:text-[10rem] align-baseline leading-[70%]"
              )}
            >
              <Percent
                isLoading={isLoading}
                setEndLoadingProgress={setEndLoadingProgress}
              />
              %
            </div>
          </div>
        </Container>
        <Noise />
      </div>
      <div className="fixed w-screen h-screen bg-primary-500 element-bg z-preload_bg"></div>
    </span>
  );
};
const Percent = ({
  isLoading,
  setEndLoadingProgress
}: {
  isLoading: boolean;
  setEndLoadingProgress: (b: boolean) => void;
}) => {
  const controls = useAnimation();
  const [percent, setPercent] = useState(INITIAL_PERCENT);
  useEffect(() => {
    if (percent < END_LOADING_IN) {
      const increment = isLoading ? 1 : 2.5;
      const newPercent = Math.floor(
        Math.min(percent + increment, END_LOADING_IN)
      );
      setPercent(newPercent);
      controls.start({ opacity: 1, y: 0, transition: { duration: 0.5 } });
      if (newPercent >= END_LOADING_IN) {
        setEndLoadingProgress(true);
      }
    }
  }, [percent, isLoading, controls, setEndLoadingProgress]);
  useEffect(() => {
    controls.start({
      y: 0,
      opacity: 1,
      transition: { duration: 0.04 }
    });
  }, [percent, controls]);
  return (
    <div className="flex flex-row gap-0 py-2 overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.span
          initial={{ y: 40, opacity: 0 }}
          animate={controls}
          exit={{ y: -100, opacity: 0 }}
          className="relative flex items-center gap-1 will-change-transform-animation"
        >
          <p className="flex flex-col w-auto leading-3 align-middle text-end">
            {percent}
          </p>
        </motion.span>
      </AnimatePresence>
    </div>
  );
};
```

---

## File: Preloader.hook.tsx

- Path: `/root/git/portfolio_full_stack/components/ui/preloader/Preloader.hook.tsx`
- Size: 520.00 B
- Extension: .tsx
- Lines of code: 12

```tsx
import { useContext } from "react";
import { LoadingContext } from "./Preloader.context";
export function usePreloader() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    console.warn(
      "react-locomotive-scroll: the context is missing. You may be using the hook without registering LocomotiveScrollProvider, or you may be using the hook in a component which is not wrapped by LocomotiveScrollProvider."
    );
  }
  return context;
}
usePreloader.displayName = "usePreloader";
```

---

## File: index.ts

- Path: `/root/git/portfolio_full_stack/components/ui/preloader/index.ts`
- Size: 161.00 B
- Extension: .ts
- Lines of code: 3

```ts
export { LoadingProvider } from "./Preloader.context";
export { usePreloader } from "./Preloader.hook";
```

---

## File: ResizablePanel.tsx

- Path: `/root/git/portfolio_full_stack/components/ui/resizablePanel/ResizablePanel.tsx`
- Size: 1.85 KB
- Extension: .tsx
- Lines of code: 79

```tsx
import { motion, AnimatePresence } from "framer-motion";
import React, { LegacyRef } from "react";
import { useMeasure } from "react-use";
import { twMerge } from "tailwind-merge";
const ignoreCircularReferences = () => {
  const cache = new WeakSet();
  return (key: string, value: WeakKey) => {
    if (key.startsWith("_")) return;
    if (typeof value === "object" && value !== null) {
      if (cache.has(value)) {
        return;
      }
      cache.add(value);
    }
    return value;
  };
};
const ResizablePanel = ({
  children,
  duration = 0.4,
  y = 20
}: {
  children: React.ReactElement | JSX.Element | boolean | null;
  duration?: number;
  y?: number;
}) => {
  const [ref, { height }] = useMeasure<Element>();
  const variationResizablePanel = {
    initial: {
      opacity: 0,
      y: -1 * y,
      height: 0
    },
    animate: {
      opacity: 1,
      y: 0,
      height: "auto",
      transition: {
        duration: duration,
        delay: duration
      }
    },
    exit: {
      y: -1 * y,
      opacity: 0,
      height: 0,
      transition: {
        duration: duration
      }
    }
  };
  return (
    <AnimatePresence initial={false} mode="sync">
      <motion.div
        animate={{
          height: height || "auto",
          transition: { duration: duration / 2 }
        }}
        className="relative overflow-hidden"
      >
        <motion.div
          key={JSON.stringify(children, ignoreCircularReferences())}
          variants={variationResizablePanel}
          animate="animate"
          exit="exit"
          initial="initial"
        >
          <div
            ref={ref as LegacyRef<HTMLDivElement>}
            className={twMerge(height ? "relative" : "absolute", "px-0 pb-0")}
          >
            {children}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
export default ResizablePanel;
```

---

## File: index.tsx

- Path: `/root/git/portfolio_full_stack/components/ui/resizablePanel/index.tsx`
- Size: 44.00 B
- Extension: .tsx
- Lines of code: 1

```tsx
export { default } from "./ResizablePanel";
```

---

## File: Link.tsx

- Path: `/root/git/portfolio_full_stack/components/ui/typography/Link.tsx`
- Size: 899.00 B
- Extension: .tsx
- Lines of code: 44

```tsx
import LinkNext, { LinkProps } from "next/link";
import React, { FC } from "react";
import { CursorContent } from "@/components/ui/cursor";
import { TextPropsExtended, text } from "./Typography";
export interface LinkPropsExtended extends TextPropsExtended, LinkProps {
  className?: string;
  children: React.ReactNode;
}
export const Link: FC<LinkPropsExtended> = ({
  weight,
  degree,
  size,
  mode,
  href,
  className,
  children,
  ...props
}) => {
  return (
    <CursorContent
      name="cursorPointer_header_email"
      component="CursorEvent"
      props={{
        event: "pointer"
      }}
      {...props}
    >
      <LinkNext
        href={href}
        className={text(
          {
            weight,
            degree,
            size,
            mode
          },
          className
        )}
      >
        {children}
      </LinkNext>
    </CursorContent>
  );
};
```

---

## File: Typography.ts

- Path: `/root/git/portfolio_full_stack/components/ui/typography/Typography.ts`
- Size: 3.60 KB
- Extension: .ts
- Lines of code: 162

```ts
import { cva, VariantProps } from "class-variance-authority";
import { twMerge, ClassNameValue } from "tailwind-merge";
import Style from "./Typography.module.scss";
const textDefault = "inline-block align-middle";
const fontFamilyTitle = "font-sans";
const fontFamilyText = "font-sans";
export const typographyColorDegree = cva("", {
  variants: {
    mode: {
      normal: "",
      exchanged: ""
    },
    degree: {
      "1": "",
      "2": "",
      "3": "",
      "4": ""
    }
  },
  defaultVariants: {
    mode: "normal",
    degree: "1"
  },
  compoundVariants: [
    {
      mode: "normal",
      degree: "1",
      className: "text-white-100"
    },
    {
      mode: "normal",
      degree: "2",
      className: "text-white-600"
    },
    {
      mode: "normal",
      degree: "3",
      className: "text-white-700"
    },
    {
      mode: "normal",
      degree: "4",
      className: "text-white-800"
    },
    {
      mode: "exchanged",
      degree: "1",
      className: "text-black-100"
    },
    {
      mode: "exchanged",
      degree: "2",
      className: "text-black-400"
    },
    {
      mode: "exchanged",
      degree: "3",
      className: "text-black-700"
    },
    {
      mode: "exchanged",
      degree: "4",
      className: "text-black-800"
    }
  ]
});
export type TypographyColorProps = VariantProps<typeof typographyColorDegree>;
export const displayStyle = cva(
  [textDefault, fontFamilyTitle, Style["display"]],
  {
    variants: {
      weight: {
        bold: "font-black",
        semibold: "font-bold",
        medium: "font-regular"
      },
      size: {
        xl: Style["display_xl"],
        lg: Style["display_lg"],
        md: Style["display_md"]
      }
    },
    defaultVariants: {
      weight: "bold"
    }
  }
);
export type DisplayPropsExtended = VariantProps<typeof displayStyle> &
  TypographyColorProps;
export const titleStyle = cva([textDefault, fontFamilyTitle, Style["title"]], {
  variants: {
    weight: {
      bold: "font-extrabold",
      semibold: "font-bold",
      medium: "font-medium"
    },
    size: {
      h1: Style["title_h1"],
      h2: Style["title_h2"],
      h3: Style["title_h3"],
      h4: Style["title_h4"],
      h5: Style["title_h5"],
      h6: Style["title_h6"]
    }
  },
  defaultVariants: {
    weight: "bold"
  }
});
export type TitlePropsExtended = VariantProps<typeof titleStyle> &
  TypographyColorProps;
export const textStyle = cva([textDefault, fontFamilyText, Style["text"]], {
  variants: {
    weight: {
      bold: "font-black",
      semibold: "font-semibold",
      medium: "font-medium"
    },
    size: {
      xl: Style["text_xl"],
      lg: Style["text_lg"],
      md: Style["text_md"],
      sm: Style["text_sm"],
      xs: Style["text_xs"],
      xxs: Style["text_xxs"],
      auto: Style["text_auto"]
    }
  },
  defaultVariants: {
    weight: "medium",
    size: "auto"
  }
});
export type TextPropsExtended = VariantProps<typeof textStyle> &
  TypographyColorProps;
export const title = (
  { mode, degree, weight, size }: TitlePropsExtended,
  ...className: ClassNameValue[]
) =>
  twMerge(
    titleStyle({ weight, size }),
    typographyColorDegree({ mode, degree }),
    ...className
  );
export const display = (
  { mode, degree, weight, size }: DisplayPropsExtended,
  ...className: ClassNameValue[]
) =>
  twMerge(
    displayStyle({ weight, size }),
    typographyColorDegree({ mode, degree }),
    ...className
  );
export const text = (
  { mode, degree, weight, size }: TextPropsExtended,
  ...className: ClassNameValue[]
) =>
  twMerge(
    textStyle({ weight, size }),
    typographyColorDegree({ mode, degree }),
    ...className
  );
```

---

## File: index.ts

- Path: `/root/git/portfolio_full_stack/components/ui/typography/index.ts`
- Size: 260.00 B
- Extension: .ts
- Lines of code: 9

```ts
export { text, title, display } from "./Typography";
export { Link } from "./Link";
export type { LinkPropsExtended } from "./Link";
export type {
  TextPropsExtended,
  TitlePropsExtended,
  DisplayPropsExtended,
  TypographyColorProps
} from "./Typography";
```

---

## File: Menu.tsx

- Path: `/root/git/portfolio_full_stack/components/ui/collection/menu/Menu.tsx`
- Size: 2.70 KB
- Extension: .tsx
- Lines of code: 119

```tsx
import React, { useState, createContext, useContext } from "react";
import {
  MenuTrigger,
  Button,
  Popover,
  Menu,
  ListBoxItem as Item
} from "react-aria-components";
import type {
  MenuTriggerProps,
  ButtonProps,
  PopoverProps,
  MenuProps,
  ListBoxItemProps as ItemProps
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { mergeClassName } from "@/helpers/className";
const MenuContext = createContext<{
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isOpen: false,
  setOpen: () => {}
});
const MenuUi = ({
  children,
  ...props
}: { children: React.ReactNode | React.ReactNode[] } & MenuTriggerProps) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  return (
    <MenuTrigger {...props}>
      <MenuContext.Provider value={{ isOpen, setOpen }}>
        {children}
      </MenuContext.Provider>
    </MenuTrigger>
  );
};
const ButtonUi = ({
  children,
  className = "",
  ...props
}:
  | ({ children: ({ open }: { open: () => void }) => React.ReactElement } & {
      className?: string;
    })
  | ({ children: React.ReactNode } & Omit<
      ButtonProps,
      "children"
    >)): React.ReactElement => {
  const { setOpen } = useContext(MenuContext);
  return typeof children == "function" ? (
    children({ open: () => setOpen(true) })
  ) : (
    <Button
      className={mergeClassName("outline-none", className)}
      onPress={() => setOpen(true)}
      {...props}
    >
      {children}
    </Button>
  );
};
const MenuPopoverUi = ({
  className,
  children,
  ...props
}: {
  children:
    | (
        | (({ close }: { close: () => void }) => React.ReactNode)
        | React.ReactNode
      )
    | React.ReactNode;
} & Omit<PopoverProps, "children"> &
  React.RefAttributes<HTMLElement>) => {
  return (
    <Popover className={mergeClassName("outline-none", className)} {...props}>
      {typeof children == "function" ? (
        <MenuContext.Consumer>
          {value => children({ close: () => value.setOpen(false) })}
        </MenuContext.Consumer>
      ) : (
        children
      )}
    </Popover>
  );
};
const MenuCollectionUi = <
  T extends {
    key: string;
  }
>({
  children,
  className,
  ...props
}: MenuProps<T> & React.RefAttributes<HTMLDivElement>) => {
  return (
    <Menu className={twMerge(className, "outline-none")} {...props}>
      {children}
    </Menu>
  );
};
const MenuItemUi = <
  T extends {
    key: string;
  }
>({
  className,
  ...props
}: ItemProps<T>) => {
  return (
    <Item {...props} className={mergeClassName("outline-none", className)} />
  );
};
MenuUi.Button = ButtonUi;
MenuUi.Popover = MenuPopoverUi;
MenuUi.Collection = MenuCollectionUi;
MenuUi.Item = MenuItemUi;
export default MenuUi;
```

---

## File: index.tsx

- Path: `/root/git/portfolio_full_stack/components/ui/collection/menu/index.tsx`
- Size: 34.00 B
- Extension: .tsx
- Lines of code: 1

```tsx
export { default } from "./Menu";
```

---

## File: CircleText.tsx

- Path: `/root/git/portfolio_full_stack/components/ui/deco/circleText/CircleText.tsx`
- Size: 1.44 KB
- Extension: .tsx
- Lines of code: 54

```tsx
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
interface CircleTextProps {
  text: string;
  size: number;
  radius: number;
  children: React.ReactNode;
}
const CircleText = ({ text, size, radius, children }: CircleTextProps) => {
  const [characters, setCharacters] = useState<(string | JSX.Element)[]>([]);
  const diameter = radius * size * 21;
  useEffect(() => {
    const chars = text.split("");
    const elements: (string | JSX.Element)[] = [];
    chars.forEach((char, index) => {
      elements.push(
        <span
          style={{
            fontSize: `${size}rem`,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) rotate(${(360 / chars.length) * index}deg) translateY(${-radius}ch)`
          }}
          key={index}
        >
          {char}
        </span>
      );
    });
    setCharacters(elements);
  }, [text, size, radius]);
  return (
    <motion.div
      viewport={{ once: true }}
      initial="visible"
      className="relative"
      aria-hidden="true"
      style={{
        width: `${diameter}px`,
        height: `${diameter}px`
      }}
    >
      {characters}
      <div
        className="flex flex-col items-center justify-center min-w-full min-h-full"
        style={{ translate: "translate(-50%, -50%)" }}
      >
        {children}
      </div>
    </motion.div>
  );
};
export default CircleText;
```

---

## File: index.tsx

- Path: `/root/git/portfolio_full_stack/components/ui/deco/circleText/index.tsx`
- Size: 40.00 B
- Extension: .tsx
- Lines of code: 1

```tsx
export { default } from "./CircleText";
```

---

## File: Modal.tsx

- Path: `/root/git/portfolio_full_stack/components/ui/overlay/modal/Modal.tsx`
- Size: 3.33 KB
- Extension: .tsx
- Lines of code: 128

```tsx
import React, { useState, useContext, createContext } from "react";
import {
  Button,
  Dialog,
  DialogTrigger,
  Modal,
  ModalOverlay,
  ModalOverlayProps
} from "react-aria-components";
import { mergeClassName } from "@/helpers/className";
const ModalContext = createContext<{ isOpen: boolean; handler: () => void }>({
  isOpen: false,
  handler: () => console.log("error")
});
const ModalUi = ({
  children,
  isOpenExternal,
  menuHandler,
  ...props
}: {
  children: React.ReactNode[] | React.ReactNode;
  isOpenExternal?: boolean;
  menuHandler?: () => void;
}) => {
  const [isOpen, setOpen] = useState(false);
  const menuHandlerIntern = () => {
    setOpen(!isOpen);
  };
  if (menuHandler === undefined && isOpenExternal === undefined)
    throw new Error("ModalUi: isOpen or handler is undefined");
  if (typeof isOpenExternal !== "boolean" || menuHandler === undefined) {
    return (
      <DialogTrigger {...props}>
        <ModalContext.Provider value={{ isOpen, handler: menuHandlerIntern }}>
          {children}
        </ModalContext.Provider>
      </DialogTrigger>
    );
  }
  return (
    <DialogTrigger {...props}>
      <ModalContext.Provider
        value={{ isOpen: isOpenExternal, handler: menuHandler }}
      >
        {children}
      </ModalContext.Provider>
    </DialogTrigger>
  );
};
const ButtonUi = ({
  children,
  className = "",
  ...props
}: {
  children:
    | React.ReactNode
    | (({
        handler,
        isOpen
      }: {
        handler: () => void;
        isOpen: boolean;
      }) => React.ReactNode);
} & { className?: string }) => {
  const { isOpen, handler } = useContext(ModalContext);
  if (handler === undefined)
    throw new Error("ModalUiContent: isOpen or handler is undefined");
  return typeof children == "function" ? (
    children({ isOpen, handler })
  ) : (
    <Button
      className={mergeClassName("outline-none", className)}
      onPress={handler}
      {...props}
    >
      {children}
    </Button>
  );
};
const ModalUiOverlay = ({
  children,
  className,
  ...props
}: { children: React.ReactNode[] | React.ReactNode } & ModalOverlayProps) => {
  const { isOpen, handler } = useContext(ModalContext);
  if (typeof isOpen !== "boolean" || typeof handler !== "function")
    throw new Error("ModalUiOverlay: isOpen is undefined");
  return (
    <ModalOverlay
      isOpen={isOpen}
      onOpenChange={handler}
      className={mergeClassName("z-modal", className)}
      {...props}
    >
      {children}
    </ModalOverlay>
  );
};
const ModalUiContent = ({
  children,
  className,
  ...props
}: {
  children:
    | React.ReactNode
    | ((arg: { handler: () => void }) => React.ReactNode);
} & Omit<ModalOverlayProps, "children"> &
  React.RefAttributes<HTMLDivElement>) => {
  const { isOpen, handler } = useContext(ModalContext);
  if (handler === undefined || typeof isOpen !== "boolean")
    throw new Error("ModalUiContent: isOpen or handler is undefined");
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={handler}
      className={mergeClassName("remove_outline z-modal ", className)}
      {...props}
    >
      <Dialog className="remove_outline">
        {typeof children == "function" ? () => children({ handler }) : children}
      </Dialog>
    </Modal>
  );
};
ModalUi.Button = ButtonUi;
ModalUi.Overlay = ModalUiOverlay;
ModalUi.Content = ModalUiContent;
export default ModalUi;
```

---

## File: index.tsx

- Path: `/root/git/portfolio_full_stack/components/ui/overlay/modal/index.tsx`
- Size: 35.00 B
- Extension: .tsx
- Lines of code: 1

```tsx
export { default } from "./Modal";
```

---

## File: Popover.tsx

- Path: `/root/git/portfolio_full_stack/components/ui/overlay/popover/Popover.tsx`
- Size: 1.95 KB
- Extension: .tsx
- Lines of code: 73

```tsx
import React, { useState, createContext, useContext } from "react";
import {
  Dialog,
  DialogTrigger,
  Popover,
  OverlayArrow,
  Button
} from "react-aria-components";
import type { DialogTriggerProps, PopoverProps } from "react-aria-components";
const PopoverContext = createContext<{
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({ isOpen: false, setOpen: () => {} });
const PopoverUi = ({
  children,
  ...props
}: { children: React.ReactNode[] | React.ReactNode } & DialogTriggerProps) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <DialogTrigger {...props}>
      <PopoverContext.Provider value={{ isOpen, setOpen }}>
        {children}
      </PopoverContext.Provider>
    </DialogTrigger>
  );
};
const ButtonUi = ({
  children,
  className = "",
  ...props
}: { children: ({ open }: { open: () => void }) => React.ReactNode } & {
  className?: string;
} & DialogTriggerProps) => {
  const { setOpen } = useContext(PopoverContext);
  return typeof children == "function" ? (
    children({ open: () => setOpen(true) })
  ) : (
    <Button className={className} onPress={() => setOpen(true)} {...props}>
      {children}
    </Button>
  );
};
const PopoverContentUi = ({
  children,
  ...props
}: {
  children:
    | (({ close }: { close: () => void }) => React.ReactNode)
    | React.ReactNode;
} & Omit<PopoverProps, "children"> &
  React.RefAttributes<HTMLElement>) => {
  return (
    <Popover {...props}>
      <OverlayArrow>
        <svg width="12" height="12">
          <path d="M0 0,L6 6,L12 0" />
        </svg>
      </OverlayArrow>
      <Dialog>
        {typeof children == "function" ? (
          <PopoverContext.Consumer>
            {value => children({ close: () => value.setOpen(false) })}
          </PopoverContext.Consumer>
        ) : (
          children
        )}
      </Dialog>
    </Popover>
  );
};
PopoverUi.Button = ButtonUi;
PopoverUi.Content = PopoverContentUi;
export default PopoverUi;
```

---

## File: index.tsx

- Path: `/root/git/portfolio_full_stack/components/ui/overlay/popover/index.tsx`
- Size: 37.00 B
- Extension: .tsx
- Lines of code: 1

```tsx
export { default } from "./Popover";
```

---
