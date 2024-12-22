import React from "react";

import { useLocale } from "next-intl";
import { twMerge as tw } from "tailwind-merge";

import Item from "@/components/ui/animation/Item";
import Button from "@/components/ui/button";
import type { Lang } from "@/i18n/request";
import { useRouter, usePathname } from "@/i18n/routing";

const languages = [
  {
    value: "en",
    label: "English",
    short: "EN",
    long: "English"
  },
  {
    value: "fr",
    label: "French",
    short: "FR",
    long: "French"
  }
] as const;

const SwitchLang = () => {
  const router = useRouter();
  const currentLocale = useLocale() as Lang;
  const pathname = usePathname();

  const handleSelectionChange = (value: string) => {
    const selectedLang = value as Lang;
    router.replace(pathname, { locale: selectedLang });
  };

  return (
    <div className="flex flex-row items-center justify-start gap-12 xxs:gap-8 mdl:gap-6 lg:gap-8">
      {languages.map(l => (
        <span key={l.value} className="overflow-hidden">
          <Button
            degree="2"
            size="xs"
            className={tw(
              "uppercase",
              currentLocale === l.value && "text-primary"
            )}
            onPress={() => handleSelectionChange(l.value)}
            style={{
              color: "inherit"
            }}
          >
            <Item defaultColor="var(--color-white-600)">{l.short}</Item>
          </Button>
        </span>
      ))}
    </div>
  );
};

export default SwitchLang;
