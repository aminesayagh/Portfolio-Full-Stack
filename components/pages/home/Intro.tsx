import { useTranslation } from "next-i18next";
import {
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
  const { t } = useTranslation();

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
  const { t, i18n } = useTranslation();
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
          // col
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
          // flex
          "flex flex-col xs:flex-row justify-between mdl:justify-end",
          "gap-6 xxs:gap-8 xs:gap-4 mdl:gap-2 lg:gap-4 2xl:gap-8 4xl:gap-28", // gap
          "pl-0 lg:pl-4 xl:pl-0", // pl
          "pt-0 xs:pt-2 xl:pt-3", // pt
          // grid position
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
          // row grid
          "row-start-2 row-span-1", // none
          "mdl:row-start-1 mdl:row-span-1", //mdl
          // children
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
  const { t } = useTranslation();
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
