"use client";
import type { RefObject } from "react";
import React, {
  useRef,
  useCallback,
  memo
} from "react";

import _ from "lodash";
import { useTranslations, useLocale } from "next-intl";
import { useIsomorphicLayoutEffect } from "react-use";

import { cn } from "@/lib/utils";
import Button from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Link, text } from "@/components/ui/typography";
import { getMenuItems } from "@/i18n/routing";
import { useEventListener } from "@/hook/useEventListener";
import { useLenisScrollTo } from "@/lib/Lenis/use-lenis";
import { gsap } from "@/utils/gsap";
import TextAnimated from "@/components/ui/TextReveal2";

const BASE_LOCALE_SOCIAL = "socialNetwork";

const ICON_SIZE_CLASS_NAME = "w-5 h-5 lg:w-6 lg:h-6";

const FollowUs = () => {
  const ref = useRef<HTMLDivElement>(null);

  const ctx = useRef<gsap.Context | null>(null);

  const menuSocialNetworks = getMenuItems("socialNetwork");

  useIsomorphicLayoutEffect(() => {
    if (!menuSocialNetworks.length) {return;}
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
    if (!ctx.current) {return;}
    ctx.current["followButtonShow"]();
  }, [ctx]);
  const handlerLeave = useCallback(() => {
    if (!ctx.current) {return;}
    ctx.current["followButtonHide"]();
  }, [ctx]);
  useEventListener("mouseenter", handler, ref as RefObject<HTMLDivElement>);
  useEventListener(
    "mouseleave",
    handlerLeave,
    ref as RefObject<HTMLDivElement>
  );

  const t = useTranslations();
  return (
    <div ref={ref} className="flex flex-row items-center justify-end gap-4">
      <ul className="flex flex-row items-center gap-8">
        {menuSocialNetworks.map((item, index) => (
          <li key={item.id + "_" + index} className="overflow-hidden list-none">
            <Link
              size="sm"
              href={item.path}
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
        className={cn("stroke-gray-400", ICON_SIZE_CLASS_NAME)}
      />
    </div>
  );
};

// const FollowUs = memo(FollowUs);


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
    if (!ctx.current) {return;}
    ctx.current["handlerGoToTop"]();
  }, [ctx]);
  const handlerMouseLeave = useCallback(() => {
    if (!ctx.current) {return;}
    ctx.current["handlerGoToTopLeave"]();
  }, [ctx]);

  useEventListener(
    "mouseenter",
    handlerMouse,
    ref as RefObject<HTMLButtonElement>
  );
  useEventListener(
    "mouseleave",
    handlerMouseLeave,
    ref as RefObject<HTMLButtonElement>
  );

  return (
    <Button
      ref={ref}
      onPress={() => handler()}
      className={cn(
        "flex flex-row justify-start items-center",
        "gap-6 md:gap-8",
        "uppercase"
      )}
    >
      <Icon
        name="IconArrowUpRight"
        size="24"
        className={cn("stroke-gray-400 icon_gsap", ICON_SIZE_CLASS_NAME)}
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
  const t = useTranslations();
  const locale = useLocale();
  // const { scrollTo } = useLocomotiveScroll();
  const goTo = useLenisScrollTo();

  const goToTop = useCallback(() => {
    goTo(0);
  }, [goTo]);

  return (
    <>
      <div
        className={cn(
          locale === "en"
            ? "max-w-[16rem] xxs:w-8/12 xs:max-w-[46vw] sm:max-w-[40vw] md:max-w-[32vw] mdl:max-w-[30vw] xl:max-w-[20vw] 2xl:max-w-[28vw] 3xl:max-w-[22rem]"
            : "max-w-[16rem] xxs:w-9/12 xs:max-w-[46vw] sm:max-w-[40vw] md:max-w-[32vw] mdl:max-w-[30vw] xl:max-w-[20vw] 2xl:max-w-[28vw] 3xl:max-w-[22rem]"
        )}
      >
        <TextAnimated
          lang={locale}
          className="justify-start max-w-xs uppercase gap-x-2"
          phrase={t("footer.state")}
        />
      </div>
      <div
        className={cn(
          "flex flex-row flex-wrap sm:flex-nowrap justify-between",
          "gap-y-4",
          "pb-10 pt-6"
        )}
      >
        <div className={cn("flex flex-row flex-1", "order-2 sm:order-1")}>
          <GoToTopMemo handler={goToTop} name={t("footer.action")} />
        </div>
        <div className="flex flex-row items-center w-full justify-start flex-grow sm:flex-none order-1 sm:grow-0 sm:w-auto sm:justify-center sm:order-2">
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
