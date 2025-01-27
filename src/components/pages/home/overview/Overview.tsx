"use client";

import React, { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useTransform,
  useScroll,
  useMotionValueEvent,
  useMotionValue,
  MotionValue
} from "framer-motion";
import { useWindowSize } from "react-use";
import { cn } from "@/lib/utils";

function Row({
  images,
  x,
  reverse = false
}: {
  images: string[];
  x: MotionValue<number>;
  reverse?: boolean;
}) {
  return (
    <motion.div
      className={cn(
        "relative h-full w-[750%] grid grid-cols-12 min-w-[250px] gap-[2vw] will-change-transform",
        "group [--duration:40s] [--gap:2rem]"
      )}
      style={{ x }}
    >
      {Array(12)
        .fill(0)
        .map((_, index) => (
          <motion.div
            key={index}
            className={cn(
              "relative h-full w-full overflow-hidden rounded-xl  object-cover",
              "animate-marquee flex-row group-hover:[animation-play-state:paused]",
              { "[animation-direction:reverse]": reverse }
            )}
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
  const { width } = useWindowSize();

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

  const x = useTransform(scrollYProgress, [0, 4000], [width * -1.2, 0]);
  const x2 = useTransform(scrollYProgress, [0, 4000], [0, width * -1.2]);

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
            x={x}
            reverse={true}
          />
          <Row
            images={[
              "/images/screens/5.webp",
              "/images/screens/6.webp",
              "/images/screens/7.webp",
              "/images/screens/8.webp"
            ]}
            x={x2}
          />
          <Row
            images={[
              "/images/screens/9.webp",
              "/images/screens/1.webp",
              "/images/screens/2.webp",
              "/images/screens/3.webp"
            ]}
            x={x}
            reverse={true}
          />
          <Row
            images={[
              "/images/screens/4.webp",
              "/images/screens/5.webp",
              "/images/screens/6.webp",
              "/images/screens/7.webp"
            ]}
            x={x2}
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

export default Overview;
