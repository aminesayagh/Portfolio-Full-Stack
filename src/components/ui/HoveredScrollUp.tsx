import { AnimatePresence, motion } from "motion/react";
import { ANIMATION_GPU_OPTIMIZATION, cn } from "@/lib/utils";
import React, { memo, useMemo } from "react";

import { Button } from "react-aria-components";

interface HoveredScrollUpProps {
  children: React.ReactNode;
  isHovered: boolean;
  skewY?: number;
  secondaryClassName?: string;
  className?: string;
  onPress?: () => void;
}
const HoveredScrollUp = memo(
  ({
    children,
    isHovered,
    secondaryClassName = "text-inherit",
    className,
    skewY = 0,
    onPress
  }: HoveredScrollUpProps) => {

    const textVariants = useMemo(
      () => ({
        initial: {
          y: 0,
          skewX: 0,
          transition: {
            duration: 0.45,
            ease: [0.16, 1, 0.3, 1] // easeOut
          }
        },
        exit: {
          y: "-100%",
          skewY: -skewY,
          transition: {
            duration: 0.45,
            ease: [0.7, 0, 0.84, 0] // easeIn
          }
        },
        enter: {
          y: "100%",
          skewY: skewY,
          transition: { duration: 0 }
        },
        animate: {
          y: 0,
          skewY: 0,
          transition: {
            duration: 0.45,
            ease: [0.16, 1, 0.3, 1] // easeOut
          }
        }
      }),
      [skewY]
    );

    // if onPress is provided, wrap the children in a Button else use a span
    const Wrapper = useMemo(() => onPress ? Button : "span", [onPress]);

    return (
      <Wrapper className={cn("relative overflow-hidden", className)} {...(onPress ? { onPress } : {})}>
        <AnimatePresence mode="wait">
          <motion.span
            key={isHovered ? "hover" : "initial"}
            className={cn(
              "block whitespace-nowrap",
              ANIMATION_GPU_OPTIMIZATION,
              isHovered ? secondaryClassName : undefined
            )}
            variants={textVariants}
            initial="enter"
            animate="animate"
            exit="exit"
          >
            {children}
          </motion.span>
        </AnimatePresence>
      </Wrapper>
    );
  }
);

HoveredScrollUp.displayName = "HoveredScrollUp";

export default HoveredScrollUp;
