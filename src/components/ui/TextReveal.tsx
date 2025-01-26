"use client";

import { useMemo, useContext } from "react";
import {
  motion,
  MotionValue,
  useTransform,
  useScroll
} from "framer-motion";
import { ComponentPropsWithoutRef, FC, ReactNode, useRef } from "react";

import { cn } from "@/lib/utils";
import { LenisContext } from "@/lib/Lenis";
import { title } from "@/components/ui/typography";
export interface TextRevealProps extends ComponentPropsWithoutRef<"div"> {
  text: string;
}

export const TextReveal: FC<TextRevealProps> = ({ text, className }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: targetRef
  });

  
  const words = useMemo(() => text.split(" "), [text]);

  return (
    <div
      ref={targetRef}
      className={cn(
        "relative z-0",
        title(
          {
            degree: "1",
            weight: "semibold",
            size: "h4"
          },
          "tracking-normal"
        ),
        className
      )}
    >
      <div className="flex gap-0 flex-row flex-wrap">
        {words.map((word, index) => {
          const start = index / words.length;
          const end = start + 100 / words.length;
          return (
            <Word key={index} progress={scrollY} range={[start, end]}>
              {word}
            </Word>
          );
        })}
      </div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  console.log(opacity.get());
  return (
    <span className="xl:lg-3 relative mx-1 lg:mx-2.5">
      <span className={"absolute opacity-30"}>{children}</span>
      <motion.span
        style={{ opacity: opacity }}
        className={"text-white"}
      >
        {children}
      </motion.span>
    </span>
  );
};
