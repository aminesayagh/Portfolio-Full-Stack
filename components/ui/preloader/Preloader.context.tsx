import {
  createContext,
  useState,
  useEffect,
  useRef,
  ElementRef,
  Suspense,
  useCallback,
} from "react";
import { useTranslation } from "next-i18next";
import { twMerge } from "tailwind-merge";
import { AnimatePresence, motion } from "framer-motion";

import Container from "@/components/ui/container";
import Title from "@/components/ui/typography/Title";
import Text from "@/components/ui/typography/Text";
import Noise from "@/components/ui/noise";

import { gsap } from "@/utils/gsap";
import { useIsomorphicLayoutEffect } from "react-use";
import { useRouter } from "next/router";

// config:
const END_LOADING_IN = 99;
const LONG_LOADING_TIME = 240;
const MEDIUM_LOADING_TIME = 40;
const INITIAL_PERCENT = 1;
const BASE_INTERVAL = 1;
const SUPLIMENTARY_INTERVAL_AFTER_LOADING = 0.3;

export const LoadingContext = createContext<{
  addLoadingComponent: (key: string) => void;
  removeLoadingComponent: (key: string) => void;
  isLoading: boolean;
  endLoading: boolean;
}>({
  addLoadingComponent: () => {},
  removeLoadingComponent: () => {},
  isLoading: true,
  endLoading: false,
});

type LoadingElement = {
  [key: string]: boolean;
};

export function LoadingProvider({
  fontReady,
  children,
}: {
  children: React.ReactNode;
  fontReady: boolean;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [endLoading, setEndLoading] = useState(false);
  const [loadingComponentList, setLoadingComponentList] =
    useState<LoadingElement>({});
  const { asPath } = useRouter();

  const loadingState = useCallback(() => {
  const loadingValues = Object.values(loadingComponentList);
  const inLoadingState = loadingValues.filter((item) => item === true);

  setIsLoading(inLoadingState.length > 0);
}, [loadingComponentList]);

  useEffect(() => {
    // add data set of loading to document html
    const html = document.querySelector("html");
    if (html) {
      html.dataset.is_loading = (!endLoading).toString();
    }
  }, [endLoading]);
  // const loadingExist = useCallback(
  //   (key: string) => {
  //     return !!loadingComponentList[key];
  //   },
  //   [loadingComponentList]
  // );

  const addLoadingComponent = useCallback(
    (key: string) => {
      setLoadingComponentList((prev) => {
        if (prev[key]) return prev;
        const updated = { ...prev, [key]: true };
        loadingState();
        return updated;
      });
    },
    [loadingState]
  );

  const removeLoadingComponent = useCallback(
    (key: string) => {
      setLoadingComponentList((prev) => {
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
      if (values.length == 1 && loadingComponentList["loadingProvider"]) {
        setIsLoading(false);
      }
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    addLoadingComponent("loadingProvider");

    return () => {
      removeLoadingComponent("loadingProvider");
    };
  }, [asPath]);
  return (
    <LoadingContext.Provider
      value={{
        addLoadingComponent,
        removeLoadingComponent,
        isLoading,
        endLoading,
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
  fontReady,
}: {
  isLoading: boolean;
  fontReady: boolean;
  setEndLoading: (value: boolean) => void;
}) => {
  const { t } = useTranslation();
  const ref = useRef<ElementRef<"span">>(null);
  const [endLoadingProgress, setEndLoadingProgress] = useState(false);

  useIsomorphicLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        repeat: -1,
        paused: true,
        repeatDelay: 0.5,
      });
      const DELAY = 1;
      const OFFSET = 0.3;
      const FRAME_DURATION = 0.2;
      tl.to(".item-gsap", {
        keyframes: [
          { top: "100%", duration: FRAME_DURATION },
          { top: "0%" },
          { top: "-100%", delay: DELAY, duration: FRAME_DURATION },
        ],
        ease: "power2.out",
        stagger: DELAY + OFFSET,
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
    let ctx = gsap.context((self) => {
      const skew = 2;
      const tl = gsap
        .timeline({
          paused: true,
        })
        .fromTo(
          [".element-content-gsap", ".element-counter-gsap"],
          {
            yPercent: 0,
            opacity: 1,
          },
          {
            yPercent: -10,
            duration: 0.4,
            opacity: 0,
          }
        )
        .fromTo(
          ".element-container",
          {
            yPercent: 0,
            skewY: 0,
          },
          {
            duration: 0.5,
            yPercent: -120,
            ease: "power2.out",
            skewY: skew,
            onComplete: () => {
              setEndLoading(true);
            },
          }
        )
        .fromTo(
          ".element-bg",
          {
            yPercent: 0,
            skewY: 0,
          },
          {
            skewY: skew,
            duration: 0.5,
            yPercent: -120,
            ease: "power2.out",
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
      ctx.endPreload();
    }
    return () => ctx.revert();
  }, [ref, isLoading, setEndLoading, endLoadingProgress]);

  useIsomorphicLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap
        .timeline({
          paused: true,
        })
        .fromTo(
          ".text-loader-gsap",
          {
            autoAlpha: 0,
          },
          {
            autoAlpha: 1,
            duration: 0.5,
            ease: "power2.out",
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
            <span className="py-1 element-content-gsap text-loader-gsap invisible">
              {
                <Title h6 degree="4" exchange suppressHydrationWarning>
                  {t("loading.intro")}
                </Title>
              }
            </span>
            <ul className="h-[1.5rem] overflow-hidden element-content-gsap relative">
              {Array.from({ length: 5 }).map((_, index) => (
                <Text
                  suppressHydrationWarning
                  key={index}
                  degree="0"
                  li
                  size="md"
                  weight="bold"
                  className={twMerge(
                    "item-gsap capitalize will-change-transform-animation absolute left-0 right-0 top-[100%]",
                    index == 4 ? "text-primary-500" : "text-black-300/80"
                  )}
                >
                  {t(`loading.message_${index + 1}`)}
                </Text>
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
            <AnimatePresence mode="sync">
              <motion.div
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
                {t("loading.percent")}
              </motion.div>
            </AnimatePresence>
          </div>
        </Container>
        <Noise />
      </div>
      <div className="fixed bg-primary-500 w-screen h-screen element-bg z-preload_bg"></div>
    </span>
  );
};

const Percent = ({
  isLoading,
  setEndLoadingProgress,
}: {
  isLoading: boolean;
  setEndLoadingProgress: (b: boolean) => void;
}) => {
  const [percent, setPercent] = useState(INITIAL_PERCENT);

  const [imgFirst, setImgFirst] = useState<string | null>(null);
  const [imgSecond, setImgSecond] = useState<string | null>(null);
  const [imgThird, setImgThird] = useState<string | null>(null);

  useEffect(() => {
    if (percent < END_LOADING_IN) {
      const updatePercent = () => {
        const newPercent = Math.min(percent + 1, END_LOADING_IN);
        setPercent(newPercent);
      };
      const intervalTimeAtlease = (percent / END_LOADING_IN) * (MEDIUM_LOADING_TIME - 10);
      const intervalTime = isLoading ? LONG_LOADING_TIME : MEDIUM_LOADING_TIME - intervalTimeAtlease;
      
      const percentString = percent.toFixed(0).toString().padStart(3, "0");
      const [first, second, third] = percentString.split("");
      if (!(first === "0" && second === "0" && third === "0") && imgThird !== third) {
        setImgThird(third);
      } 
      if (!(second === "0" && first === "0") && imgSecond !== second) {
        setImgSecond(second);
      } 
      if (!(first === "0") && imgFirst !== first) {
        setImgFirst(first);
      }
      const intervalId = setInterval(updatePercent, intervalTime);
      return () => {
        clearInterval(intervalId);
      };
    } else if (percent >= END_LOADING_IN) {
      setEndLoadingProgress(true);
    }
  }, [percent]);

  return (
    <div className="flex flex-row gap-0 py-2 overflow-hidden">
      <AnimatePresence mode="popLayout">
        <Number num={imgFirst} order="1" key='1' />
        <Number num={imgSecond} order="2" key='2' />
        <Number num={imgThird} order="3" key='3' />
      </AnimatePresence>
    </div>
  );
};

function Number({ num, order }: { num: string | null; order: string }) {
  return num ? (
    <motion.span
      initial={{ y: 40 }}
      animate={{ y: 0}}
      exit={{ y: -100 }}
      transition={{
        delay: 0,
        duration: 0.04
      }}
      key={`number-${order}-${num}`}
      layout
      layoutId={`number-${order}-${num}`}
      className="flex relative items-center gap-1 will-change-transform-animation"
    >
      <p className='w-auto md:w-20 lg:w-24 xl:w-28 flex flex-col align-middle text-end leading-3 will-change-transform-animation'>
        {num}
      </p>
    </motion.span>
  ) : null;
}
