import { useTranslation } from "next-i18next";
import React from "react";
import { twMerge } from "tailwind-merge";

import Button from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { text } from "@/components/ui/typography";
import useRouterChange from "@/hook/SafePush";

const Action = () => {
  const { safePush } = useRouterChange();

  const { t } = useTranslation();
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
