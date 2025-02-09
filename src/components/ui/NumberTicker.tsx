"use client";

import { useInView, useMotionValue, useSpring } from "motion/react";
import { ComponentPropsWithoutRef, useEffect, useRef, memo } from "react";

import { ANIMATION_GPU_OPTIMIZATION, cn } from "@/lib/utils";

interface NumberTickerProps extends ComponentPropsWithoutRef<"span"> {
  value: number;
  direction?: "up" | "down";
  delay?: number; // delay in s
  decimalPlaces?: number;
  totalTime?: number | null;
}

function NumberTicker({
  value,
  direction = "up",
  delay = 0,
  className,
  totalTime = null,
  decimalPlaces = 0,
  ...props
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    if (isInView) {
      let timeDelay = delay * 1000;
      if (totalTime) {
        timeDelay = delay * 1000 + (totalTime / value);
      }
      timeout.current = setTimeout(() => {
        motionValue.set(direction === "down" ? 0 : value);
      }, timeDelay);
      return () => {
        if (timeout.current) {
          clearTimeout(timeout.current);
        }
      };
    }
    return () => { };
  }, [motionValue, isInView, delay, value, direction]);

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) {
          ref.current.textContent = Intl.NumberFormat("en-US", {
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces,
          }).format(Number(latest.toFixed(decimalPlaces)));
        }
      }),
    [springValue, decimalPlaces],
  );

  return (
    <span
      ref={ref}
      className={cn(
        "inline-block tabular-nums tracking-wider",
        className,
        ANIMATION_GPU_OPTIMIZATION
      )}
      {...props}
    />
  );
}

NumberTicker.displayName = "NumberTicker";

export default memo(NumberTicker);