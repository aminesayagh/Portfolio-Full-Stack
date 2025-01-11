import { motion, useAnimation, AnimatePresence } from "framer-motion";
import React, { useState, useCallback, useMemo } from "react";

import { cn } from "@/lib/utils";

const slideVariants = {
  initial: {
    y: "0%",
    skewY: 0
  },
  exit: {
    y: "-100%",
    skewY: 15,
    transition: {
      duration: 0.15,
      ease: [0.7, 0, 0.84, 0] // power4.easeIn
    }
  },
  enter: {
    y: "100%",
    skewY: 15,
    transition: {
      duration: 0.15
    }
  },
  animate: {
    y: "0%",
    skewY: 0,
    transition: {
      duration: 0.15,
      ease: [0.16, 1, 0.3, 1] // power4.easeOut
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
  const controls = useAnimation();

  const handleHoverStart = useCallback(() => {
    setIsHovered(true);
    controls.start("animate");
  }, [controls]);

  const handleHoverEnd = useCallback(() => {
    setIsHovered(false);
    controls.start("initial");
  }, [controls]);

  
  const initialAnimation = useMemo(() => 
    isHovered ? "enter" : "initial"
  , [isHovered]);

  
  const combinedClassName = useMemo(() => 
    cn(
      "flex w-auto transform-gpu will-change-transform transition-colors duration-300",
      isHovered ? "text-primary-500" : "",
      className
    )
  , [isHovered, className]);

  return (
    <div
      className="relative overflow-hidden cursor-pointer"
      onPointerEnter={handleHoverStart}
      onPointerLeave={handleHoverEnd}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isHovered ? "hovered" : "default"}
          className={combinedClassName}
          variants={slideVariants}
          initial={initialAnimation}
          animate={isHovered ? "enter" : "initial"}
          exit="exit"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Item;
