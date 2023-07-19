import React from "react";
import { useMeasure } from "react-use";
import { motion, AnimatePresence } from "framer-motion";

import { variationResizablePanel } from "../animation";
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
}: {
  children: React.ReactElement | JSX.Element | boolean | null;
}) => {
  let [ref, { height }] = useMeasure();
  return (
    <AnimatePresence initial={false} mode="sync">
      <motion.div
        animate={{ height: height || "auto", transition: { duration: 0.1 } }}
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