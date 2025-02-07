"use client";

import type { ReactNode } from "react";
import React, {
  useState,
  useEffect,
  useRef,
  Suspense
} from "react";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useIsomorphicLayoutEffect } from "react-use";
import { ANIMATION_GPU_OPTIMIZATION, cn } from "@/lib/utils";

import Container from "@/components/ui/container";
import Noise from "@/components/ui/noise";
import { text, title } from "@/components/ui/typography";
import { gsap } from "@/utils/gsap";

// config:
const END_LOADING_IN = 99;
const INITIAL_PERCENT = 1;
export const LOADING_TIMEOUT = 5000;
export const EXTERNAL_LOADING_TIMEOUT = LOADING_TIMEOUT + 1000;

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // add data set of loading to document html
    const html = document.querySelector("html");
    if (html) {
      html.dataset["is_loading"] = (!isLoading).toString();
    }
  }, [isLoading]);

  useEffect(() => {
    timer.current = setTimeout(() => {
      setIsLoading(false);
    }, LOADING_TIMEOUT);
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);
  return (
    <>
      <Preloader isLoading={isLoading} setEndLoading={setIsLoading} />
      <Suspense>{children}</Suspense>
    </>
  );
}

const Preloader = ({
  isLoading,
  setEndLoading
}: {
  isLoading: boolean;
  setEndLoading: (value: boolean) => void;
}) => {
  const t  = useTranslations();
  const ref = useRef<HTMLSpanElement>(null);
  const [endLoadingProgress, setEndLoadingProgress] = useState(false);

  const [fontReady, setFontReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFontReady(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        repeat: -1,
        paused: true,
        repeatDelay: 0.5
      });
      const DELAY = 1;
      const OFFSET = 0.3;
      const FRAME_DURATION = 0.2;
      tl.to(".item-gsap", {
        keyframes: [
          { top: "100%", duration: FRAME_DURATION },
          { top: "0%" },
          { top: "-100%", delay: DELAY, duration: FRAME_DURATION }
        ],
        ease: "power2.out",
        stagger: DELAY + OFFSET
      });

      if (fontReady) {
        tl.play();
      }

      return () => {
        tl.kill();
      };
    }, ref);
    return () => ctx.revert();
  }, [ref, fontReady]);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(self => {
      const skew = 2;
      const tl = gsap
        .timeline({
          paused: true
        })
        .fromTo(
          [".element-content-gsap", ".element-counter-gsap"],
          {
            yPercent: 0,
            opacity: 1
          },
          {
            yPercent: -10,
            duration: 0.4,
            opacity: 0
          }
        )
        .fromTo(
          ".element-container",
          {
            yPercent: 0,
            skewY: 0
          },
          {
            duration: 0.5,
            yPercent: -120,
            ease: "power2.out",
            skewY: skew,
            onComplete: () => {
              setEndLoading(true);
            }
          }
        )
        .fromTo(
          ".element-bg",
          {
            yPercent: 0,
            skewY: 0
          },
          {
            skewY: skew,
            duration: 0.5,
            yPercent: -120,
            ease: "power2.out"
          }
        );
      self.add("endPreload", () => {
        tl.play();
      });
      return () => {
        tl.kill();
      };
    }, ref);
    if (endLoadingProgress) {
      ctx["endPreload"]();
    }
    return () => ctx.revert();
  }, [ref, isLoading, setEndLoading, endLoadingProgress]);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap
        .timeline({
          paused: true
        })
        .fromTo(
          ".text-loader-gsap",
          {
            autoAlpha: 0
          },
          {
            autoAlpha: 1,
            duration: 0.5,
            ease: "power2.out"
          }
        );
      if (fontReady) {
        tl.play();
      }
      return () => {
        tl.kill();
      };
    });
    return () => ctx.revert();
  }, [fontReady]);

  return (
    <span ref={ref} className="contents">
      <div
        className={cn(
          "w-screen cursor-none h-screen overflow-hidden",
          "z-preload bg-white-400",
          "fixed",
          "element-container light"
        )}
      >
        <Container
          as="div"
          size="lg"
          className={cn(
            "h-screen pt-4 sm:pt-8",
            "flex flex-col justify-between"
          )}
        >
          <div className="flex flex-col gap-0 sm:gap-1">
            <span className="invisible py-1 element-content-gsap text-loader-gsap">
              <h6
                className={title({
                  weight: "bold",
                  size: "h6",
                  degree: "1"
                }, "!text-black-200")}
                suppressHydrationWarning
              >
                {t("loading.intro")}
              </h6>
            </span>
            <ul className="relative h-6 overflow-hidden element-content-gsap">
              {Array.from({ length: 5 }).map((_, index) => (
                <li
                  suppressHydrationWarning
                  key={`${index}`}
                  className={text(
                    {
                      size: "md",
                      degree: "1",
                      weight: "bold"
                    },
                    "item-gsap capitalize absolute left-0 right-0 top-[100%]",
                    ANIMATION_GPU_OPTIMIZATION,
                    index === 4 ? "!text-primary-500" : "!text-black-300/80"
                  )}
                >
                  {t(`loading.message_${index + 1}`)}
                </li>
              ))}
            </ul>
          </div>
          <div
            className={cn(
              "w-full",
              "text-loader-gsap invisible",
              "flex flex-row justify-end",
              "relative"
            )}
          >
            <div
              className={cn(
                "flex flex-row gap-2 flex-nowrap",
                "uppercase element-counter-gsap",
                "font-sans font-black !text-black-500 will-change-transform-animation",
                "text-[4.1rem] xxs:text-[6rem] md:text-[7.4rem] lg:text-[8.4rem] xl:text-[10rem] align-baseline leading-[70%]"
              )}
            >
              <Percent
                setEndLoadingProgress={setEndLoadingProgress}
              />
              %
            </div>
          </div>
        </Container>
        <Noise />
      </div>
      <div className="fixed w-screen h-screen bg-primary-500 element-bg z-preload_bg" />
    </span>
  );
};

const Percent = ({
  setEndLoadingProgress,
}: {
  setEndLoadingProgress: (b: boolean) => void;
}) => {
  const [percent, setPercent] = useState(INITIAL_PERCENT);
  const percentRef = useRef(INITIAL_PERCENT);

  useIsomorphicLayoutEffect(() => {
    const tl = gsap.to(percentRef, {
      current: END_LOADING_IN,
      duration: LOADING_TIMEOUT / 1000, // Convert ms to seconds
      ease: "none",
      onUpdate: () => {
        const current = Math.floor(percentRef.current);
        if (current !== percent) {
          setPercent(current);
        }
      },
      onComplete: () => {
        setEndLoadingProgress(true);
      },
    });

    return () => {
      tl.kill();
    }
  }, [setEndLoadingProgress]);

  return (
    <div className="flex flex-row gap-0 py-2 overflow-hidden">
      <motion.span
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.04 }}
        className="relative flex items-center gap-1 will-change-transform-animation"
      >
        <p className="flex flex-col w-auto leading-3 align-middle text-end">
          {percent}
        </p>
      </motion.span>
    </div>
  );
};