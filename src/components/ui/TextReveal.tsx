"use client";

import { useMemo, useContext } from "react";
import {
  motion,
  MotionValue,
  useMotionValue,
  useTransform
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
  const lenis = useContext(LenisContext);
  const scrollY = useMotionValue(0);

  if (!lenis) {
    return null;
  }
  const { addCallback } = lenis;

  addCallback(() => {
    const scroll = targetRef.current?.getBoundingClientRect().top as number;
    if (scroll < 0) {
      scrollY.set(-1 * scroll);
    } else {
      scrollY.set(0);
    }
  }, 0);

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
          const end = start + 1 / words.length;

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
