"use client";

import { useMemo } from "react";
import {
  motion,
  MotionValue,
  useTransform,
  useScroll,
  useSpring,
  UseScrollOptions
} from "framer-motion";
import { ComponentPropsWithoutRef, FC, ReactNode, useRef, memo } from "react";

import { cn } from "@/lib/utils";
import { title } from "@/components/ui/typography";

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number, number];
}

const MemoizedWord: FC<WordProps> = memo(({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 0.9, 1], {
    clamp: false
  });

  return (
    <span className="xl:lg-3 relative mr-1.5 lg:mr-2.5 inline-block">
      <span className="absolute opacity-30">{children}</span>
      <motion.span
        style={{ opacity: opacity }}
        className={"text-white"}
      >
        {children}
      </motion.span>
    </span>
  );
});

MemoizedWord.displayName = "MemoizedWord";

export interface TextRevealProps extends ComponentPropsWithoutRef<"div"> {
  text: string;
}

export const TextReveal: FC<TextRevealProps> = ({ text, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollConfig = useMemo(() => {
    return {
      target: containerRef,
      offset: ["center end", "center center"]
    } as UseScrollOptions;
  }, [containerRef])

  const { scrollYProgress } = useScroll(scrollConfig);

  const springConfig = useMemo(() => ({
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  }), [])

  // Smooth out the scroll progress
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  const wordsData = useMemo(() => {
    const words = text.split(" ");
    return words.map((word, index) => {
      const start = index / words.length;
      const center = start + 0.5 / words.length;
      const end = start + 1 / words.length;
      return { word, range: [start, center, end] as [number, number, number] };
    });
  }, [text])

  const containerClassName = useMemo(() => {
    return cn(
      "relative z-0",
      title(
        {
          degree: "1",
          weight: "medium",
          size: "h2"
        },
        "tracking-wide"
      ),
      className
    )
  }, [className])

  return (
    <motion.div
      ref={containerRef}
      className={containerClassName}
    >
      <div className="flex gap-0 flex-row flex-wrap">
        {wordsData.map(({ word, range }, index) => (
          <MemoizedWord key={`${index}-${word}`} progress={smoothProgress} range={range}>
            {word}
          </MemoizedWord>
        ))}
      </div>
    </motion.div>
  );
};


