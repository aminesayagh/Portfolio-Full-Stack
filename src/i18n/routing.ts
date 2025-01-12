import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

import type { KeysAsDotNotation } from "@/helpers/types";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "fr"],

  // Used when no locale matches
  defaultLocale: "en"
});

export const { Link, usePathname, useRouter } = createNavigation(routing);

const ROUTER_CONFIGS = {
  home: {
    id: "home",
    path: "/",
    inDevelopment: false,
    menu: []
  },
  contact: {
    id: "contact",
    path: "/contact",
    inDevelopment: false,
    menu: ["secondary", "hamburger"]
  },
  intro: {
    id: "intro",
    path: "/#intro",
    inDevelopment: false,
    menu: ["secondary", "hamburger"]
  },
  manifesto: {
    id: "manifesto",
    path: "/#manifesto",
    inDevelopment: false,
    menu: ["secondary", "hamburger"]
  },
  experience: {
    id: "experience",
    path: "/#experience",
    inDevelopment: false,
    menu: ["secondary", "hamburger"]
  },
  cases: {
    id: "cases",
    path: "/#cases",
    inDevelopment: false,
    menu: ["secondary", "hamburger"]
  },
  instagram: {
    id: "instagram",
    path: "https://www.instagram.com/mohammedsayagh/",
    inDevelopment: false,
    menu: ["socialNetwork"]
  },
  linkedin: {
    id: "linkedin",
    path: "https://www.linkedin.com/in/mohamedamine-sayagh/",
    inDevelopment: false,
    menu: ["socialNetwork"]
  },
  github: {
    id: "github",
    path: "https://github.com/aminesayagh",
    inDevelopment: false,
    menu: ["socialNetwork"]
  },
  dribbble: {
    id: "dribbble",
    path: "https://dribbble.com/mohammed-sayagh",
    inDevelopment: false,
    menu: ["socialNetwork"]
  },
  medium: {
    id: "medium",
    path: "https://medium.com/@masayagh",
    inDevelopment: false,
    menu: ["socialNetwork"]
  }
} as const;

export type RouteSettingPath = KeysAsDotNotation<
  typeof ROUTER_CONFIGS,
  {
    path: string;
    inDevelopment: boolean;
  }
>;

export type RouteSettingMenu =
  (typeof ROUTER_CONFIGS)[RouteSettingPath]["menu"][number];

export type RouteSettingPathKey =
  (typeof ROUTER_CONFIGS)[RouteSettingPath]["path"];

export function getHref(path: RouteSettingPath): RouteSettingPathKey {
  const pathArray = path.split(".") as string[];
  let url = "";

  let current: (typeof ROUTER_CONFIGS)[keyof typeof ROUTER_CONFIGS];
  for (let i = 0; i < pathArray.length; i++) {
    current = ROUTER_CONFIGS[pathArray[i] as keyof typeof ROUTER_CONFIGS];
    if (!current) {
      throw new Error(`Invalid path: ${path}`);
    }
    if (current.inDevelopment) {
      console.warn(`Path ${path} is in development`);
      url = "/";
    } else if (current["path"] === undefined) {
      throw new Error(`Invalid path: ${path}`);
    } else {
      url = current.path;
    }

    if (url === undefined) {
      throw new Error(`Invalid path: ${path}`);
    }
  }

  return url as RouteSettingPathKey;
}

export function getMenuItems(menu: RouteSettingMenu): {
  path: RouteSettingPathKey;
  id?: string;
}[] {
  return Object.values(ROUTER_CONFIGS).filter(
    (item): item is (typeof ROUTER_CONFIGS)[keyof typeof ROUTER_CONFIGS] =>
      Array.isArray(item.menu) && item.menu.includes(menu)
  ) as {
    path: RouteSettingPathKey;
    id?: string;
  }[];
}
