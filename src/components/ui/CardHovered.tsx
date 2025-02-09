"use client";

import React, { memo, useMemo } from "react";
import { motion, useAnimationControls } from "motion/react";

import { ANIMATION_GPU_OPTIMIZATION, cn } from "@/lib/utils";
import { title, text } from "@/components/ui/typography";
import NumberTicker from "@/components/ui/NumberTicker";

const animationVariants = {
    initial: {
        scale: 1,
        y: 0,
        x: 0,
        rotate: 0,
        transformOrigin: "bottom right",
    },
    hover: {
        scale: 1.05,
        y: "-10%",
        x: "2%",
        rotate: 1.6,
        transformOrigin: "bottom right",
        transition: {
            type: "tween",
            duration: 0.3,
            ease: [0.25, 0.1, 0.25, 1]
        }
    }
};

const animationBgVariants = {
    initial: {
        scale: 1,
        y: 0,
        opacity: 0,
        rotate: 0,
        transformOrigin: "bottom right",
    },
    hover: {
        scale: 1.05,
        rotate: -1.6,
        y: "-10%",
        opacity: 1,
        transformOrigin: "bottom right",
        transition: {
            type: "tween",
            duration: 0.3,
            ease: [0.25, 0.1, 0.25, 1]
        }
    }
}

const Card = ({
    description,
    number,
    suffix,
    className,
    style
}: {
    description: string;
    number: string;
    suffix?: string;
    className?: string;
    style?: React.CSSProperties;
}) => {
    const numberValue = useMemo(() => Number(number), [number]);
    const controls = useAnimationControls();

    return (
        <motion.span 
            className={cn("w-full relative block group min-h-[400px]", className)}
            initial="initial"
            whileHover="hover"
            animate={controls}
            style={style}
        >
            <motion.div
                className={cn(
                    "flex flex-col gap-8 sm:gap-12 lg:gap-6 xl:gap-40 justify-between items-baseline",
                    "p-7 lg:p-5 xl:p-8",
                    ANIMATION_GPU_OPTIMIZATION,
                    "transition-colors duration-300 ease-in-out relative",
                    "w-full h-full z-10","rounded-xl", 
                    "border-[2px] border-dashed border-white-600 group-hover:border-[2px] group-hover:border-solid group-hover:border-white-100",
                    "bg-transparent group-hover:bg-white-100 transition-colors duration-300 ease-in-out"
                )}

                variants={animationVariants}
            >
                <div
                    className={cn(
                        "flex flex-row lg:flex-col xl:flex-row justify-between items-start",
                        "gap-4 lg:gap-2 xl:gap-4",
                        "w-full"
                    )}
                >
                    <h3
                        className={title({
                            weight: "semibold",
                            degree: "2",
                            size: "h1"
                        }, "group-hover:text-black-300 transition-colors duration-300 ease-in-out")}
                    >
                        <NumberTicker value={numberValue} className="" />
                        {suffix && <span className="text-3xl pl-[5px]">{suffix}</span>}
                    </h3>
                </div>
                <div className="max-w-72">
                    <p
                        className={text({
                            weight: "medium",
                            degree: "3",
                            size: "md"
                        }, "group-hover:text-black-500 transition-colors duration-300 ease-in-out")}
                    >
                        {description}
                    </p>
                </div>
            </motion.div>
            <motion.span className="absolute inset-0 rounded-xl bg-primary-500"
                variants={animationBgVariants}
            />
        </motion.span>
    );
};

const CardMemo = memo(Card);

CardMemo.displayName = "CardHovered";

export default Card;