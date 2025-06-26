import { useTranslations } from "next-intl";
import { memo } from "react";
import { Easing, motion } from "motion/react";

import { ANIMATION_GPU_OPTIMIZATION, cn } from "@/lib/utils";
import { text } from "@/components/ui/typography";

const animationConfig = {
    initial: { top: "100%" },
    animate: {
        top: ["100%", "0%", "-100%"]
    },
    transition: (index: number) => ({
        duration: 1.1,
        times: [0, 0.1 / 1.1, 1], // Timing equivalents for 0.1s, 1.0s, and 1.1s
        ease: "easeOut" as Easing,
        delay: index * 0.7 // Stagger delay between items
    })
};

const animationConfigFinal = {
    initial: { top: "100%" },
    animate: {
        top: ["100%", "0%"]
    },
    transition: (index: number) => ({
        duration: 0.8,
        times: [0, 0.1 / 1.1, 1], // Timing equivalents for 0.1s, 1.0s, and 1.1s
        ease: "easeOut" as Easing,
        delay: index * 0.7 // Stagger delay between items
    })
}

const PreloadSlogan = ({ className }: { className?: string }) => {
    const t = useTranslations();

    return (
        <ul className={cn("relative h-6 overflow-hidden", className)} >
            {Array.from({ length: 5 }).map((_, index) => {
                const config = index < 4 ? { ...animationConfig, transition: animationConfig.transition(index) } : { ...animationConfigFinal, transition: animationConfigFinal.transition(4) };
                return <motion.li
                    key={`${index}`}
                    className={text(
                        {
                            size: "md",
                            degree: "1",
                            weight: "bold"
                        },
                        "capitalize absolute left-0 right-0 top-[100%]",
                        ANIMATION_GPU_OPTIMIZATION,
                        index === 4 ? "!text-primary-500" : "!text-black-300/80"
                    )}
                    {...config}
                >
                    {t(`loading.message_${(index + 1) as unknown as "1" | "2" | "3" | "4" | "5"}`)}
                </motion.li>
            })}
        </ul >)
}

const MemoPreloadSlogan = memo(PreloadSlogan);

export default MemoPreloadSlogan;