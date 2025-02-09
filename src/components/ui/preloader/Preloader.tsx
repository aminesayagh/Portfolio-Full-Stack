"use client";

import { useTranslations } from "next-intl";
import { useRef, useState, useEffect } from "react";
import { useIsomorphicLayoutEffect } from "react-use";
import { gsap } from "@/utils/gsap";
import { cn } from "@/lib/utils";
import { text, title } from "@/components/ui/typography";

import Container from "@/components/ui/container";
import Noise from "@/components/ui/noise";
import { ANIMATION_GPU_OPTIMIZATION } from "@/lib/utils";
import NumberTicker from "../NumberTicker";
import { LOADING_TIMEOUT } from "./constants";

const Preloader = () => {
    const t = useTranslations();
    const ref = useRef<HTMLSpanElement>(null);
    const [endLoadingProgress, setEndLoadingProgress] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setEndLoadingProgress(true);
        }, LOADING_TIMEOUT);
        return () => clearTimeout(timer);
    }, []);

    useIsomorphicLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                repeat: -1,
                paused: true,
                repeatDelay: 0.5
            });
            const DELAY = 0.9;
            const OFFSET = 0.2;
            const FRAME_DURATION = 0.1;
            tl.to(".item-gsap", {
                keyframes: [
                    { top: "100%", duration: FRAME_DURATION },
                    { top: "0%" },
                    { top: "-100%", delay: DELAY, duration: FRAME_DURATION }
                ],
                ease: "power2.out",
                stagger: DELAY + OFFSET
            });

            tl.play();

            return () => {
                tl.kill();
            };
        }, ref);
        return () => ctx.revert();
    }, [ref]);

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
                            setEndLoadingProgress(true);
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
    }, [ref, endLoadingProgress]);

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
            tl.play();
            return () => {
                tl.kill();
            };
        });
        return () => ctx.revert();
    }, []);

    return (
        <span ref={ref} className="contents">
            <div
                className="w-screen cursor-none h-screen overflow-hidden z-preload bg-white-400 fixed element-container light">
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
                                "flex flex-row flex-nowrap",
                                "uppercase element-counter-gsap",
                                "font-sans font-black !text-black-500 will-change-transform-animation",
                                "text-[4.1rem] xxs:text-[6rem] md:text-[7.4rem] lg:text-[8.4rem] xl:text-[10rem] align-baseline leading-[70%]"
                            )}
                        >
                            <span className="relative flex items-center">
                                <NumberTicker value={99} totalTime={LOADING_TIMEOUT + 1000} className="flex flex-col w-auto leading-3 align-middle text-end" />
                            </span>
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

export default Preloader;