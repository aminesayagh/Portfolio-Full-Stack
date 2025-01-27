import { useCallback, useEffect, useRef, useState } from "react";
import { useIsomorphicLayoutEffect } from "react-use";
import { useEventListener } from "@/hook/useEventListener";

type FactorConfig = {
  default: number;
  breakpoints?: {
    [key: number]: number; // width in px : factor
  };
};

interface UseFitTextOptions {
  factor: number | FactorConfig;
  maxFontSize?: number;
  minFontSize?: number;
}

function useFitText({ 
  factor, 
  maxFontSize = 190, 
  minFontSize = 8 
}: UseFitTextOptions) {
  const [fontSize, setFontSize] = useState("initial");
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  const getCurrentFactor = useCallback(() => {
    if (typeof factor === 'number') return factor;

    const breakpoints = factor.breakpoints || {};
    const sortedBreakpoints = Object.entries(breakpoints)
      .sort((a, b) => Number(b[0]) - Number(a[0])); // Sort breakpoints in descending order
    
    const currentWidth = window.innerWidth;
    const matchingBreakpoint = sortedBreakpoints.find(
      ([breakpoint]) => currentWidth >= Number(breakpoint)
    );

    return matchingBreakpoint ? matchingBreakpoint[1] : factor.default;
  }, [factor]);

  const adjustFontSize = useCallback(() => {
    if (!ref.current) {return;}

    const containerWidth = ref.current.getBoundingClientRect().width;
    const currentFactor = getCurrentFactor();
    const newSize = Math.min(
      Math.max(containerWidth / currentFactor, minFontSize),
      maxFontSize
    );

    setFontSize(`${newSize}px`);
  }, [getCurrentFactor, maxFontSize, minFontSize]);

  const debouncedAdjust = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(adjustFontSize, 100);
  }, [adjustFontSize]);

  useIsomorphicLayoutEffect(() => {
    adjustFontSize();
  }, [adjustFontSize]);

  useEventListener("resize", debouncedAdjust);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { fontSize, ref };
}

export default useFitText;
