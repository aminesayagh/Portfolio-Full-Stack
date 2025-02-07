import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useMemo, useRef, memo } from "react";
import _ from "lodash";
import { cn } from "@/lib/utils";
import { text } from "@/components/ui/typography";

const MemoizedWord = memo(({ children, progress, range }: { children: React.ReactNode, progress: MotionValue<number>, range: [number, number, number] }) => {
    const opacity = useTransform(progress, range, [0, 0.9, 1], {
        clamp: false
    });
    const y = useTransform(progress, range, ["10px", "0px", "0px"], { clamp: false });
    return (
        <span className="relative mr-1 w-min inline-block h-8 overflow-hidden">
            <span className="opacity-30 absolute">{children}</span>
            <motion.span
                className={text({
                    weight: "bold",
                    size: "xs",
                    degree: "4"
                }, "block relative")}
                style={{ opacity, y }}
            >
                {children}
            </motion.span>
        </span>
    );
});

MemoizedWord.displayName = "MemoizedWord";

const TextReveal2 = ({
    lang,
    phrase,
    className,
    ...props
}: {
    lang: string;
    phrase: string;
    className?: string;
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["center end", "center end"]
    });
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });
    const words = useMemo(() => {
        const words = phrase.split(" ");
        return words.map((word, index) => {
            const start = index / words.length;
            const center = start + 0.5 / words.length;
            const end = start + 1 / words.length;
            return { word, range: [start, center, end] as [number, number, number] };
        });
    }, [phrase]);

    return (
        <motion.div
            ref={containerRef}
            className={cn("relative flex flex-row items-start justify-start flex-wrap", className)}
            {...props}
        >
            {words.map(({ word, range }, index) => (
                <MemoizedWord key={`${word}-${index}`} progress={smoothProgress} range={range}>
                    {word}
                </MemoizedWord>
            ))}
        </motion.div>
    )
}

export default TextReveal2;