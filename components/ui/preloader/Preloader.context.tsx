import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import React, {
  createContext,
  useState,
  useEffect,
  useRef,
  ElementRef,
  Suspense,
  useCallback,
  ReactNode
} from "react";
import { useIsomorphicLayoutEffect } from "react-use";
import { twMerge } from "tailwind-merge";

import Container from "@/components/ui/container";
import Noise from "@/components/ui/noise";
import { text, title } from "@/components/ui/typography";
import { gsap } from "@/utils/gsap";

// config:
const END_LOADING_IN = 99;
const INITIAL_PERCENT = 1;
const LOADING_KEY = "loadingProvider";

export const LoadingContext = createContext<{
  addLoadingComponent: (key: string) => void;
  removeLoadingComponent: (key: string) => void;
  isLoading: boolean;
  endLoading: boolean;
}>({
  addLoadingComponent: () => {},
  removeLoadingComponent: () => {},
  isLoading: true,
  endLoading: false
});

type LoadingElement = {
  [key: string]: boolean;
};

export function LoadingProvider({
  fontReady,
  children
}: {
  children: ReactNode;
  fontReady: boolean;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [endLoading, setEndLoading] = useState(false);
  const [loadingComponentList, setLoadingComponentList] =
    useState<LoadingElement>({});
  const { asPath } = useRouter();

  const loadingState = useCallback(() => {
    const loadingValues = Object.values(loadingComponentList);
    const inLoadingState = loadingValues.filter(item => item === true);

    setIsLoading(inLoadingState.length > 0);
  }, [loadingComponentList]);

  useEffect(() => {
    // add data set of loading to document html
    const html = document.querySelector("html");
    if (html) {
      html.dataset["is_loading"] = (!endLoading).toString();
    }
  }, [endLoading, loadingComponentList]);

  const addLoadingComponent = useCallback(
    (key: string) => {
      setLoadingComponentList(prev => {
        if (prev.hasOwnProperty(key)) return prev;
        const updated = { ...prev, [key]: true };
        loadingState();
        return updated;
      });
    },
    [loadingState]
  );

  const removeLoadingComponent = useCallback(
    (key: string) => {
      setLoadingComponentList(prev => {
        if (!prev[key]) return prev;
        const updated = { ...prev, [key]: false };
        loadingState();
        return updated;
      });
    },
    [loadingState]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      const values = Object.values(loadingComponentList);
      if (values.length == 1 && loadingComponentList[LOADING_KEY]) {
        setIsLoading(false);
      }
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [loadingComponentList]);

  useEffect(() => {
    addLoadingComponent(LOADING_KEY);

    return () => {
      removeLoadingComponent(LOADING_KEY);
    };
  }, [asPath, addLoadingComponent, removeLoadingComponent]);
  return (
    <LoadingContext.Provider
      value={{
        addLoadingComponent,
        removeLoadingComponent,
        isLoading,
        endLoading
      }}
    >
      <Preloader
        isLoading={isLoading}
        setEndLoading={setEndLoading}
        fontReady={fontReady}
      />
      <Suspense>{children}</Suspense>
    </LoadingContext.Provider>
  );
}

const Preloader = ({
  isLoading,
  setEndLoading,
  fontReady
}: {
  isLoading: boolean;
  fontReady: boolean;
  setEndLoading: (value: boolean) => void;
}) => {
  const { t } = useTranslation();
  const ref = useRef<ElementRef<"span">>(null);
  const [endLoadingProgress, setEndLoadingProgress] = useState(false);

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
        className={twMerge(
          "w-screen cursor-none  h-screen overflow-hidden",
          "z-preload bg-white-400",
          " fixed",
          "element-container"
        )}
      >
        <Container
          as="div"
          size="lg"
          className={twMerge(
            "h-screen pt-4 sm:pt-8",
            "flex flex-col justify-between"
          )}
        >
          <div className="flex flex-col gap-0 sm:gap-1">
            <span className="invisible py-1 element-content-gsap text-loader-gsap">
              {
                <h6
                  className={title({
                    weight: "bold",
                    mode: "exchanged",
                    size: "h6",
                    degree: "4"
                  })}
                  suppressHydrationWarning
                >
                  {t("loading.intro")}
                </h6>
              }
            </span>
            <ul className="relative h-6 overflow-hidden element-content-gsap">
              {Array.from({ length: 5 }).map((_, index) => (
                <li
                  suppressHydrationWarning
                  key={index}
                  className={text(
                    {
                      size: "md",
                      weight: "bold"
                    },
                    "item-gsap capitalize will-change-transform-animation absolute left-0 right-0 top-[100%]",
                    index == 4 ? "text-primary-500" : "text-black-300/80"
                  )}
                >
                  {t(`loading.message_${index + 1}`)}
                </li>
              ))}
            </ul>
          </div>
          <div
            className={twMerge(
              "w-full",
              "text-loader-gsap invisible",
              "flex flex-row justify-end",
              "relative"
            )}
          >
            <div
              className={twMerge(
                "flex flex-row gap-2 flex-nowrap",
                "uppercase element-counter-gsap",
                "font-sans font-black text-black-500 will-change-transform-animation",
                "text-[4.1rem] xxs:text-[6rem] md:text-[7.4rem] lg:text-[8.4rem] xl:text-[10rem] align-baseline leading-[70%]"
              )}
            >
              <Percent
                isLoading={isLoading}
                setEndLoadingProgress={setEndLoadingProgress}
              />
              %
            </div>
          </div>
        </Container>
        <Noise />
      </div>
      <div className="fixed w-screen h-screen bg-primary-500 element-bg z-preload_bg"></div>
    </span>
  );
};

const Percent = ({
  isLoading,
  setEndLoadingProgress
}: {
  isLoading: boolean;
  setEndLoadingProgress: (b: boolean) => void;
}) => {
  const controls = useAnimation();
  const [percent, setPercent] = useState(INITIAL_PERCENT);

  useEffect(() => {
    if (percent < END_LOADING_IN) {
      const increment = isLoading ? 1 : 2.5;
      const newPercent = Math.floor(
        Math.min(percent + increment, END_LOADING_IN)
      );
      setPercent(newPercent);

      controls.start({ opacity: 1, y: 0, transition: { duration: 0.5 } });

      if (newPercent >= END_LOADING_IN) {
        setEndLoadingProgress(true);
      }
    }
  }, [percent, isLoading, controls, setEndLoadingProgress]);

  useEffect(() => {
    controls.start({
      y: 0,
      opacity: 1,
      transition: { duration: 0.04 }
    });
  }, [percent, controls]);

  return (
    <div className="flex flex-row gap-0 py-2 overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.span
          initial={{ y: 40, opacity: 0 }}
          animate={controls}
          exit={{ y: -100, opacity: 0 }}
          className="relative flex items-center gap-1 will-change-transform-animation"
        >
          <p className="flex flex-col w-auto leading-3 align-middle text-end">
            {percent}
          </p>
        </motion.span>
      </AnimatePresence>
    </div>
  );
};
