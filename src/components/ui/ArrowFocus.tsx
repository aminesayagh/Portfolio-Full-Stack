"use client";

import { useMemo, useRef } from "react";
import { useInView, motion } from "motion/react";

import { HoveredScrollUpInternal } from "./HoveredScrollUp";
import { Icon, IconNames } from "./icon";
import { cn } from "@/lib/utils";

function ArrowFocus({
    className,
    direction = "UpRight"
}: {
    className?: string;
    direction?: "UpRight" | "DownRight" | "UpLeft" | "DownLeft";
}) {
    const ref = useRef(null);
    const IconName = useMemo(() => `IconArrow${direction}` as IconNames, [direction]);
    const inView = useInView(ref);
    return (
        <motion.div 
            ref={ref}
            className="w-fit p-0 overflow-hidden"
            animate={inView ? "animate" : "initial"}
            variants={{
                initial: { y: 40, opacity: 0 },
                animate: { y: 0, opacity: 1 }
            }}
            transition={{
                duration: 0.5,
                ease: "easeInOut"
            }}
        >
            <HoveredScrollUpInternal x={true}>
                <Icon name={IconName as IconNames} className={cn("size-16 xl:size-28 text-white", className)} strokeWidth={0.6} />
            </HoveredScrollUpInternal>
        </motion.div>
    )
}

export default ArrowFocus;