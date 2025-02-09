"use client";
import { useState } from "react";
import { motion } from "motion/react";

import { Icon } from "@/components/ui/icon";
import { text } from "@/components/ui/typography";
import HoveredScrollUp from "@/components/ui/HoveredScrollUp";

function Work({ index, time, title }: { index: number, time: string, title: string }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <>
            {index == 0 && (
                <div className="w-full h-px bg-white-600/70"></div>
            )}
            <motion.div className="flex flex-row items-end sm:items-start py-lg gap-xl justify-between" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                <div className="flex flex-col sm:flex-row gap-6 pb-1 sm:pb-0">
                    <div className="w-full sm:w-3/12">
                        <p className={text({
                            size: "xs",
                            weight: "semibold",
                            degree: "4"
                        }, "max-w-32")}>{time}</p>
                    </div>
                    <div className="flex-grow">
                        <p className={text({
                            size: "lg",
                            weight: "medium",
                            degree: "1"
                        }, "pt-0 sm:pt-1")}>{title}</p>
                    </div>
                </div>
                <div className="aspect-square h-[2.5rem] xl:h-[3rem] rounded-full flex items-center justify-center overflow-hidden bg-white/90">
                    <HoveredScrollUp isHovered={isHovered} x={true}>
                        <Icon name="IconArrowUpRight" className="size-5 xl:size-7 text-black-100" strokeWidth={1.3} />
                    </HoveredScrollUp>
                </div>
            </motion.div>
            <div className="w-full h-px bg-white-600/70"></div>
        </>
    )
}

export default Work;