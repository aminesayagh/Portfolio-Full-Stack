"use client";
import { useTranslations } from "next-intl";
import { useState, useMemo } from "react";
import { motion } from "motion/react";

import { Icon } from "@/components/ui/icon";
import { text } from "@/components/ui/typography";
import HoveredScrollUp from "@/components/ui/HoveredScrollUp";

function Work({ index, title, date }: {
    index: number, title: string, date: {
        start: string;
        end?: string | undefined;
        duration?: string | undefined;
    } | undefined
}) {
    const [isHovered, setIsHovered] = useState(false);
    const t = useTranslations("works");

    const time = useMemo(() => {
        let time = "";
        if (date?.start && date?.end) {
            time = `${date?.start} - ${date?.end}`;
        } else if (date?.start) {
            time = `${date?.start} - ${t("time.present")}`;
        }
        if (date?.duration) {
            time = `${time} (${date.duration})`;
        }
        return time;
    }, [date, t]);

    return (
        <>
            {index == 0 && (
                <div className="w-full h-px bg-white-600/70"></div>
            )}
            <motion.div className="flex flex-row items-end sm:items-start py-xl sm:py-lg gap-xs sm:gap-xl justify-between" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                <div className="flex flex-col sm:flex-row gap-6 pb-1 sm:pb-0 w-full">
                    <div className="w-full sm:w-3/12">
                        <p className={text({
                            size: "xs",
                            weight: "semibold",
                            degree: "4"
                        }, "")}>{time}</p>
                    </div>
                    <div className="flex-grow overflow-hidden">
                        <HoveredScrollUp isHovered={isHovered} >
                            <p className={text({
                                size: "lg",
                                weight: "medium",
                                degree: "1"
                            }, "pt-0 sm:pt-0")}>{title}</p>
                        </HoveredScrollUp>
                    </div>
                </div>
                <div className="aspect-square min-w-fit size-[2.5rem] xl:size-[3rem] rounded-full flex items-center justify-center overflow-hidden bg-white/90">
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