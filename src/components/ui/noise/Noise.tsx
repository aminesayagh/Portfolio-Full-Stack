"use client";
import { useMemo, memo } from "react";

import { motion } from "motion/react";
import { ANIMATION_GPU_OPTIMIZATION, cn } from "@/lib/utils";

const Noise = ({
  position = "fixed",
  className = "opacity-70"
}: {
  position?: "fixed" | "absolute";
  className?: string;
}) => {
  const noiseAnimation = useMemo(() => ({
    x: ["0%", "5%", "10%", "5%", "0%", "-5%", "-10%", "-5%", "0%", "5%", "0%"],
    y: ["0%", "-5%", "0%", "5%", "10%", "5%", "0%", "-5%", "-10%", "-5%", "0%"],
    transition: {
      duration: 1,
      ease: "linear",
      repeat: Infinity
    }
  }), []);

  const classNameMemo = useMemo(() => cn(
    "bg-noise",
    className || "opacity-70",
    "-top-1/2 -left-1/2 -bottom-1/2 -right-1/2 bg-repeat",
    ANIMATION_GPU_OPTIMIZATION,
    'bg-[url("/images/noise-transparent.png")] bg-center bg-repeat',
    position === "fixed"
      ? "fixed w-[300vw] h-[300vh] visible z-bg"
      : "absolute w-[200%] h-[200%] overflow-none z-50"
  ), [className, position]);
  return (
    <motion.div
      animate={noiseAnimation}
      className={classNameMemo}
    />
  );
};

const NoiseMemo = memo(Noise);

export default NoiseMemo;
