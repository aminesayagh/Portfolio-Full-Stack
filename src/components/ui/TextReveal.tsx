"use client";

import { useMemo } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { ComponentPropsWithoutRef, FC, ReactNode, useRef } from "react";

import { cn } from "@/lib/utils";

export interface TextRevealProps extends ComponentPropsWithoutRef<"div"> {
    text: string;
}

export const TextReveal: FC<TextRevealProps> = ({ text, className }) => {
    const targetRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const words = useMemo(() => text.split(" "), [text]);

    return <div ref={targetRef} className={cn("relative z-0", className)}>
        <div className="flex">
            {words.map((word, index) => {
                const start = index / words.length;
                const end = start + 1 / words.length;

                return <Word key={index} progress={scrollYProgress} range={[start, end]}>
                    {word}
                </Word>
            })}
        </div>
    </div>
}


 
interface WordProps {
    children: ReactNode;
    progress: MotionValue<number>;
    range: [number, number];
  }
   
  const Word: FC<WordProps> = ({ children, progress, range }) => {
    const opacity = useTransform(progress, range, [0, 1]);
    return (
      <span className="xl:lg-3 relative mx-1 lg:mx-2.5">
        <span className={"absolute opacity-30"}>{children}</span>
        <motion.span
          style={{ opacity: opacity }}
          className={"text-black dark:text-white"}
        >
          {children}
        </motion.span>
      </span>
    );
  };