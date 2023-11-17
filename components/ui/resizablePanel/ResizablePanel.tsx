import React from "react";
import { useMeasure } from "react-use";
import { motion, AnimatePresence } from "framer-motion";

import { twMerge } from 'tailwind-merge'

const ignoreCircularReferences = () => {
  const cache = new WeakSet();
  return (key: string, value: any) => {
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
  y = 20,
}: {
  children: React.ReactElement | JSX.Element | boolean | null;
  duration?: number;
  y?: number;
}) => {
  let [ref, { height }] = useMeasure();
  const variationResizablePanel = {
    initial: {
        opacity: 0,
        y: -1 * y,
        height: 0,
    },
    animate: {
        opacity: 1,
        y: 0,
        height: 'auto',
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
}
  return (
    <AnimatePresence initial={false} mode="sync">
      <motion.div
        animate={{ height: height || "auto", transition: { duration: duration / 2 } }}
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
            // @ts-ignore
            ref={ref}
            className={twMerge(
              height ? "relative" : "absolute",
              "px-0 pb-0"
            )}
          >
            {children}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ResizablePanel;