"use client";

import React, { useRef, useContext, useState, useEffect } from "react";
import { motion, useTransform, useMotionValue } from "framer-motion";
import { useWindowSize } from "react-use";

import { useLenis, LenisContext } from "@/lib/Lenis";

function Overview() {
  // Create a reference for the container section
  const containerRef = useRef<HTMLDivElement>(null);
  const lenis = useContext(LenisContext);
  const [containerWidth, setContainerWidth] = useState(0);
  const scrollY = useMotionValue(0);
  const { width: windowWidth } = useWindowSize();

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.getBoundingClientRect().width);
    }
  }, [windowWidth]);

  if (!lenis) return null;
  const { addCallback } = lenis;

  addCallback(params => {
    const scroll = Number(params.actualScroll - (containerRef.current?.getBoundingClientRect().top as number));
    if (scroll > 0) {
      scrollY.set(scroll);
    } else {
      scrollY.set(0);
    }
  }, 0);

  // Transform width from container width to full window width
  const scale = useTransform(scrollY, [0, 2000], [1, 1.5]);

  return (
    <section
      ref={containerRef}
      className=" w-full relative overflow-hidden h-[200vh] bg-red-500/40"
    >
      <motion.div
        style={{
          top: 0,
          scale: scale,
        }}
        className="size-full container self-center origin-center bg-red-500 mx-auto"
      />
    </section>
  );
}

export default Overview;
