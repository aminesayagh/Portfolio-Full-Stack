"use client";

import React, {
  useRef,
  useCallback,
} from "react";

import { useTranslations, useLocale } from "next-intl";
import { twMerge } from "tailwind-merge";

import { usePreloader } from "@/components/ui/preloader";
import { text, display } from "@/components/ui/typography";
import useGsap from "@/hook/useGsap";
import useFitText from "@/hook/useFitText";
import { useLenis } from "@/lib/Lenis";
import { ScrollTrigger, gsap, Power4 } from "@/utils/gsap";

import ButtonNext, { GoTOCases } from "./ButtonNext";
import FullStack from "./FullStack";
import Menu from "./Menu";

const DISPLAY_1_CLASS_NAME = "capitalize";

const Title = ({ goToCases }: { goToCases: GoTOCases }) => {
  const t = useTranslations();
  const locale = useLocale();
  const { fontSize: fontSizeInterface, ref: widthInterfaceRef } = useFitText({
    factor: 4.94
  });
  const { fontSize: fontSizeDev, ref: widthDevRef } = useFitText({
    factor: locale === "en" ? 5.55 : 7
  });

  return (
    <>
      <div
        ref={widthInterfaceRef}
        className={twMerge(
          // col
          locale === "en"
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
          <span>{t("intro.title.1")}</span>
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
          // flex
          "flex flex-col xs:flex-row justify-between mdl:justify-end",
          "gap-6 xxs:gap-8 xs:gap-4 mdl:gap-2 lg:gap-4 4xl:gap-28", // gap
          "pl-0 lg:pl-4 xl:pl-0", // pl
          "pt-0 xs:pt-2 xl:pt-3", // pt
          // grid position
          "max-w-[20rem] xxs:max-w-full",
          "col-start-1 col-span-12",
          "xxs:col-start-5 xxs:col-span-8", // none
          "xs:col-start-1 xs:col-span-12", // xxs
          "sm:col-start-2 sm:col-span-11", // sm
          locale === "en"
            ? "md:col-start-4 md:col-span-9"
            : "md:col-start-3 md:col-span-10", // md
          "mdl:col-start-7 mdl:col-span-6", // mdl
          locale === "en"
            ? "3xl:col-start-8 3xl:col-span-5"
            : "3xl:col-start-7 3xl:col-span-6", // xl
          "4xl:col-span-6 4xl:col-start-7", // 4xl
          // row grid
          "row-start-2 row-span-1", // none
          "mdl:row-start-1 mdl:row-span-1", //mdl
          // children
          locale === "en"
            ? "[&>*]:w-full [&>*]:xxs:w-11/12 [&>*]:xs:w-5/12 [&>*]:sm:w-5/12 [&>*]:mdl:w-1/2 [&>*]:xl:w-full [&>*]:4xl:w-4/12"
            : "[&>*]:w-10/12 [&>*]:xxs:w-11/12 [&>*]:xs:w-5/12 [&>*]:sm:w-1/2 [&>*]:xl:w-full [&>*]:4xl:w-5/12",
          locale === "en"
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
          locale === "en"
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
          locale === "en"
            ? "mdl:col-start-5 mdl:col-span-2"
            : "mdl:col-start-4 mdl:col-span-2",
          locale === "en"
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
          locale === "en"
            ? "mdl:col-start-7 mdl:col-span-6"
            : "mdl:col-start-6 mdl:col-span-7", // xs
          locale === "en"
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


const Intro = () => {
  const introRef = useRef<HTMLDivElement>(null);
  const { endLoading } = usePreloader();
  const lenis = useLenis();

  const goToCases = useCallback(() => {
    if (lenis && lenis.scrollTo) {
      lenis.scrollTo("#cases");
    }
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
          ease: Power4.easeOut,
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
            ease: Power4.easeOut
          },
          "<90%"
        )
        .from(
          ".splitText_description_gsap",
          {
            yPercent: 105,
            duration: 0.9,
            ease: Power4.easeOut,
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
            ease: Power4.easeOut
          },
          "<"
        )
        .fromTo(
          ".number_menu_gsap",
          {
            opacity: 0,
            autoAlpha: 0,
            duration: 0.3
          },
          {
            opacity: 0.6,
            autoAlpha: 1,
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
            ease: Power4.easeOut
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
    introRef as React.RefObject<HTMLDivElement>,
    [endLoading]
  );

  return (
    <div
      className="pt-28 sm:pt-36 mdl:pt-40 flex flex-col gap-20 xs:gap-32 xl:gap-40"
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
      <div className="flex flex-row justify-between items-end gap-0 xl:gap-6 4xl:gap-20">
        <Menu />
      </div>
    </div>
  );
};

export default Intro;
