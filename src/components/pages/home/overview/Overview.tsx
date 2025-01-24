"use client";

import React, { useRef, useContext } from "react";
import { motion, useTransform, useMotionValue } from "framer-motion";

import { LenisContext } from "@/lib/Lenis";
import ParallaxProject from "./ParallaxProject";

function Overview() {
  // Create a reference for the container section
  const containerRef = useRef<HTMLDivElement>(null);
  const lenis = useContext(LenisContext);
  const scrollY = useMotionValue(0);

  
  // Transform width from container width to full window width
  const scale = useTransform(scrollY, [0, 2000], [1, 3]);
  const height = useTransform(scrollY, [0, 2000], [2000, 900]);


  if (!lenis) {
    return null;
  }
  const { addCallback } = lenis;

  addCallback(() => {
    const scroll = containerRef.current?.getBoundingClientRect().top as number;
    if (scroll < 0) {
      scrollY.set(-1 * scroll);
    } else {
      scrollY.set(0);
    }
  }, 0);

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
          }}
          className="size-full self-center origin-center mx-auto will-change-transform"
        >
          <ParallaxProject />
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Overview;
