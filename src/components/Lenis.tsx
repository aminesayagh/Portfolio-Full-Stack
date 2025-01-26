"use client";

import React, { useRef, useEffect } from "react";

import gsap from "gsap";
import { ReactLenis } from "@/lib/Lenis/provider";
import { LenisRef } from "@/lib/Lenis/types";

import { cancelFrame, frame } from 'framer-motion';


function Lenis({ children }: { children: React.ReactElement }) {
  const lenisRef = useRef<LenisRef>(null);
  
  
  useEffect(() => {
    const update = (time: number) => {
      lenisRef.current?.lenis?.raf(time)
    }
  
    const rafId = requestAnimationFrame(update)
  
    return () => cancelAnimationFrame(rafId)
  }, [])



  useEffect(() => {
    const update = (data: { timestamp: number }) => {
      const time = data.timestamp
      lenisRef.current?.lenis?.raf(time)
    }

    frame.update(update, true)

    return () => cancelFrame(update)
  }, [])

  
  useEffect(() => {
    const update = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000)
    }
  
    gsap.ticker.add(update)
  
    return () => gsap.ticker.remove(update)
  }, [])


  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false, // used to enable RAF(Request Animation Frame)
        duration: 1.2, // duration of the scrolling animation
        easing: t => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)), // easing function used to smooth the scrolling
        infinite: false, // used to disable infinite scrolling
        autoResize: true, // used to resize the container to the viewport size when the window is resized
      }}
    >
      {children}
    </ReactLenis>
  );
}

export default Lenis;
