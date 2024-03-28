import { twMerge } from "tailwind-merge";
import { useEffect } from "react";
import { useIsomorphicLayoutEffect } from "react-use";
import { gsap } from "@/utils/gsap";

const Noise = ({
  position = "fixed",
  className = "opacity-90",
}: {
  position?: "fixed" | "absolute";
  className?: string;
}) => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const DURATION = 3;
      const tl = gsap.timeline({
        repeat: -1,
        // yoyo: true,
        ease: "none",
      });
      tl.to(".bg-noise", {
        keyframes: [
          { x: "0%", y: "0%" }, // Starting point (center)
          { x: "5%", y: "-5%" }, // Move to top right
          { x: "10%", y: "0%" }, // Move to right
          { x: "5%", y: "5%" }, // Move to bottom right
          { x: "0%", y: "10%" }, // Move to bottom
          { x: "-5%", y: "5%" }, // Move to bottom left
          { x: "-10%", y: "0%" }, // Move to left
          { x: "-5%", y: "-5%" }, // Move to top left
          { x: "0%", y: "-10%" }, // Move to top
          { x: "5%", y: "-5%" }, // Move to top right again
        ],
        duration: DURATION,
        ease: "none",
        // repeat on one direction
        repeat: -1,

      });
      return () => {
        tl.kill();
      };
    });
    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      className={twMerge(
        "bg-noise",
        className || "opacity-70",
        "-top-1/2 -left-1/2 -bottom-1/2 -right-1/2 bg-repeat",
        "will-change-transform-animation",
        'bg-[url("/images/noise-transparent.png")] bg-center bg-repeat',
        position == "fixed"
          ? "fixed w-[300vw] h-[300vh] visible z-bg"
          : "absolute w-[200%] h-[200%] overflow-none z-50"
      )}
    ></div>
  );
};

export default Noise;
