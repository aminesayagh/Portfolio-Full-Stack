"use client";

import { useRef, useState, useEffect, useContext } from "react";
import {
  motion,
  useTransform,
  MotionValue,
  useMotionValue
} from "framer-motion";
import Image from "next/image";
import Lenis from "lenis";

import { LenisContext } from "@/lib/Lenis";
import { cn } from "@/lib/utils";

function Row({ images, x, reverse = false }: { images: string[]; x: MotionValue<number>; reverse?: boolean }) {
  return (
    <motion.div
      className={cn(
        "relative h-full w-[450%] grid grid-cols-8 min-w-[250px] gap-[2vw]",
        "group [--duration:40s] [--gap:2rem]"
      )}
      style={{ x }}
    >
      {Array(8).fill(0).map((_, index) => (
        <motion.div
          key={index}
          className={cn("relative h-full w-full overflow-hidden rounded-xl  object-cover", 
            "animate-marquee flex-row group-hover:[animation-play-state:paused]",
            {"[animation-direction:reverse]": reverse}
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
function ParallaxProject() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const scrollYProgress = useMotionValue(0);
  const [dimension, setDimension] = useState<{ width: number; height: number }>(
    { width: 0, height: 0 }
  );

  const lenis = useContext(LenisContext);

  const { width } = dimension;
  const x = useTransform(scrollYProgress, [0, 4000], [width * -1.2, 0]);
  const x2 = useTransform(scrollYProgress, [0, 4000], [0, width * -1.2]);

  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", resize);
    requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  if (!lenis) {
    return null;
  }
  const { addCallback } = lenis;

  addCallback(p => {
    scrollYProgress.set(p.actualScroll);
  }, 0);

  return (
    <div
      ref={galleryRef}
      className="h-full bg-primary-500 relative flex flex-col gap-[2vw] p-[2vw] overflow-hidden rounded-2xl"
    >
        <Row
          images={[
            "/images/screens/1.jpg",
            "/images/screens/2.jpg",
            "/images/screens/3.jpg",
            "/images/screens/4.jpg"
          ]}
          x={x}
          reverse={true}
        />
        <Row
          images={[
            "/images/screens/5.jpg",
            "/images/screens/6.jpg",
            "/images/screens/7.jpg",
            "/images/screens/8.jpg"
          ]}
          x={x2}
        />
        <Row
          images={[
            "/images/screens/9.jpg",
            "/images/screens/1.jpg",
            "/images/screens/2.jpg",
            "/images/screens/3.jpg"
          ]}
          x={x}
          reverse={true}
        />
        <Row
          images={[
            "/images/screens/4.jpg",
            "/images/screens/5.jpg",
            "/images/screens/6.jpg",
            "/images/screens/7.jpg"
          ]}
          x={x2}
        />
    </div>
  );
}

export default ParallaxProject;
