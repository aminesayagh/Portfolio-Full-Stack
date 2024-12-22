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
    path: "/",
    inDevelopment: false
  },
  features: {
    path: "/#features",
    inDevelopment: true
  },
  marketplace: {
    path: "/#marketplace",
    inDevelopment: true
  },
  workflows: {
    path: "/#workflows",
    inDevelopment: true
  },
  contact: {
    path: "/contact",
    inDevelopment: true
  },
  signup: {
    path: "/signup",
    inDevelopment: true
  },
  github: {
    path: "https://github.com/aminesayagh/Code-Wrangler",
    inDevelopment: false
  },
  linkedin: {
    path: "https://www.linkedin.com/in/mohamedamine-sayagh/",
    inDevelopment: false
  },
  discord: {
    path: "https://discord.gg/code-wrangler",
    inDevelopment: false
  }
} as const;

export type RouteSettingPath = KeysAsDotNotation<
  typeof ROUTER_CONFIGS,
  {
    path: string;
    inDevelopment: boolean;
  }
>;

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
