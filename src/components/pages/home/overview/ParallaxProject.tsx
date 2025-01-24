"use client";

import { useRef, useState, useEffect, useContext } from "react";
import { motion, useTransform, MotionValue, useMotionValue } from "framer-motion";
import Image from "next/image";
import Lenis from "lenis";

import { LenisContext } from "@/lib/Lenis";

function Row({ images, x }: { images: string[]; x: MotionValue<number> }) {
  return (
    <motion.div
      className="relative h-full w-[450%] grid grid-cols-8 min-w-[250px] gap-[2vw]"
      style={{ x }}
    >
      {[...images, ...images].map((image, index) => (
        <motion.div key={index} className="relative h-full w-full overflow-hidden rounded-xl object-cover">
          <div className="absolute inset-0 z-10 bg-black-100 opacity-10"></div>
          <Image src={image} alt={`Image ${index}`} fill className="object-cover object-top rounded-xl h-full w-full" />
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

  if (!lenis) {
    return null;
  }
  const { addCallback } = lenis;
  
  addCallback((p) => {
    scrollYProgress.set(p.actualScroll);
  }, 0);

  return (
    <div
      ref={galleryRef}
      className="h-full bg-black-800 relative flex flex-col gap-[2vw] p-[2vw] overflow-hidden rounded-2xl"
    >
      <Row images={['/images/screens/1.jpg', '/images/screens/2.jpg', '/images/screens/3.jpg', '/images/screens/4.jpg']} x={x} />
      <Row images={['/images/screens/5.jpg', '/images/screens/6.jpg', '/images/screens/7.jpg', '/images/screens/8.jpg']} x={x2} />
      <Row images={['/images/screens/9.jpg', '/images/screens/1.jpg', '/images/screens/2.jpg', '/images/screens/3.jpg']} x={x} />
      <Row images={['/images/screens/4.jpg', '/images/screens/5.jpg', '/images/screens/6.jpg', '/images/screens/7.jpg']} x={x2} />
    </div>
  );
}

export default ParallaxProject;
