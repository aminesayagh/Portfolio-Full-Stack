"use client";

import React, { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useTransform,
  useScroll,
  useMotionValueEvent,
  useMotionValue,
  useVelocity,
  useSpring,
  wrap,
  useAnimationFrame
} from "framer-motion";
import { cn } from "@/lib/utils";

function Row({
  images,
  baseVelocity = 100
}: {
  images: string[];
  baseVelocity?: number;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothScroll = useSpring(scrollVelocity, {
    stiffness: 100,
    damping: 50
  });
  const velocityFactor = useTransform(smoothScroll, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, v => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    
    /**
     * This is what changes the direction of the scroll once we
     * switch scrolling directions.
     */
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <motion.div
      className={cn(
        "relative h-full w-[750%] flex flex-row min-w-[250px] gap-[2vw] will-change-transform",
        "group [--duration:40s] [--gap:2rem]"
      )}
      style={{ x }}
      onHoverStart={() => {
        x.stop();
      }}
      onHoverEnd={() => {

      }}
    >
      {Array(12)
        .fill(0)
        .map((_, index) => (
          <motion.div
            key={index}
            className="relative h-full w-full overflow-hidden rounded-xl object-cover"
          >
            <div className="absolute inset-0 z-10 bg-black-100 opacity-10"></div>
            <Image
              src={images[index % images.length] || ""}
              alt={`Image ${index}`}
              fill
              className="object-cover object-top rounded-xl h-full w-full"
            />
          </motion.div>
        ))}
    </motion.div>
  );
}

function Overview() {
  // Create a reference for the container section
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollYPosition = useMotionValue(0);
  const scrollYProgress = useMotionValue(0);

  // Transform width from container width to full window width
  const { scrollY } = useScroll({
    target: containerRef
  });

  useMotionValueEvent(scrollY, "change", latest => {
    const s =
      latest -
      Number(containerRef.current?.getBoundingClientRect().top) -
      window.innerHeight / 2;
    if (s > 0) {
      scrollYPosition.set(s);
    } else {
      scrollYPosition.set(0);
    }
    scrollYProgress.set(latest);
  });

  const height = useTransform(scrollYPosition, [0, 2000], [2400, 900]);
  const scale = useTransform(scrollYPosition, [0, 2000], [1, 2]);

  return (
    <motion.section
      ref={containerRef}
      style={{
        height
      }}
      className="w-full relative overflow-hidden will-change-transform"
    >
      <motion.div
        style={{
          top: 0,
          transformOrigin: "top center",
          height: 2400
        }}
        className="size-full container absolute inset-0 self-center mx-auto will-change-transform"
      >
        <motion.div
          style={{
            transformOrigin: "top center",
            scale
          }}
          className="h-full bg-primary-500 relative flex flex-col gap-[2vw] p-[2vw] overflow-hidden rounded-2xl"
        >
          <Row
            images={[
              "/images/screens/1.webp",
              "/images/screens/2.webp",
              "/images/screens/3.webp",
              "/images/screens/4.webp"
            ]}
            baseVelocity={1}
          />
          <Row
            images={[
              "/images/screens/5.webp",
              "/images/screens/6.webp",
              "/images/screens/7.webp",
              "/images/screens/8.webp"
            ]}
            baseVelocity={-1}
          />
          <Row
            images={[
              "/images/screens/9.webp",
              "/images/screens/1.webp",
              "/images/screens/2.webp",
              "/images/screens/3.webp"
            ]}
            baseVelocity={1}
          />
          <Row
            images={[
              "/images/screens/4.webp",
              "/images/screens/5.webp",
              "/images/screens/6.webp",
              "/images/screens/7.webp"
            ]}
            baseVelocity={-1}
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

export default Overview;
