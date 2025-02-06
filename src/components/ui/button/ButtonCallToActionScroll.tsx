"use client";
import { useRef, useState } from "react";
import {
    useInView,
    motion,
    Variants,
    AnimatePresence
} from "motion/react";;

import { ANIMATION_GPU_OPTIMIZATION, cn } from "@/lib/utils";
import Button from "./Button";
import { IconArrowUpRight } from "@tabler/icons-react";
import { text } from "@/components/ui/typography";
import HoveredScrollUp from "../HoveredScrollUp";

// Animation variants for consistent timing
const variants = {
    icon: {
        initial: { x: -12, y: 12, opacity: 0 },
        animate: {
            x: 0,
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 150,
                damping: 20
            }
        }
    } as Variants,
    iconHover: {
        initial: {
            y: 0,
            x: 0,
            color: "currentColor",
            opacity: 1
        },
        hover: {
            y: [-12, 12, 0],
            x: [12, -12, 0],
            opacity: [0, 0, 1],
            color: "var(--color-primary-500)",
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        },
        exit: {
            y: [-12, 12, 0],
            x: [12, -12, 0],
            opacity: [0, 0, 1],
            color: "currentColor",
            transition: {
                duration: 0.5,
                ease: "easeIn"
            }
        }
    } as Variants,
    underline: {
        initial: { width: "0%" },
        animate: {
            width: "100%",
            transition: {
                delay: 0.2,
                duration: 0.5,
                ease: [0.43, 0.13, 0.23, 0.96] // Custom easing for smooth animation
            }
        }
    } as Variants
};

export default function ButtonCallToActionScroll({
    children,
    className
}: {
    children: React.ReactNode;
    className?: string;
}) {
    const containerRef = useRef<HTMLButtonElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const inView = useInView(containerRef, {
        margin: "-100px"
    });


    return (
        <motion.span
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Button
                onPress={() => {
                    const resumeUrl = "/Mohamed Amine SAYAGH - Software Developer - RESUME.pdf";
                    const link = document.createElement("a");
                    link.href = resumeUrl;
                    link.download = "Mohamed Amine SAYAGH - Software Developer - RESUME.pdf";
                    link.click();
                }}
                className={cn(className, text({
                    weight: "medium",
                    size: "md",
                    degree: "1"
                }), "w-fit flex flex-col relative",
                    "transition-colors duration-300")}
                ref={containerRef}
            >

                <AnimatePresence mode="wait">
                    <span className="flex flex-row overflow-hidden items-center w-fit pb-1 gap-2">
                        <HoveredScrollUp isHovered={isHovered} >
                            {children}
                        </HoveredScrollUp>
                        <div className="relative size-4">
                            <motion.span
                                initial="initial"
                                animate={inView ? "animate" : "initial"}
                                variants={variants.icon}
                                className={cn("flex absolute inset-0", ANIMATION_GPU_OPTIMIZATION)}
                            >
                                <motion.span
                                    key={`${isHovered ? "hover" : "exit"}`}
                                    initial="initial"
                                    animate={isHovered ? "hover" : "exit"}
                                    variants={variants.iconHover}
                                    className={cn("relative flex", ANIMATION_GPU_OPTIMIZATION)}
                                >
                                    <IconArrowUpRight className="size-4" />
                                </motion.span>
                            </motion.span>
                        </div>
                    </span>

                </AnimatePresence>

                <motion.span
                    initial="initial"
                    animate={inView ? "animate" : "initial"}
                    variants={variants.underline}
                    className={cn(
                        "absolute bottom-0 left-0 h-[1px] bg-current origin-left",
                        ANIMATION_GPU_OPTIMIZATION
                    )}
                />
            </Button>
        </motion.span>
    )
}