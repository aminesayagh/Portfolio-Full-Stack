"use client";
import { useState } from "react";
import { motion } from "motion/react";

import { Icon } from "@/components/ui/icon";
import { text } from "@/components/ui/typography";
import HoveredScrollUp from "@/components/ui/HoveredScrollUp";

function Work({ time, title }: { time: string, title: string }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div className="flex flex-row items-start py-lg gap-xl justify-between" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <div className="w-2/12">
                <p className={text({
                    size: "xs",
                    weight: "semibold",
                    degree: "4"
                }, "")}>{time}</p>
            </div>
            <div className="flex-grow">
                <p className={text({
                    size: "lg",
                    weight: "semibold",
                    degree: "1"
                }, "")}>{title}</p>
            </div>
            <div className="aspect-square h-[3.5rem] xl:h-[3.5rem] rounded-full flex items-center justify-center overflow-hidden bg-white/90">
                <HoveredScrollUp isHovered={isHovered} x={true}>
                    <Icon name="IconArrowUpRight" className="size-4 xl:size-6 text-black-100" strokeWidth={1.2} />
                </HoveredScrollUp>
            </div>
        </motion.div>
    )
}

export default Work;