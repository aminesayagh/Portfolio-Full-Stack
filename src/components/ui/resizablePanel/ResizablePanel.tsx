import type { LegacyRef } from "react";
import React from "react";

import { motion, AnimatePresence } from "motion/react";
import { useMeasure } from "react-use";
import { cn } from "@/lib/utils";

const ignoreCircularReferences = () => {
  const cache = new WeakSet();
  return (key: string, value: WeakKey) => {
    if (key.startsWith("_")) return;
    if (typeof value === "object" && value !== null) {
      if (cache.has(value)) {
        return;
      }
      cache.add(value);
    }
    return value;
  };
};

const ResizablePanel = ({
  children,
  duration = 0.4,
  y = 20
}: {
  children: React.ReactElement | boolean | null;
  duration?: number;
  y?: number;
}) => {
  const [ref, { height }] = useMeasure<Element>();
  const variationResizablePanel = {
    initial: {
      opacity: 0,
      y: -1 * y,
      height: 0
    },
    animate: {
      opacity: 1,
      y: 0,
      height: "auto",
      transition: {
        duration: duration,
        delay: duration
      }
    },
    exit: {
      y: -1 * y,
      opacity: 0,
      height: 0,
      transition: {
        duration: duration
      }
    }
  };
  return (
    <AnimatePresence initial={false} mode="sync">
      <motion.div
        animate={{
          height: height || "auto",
          transition: { duration: duration / 2 }
        }}
        className="relative overflow-hidden"
      >
        <motion.div
          key={JSON.stringify(children, ignoreCircularReferences())}
          variants={variationResizablePanel}
          animate="animate"
          exit="exit"
          initial="initial"
        >
          <div
            ref={ref as LegacyRef<HTMLDivElement>}
            className={cn(height ? "relative" : "absolute", "px-0 pb-0")}
          >
            {children}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ResizablePanel;
