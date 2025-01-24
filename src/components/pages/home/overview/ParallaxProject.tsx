"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import Lenis from "lenis";

function Column({ images, y }: { images: string[]; y: MotionValue<number> }) {
  return (
    <motion.div
      className="relative h-full w-1/4 min-w-[250px] flex flex-col gap-[2vw]"
      style={{ y }}
    >
      {images.map((image, index) => (
        <motion.div key={index} className="relative h-full w-full">
          <Image src={image} alt={`Image ${index}`} fill />
        </motion.div>
      ))}
    </motion.div>
  );
}
function ParallaxProject() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState<{ width: number; height: number }>(
    { width: 0, height: 0 }
  );

  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ["start start", "end end"]
  });
  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  useEffect( () => {
    const lenis = new Lenis()

    const raf = (time: number) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const resize = () => {
      setDimension({width: window.innerWidth, height: window.innerHeight})
    }

    window.addEventListener("resize", resize)
    requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    }
  }, [])

  return (
    <div
      ref={galleryRef}
      className="h-full bg-black-700 relative flex gap-[2vw] p-[2vw] overflow-hidden"
    >
      <Column images={[]} y={y} />
      <Column images={[]} y={y2} />
      <Column images={[]} y={y3} />
      <Column images={[]} y={y4} />
    </div>
  );
}

export default ParallaxProject;
