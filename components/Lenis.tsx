import { useFrame } from "@studio-freight/hamo";
import React, { useRef } from "react";

import { LenisProvider, useLenis } from "@/lib/Lenis";
import { LenisInstance } from "@/lib/Lenis/lenis";

function Lenis({ children }: { children: React.ReactElement }) {
  const lenisRef = useRef<LenisInstance>();

  useFrame((time: number) => {
    lenisRef.current?.raf(time);
  });

  useLenis(() => {
    ScrollTrigger.refresh();
  });
  return (
    <LenisProvider
      autoRaf={true}
      ref={lenisRef}
      options={{
        smoothTouch: true,
        isSmooth: true,
        duration: 1.2,
        wheelMultiplier: 1.15,
        touchMultiplier: 1.9,
        infinite: false,
        autoResize: false,
        direction: "vertical",
        gestureDirection: "vertical",
        easing: t => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))
      }}
    >
      {children}
    </LenisProvider>
  );
}

export default Lenis;
