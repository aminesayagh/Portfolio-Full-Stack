import React, { useCallback, useState } from "react";
import { motion } from "motion/react";

import { useLocale } from "next-intl";

import { cn } from "@/lib/utils";

// import Item from "@/components/ui/animation/Item";
import HoveredScrollUp from "@/components/ui/HoveredScrollUp";
import Button from "@/components/ui/button";
import type { Lang } from "@/i18n/request";
import { useRouter, usePathname } from "@/i18n/routing";
import { text } from "@/components/ui/typography";

type LangItem = {
  value: Lang;
  label: string;
  short: string;
  long: string;
  isCurrentLocale: boolean;
  handleSelectionChange: (value: string) => void;
}

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

const SwitchLangItem = ({ value, short, isCurrentLocale, handleSelectionChange }: LangItem) => {
  const [isHovered, setIsHovered] = useState(false);
  return (<motion.span key={value} className="overflow-hidden" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
    <Button
      degree="2"
      size="xs"
      className={cn(
        "uppercase",
        text(
          { weight: "semibold", size: "xs", degree: "2" },
          "uppercase",
          isCurrentLocale && "opacity-80"
        )
      )}
      onPress={() => handleSelectionChange(value)}
    >
      <HoveredScrollUp
        isHovered={isHovered}
        className="w-fit"
        secondaryClassName="text-primary-200"
      >
        {short}
      </HoveredScrollUp>
    </Button>
  </motion.span>);
}

const SwitchLang = () => {
  const router = useRouter();
  const currentLocale = useLocale() as Lang;
  const pathname = usePathname();

  const handleSelectionChange = useCallback(
    (value: string) => {
      const selectedLang = value as Lang;
      router.replace(pathname, { locale: selectedLang });
    },
    [router, pathname]
  );

  return (
    <div className="flex flex-row items-center justify-start gap-12 xxs:gap-8 mdl:gap-6 lg:gap-8">
      {languages.map(l => (
        <SwitchLangItem
          key={l.value}
          value={l.value}
          label={l.label}
          short={l.short}
          long={l.long}
          isCurrentLocale={currentLocale === l.value}
          handleSelectionChange={handleSelectionChange}
        />
      ))}
    </div>
  );
};

export default SwitchLang;
