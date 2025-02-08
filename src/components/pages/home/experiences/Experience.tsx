"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

import { cn } from "@/lib/utils";
import Image from "@/components/ui/image";
import { text } from "@/components/ui/typography";
import { Icon } from "@/components/ui/icon";
import HoveredScrollUp from "@/components/ui/HoveredScrollUp";

function ExperienceButton({ name }: { name: string }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className="absolute bottom-0 left-0 flex flex-row gap-3 xl:gap-4 w-full p-6 z-10"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <h4 className={text({
                size: "md",
                weight: "semibold",
                degree: "2"
            }, "py-5 bg-white rounded-full flex items-center !text-black-100 px-5 xl:px-8 select-none overflow-hidden")}>
                <HoveredScrollUp isHovered={isHovered}>
                    {name}
                </HoveredScrollUp>
            </h4>
            <div className="aspect-square h-[4rem] xl:h-[4.5rem] rounded-full flex items-center justify-center overflow-hidden bg-white">
                <HoveredScrollUp isHovered={isHovered} x={true}>
                    <Icon name="IconArrowUpRight" className="size-8 xl:size-10 text-black-100" strokeWidth={1.1} />
                </HoveredScrollUp>
            </div>
        </motion.div>
    )
}

function ExperienceCard({ className, name, image }: { className?: string, name: string, image: string }) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useSpring(useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]), {
        stiffness: 100,
        damping: 100
    });
    // const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
    // const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
    return (
        <div className={cn("object-cover group aspect-square rounded-2xl overflow-hidden relative w-full h-full bg-transparent", className)}>
            <ExperienceButton name={name} />
            <motion.div
                className="absolute inset-0 w-full h-full z-0"
                style={{
                    y
                }}
            >
                <Image
                    src={image}
                    alt={name}
                    width={1000}
                    height={1000}
                    className="object-cover w-full h-full group-hover:scale-[1.5] duration-500 transition-all scale-[1.4]"
                />
            </motion.div>
        </div>
    )
}

export default ExperienceCard;