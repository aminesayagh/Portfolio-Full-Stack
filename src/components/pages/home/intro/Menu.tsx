"use client";

import { memo, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { motion } from "motion/react";

import { RouteSettingPath, getHref, getIdScroll } from "@/i18n/routing";
import { ANIMATION_GPU_OPTIMIZATION, cn } from "@/lib/utils";
import { useLenis } from "@/lib/Lenis";
import HoveredScrollUp from "@/components/ui/HoveredScrollUp";
import Button from "@/components/ui/button";
import { text } from "@/components/ui/typography";

const menuKeys = [
  "manifesto",
  "experience",
  "resume",
  "contact"
] as const;

type TMenuKeys = typeof menuKeys;


const MenuItem = ({
  title,
  number,
  path,
  goToSection
}: {
  title: string;
  number: string;
  path: RouteSettingPath;
  goToSection: (key: RouteSettingPath) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className={text(
        { size: "sm", degree: "1", weight: "medium" },
        "flex relative flex-col justify-start items-start overflow-hidden gap-1 w-1/2 sm:w-auto md:w-1/4"
      )}
    >
      <motion.span
        className="w-fit relative flex flex-col gap-1"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <p
          className={cn("number_menu_gsap opacity-0", ANIMATION_GPU_OPTIMIZATION)}
        >
          {number}
        </p>
        <Button
          degree="1"
          size="sm"
          weight="semibold"
          onPress={() => goToSection(path)}
          className={cn(
            "uppercase text-start item_menu_gsap",
            ANIMATION_GPU_OPTIMIZATION
          )}
          style={{
            color: "inherit"
          }}
        >
          <HoveredScrollUp
            isHovered={isHovered}
            skewY={10}
            secondaryClassName="text-primary-500"
          >
            {title}
          </HoveredScrollUp>
        </Button>
      </motion.span>
    </div>
  );
};

const Menu = () => {
  const t = useTranslations();
  const router = useRouter();

  const lenis = useLenis();

  const goToSection = useCallback(
    (key: RouteSettingPath) => {
      if (key === "contact") {
        router.push(getHref("contact"));
      } else if (key === "resume") {
        router.push(getHref("resume"));
      } else {
        lenis?.scrollTo(getIdScroll(key));
      }
    },
    [lenis, router]
  );

  const menuItemsData = useMemo(
    () =>
      menuKeys.map((key, i) => {
        return {
          key: key,
          number: `0${i + 1}`,
          title: t(`header.menu.${menuKeys[i] as TMenuKeys[number]}.attribute`)
        };
      }),
    [t]
  );
  return (
    <>
      <div className="flex flex-row flex-wrap justify-between items-start w-full gap-y-6">
        {menuItemsData.map(({ key, number, title }) => (
          <MenuItem
            key={key}
            path={key}
            title={title}
            number={number}
            goToSection={goToSection}
          />
        ))}
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
            "item_menu_gsap",
            ANIMATION_GPU_OPTIMIZATION
          )}
        >
          {t("intro.copy")}
        </p>
      </span>
    </>
  );
};

export default memo(Menu);
