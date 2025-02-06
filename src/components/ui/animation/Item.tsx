import { motion } from "motion/react";
import React, { useState, useMemo } from "react";

import { ANIMATION_GPU_OPTIMIZATION, cn } from "@/lib/utils";

const transitionConfig = {
  easeIn: [0.7, 0, 0.84, 0],
  easeOut: [0.16, 1, 0.3, 1],
  duration: 0.5
};

// Variants for the first div (exits upwards, enters from below)
const firstVariants = {
  initial: { y: 0 },
  exit: {
    y: "-100%",
    skewY: 5,
    transition: {
      ...transitionConfig
    }
  },
  enter: {
    y: "100%",
    skewY: -5,
    transition: { duration: 0 }
  },
  animate: {
    y: 0,
    skewY: 0,
    transition: {
      ...transitionConfig,
      delay: 0.35
    }
  }
};

// Variants for the second div (enters from below, exits downwards)
const secondVariants = {
  initial: { y: 0 },
  exit: {
    y: "100%",
    skewY: -5,
    transition: {
      ...transitionConfig
    }
  },
  enter: {
    y: "100%",
    skewY: 5,
    transition: { duration: 0 }
  },
  animate: {
    y: 0,
    skewY: 0,
    transition: {
      ...transitionConfig,
      delay: 0.35
    }
  }
};

const Item = ({
  children,
  className
}: {
  children: string;
  className?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const hoverHandlers = useMemo(() => ({
    onPointerEnter: () => setIsHovered(true),
    onPointerLeave: () => setIsHovered(false)
  }), []);

  const baseClassName = useMemo(() => 
    cn(
      "flex w-auto absolute inset-0",
      ANIMATION_GPU_OPTIMIZATION,
      className
    )
  , [className]);

  return (
    <div
      className="relative cursor-pointer"
      {...hoverHandlers}
    >
      <div className="relative invisible">
        {children}
      </div>
      
      {/* First div - original text */}
      <motion.div
        className={baseClassName}
        variants={firstVariants}
        initial="initial"
        animate={isHovered ? "exit" : "animate"}
      >
        {children}
      </motion.div>

      {/* Second div - hover text */}
      <motion.div
        className={cn(baseClassName, "text-primary-400")}
        variants={secondVariants}
        initial="enter"
        animate={isHovered ? "animate" : "exit"}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Item;