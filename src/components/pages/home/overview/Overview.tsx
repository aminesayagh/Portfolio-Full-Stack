"use client";

import React, { useRef } from "react";
import { motion, useTransform, useScroll, useMotionValueEvent, useMotionValue } from "framer-motion";

import ParallaxProject from "./ParallaxProject";

function Overview() {
  // Create a reference for the container section
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollYPosition = useMotionValue(0);

  // Transform width from container width to full window width
  const { scrollY } = useScroll({
    target: containerRef
  });


  useMotionValueEvent(scrollY, "change", (latest) => {
    const s = latest - Number(containerRef.current?.getBoundingClientRect().top) - window.innerHeight / 2;
    if (s > 0) {
      scrollYPosition.set(s);
    } else {
      scrollYPosition.set(0);
    }
  });

  const scale = useTransform(scrollYPosition, [0, 2000], [1, 2]);
  const height = useTransform(scrollYPosition, [0, 2000], [2400, 900]);


  return (
    <motion.section
      ref={containerRef}
      style={{
        height
      }}
      className="w-full relative overflow-hidden will-change-transform"
    >
      <div className="w-full container h-full">
        <motion.div
          style={{
            top: 0,
            scale,
            transformOrigin: "top center"
          }}
          className="size-full self-center mx-auto will-change-transform"
        >
          <ParallaxProject />
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Overview;
