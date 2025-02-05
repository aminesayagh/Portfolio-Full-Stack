"use client";

import { memo } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import { useLenis } from "@/lib/Lenis";
import { RouteSettingPath } from "@/i18n/routing";
import { getHref } from "@/i18n/routing";
import Button from "@/components/ui/button";
import { text } from "@/components/ui/typography";
import { ANIMATION_GPU_OPTIMIZATION, cn } from "@/lib/utils";

const menuKeys = [
  "manifesto",
  "experience",
  "cases",
  "contact"
] as RouteSettingPath[];

import Item from "@/components/ui/animation/Item";

const Menu = () => {
  const t = useTranslations();
  const router = useRouter();

  const lenis = useLenis();

  const goToSection = useCallback(
    (key: RouteSettingPath) => {
      if (key === "contact") {
        router.push(getHref("contact"));
      } else {
        lenis?.scrollTo(getHref(key));
      }
    },
    [lenis]
  );

  const menuItemsData = useMemo(
    () =>
      menuKeys.map((key, i) => {
        return {
          key: key,
          number: `0${i + 1}`,
          title: t(`header.menu.${menuKeys[i]}.attribute`)
        };
      }),
    [t]
  );
  return (
    <>
      <div className="flex flex-row flex-wrap justify-between items-start w-full gap-y-6">
        {menuItemsData.map(({ key, number, title }) => {
          return (
            <div
              key={key}
              className={text(
                { size: "sm", degree: "1", weight: "medium" },
                "flex flex-col justify-start items-start overflow-hidden gap-1 w-1/2 sm:w-auto md:w-1/4"
              )}
            >
              <p
                className={cn(
                  "number_menu_gsap opacity-0",
                  ANIMATION_GPU_OPTIMIZATION
                )}
              >
                {number}
              </p>
              <Button
                degree="1"
                size="sm"
                weight="semibold"
                onPress={() => goToSection(key)}
                className={cn(
                  "uppercase text-start item_menu_gsap",
                  ANIMATION_GPU_OPTIMIZATION
                )}
                style={{
                  color: "inherit"
                }}
              >
                <Item>{title}</Item>
              </Button>
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
